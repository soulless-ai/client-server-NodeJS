'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

// Cохранение остальных данных пользователя
router.post('/registration-last-request', async function (req, res) {
    const phone = decodeURIComponent(req.body.phone);
    const email = decodeURIComponent(req.body.email);
    const password = decodeURIComponent(req.body.password);
    const name = decodeURIComponent(req.body.name);
    const second_name = decodeURIComponent(req.body.second_name);
    
    try {
      // Хэширование пароля
      const hashedPassword = await appConfig.bcrypt.hash(password, 10);
      
      const queryClients = 'INSERT INTO clients (email, password, name, second_name, phone, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id';
      const valuesClients = [email, hashedPassword, name, second_name, phone];
      const id = await appConfig.pool.query(queryClients, valuesClients);

      const queryOneTimeMissions = 'INSERT INTO one_time_missions (time, client_id, operation, start_time) VALUES (NOW(), $1, $2, NOW())';
      const valuesOneTimeMissions = [email, "Создать базу данных"];
  
      await appConfig.poolOperations.query(queryOneTimeMissions, valuesOneTimeMissions);

      const queryPayment = 'INSERT INTO payment (time, client_id, quantity_operations, comments) VALUES (NOW(), $1, $2, $3)';
      const valuesPayment = [email, "1000000", "Тестирование"];
  
      await appConfig.pool.query(queryPayment, valuesPayment);

      res.json({ success: true, message: 'Данные успешно сохранены в базе данных', clientId: id });
    } catch (error) {
      console.error('Произошла ошибка при сохранении данных в базе данных:', error);
      res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных' });
    }
});

export default router;