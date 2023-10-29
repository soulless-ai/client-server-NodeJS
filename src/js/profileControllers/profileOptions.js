import { sendToServer, showHiddenElement } from "../config.js";

// Настройки профилья
export function profileOptions (authToken, userEmail, header, requestData) {
    const change_data_form = document.getElementById('change_data_form');
    const change_password_form = document.getElementById('change_password_form');

    const submit_data = document.getElementById('submit_data');
    if (submit_data) {
        submit_data.addEventListener('click', async function(event) {
            event.preventDefault();
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
            requestData.userEmail = encodeURIComponent(userEmail);
        
            if (change_data_form.change_name.value) requestData.change_name = encodeURIComponent(change_data_form.change_name.value);
            else requestData.change_name = null
            
            if (change_data_form.change_second_name.value) requestData.change_second_name = encodeURIComponent(change_data_form.change_second_name.value);
            else requestData.change_second_name = null
            
            if (change_data_form.change_phone.value) requestData.change_phone = encodeURIComponent(change_data_form.change_phone.value);
            else requestData.change_phone = null
            
            if (change_data_form.change_email.value) requestData.change_email = encodeURIComponent(change_data_form.change_email.value);
            else requestData.change_email = null

            if (!authToken) requestData.identify = encodeURIComponent(userEmail);
            sendToServer(header, 'POST', '/send-changes', requestData, (data) => {
                // Обработка успешного результата
                location.reload();
            }, (data) => {
                // Обработка ошибки
            });
        });
    }

    const submit_password = document.getElementById('submit_password');
    if (submit_password) {
        submit_password.addEventListener('click', async function(event) {
            event.preventDefault();
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
            requestData.userEmail = encodeURIComponent(userEmail);
        
            if (change_password_form.old_password.value) requestData.old_password = encodeURIComponent(change_password_form.old_password.value);
            if (change_password_form.new_password.value) requestData.new_password = encodeURIComponent(change_password_form.new_password.value);
            sendToServer(header, 'POST', '/send-change-password', requestData, (data) => {
                // Обработка успешного результата
                location.reload();
            }, (data) => {
                // Обработка ошибки
                });
        });
    }

    const change_password_button = document.getElementById('change_password_button');
    if (change_password_button) {
        change_password_button.addEventListener('click', async function(event) {
            event.preventDefault();
            showHiddenElement(event, change_password_form, change_data_form);
        });
    }
    const backTo = document.getElementById('backTo');
    if (backTo) {
        backTo.addEventListener('click', async function(event) {
            event.preventDefault();
            showHiddenElement(event, change_data_form, change_password_form);
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const blockForFly = document.querySelectorAll('.block-for-fly');
        blockForFly.forEach(block => {
            const input = block.querySelector('input');
            const flyElement = block.querySelector('.fly');

            input.addEventListener("input", () => {
            if (input.value.trim() === "") {
                flyElement.classList.remove("active");
            } else {
                flyElement.classList.add("active");
            }
            });
        });
    });
}