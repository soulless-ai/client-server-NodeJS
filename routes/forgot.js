'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';
import { generateConfirmationCode, saveConfirmationCode, sendConfirmationCodeByEmail, 
  getSavedConfirmationCode, deleteSavedConfirmationCode } from '../functions.js';

// Забыли пароль
router.post('/forgot', async function (req, res) {
    // Получите введенные пользователем данные для входа из запроса
    const email = decodeURIComponent(req.body.emailForgot);
  
    try {
      // Генерируйте случайный код подтверждения
      const confirmationCode = await generateConfirmationCode();
  
      // Сохраните код подтверждения и связанный с ним email в базе данных
      saveConfirmationCode(email, confirmationCode);
  
      // Отправьте код подтверждения на email
      await sendConfirmationCodeByEmail(email, confirmationCode);
  
      res.json({ success: true, message: 'Код подтверждения отправлен на указанный email' });
    } catch (error) {
      console.error('Произошла ошибка:', error);
      res.status(500).json({ success: false, message: 'Возникла ошибка при отправке кода подтверждения' });
    }
});
router.post('/forgot-ver', async function (req, res) {
    const code = req.body.verificationForgot;
    const email = decodeURIComponent(req.body.emailForgot);
  
    try {
      const savedCode = await getSavedConfirmationCode(email);
  
      if (code === savedCode) {
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
router.post('/forgot-new-password', async function (req, res) {
    const email = decodeURIComponent(req.body.emailForgot);
    const password = decodeURIComponent(req.body.changePasswordForgot);

    try {
      // Хэширование пароля
      const hashedPassword = await appConfig.bcrypt.hash(password, 10);
      // Старый пароль верен, выполнить обновление пароля
      const updateQuery = 'UPDATE clients SET password = $1 WHERE email = $2';
      const updateValues = [hashedPassword, email];
      await appConfig.pool.query(updateQuery, updateValues);
      res.json({ success: true, message: 'Данные успешно сохранены в базе данных'});
    } catch (error) {
      console.error('Произошла ошибка при сохранении данных в базе данных:', error);
      res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных' });
    }
});
export default router;