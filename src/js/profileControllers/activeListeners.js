import { sendToServer } from "../config.js";

export async function activeListeners (header, requestData, activeItem, url) {
  const checkboxElements = document.querySelectorAll(activeItem);
  // Проходимся по каждому элементу и добавляем обработчик события change
  checkboxElements.forEach((checkbox) => {
    checkbox.addEventListener('click', async function(event) {
      const isChecked = checkbox.checked;
      const siblingValue = checkbox.nextElementSibling.textContent;
      header = {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${authToken}`
      };
      requestData = {
        isChecked: isChecked, // Отправляем состояние флажка
        id: siblingValue // Отправляем id Account
      };
      sendToServer(header, 'POST', url, requestData, (data) => {
        // Обработка успешного результата
        console.log("+");
      }, (data) => {
        // Обработка ошибки
        event.preventDefault();
      });
    });
  });
}