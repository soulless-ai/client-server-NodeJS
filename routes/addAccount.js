'use strict';
import { Router } from 'express';
const router = Router();

// Импортируем функции и объект app из server.js
import appConfig from '../server.js';

// Добавление аккаунта
router.post('/addAccount', async function (req, res) {
    const accountType = req.body.accountType,
          accountName = req.body.accountName,
          code1 = req.body.code1,
          code2 = req.body.code2,
          active = false,
          serverTime = appConfig.moment(),
          userId = decodeURIComponent(req.body.userId);
    try {
      // Проверка наличия email и токена в missions
      if (userId === null) {
        res.json({ success: false, message: 'Запрос не авторизован. Пожалуйста, авторизуйтесь.' });
      } else {
        const queryAccounts = 'INSERT INTO accounts (client_id, account_type, code_1, code_2, active, account_name, date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
        const valuesAccounts = [userId, accountType, code1, code2, active, accountName, serverTime];

        const resultAccounts = await appConfig.poolOperations.query(queryAccounts, valuesAccounts);
        const insertedAccountId = resultAccounts.rows[0].id;

        // Корректировка времени на основе временной зоны клиента
        const clientTime = serverTime.format("YYYY.MM.DD");

        let servicesData;
        if (accountType === "Тип 1") {
          const typeNumber = parseInt(accountType.split(" ")[1]);
          servicesData = [
            [insertedAccountId, "Тип " + (typeNumber + 0.1), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 1"],
            [insertedAccountId, "Тип " + (typeNumber + 0.2), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 2"],
            [insertedAccountId, "Тип " + (typeNumber + 0.3), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 3"],
            [insertedAccountId, "Тип " + (typeNumber + 0.4), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 4"],
            [insertedAccountId, "Тип " + (typeNumber + 0.5), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 5"],
            // Добавьте другие сервисы, которые необходимо добавить, в формате [accountId, serviceType, isActive]
          ];
        } else {
          const typeNumber = parseInt(accountType.split(" ")[1]);
          servicesData = [
            [insertedAccountId, "Тип " + (typeNumber + 0.1), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 1"],
            [insertedAccountId, "Тип " + (typeNumber + 0.2), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 2"],
            [insertedAccountId, "Тип " + (typeNumber + 0.3), true, appConfig.moment().format("YYYY.MM.DD"), "Услуга 3"],
            // Добавьте другие сервисы, которые необходимо добавить, в формате [accountId, serviceType, isActive]
          ];
        }

        let insertedIds = [];

        for (const data of servicesData) {
          const queryServices = 'INSERT INTO services (account_id, service_type, active, date, service_name) VALUES ($1, $2, $3, $4, $5) RETURNING service_id';
          const result = await appConfig.poolOperations.query(queryServices, data);
          const insertedId = result.rows[0].service_id;
          insertedIds.push(insertedId);
        }

        // Добавление полученных идентификаторов к servicesData
        servicesData.forEach((data, index) => {
          data.push(insertedIds[index]);
        });

        res.json({ success: true, message: 'Данные успешно сохранены в базе данных', id: insertedAccountId, date: clientTime, servicesData: servicesData });
      }
    } catch (error) {
      console.error('Произошла ошибка при сохранении данных в базе данных:', error);
      res.json({ success: false, message: 'Ошибка при сохранении данных в базе данных'});
    }
});
export default router;