'use strict';
// Импортируем функции и объект app из server.js
import appConfig from './server.js';

// Создание временного токена
export function createAuthToken(email) {
  return appConfig.jwt.sign({ email: email }, appConfig.SECRET_KEY, { expiresIn: '30d' });
}
// Проверка временного токена
export async function verifyAuthToken(token) {
  return appConfig.jwt.verify(token, appConfig.SECRET_KEY).email;
}

// Получение существующих данных о пользователе
export async function getUserData(email) {
  try {
    const query = 'SELECT * FROM clients WHERE email = $1;';
    const values = [email];
    const result = await appConfig.pool.query(query, values);

    if (result.rows.length > 0) {
      const clientData = result.rows[0];
      return clientData;
    } else {
      return null;
    }
  } catch (error) { 
    return null;
  }
}
// Получение существующей информации о пользователе
export async function getUserDataBaseInfo(clientId) {
  try {
    const query = 'SELECT * FROM client_db WHERE id_client = $1;';
    const values = [clientId];
    const result = await appConfig.poolOperations.query(query, values);

    if (result.rows.length > 0) {
      const clientData = result.rows[0];
      return clientData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
// Проверка на существующий адрес почты
export async function checkIfEmailExists(email) {
    try {
      const query = 'SELECT EXISTS (SELECT 1 FROM clients WHERE email = $1);';
      const values = [email];
      const result = await appConfig.pool.query(query, values);

      return result.rows[0].exists;
    } catch (error) {
      throw error;
    }
}
// Генерация случайного кода подтверждения
export async function generateConfirmationCode() {
    const length = 6;
    const characters = '0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}
// Сохранение случайного кода подтверждения в pgsql
export async function saveConfirmationCode(email, code) {
  try {
    const query = 'INSERT INTO confirm (email, confirmation_code, created_at) VALUES ($1, $2, NOW())';
    const values = [email, code];
    await appConfig.pool.query(query, values);
  } catch (error) {
    console.error('Ошибка при сохранении кода подтверждения в PostgreSQL:', error);
    return null;
  }
}
// Получение случайного кода подтверждения из pgsql
export async function getSavedConfirmationCode(email) {
  try {
    const query = 'SELECT confirmation_code FROM confirm WHERE email = $1';
    const values = [email];
    return await appConfig.pool.query(query, values);
  } catch (error) {
    console.error('Ошибка при получении сохраненного кода подтверждения из PostgreSQL:', error);
    return null;
  }
}
// Удаление случайного кода подтверждения из pgsql
export async function deleteSavedConfirmationCode(email) {
  try {
    const currentTime = new Date();
    const minAge = new Date(currentTime.getTime() - 15 * 60 * 1000);
    const query = 'DELETE FROM confirm WHERE email = $1';
    const values = [email, minAge];
    await appConfig.pool.query(query, values);
  } catch (error) {
    console.error('Ошибка при удалении сохраненного кода подтверждения из PostgreSQL:', error);
    return null;
  }
}
// Удаление старых случайных кодов подтверждения из pgsql
export async function deleteOldConfirmatioCodes() {
  try {
    const currentTime = new Date();
    const minAge = new Date(currentTime.getTime() - 15 * 60 * 1000);
    const query = 'DELETE FROM confirm WHERE created_at <= $2';
    const values = [minAge];
    await appConfig.pool.query(query, values);
  } catch (error) {
    console.error('Ошибка при удалении сохраненного кода подтверждения из PostgreSQL:', error);
    return null;
  }
}
// Отправка кода подтверждения на email
export async function sendConfirmationCodeByEmail(email, code) {
    const mailOptions = {
      from: '4ap9911@gmail.com',
      to: email,
      subject: 'Код подтверждения',
      text: `Ваш код подтверждения: ${code}`
    };
  
    appConfig.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Ошибка при отправке письма:', error);
      } else {
        console.log('Письмо успешно отправлено:', info.response);
      }
    });
}
  
// Проверка правильности email и пароля из базы данных
export async function checkCredentials(email, password) {
  const query = 'SELECT id, email, password FROM clients WHERE email = $1';
  const values = [email];

  try {
    const { rows } = await appConfig.pool.query(query, values);
    if (rows.length === 0) {
      return { success: false, message: 'Пользователь не найден' };
    }
    
    const user = rows[0];
    const passwordMatch = await appConfig.bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return { success: true, userId: user.id };
    } else {
      return { success: false, message: 'Неправильный пароль' };
    }
  } catch (error) {
    throw error;
  }
}