'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';
import { verifyAuthToken } from '../functions.js';

// Замена данных
router.post('/send-changes', async function (req, res) {
  const name = req.body.change_name === 'null' ? null : decodeURIComponent(req.body.change_name);
  const second_name = req.body.change_second_name === 'null' ? null : decodeURIComponent(req.body.change_second_name);
  const phone = req.body.change_phone === 'null' ? null : decodeURIComponent(req.body.change_phone);
  const email = req.body.change_email === 'null' ? null : decodeURIComponent(req.body.change_email);
  
  let authToken;
    if (req.headers.authorization) {
      authToken = req.headers.authorization.split(' ')[1];
    };
  let userEmail;
    if (req.body.userEmail) {
      userEmail = decodeURIComponent(req.body.userEmail);
    }

  try {
    let authorization;
    if (authToken) {
      try {
        authorization = await verifyAuthToken(authToken);
      } catch (error) {
        // Если authToken недействителен, использовать userEmail
        authorization = userEmail || null;
      }
    } else {
      // Если authToken отсутствует, использовать userEmail
      authorization = userEmail || null;
    }
    
    // Проверка наличия email и токена в missions
    if (authorization === null) {
      res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
    } else {
      // Проверка наличия пользователя в таблице
      const selectQuery = 'SELECT * FROM clients WHERE email = $1';
      const { rowCount } = await appConfig.pool.query(selectQuery, [authorization]);

      if (rowCount > 0) {
        // Update user data based on the provided fields
        if (name !== 'null') {
          const updateQuery = 'UPDATE clients SET name = $1 WHERE email = $2';
          await appConfig.pool.query(updateQuery, [name, authorization]);
        }

        if (second_name !== 'null') {
          const updateQuery = 'UPDATE clients SET second_name = $1 WHERE email = $2';
          await appConfig.pool.query(updateQuery, [second_name, authorization]);
        }

        if (phone !== 'null') {
          const updateQuery = 'UPDATE clients SET phone = $1 WHERE email = $2';
          await appConfig.pool.query(updateQuery, [phone, authorization]);
        }

        if (email !== 'null') {
          const updateQuery = 'UPDATE clients SET email = $1 WHERE email = $2';
          await appConfig.pool.query(updateQuery, [email, authorization]);
        }

        res.json({ success: true, message: 'Данные успешно сохранены в базе данных' });
      } else {
        // Пользователь не найден, генерировать ошибку
        throw new Error('Пользователь не найден');
      }
    }
  } catch (error) {
    console.error('Произошла ошибка при сохранении данных в базе данных:', error);
    res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных' });
  }
});



// Функция для получения хэшированного пароля из базы данных по email
async function getUserPasswordByEmail(email) {
    try {
      // Ваш код для выполнения запроса к базе данных для получения пароля
      const selectQuery = 'SELECT password FROM clients WHERE email = $1';
      const result = await appConfig.pool.query(selectQuery, [email]);
  
      // Проверяем, найден ли пользователь с таким email
      if (result.rowCount > 0) {
        return result.rows[0].password;
      } else {
        // Если пользователь с таким email не найден, вернем null или пустую строку, в зависимости от вашей логики
        return null;
      }
    } catch (error) {
      console.error('Ошибка при получении хэшированного пароля:', error);
      throw new Error('Ошибка при получении хэшированного пароля');
    }
}
  
// Функция для обновления хэшированного пароля в базе данных по email
async function updateUserPasswordByEmail(email, hashedPassword) {
    try {
        // Ваш код для выполнения запроса к базе данных для обновления пароля
        const updateQuery = 'UPDATE clients SET password = $1 WHERE email = $2';
        const updateValues = [hashedPassword, email];
        const result = await appConfig.pool.query(updateQuery, updateValues);
    
        // Проверяем, было ли обновление успешным
        if (result.rowCount > 0) {
          console.log('Пароль успешно обновлен');
        } else {
          console.log('Пользователь с таким email не найден. Пароль не обновлен.');
        }
    } catch (error) {
        console.error('Ошибка при обновлении пароля:', error);
        throw new Error('Ошибка при обновлении пароля');
    }
}
  
router.post('/send-change-password', async function (req, res) { 
  let authToken;
    if (req.headers.authorization) {
      authToken = req.headers.authorization.split(' ')[1];
    };
  let userEmail;
    if (req.body.userEmail) {
      userEmail = decodeURIComponent(req.body.userEmail);
    }

  try {
    let authorization;
    if (authToken) {
      try {
        authorization = await verifyAuthToken(authToken);
      } catch (error) {
        // Если authToken недействителен, использовать userEmail
        authorization = userEmail || null;
      }
    } else {
      // Если authToken отсутствует, использовать userEmail
      authorization = userEmail || null;
    }
    
    // Проверка наличия email и токена в missions
    if (authorization === null) {
      res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
    } else {
      const old_password = req.body.old_password;
      const new_password = req.body.new_password;
    
      // Получаем хэшированный пароль из базы данных по email пользователя
      const hashedOldPassword = await getUserPasswordByEmail(authorization);
    
      // Сравнение хэшированного старого пароля с введенным
      const isPasswordCorrect = appConfig.bcrypt.compare(old_password, hashedOldPassword);
    
      if (isPasswordCorrect) {
        // Старый пароль верен, хэшируем новый пароль
        const hashedNewPassword = await appConfig.bcrypt.hash(new_password, 10);

        // Обновляем хэшированный пароль в базе данных по email пользователя
        await updateUserPasswordByEmail(authorization, hashedNewPassword);
      } else {
        // Старый пароль неверен, генерируем ошибку
        throw new Error('Неверный старый пароль');
      }

      res.json({ success: true, message: 'Пароль успешно обновлен' });
    }
  } catch (error) {
    console.error('Произошла ошибка при обновлении пароля:', error);
    res.status(500).json({ success: false, message: 'Ошибка при обновлении пароля' });
  }
});
export default router;