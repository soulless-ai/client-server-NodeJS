'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import { getSavedConfirmationCode, deleteSavedConfirmationCode } from '../functions.js';

// Подтверждение кода и сохранение данных пользователя
router.post('/confirm-code', async function (req, res) {
    const code = req.body.verification;
    const email = decodeURIComponent(req.body.email);
  
    try {
      const savedCode = await getSavedConfirmationCode(email);
  
      if (code.toString() === savedCode || code === savedCode) {
        // Коды совпадают, можно удалить код из хранилища
        await deleteSavedConfirmationCode(email);
  
        res.json({ success: true, message: 'Данные пользователя успешно сохранены' });
      } else {
        res.json({ success: false, message: 'Неверный код подтверждения' });
      }
    } catch (error) {
      console.error('Произошла ошибка при проверке кода подтверждения:', error);
      res.json({ success: false, message: 'Ошибка при проверке кода подтверждения' });
    }
});
  
export default router;