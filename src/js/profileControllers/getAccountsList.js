import { sendToServer } from "../config.js";
import { activeListeners } from "./activeListeners.js";
import { accountMenuListener, serviceMenuListener } from "./menuListeners.js";

export async function getAccountsList(userId, header, requestData) {
    header = {
        'Content-Type': 'application/json'
    };
    requestData = { userId: encodeURIComponent(userId) };

    const accountsCounter = 1;
    const accountsNoList = document.getElementById("accountsNoList");
    const accountsNameList = document.getElementById("accountsNameList");
    const accountsNumberList = document.getElementById("accountsNumberList");
    const accountsTypeList = document.getElementById("accountsTypeList");
    const accountsUseOperationList = document.getElementById("accountsUseOperationList");
    const accountsUpdateDateList = document.getElementById("accountsUpdateDateList");
    const accountsActiveList = document.getElementById("accountsActiveList");
    const accountsMenuList = document.getElementById("accountsMenuList");

    sendToServer(header, 'POST', '/get-accounts-list', requestData, (data) => {
        const { accounts, services } = data;

        accounts.forEach((account, index) => {
            appendAccountDetails(account, index, services);
        });

        activeListeners(header, requestData, '.item-checkbox-accounts', '/update-account-checkbox');
        activeListeners(header, requestData, '.item-checkbox-services', '/update-service-checkbox');
        accountMenuListener(userId, header, requestData);
        localStorage.setItem('accountsCounter', accountsCounter + accounts.length);
    }, (data) => {
        // Обработка ошибки
    });

    function appendAccountDetails(account, index, services) {
        const formattedG = (index + accountsCounter).toFixed(1);

        appendToList(accountsNoList, formattedG);
        appendToList(accountsNameList, account.account_name);
        appendToList(accountsNumberList, account.id);
        appendToList(accountsTypeList, account.account_type);
        appendToList(accountsUseOperationList, "0");
        appendToList(accountsUpdateDateList, " ");
        appendActiveItemToAccountList(account);
        appendMenuButtonToAccountList(account);

        if (services[index]) {
            services[index].forEach((service) => {
                formattedG += 0.1;
                appendToList(accountsNoList, formattedG);
                appendToList(accountsNameList, service.service_name);
                appendToList(accountsNumberList, service.service_id);
                appendToList(accountsTypeList, service.service_type);
                appendToList(accountsUseOperationList, "0");
                appendToList(accountsUpdateDateList, service.date);
                appendActiveItemToServiceList(service);
                appendMenuButtonToServiceList(service, account.id, service.service_id);
            });
        }
    }

    function appendToList(list, text) {
        const listItem = document.createElement('li');
        listItem.textContent = text;
        list.appendChild(listItem);
    }

    function appendActiveItemToAccountList(account) {
        const listItem = document.createElement('li');
        const activeInput = createCheckboxInput('item-checkbox-accounts', account.active, account.id);
        listItem.appendChild(activeInput);
        accountsActiveList.appendChild(listItem);
    }

    function appendActiveItemToServiceList(service) {
        const listItem = document.createElement('li');
        const activeInput = createCheckboxInput('item-checkbox-services', service.active, service.service_id);
        listItem.appendChild(activeInput);
        accountsActiveList.appendChild(listItem);
    }

    function createCheckboxInput(className, checked, serial) {
        const input = document.createElement('input');
        input.classList.add(className);
        input.type = 'checkbox';
        input.checked = checked;
        input.dataset.serial = serial;
        return input;
    }

    function appendMenuButtonToAccountList(account) {
        const listItem = document.createElement('li');
        listItem.appendChild(createMenuButton('🖋️', account.id));
        accountsMenuList.appendChild(listItem);
    }

    function appendMenuButtonToServiceList(service, accountId, serviceId) {
        const listItem = document.createElement('li');
        listItem.appendChild(createMenuButton('▼', service.service_id));
        accountsMenuList.appendChild(listItem);
        serviceMenuListener(userId, header, requestData, listItem.firstChild, accountId, serviceId);
    }

    function createMenuButton(text, serial) {
        const button = document.createElement('a');
        button.classList.add('accountsMenuButton');
        button.textContent = text;
        button.dataset.serial = serial; 
        return button;
    }
}