'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

router.post('/update-service-checkbox', async function (req, res) {
  const isChecked = decodeURIComponent(req.body.isChecked);
  const id = parseInt(decodeURIComponent(req.body.id), 10);

  try {
    const updateQuery = 'UPDATE services SET active = $1 WHERE service_id = $2';
    const updateValues = [isChecked, id];
    await appConfig.poolOperations.query(updateQuery, updateValues);

    res.json({ success: true, message: 'Изменения успешно сохранены' });
  } catch (error) {
    console.error('Произошла ошибка при обновлении флажка:', error);
    res.status(500).json({ success: false, message: 'Ошибка при обновлении флажка' });
  }
});
export default router;