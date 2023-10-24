'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import { getUserData, verifyAuthToken } from '../functions.js';

router.post('/remember', async (req, res) => {
    const authToken = req.headers.authorization.split(' ')[1];
    
    if (!authToken) {
      return res.json({ success: false, message: 'Отсутствует токен авторизации' });
    }
    
    try {
      const userData = await getUserData(await verifyAuthToken(authToken));
      res.json({ success: true, userData: userData});
    } catch (error) {
      res.json({ success: false, message: 'Недействительный токен авторизации' });
    }
});
export default router;