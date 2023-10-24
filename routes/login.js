'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import { checkCredentials, createAuthToken } from '../functions.js';
    

// Вход в личный кабинет
router.post('/login', async function (req, res) {
    // Получите введенные пользователем данные для входа из запроса
    const email = decodeURIComponent(req.body.email), 
          password = decodeURIComponent(req.body.password);
          //checker = req.body.checker;
  
    try {
      // Проверьте правильность email и пароля из базы данных
      const result = await checkCredentials(email, password);
  
      if (result.success) {
        // Cоздаём токен аутентификации и отправляем его клиенту (запомнить меня)
        // if (checker) {
        //   const token = createAuthToken(email);
        //   res.json({ success: true, message: 'Вход выполнен успешно', token: token });
        // } else {
        //   res.json({ success: true, message: 'Вход выполнен успешно', email: encodeURIComponent(email) });
        // }
        
        const token = createAuthToken(email);
        const userId = result.userId;
        res.json({ success: true, message: 'Вход выполнен успешно', token: token, userId: userId });
      } else {
        // Неправильные данные
        res.json({ success: false, message: 'Неверные данные для входа' });
      }
    } catch (error) {
      console.error('Произошла ошибка при проверке учетных данных:', error);
      res.json({ success: false, message: 'Ошибка при проверке учетных данных' });
    }
});
export default router;