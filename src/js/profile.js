import { showHiddenElement } from "./config.js";

const authToken = localStorage.getItem('authToken');
const userEmail = localStorage.getItem('userEmail');
const userId = localStorage.getItem('userId');
let header, requestData;
$crisp.push(["safe", true]);

// Покупка пакета

// Находим кнопку "Приобрести" по её ID и добавляем обработчик события click
const purchaseButton = document.getElementById('main_button');
purchaseButton.addEventListener('click', (event) => {
  event.preventDefault(); // Отменяем переход по ссылке, если это ссылка

  // Находим все элементы <h2> с классом "block-for-active"
  const priceElements = document.querySelectorAll('.block-for-active');

  // Найдем выбранную цену
  let selectedPrice;
  priceElements.forEach((priceElement) => {
    if (priceElement.classList.contains('active')) {
      selectedPrice = priceElement.textContent.trim();
    }
  });
  selectedPrice;  // Выбранная цена пакета
});

const homeButton = document.getElementById('home-button');
const settingsButton = document.getElementById('settings-button');
const quitButton = document.getElementById('quit-button');

const buyButton = document.querySelector('.buy-button');
const buyButtonBack = document.querySelector('.buy-button-back');
const buyText = document.querySelector('.menu-section-data-info-item-payment');
const homeSection = document.getElementById('main-profile-section');
const optionSection = document.getElementById('options-section');
const serviceSection = document.getElementById('service-section');
homeButton.parentElement.style.backgroundColor = "#FFF";
homeButton.addEventListener("click", (event) => {
  homeButton.parentElement.style.backgroundColor = "#FFF";
  settingsButton.parentElement.style.backgroundColor = "#000";
  if (optionSection) showHiddenElement(event, null, optionSection);
  if (serviceSection) showHiddenElement(event, null, serviceSection);
  showHiddenElement(event, homeSection, null);
});
settingsButton.addEventListener("click", (event) => { 
  homeButton.parentElement.style.backgroundColor = "#000";
  settingsButton.parentElement.style.backgroundColor = "#FFF";
  if (homeSection) showHiddenElement(event, null, homeSection);
  if (serviceSection) showHiddenElement(event, null, serviceSection);
  showHiddenElement(event, optionSection, null);
});
buyButton.addEventListener('click', (event) => {
  homeButton.parentElement.style.backgroundColor = "#000";
  settingsButton.parentElement.style.backgroundColor = "#000";
  if (optionSection) showHiddenElement(event, null, optionSection);
  if (homeSection) showHiddenElement(event, null, homeSection);
  showHiddenElement(event, serviceSection, null);
});
buyButtonBack.addEventListener('click', (event) => {
  homeButton.parentElement.style.backgroundColor = "#000";
  settingsButton.parentElement.style.backgroundColor = "#000";
  if (optionSection) showHiddenElement(event, null, optionSection);
  if (homeSection) showHiddenElement(event, null, homeSection);
  showHiddenElement(event, serviceSection, null); 
});
buyText.addEventListener('click', (event) => {
  homeButton.parentElement.style.backgroundColor = "#000";
  settingsButton.parentElement.style.backgroundColor = "#000";
  if (optionSection) showHiddenElement(event, null, optionSection);
  if (homeSection) showHiddenElement(event, null, homeSection);
  showHiddenElement(event, serviceSection, null); 
});

const closedDoor = document.querySelector('.closed-door');
const openDoor = document.querySelector('.open-door');
quitButton.addEventListener('mouseenter', () => {
  closedDoor.style.opacity = 0; /* При наведении на закрытую дверь, делаем её непрозрачной */
  openDoor.style.opacity = 1; /* При наведении на закрытую дверь, делаем открытую дверь видимой */
});

quitButton.addEventListener('mouseleave', () => {
  closedDoor.style.opacity = 1; /* При уходе курсора, делаем закрытую дверь видимой */
  openDoor.style.opacity = 0; /* При уходе курсора, скрываем открытую дверь */
});

const quitVerSection = document.getElementById('quit-verification-section');
quitButton.addEventListener('click', () => {
  quitVerSection.classList.remove('hidden');
});
const quit = document.getElementById('quit');
quit.addEventListener('click', () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  window.location.href = "../index.html";
});
const cancelQuitButton = document.getElementById('cancel-quit');
cancelQuitButton.addEventListener('click', () => {
  quitVerSection.classList.add('hidden');
});

quitVerSection.addEventListener('click', () => {
  quitVerSection.classList.add('hidden');
});

// Создаем стиль
const hoverStyle = `
  .menu-section-data-info-item-payment::after {
    width: 100%;
    left: 0;
    right: auto;
  }

  .menu-section-data-info-item-payment:hover {
    color: #ffffff !important;
  }
`;
// Создаем элемент style и добавляем стили в него
const hoverStyleElement = document.createElement('style');
hoverStyleElement.textContent = hoverStyle;

// Создаем стиль
const unhoverStyle = `
  .menu-section-data-info-item-payment::after {
    width: 0;
    left: auto;
    right: 0;
  }

  .menu-section-data-info-item-payment:hover {
    color: #FD6A02 !important;
  }
`;
// Создаем элемент style и добавляем стили в него
const unhoverStyleElement = document.createElement('style');
unhoverStyleElement.textContent = unhoverStyle;

buyButton.addEventListener('mouseover', () => {
	buyButton.style.fill = '#FD6A02';
	buyButtonBack.style.fill = '#713200';
  buyText.appendChild(hoverStyleElement);
});
buyButton.addEventListener('mouseout', () => {
	buyButton.style.fill = 'white';
	buyButtonBack.style.fill = 'gray';
  buyText.appendChild(unhoverStyleElement);
});

buyButtonBack.addEventListener('mouseover', () => {
	buyButton.style.fill = '#FD6A02';
	buyButtonBack.style.fill = '#713200';
  buyText.appendChild(hoverStyleElement);
});
buyButtonBack.addEventListener('mouseout', () => {
	buyButton.style.fill = 'white';
	buyButtonBack.style.fill = 'gray';
  buyText.appendChild(unhoverStyleElement);
});

buyText.addEventListener('mouseover', () => {
	buyButton.style.fill = '#FD6A02';
	buyButtonBack.style.fill = '#713200';
  buyText.appendChild(hoverStyleElement);
});
buyText.addEventListener('mouseout', () => {
	buyButton.style.fill = 'white';
	buyButtonBack.style.fill = 'gray';
  buyText.appendChild(unhoverStyleElement);
});

import { getProfileData } from "./profileControllers/getProfileData.js";
import { profileOptions } from "./profileControllers/profileOptions.js";
import { getClientDbInfo } from "./profileControllers/profileOptionsClientDB.js";

import { getAccountsList } from "./profileControllers/getAccountsList.js";
import { getMissionsList } from "./profileControllers/getMissionsList.js";

import { addAccount } from "./profileControllers/addAccount.js";

getProfileData(authToken, userEmail, header, requestData);
profileOptions(authToken, userEmail, header, requestData);
getClientDbInfo(userId, header, requestData);
getAccountsList(userId, header, requestData);
getMissionsList(userId, header, requestData);

addAccount(userId, header, requestData);