'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';
import { getUserData, verifyAuthToken } from '../functions.js';

// Отправка данных клиенту
router.post('/get-profile-data', async (req, res) => {
  let authToken;
    if (req.headers.authorization) {
      authToken = req.headers.authorization.split(' ')[1];
    };
  let userEmail;
    if (req.body.userEmail) {
      userEmail = decodeURIComponent(req.body.userEmail);
    }
  try {
    let userData;
    if (authToken) {
      try {
        userData = await getUserData(await verifyAuthToken(authToken));
      } catch (error) {
        // Если authToken недействителен, использовать userEmail
        userData = await getUserData(userEmail);
      }
    } else {
      // Если authToken отсутствует, использовать userEmail
      userData = await getUserData(userEmail);
    }
    
    // Проверка наличия email и токена в missions
    if (userData === null) {
      res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
    } else {
      const query = 'SELECT quantity_operations FROM payment WHERE client_id = $1';
      const values = [userData.email];
      const result = await appConfig.pool.query(query, values);
      let operationsQuantityTotal = 0;
      if (result.rowCount > 0) {
        // Существуют записи с данным client_id
        // Проходимся по каждой строке результата и складываем значения quantity_operations
        result.rows.forEach(row => {
          const quantityOperationsInt = parseInt(row.quantity_operations, 10);
          if (!isNaN(quantityOperationsInt)) {
            operationsQuantityTotal += quantityOperationsInt;
          }
        });
      } else {
        // Нет записей с данным client_id
        res.json({ success: false, message: 'Нет записей с данным клиентом' });
      }
      userData.operationsQuantityTotal = operationsQuantityTotal;
      res.json({ success: true, data: userData });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Произошла ошибка при получении данных.'});
  }
});
export default router;