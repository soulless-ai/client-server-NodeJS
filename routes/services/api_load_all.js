'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../../server.js';

router.post('/api_load_all', async function (req, res) {
  const userId = decodeURIComponent(req.body.userId);
  const account_id = decodeURIComponent(req.body.account_id);
  const service_id = decodeURIComponent(req.body.service_id);
  const task = decodeURIComponent(req.body.task);
  const task_type = decodeURIComponent(req.body.task_type);
  try {
    // Проверка наличия email и токена в missions
    if (userId === null) {
      res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
    } else {
      const queryTask = 'INSERT INTO tasks (date_set, id_client, id_account, id_services, operation) VALUES (now(), $1, $2, $3, $4) RETURNING task_number';
      const valuesTask = [userId, account_id, service_id, task];
      const resultTask = await appConfig.poolOperations.query(queryTask, valuesTask);
      valuesTask.number_task = resultTask.rows[0].number_task;

      const queryLog = 'INSERT INTO log_statistic (expense_timestamp, message_type, task_type, id_client, id_account, id_services) VALUES (now(), $1, $2, $3, $4, $5)';
      const valuesLog = ["", task_type, userId, account_id, service_id];
      await appConfig.poolOperations.query(queryLog, valuesLog);

      res.json({ success: true, message: 'Данные успешно сохранены в базе данных', task: valuesTask });
    }
  } catch (error) {
    console.error('Произошла ошибка при сохранении данных в базе данных:', error);
    res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных'});
  }
});
export default router;