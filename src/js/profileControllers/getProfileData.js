import { sendToServer } from "../config.js";

// Отправка индивидуального токена пользователя на сервер и получение данных.
export function getProfileData (authToken, userEmail, header, requestData) {
    const nameElements = document.querySelectorAll(".profile-name");
    const secondNameElements = document.querySelectorAll(".profile-second-name");
    const emailElements = document.querySelectorAll(".profile-email");
    const phoneElements = document.querySelectorAll(".profile-phone");
    const operationsQuantityTotalElements = document.querySelectorAll(".package-rest");
    if (authToken || userEmail) {
        if (authToken) {
            header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
            };
        } else {
            header = {
            'Content-Type': 'application/json'
            };
        }
        requestData = { userEmail: encodeURIComponent(userEmail) };
        sendToServer(header, 'POST', '/get-profile-data', requestData, (data) => {
            // Обработка успешного результата
            const clientData = data.data;

            nameElements?.forEach(element => { element.textContent = clientData.name; });
            secondNameElements?.forEach(element => { element.textContent = clientData.second_name; });
            emailElements?.forEach(element => { element.textContent = clientData.email; });
            phoneElements?.forEach(element => { element.textContent = clientData.phone; });
            operationsQuantityTotalElements?.forEach((element, index) => {
                let value = clientData.operationsQuantityTotal;
                for (let i = 0; i < 10; i++) {
                    value = value.toLocaleString();
                }
                element.textContent = value;
            });
        }, (data) => {
            window.location.href = "../../index.html";
        });
    } else {
        window.location.href = "../../index.html";
    }
}