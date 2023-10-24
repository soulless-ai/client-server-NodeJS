'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';
import { verifyAuthToken } from '../functions.js';

// Запрос после оплаты
router.post('/payment', async function (req, res) {
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
      const queryPayment = 'INSERT INTO payment (client_id, time, summa, pay, quantity_operations, comments) VALUES ($1, now(), $2, $3, $4, $5)';
      const valuesPayment = [authorization, req.body.summa, req.body.pay, req.body.quantity_operations, req.body.comments];
      await appConfig.pool.query(queryPayment, valuesPayment);
      const queryIncome = 'INSERT INTO income_operation (time, client_id, quantity_operations) VALUES (now(), $1, $2)';
      const valuesIncome = [authorization, req.body.quantity_operations];
      await appConfig.poolOperations.query(queryIncome, valuesIncome);
      
      const mailOptions = {
        from: '4ap9911@gmail.com', // Адрес отправителя
        to: email, // Адрес получателя
        subject: 'Пакеты', // Тема письма
        text: `Вами было приобретено: ${req.body.quantity_operations} операций` // Текст письма
      };
    
      appConfig.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Ошибка при отправке письма:', error);
        } else {
          console.log('Письмо успешно отправлено:', info.response);
        }
      });
      res.json({ success: true, message: 'Данные в базе данных' });
    }
  } catch (error) {
    console.error('Произошла ошибка при сохранении данных в базе данных:', error);
    res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных' });
  }
})
export default router;