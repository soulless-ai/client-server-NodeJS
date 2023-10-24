'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

router.post('/update-account-checkbox', async function (req, res) {
  
  console.log("THISS");
  const isChecked = decodeURIComponent(req.body.isChecked);
  const id = parseInt(decodeURIComponent(req.body.id), 10);

  try {
    const updateQuery = 'UPDATE accounts SET active = $1 WHERE id = $2';
    const updateValues = [isChecked, id];
    await appConfig.poolOperations.query(updateQuery, updateValues);

    res.json({ success: true, message: 'Изменения успешно сохранены' });
  } catch (error) {
    console.error('Произошла ошибка при обновлении флажка:', error);
    res.status(500).json({ success: false, message: 'Ошибка при обновлении флажка' });
  }
});

router.post('/update-account-name', async function (req, res) {
    const newAccountName = req.body.newAccountName;
    const id = req.body.id;
  
    try {
      // Старый пароль верен, выполнить обновление пароля
      const updateQuery = 'UPDATE accounts SET account_name = $1 WHERE id = $2';
      const updateValues = [newAccountName, id];
      await appConfig.poolOperations.query(updateQuery, updateValues);

      res.json({ success: true, message: 'Изменения успешно сохранены' });
    } catch (error) {
      console.error('Произошла ошибка при обновлении названия:', error);
      res.status(500).json({ success: false, message: 'Ошибка при обновлении названия' });
    }
});
export default router;