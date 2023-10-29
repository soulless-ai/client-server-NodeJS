import { sendToServer, showHiddenElement } from "../config.js";
import { activeListeners } from "./activeListeners.js";
import { accountMenuListener, serviceMenuListener } from "./menuListeners.js";

export function addAccount(userId, header, requestData) {
    const addAccountButton = document.getElementById("addAccountButton");
    const addAccountForm = document.getElementById("addAccountForm");
    const addAccountSubmit = document.getElementById("addAccountSubmit");

    if (addAccountButton) {
        addAccountButton.addEventListener('click', (event) => {
            showHiddenElement(event, addAccountForm, null);
            checkAccountType();
        });
    }

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.form-container') && addAccountForm) {
            showHiddenElement(event, null, addAccountForm);
        }
    });

    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    const code2Group = document.getElementById('code2-group');

    function checkAccountType() {
        const displayStyle = accountTypeRadios[1].checked ? 'block' : 'none';

        for (const childNode of code2Group.childNodes) {
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                childNode.style.display = displayStyle;
            }
        }
    }

    for (const radio of accountTypeRadios) {
        radio.addEventListener('change', checkAccountType);
    }

    const formElements = ['accountName', 'code1', 'code2'];
    const labels = ['Тип 1', 'Тип 2'];

    if (addAccountSubmit) {
        addAccountSubmit.addEventListener('click', async (event) => {
            event.preventDefault();
            const accountsCounter = parseInt(localStorage.getItem('accountsCounter'), 10) || 0;

            if (accountTypeRadios[0].checked || (accountTypeRadios[1].checked && addAccountForm.accountName.value && addAccountForm.code1.value)) {
                header = {
                    'Content-Type': 'application/json'
                };
                requestData = {
                    accountType: labels[accountTypeRadios[1].checked ? 1 : 0],
                    accountName: addAccountForm.accountName.value,
                    code1: addAccountForm.code1.value,
                    code2: addAccountForm.code2?.value || null,
                    timezone: -new Date().getTimezoneOffset(),
                    userId: encodeURIComponent(userId)
                };

                sendToServer(header, 'POST', '/addAccount', requestData, (data) => {
                    showHiddenElement(event, null, addAccountForm);
                    const listIds = ['accountsNoList', 'accountsNameList', 'accountsNumberList', 'accountsTypeList', 'accountsUseOperationList', 'accountsUpdateDateList', 'accountsActiveList', 'accountsMenuList'];

                    listIds.forEach((id, index) => {
                        const list = document.getElementById(id);
                        const listItem = document.createElement('li');
                        listItem.textContent = (index === 0) ? accountsCounter : (index === 3) ? labels[accountTypeRadios[1].checked ? 1 : 0] : data[Object.keys(data)[index]];
                        list.appendChild(listItem);
                    });

                    // Остальная логика здесь
                    data.servicesData.forEach((service) => {
                        accountsCounter += 0.1;

                        listIds.forEach((id, index) => {
                            const list = document.getElementById(id);
                            const listItem = document.createElement('li');

                            if (index === 0) {
                                listItem.textContent = accountsCounter.toFixed(1);
                            } else if (index === 3) {
                                listItem.textContent = service[1];
                            } else if (index === 6) {
                                const activeInput = document.createElement('input');
                                activeInput.classList.add((service[2] ? 'item-checkbox-services' : 'item-checkbox-accounts'));
                                activeInput.type = 'checkbox';
                                activeInput.checked = service[2];
                                listItem.appendChild(activeInput);
                            } else {
                                listItem.textContent = service[index - 1];
                            }

                            list.appendChild(listItem);
                        });

                        const menuString = document.createElement('li');
                        const menuButton = document.createElement('a');
                        const menuAccountSerial = document.createElement('p');
                        menuButton.classList.add((index === 7) ? 'accountsMenuButtonService' : 'accountsMenuButton');
                        menuButton.textContent = (index === 7) ? '▼' : '🖋️';
                        menuAccountSerial.classList.add('hidden');
                        menuAccountSerial.textContent = data.id;
                        menuString.appendChild(menuButton);
                        menuString.appendChild(menuAccountSerial);
                        accountsMenuList.appendChild(menuString);

                        if (index === 7) {
                            serviceMenuListener(userId, header, requestData, menuButton, data.id, data.servicesData[5]);
                        }
                    });

                    activeListeners(header, requestData, (index === 7) ? '.item-checkbox-services' : '.item-checkbox-accounts', (index === 7) ? '/update-service-checkbox' : '/update-account-checkbox');
                    accountMenuListener(userId, header, requestData);
                    localStorage.setItem('accountsCounter', accountsCounter.toString());
                }, (data) => {
                    // Обработка ошибки
                    addAccountSubmit.style.backgroundColor = '#8f0a30';
                    console.log(data);
                });
            } else {
                addAccountSubmit.style.backgroundColor = '#8f0a30';
            }
        });
    }
}