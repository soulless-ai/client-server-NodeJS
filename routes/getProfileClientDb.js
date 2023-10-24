'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции
import { getUserDataBaseInfo } from '../functions.js';

// Отправка данных клиенту
router.post('/get-profile-db-info', async (req, res) => {
  try {
    const userId = decodeURIComponent(req.body.userId);

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Не предоставлен идентификатор пользователя.' });
    }

    const userData = await getUserDataBaseInfo(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден.' });
    }

    res.json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Произошла ошибка при получении данных.' });
  }
});

export default router;