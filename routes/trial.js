'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

// Заявления
router.post('/trial', async (req, res) => {
    const nameTrial = decodeURIComponent(req.body.nameTrial);
    const numberTrial = decodeURIComponent(req.body.numberTrial);
    const emailTrial = decodeURIComponent(req.body.emailTrial);

    try {
      const query = 'INSERT INTO trial_messages (trial_name, trial_number, trial_email, trial_now) VALUES ($1, $2, $3, NOW())';
      const values = [nameTrial, numberTrial, emailTrial];
  
      await appConfig.pool.query(query, values);
      res.json({ success: true, message: 'Данные успешно сохранены в базе данных'});
    } catch (error) {
      console.error('Произошла ошибка при сохранении данных в базе данных:', error);
      res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных' });
    }
});
export default router;