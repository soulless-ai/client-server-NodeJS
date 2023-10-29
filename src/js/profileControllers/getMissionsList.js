import { sendToServer } from "../config.js";

export async function getMissionsList (userId, header, requestData) {
    // Получение ссылки на элемент <ul>
    const missionNoList = document.getElementById("missionNoList");
    const accountList = document.getElementById("missionsAccountNameList");
    const serviceList = document.getElementById("missionsServiceNameList");
    const missionList = document.getElementById("missionsNameList");
    const missionDateList = document.getElementById("missionsDateList");
    const missionStatusList = document.getElementById("missionsStatusList");
    const missionOperationList = document.getElementById("missionsOperationList");
    header = {
        'Content-Type': 'application/json'
    };
    requestData = { userId: encodeURIComponent(userId) };

    sendToServer(header, 'POST', '/get-missions-list', requestData, (data) => {
        const missions = data.missions;
        missions.forEach((mission, index = 1) => {
            const missionNoString = document.createElement('li');
            missionNoString.textContent = index++;
            missionNoList.appendChild(missionNoString);
            
            const accountNameString = document.createElement('li');
            accountNameString.textContent = mission.account.account_name;
            accountList.appendChild(accountNameString);
            
            const serviceString = document.createElement('li');
            serviceString.textContent = mission.service_name;
            serviceList.appendChild(serviceString);
            
            const missionString = document.createElement('li');
            missionString.textContent = mission.task_type;
            missionList.appendChild(missionString);
            
            const missionDateString = document.createElement('li');
            missionDateString.textContent = mission.time;
            missionDateList.appendChild(missionDateString);
            
            const missionStatusString = document.createElement('li');
            missionStatusString.innerHTML = "&nbsp;";
            missionStatusList.appendChild(missionStatusString);
            
            const missionOperationsString = document.createElement('li');
            missionOperationsString.innerHTML = "&nbsp;";
            missionOperationList.appendChild(missionOperationsString);
        });
    }, (data) => {
        // Обработка ошибки
    });
}