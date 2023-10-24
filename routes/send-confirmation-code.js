'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import { checkIfEmailExists, generateConfirmationCode, saveConfirmationCode, deleteOldConfirmatioCodes, sendConfirmationCodeByEmail } from '../functions.js';

// Генерация и отправка кода подтверждения на email
router.post('/send-confirmation-code', async function (req, res) {
  // Получите email из запроса
  const email = decodeURIComponent(req.body.email);
    
  try {
    // Проверьте, зарегистрирована ли уже указанная почта
    const emailExists = await checkIfEmailExists(email);
    
    if (emailExists) {
      
    console.log("this");
      // Если почта уже зарегистрирована, отправьте сообщение клиенту
      return res.json({ success: false, message: 'Данный email уже зарегистрирован' });
    }

    // Генерируйте случайный код подтверждения
    const confirmationCode = await generateConfirmationCode();

    deleteOldConfirmatioCodes();
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


export default router;