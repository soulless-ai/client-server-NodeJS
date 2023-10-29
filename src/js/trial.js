import { sendToServer } from "./config.js";

let header, requestData;
// Список форм.
const mainTrialForm = document.getElementById('main_trial_form');

const submitTrial = document.getElementById('submitTrial');
if (submitTrial) {
    submitTrial.addEventListener('click', async function(event) {
        if (mainTrialForm.emailIn.value && mainTrialForm.passwordIn.value) {
            header = {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer <token>'
            };

            requestData = {
                nameTrial: encodeURIComponent(mainTrialForm.nameTrial.value),
                numberTrial: encodeURIComponent(mainTrialForm.numberTrial.value),
                emailTrial: encodeURIComponent(mainTrialForm.emailTrial.value)
            };

            sendToServer(header, 'POST', '/trial', requestData, (data) => {
                // Обработка успешного результата
                document.querySelector(".section-3-style").style.backgroundColor = "#004312";
            }, (data) => {
                // Обработка ошибки
                document.querySelector(".section-3-style").style.backgroundColor = "#5b000c";
                let delay = 500;
                function changeColorsBack() {
                    document.querySelector(".section-3-style").style.backgroundColor = '#000';
                }
                setTimeout(changeColorsBack, delay);
            });
        } else {
            document.querySelector(".section-3-style").style.backgroundColor = "#5b000c";
            let delay = 500;
            function changeColorsBack() {
                document.querySelector(".section-3-style").style.backgroundColor = '#000';
            }
            setTimeout(changeColorsBack, delay);
        }
    });
}