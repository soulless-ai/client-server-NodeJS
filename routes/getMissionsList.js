import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

router.post('/get-missions-list', async function (req, res) {
  const userId = decodeURIComponent(req.body.userId);
  try {
    if (userId === null) {
      res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
    } else {
      const queryMissions = 'SELECT expense_timestamp, message_type, task_type, id_account, id_services, operation_count, message FROM log_statistic WHERE id_client = $1  ORDER BY expense_timestamp ASC;';
      const valuesMissions = [userId];
      const resultMissions = await appConfig.poolOperations.query(queryMissions, valuesMissions);

      const queryAccount = 'SELECT id, account_name FROM accounts WHERE client_id = $1';
      const valuesAccount = [userId];
      const resultAccount = await appConfig.poolOperations.query(queryAccount, valuesAccount);

      const missions = resultMissions.rows.map(async row => {
        const associatedAccount = resultAccount.rows.find(account => account.id == row.id_account);
      
        const queryService = 'SELECT service_name FROM services WHERE service_id = $1 AND account_id = $2';
        const valuesService = [row.id_services, associatedAccount.id];
      
        const resultService = await appConfig.poolOperations.query(queryService, valuesService);
        return {
          account: associatedAccount,
          service_name: resultService.rows[0].service_name,
          message_type: row.message_type,
          task_type: row.task_type,
          operation: row.operation_count,
          db_message: row.message,
          time: appConfig.moment(row.expense_timestamp).format("YYYY.MM.DD"),
        };
      });
      
      Promise.all(missions).then(completedMissions => {
        res.json({ success: true, message: 'Данные успешно получены из базы данных', missions: completedMissions });
      });
    }
  } catch (error) {
    console.error('Произошла ошибка при получении данных из базы данных:', error);
    res.json({ success: false, message: 'Ошибка при получении данных из базы данных' });

  }
});
export default router;
