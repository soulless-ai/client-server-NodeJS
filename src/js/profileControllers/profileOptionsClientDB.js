import { sendToServer } from "../config.js";

// Отправка индивидуального токена пользователя на сервер и получение данных.
export function getClientDbInfo(userId, header, requestData) {
    const nameElements = document.querySelectorAll(".profile-db-name");
    const usernameElements = document.querySelectorAll(".profile-db-username");
    const passwordElements = document.querySelectorAll(".profile-db-password");
    if (userId) {
        header = {
            'Content-Type': 'application/json'
        };
        requestData = { userId: encodeURIComponent(userId) };
        sendToServer(header, 'POST', '/get-profile-db-info', requestData, (data) => {
            // Обработка успешного результата
            const clientData = data.data;

            nameElements?.forEach(element => { element.textContent = clientData.db_name; });
            usernameElements?.forEach(element => { element.textContent = clientData.db_username; });
            passwordElements?.forEach(element => { element.textContent = clientData.db_password; });
        }, (data) => {
            
        });
    } else {
    }
}