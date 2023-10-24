'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

router.post('/get-accounts-list', async function (req, res) {
  const userId = decodeURIComponent(req.body.userId);

  try {
    if (userId === null) {
      res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
    } else {
      // Выполнение запроса SELECT для поиска всех строк, связанных с указанным email-адресом
      const query = 'SELECT id, account_type, code_1, code_2, active, account_name, date FROM accounts WHERE client_id = $1 ORDER BY id ASC;';
      const values = [userId];
      const result = await appConfig.poolOperations.query(query, values);

      // Создание массива объектов данных из результата запроса
      const accountsList = result.rows.map(row => ({
        id: row.id,
        account_type: row.account_type,
        code_1: row.code_1,
        code_2: row.code_2,
        active: row.active,
        account_name: row.account_name,
        date: appConfig.moment(row.date).format("YYYY.MM.DD")
      }));
      const queryService = 'SELECT service_id, service_type, active, date, service_name FROM services WHERE account_id = $1 ORDER BY service_id ASC;';
      const servicesList = [];

      for (const account of accountsList) {
        const valuesService = [account.id];
        const resultService = await appConfig.poolOperations.query(queryService, valuesService);
        const accountServices = resultService.rows.map(row => ({
          account_id: [account.id],
          service_id: row.service_id,
          service_type: row.service_type,
          active: row.active,
          date: appConfig.moment(row.date).format("YYYY.MM.DD"),
          service_name: row.service_name
        }));
        servicesList.push(accountServices);
      }

      res.json({ success: true, message: 'Данные успешно получены из базы данных', accounts: accountsList, services: servicesList })
    }
  } catch (error) {
    console.error('Произошла ошибка при получении данных из базы данных:', error);
    res.json({ success: false, message: 'Ошибка при получении данных из базы данных' });
  }
});
export default router;