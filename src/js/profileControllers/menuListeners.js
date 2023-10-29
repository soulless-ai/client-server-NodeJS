import { sendToServer, showHiddenElement } from "../config.js";

export async function accountMenuListener(userId, header, requestData) {
    const accountsMenuButtonsAccount = document.querySelectorAll('.accountsMenuButton');
    // Проходимся по каждому элементу и добавляем обработчик события click
    function accountMenuButtonClick(event, button) {
      event.stopPropagation();

      const accountSerial = button.previousElementSibling.textContent;
      // Удалить существующие input и h6 элементы, если они есть
      const existingInput = document.querySelector('input.dynamic-input');
      const existingH6 = document.querySelector('h6.dynamic-h6');
      const vertivalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const horizontalScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
      if (existingInput) existingInput.parentElement.removeChild(existingInput);
      if (existingH6) existingH6.parentElement.removeChild(existingH6);
      const inputName = document.createElement('input');
      inputName.classList.add('dynamic-input');
      const accountsNameList = document.getElementById("accountsNameList");
      inputName.style.position = 'absolute';
      inputName.style.zIndex = '55';
      inputName.style.top = button.getBoundingClientRect().top - 10 + vertivalScroll + 'px';
      inputName.style.left = accountsNameList.getBoundingClientRect().left + horizontalScroll + 'px';
      inputName.style.width = accountsNameList.getBoundingClientRect().width + 'px';
      inputName.style.height = accountsNameList.children[0].getBoundingClientRect().height + 'px';
      inputName.style.border = 'none';
      inputName.style.backgroundColor = 'black';
      inputName.style.color = "white";
      inputName.style.padding = "10px";
      inputName.id = 'change_name_input';
      // Создаем h6 элемент
      const h6Element = document.createElement('h6');
      h6Element.classList.add('dynamic-h6');
      const accountsMenuList = document.getElementById("accountsMenuList");
      h6Element.style.position = 'absolute';
      h6Element.style.zIndex = '55';
      h6Element.style.top = button.getBoundingClientRect().top - 5 + vertivalScroll + 'px';
      h6Element.style.left = accountsMenuList.getBoundingClientRect().left + 
                            accountsMenuList.getBoundingClientRect().width + 
                            10 + horizontalScroll + 'px';
      h6Element.style.height = accountsNameList.children[0].getBoundingClientRect().height - 10 + 'px';
      // Создаем a элемент
      const aElement = document.createElement('a');
      aElement.href = '#';
      aElement.id = 'changeNameButton';
      aElement.classList.add('btn-br', 'bg-btn3', 'btshad-b2', 'lnk');
      // Добавляем текст внутри a элемента
      aElement.textContent = 'Сохранить';
      aElement.style.display = 'flex';
      aElement.style.height = '100%';
      aElement.style.alignItems = 'center';
      aElement.style.fontSize = '12px';
      // Создаем span элемент и добавляем класс
      const spanElement = document.createElement('span');
      spanElement.classList.add('circle');
      // Добавляем span элемент внутри a элемента
      aElement.appendChild(spanElement);
      // Добавляем a элемент внутри h6 элемента
      h6Element.appendChild(aElement);
      
      document.getElementById('main-profile-section').appendChild(inputName);
      document.getElementById('main-profile-section').appendChild(h6Element);
      
      inputName.focus();
      aElement.addEventListener('click', (event) => {
        if (inputName.value) {
          header = {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${authToken}`
          };
          requestData = {
            newAccountName: inputName.value,
            id: accountSerial 
          };
          sendToServer(header, 'POST', '/update-account-name', requestData, (data) => {
            // Обработка успешного результата 
            location.reload();
          }, (data) => {
            // Обработка ошибки
            inputName.style.backgroundColor = "red"
          });
        } else {
          inputName.style.backgroundColor = "red"
        }
      });
      event.target.removeEventListener('click', accountMenuButtonClick);
    }
    accountsMenuButtonsAccount.forEach((button) => {
      button.addEventListener('click', (event) => {
        accountMenuButtonClick(event, button);
      });
    });
};

export async function serviceMenuListener( userId, header, requestData, button, 
                                      account_id, service_id) {
  button.addEventListener('click', (event) => {
    event.stopPropagation();

    const existingAccountsMenu = document.querySelector('ul.dynamic-accountsMenu');
    if (existingAccountsMenu && existingAccountsMenu.parentElement) {
      existingAccountsMenu.parentElement.removeChild(existingAccountsMenu);
    }
    
    const accountsMenu = document.createElement('ul');
    accountsMenu.classList.add('dynamic-accountsMenu', 'accountsMenus');
    
    const vertivalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const horizontalScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
    accountsMenu.style.top = button.getBoundingClientRect().top + 
                              button.getBoundingClientRect().height + vertivalScroll + 'px';
    accountsMenu.style.left = button.getBoundingClientRect().left + horizontalScroll + 
                              (button.getBoundingClientRect().width/2) + 'px';
    accountsMenu.style.zIndex = "56";
    document.body.appendChild(accountsMenu);

    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    const li4 = document.createElement('li');
    li1.textContent = "Импорт по API за весь доступный период";
    li2.textContent = "Импорт из CSV";
    li3.textContent = "Удалить импортируемое из CSV";
    li4.textContent = "Удалить всё";
    li1.addEventListener('click', (event) => {
      // Нажата - Импорт по Api за весь доступный период
      event.stopPropagation();
      const existingAccountsMenu = document.querySelector('ul.dynamic-accountsMenu');
      if (existingAccountsMenu && existingAccountsMenu.parentElement) existingAccountsMenu.parentElement.removeChild(existingAccountsMenu);

      header = {
        'Content-Type': 'application/json'
      };
      requestData = { userId: encodeURIComponent(userId),
                      account_id: encodeURIComponent(account_id),
                      service_id: encodeURIComponent(service_id),
                      task: encodeURIComponent("api_load_all"),
                      task_type: encodeURIComponent("import")};      
      sendToServer(header, 'POST', '/api_load_all', requestData, (data) => {
        // Обработка успешного результата
        location.reload();
      }, (data) => {
        // Обработка ошибки 
      });
    });
    li2.addEventListener('click', (event) => {
      // Нажата - Импорт из CSV
      event.stopPropagation();
      const existingAccountsMenu = document.querySelector('ul.dynamic-accountsMenu');
      if (existingAccountsMenu && existingAccountsMenu.parentElement) existingAccountsMenu.parentElement.removeChild(existingAccountsMenu);

      showHiddenElement(null, document.getElementById("drag-drop-import-csv"), null);
      const dropArea = document.querySelector(".drag-area"),
        icon = dropArea.querySelector(".icon"),
        dragText = dropArea.querySelector("header"),
        button = dropArea.querySelector("a"),
        input = dropArea.querySelector("input"),
        uploadReactionChecker = document.getElementById("file-upload-rection");
      let file;

      button.onclick = () => {
        input.click();
      }

      input.addEventListener("change", function() {
        file = this.files[0];
        dropArea.classList.add("active");
        showFile();
      });

      dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
      });

      dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
      });

      dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Update File";
        uploadReactionChecker.style.fill = "darkgreen";
        const submitButton = document.createElement('a');
        submitButton.href = "#";
        submitButton.id = "submitFile";
        submitButton.className = "btn-br bg-btn3 btshad-b2 lnk";
        submitButton.innerHTML = 'Отправить<span class="circle"></span>';
        
        file = event.dataTransfer.files[0];

        submitButton.addEventListener('click', (event) => {
          submitFileButtonClick(event, submitButton, showFile());
        });
        icon.appendChild(submitButton);
      });

      function submitFileButtonClick(event, submitButton, fileUrl) {
        event.stopPropagation();
        header = {
          'Content-Type': 'application/json'
        };
        requestData = { userId: encodeURIComponent(userId),
                        account_id: encodeURIComponent(account_id),
                        service_id: encodeURIComponent(service_id),
                        task: encodeURIComponent("api_load_csv"),
                        task_type: encodeURIComponent("import"),
                        fileUrl: encodeURIComponent(fileUrl)};      
        sendToServer(header, 'POST', '/api_load_csv', requestData, (data) => {
          // Обработка успешного результата
          location.reload();
        }, (data) => {
          // Обработка ошибки 
        });
      }
      function showFile() {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
          let fileReader = new FileReader();
          fileReader.onload = ()=>{
            return fileReader.result;
          }
          fileReader.readAsDataURL(file);
        } else {
          dropArea.style.backgroundColor = '#8f0a30';
          let delay = 500;
          function changeColorsBack() {
            dropArea.style.backgroundColor = '#FD6A02';
          }
          setTimeout(changeColorsBack, delay);
          return null;
        }
      }
      document.getElementById("drag-exit-button").addEventListener("click", function() {
        showHiddenElement(null, null, document.getElementById("drag-drop-import-csv"));
      });
      document.addEventListener('click', function(event) {
        if (!event.target.closest('.drag-area')) {
          if (document.getElementById("drag-drop-import-csv")) showHiddenElement(event, null, document.getElementById("drag-drop-import-csv"));
        }
      });
    });
    li3.addEventListener('click', (event) => {
      // Нажата - Удалить импортируемое из CSV
      const existingAccountsMenu = document.querySelector('ul.dynamic-accountsMenu');
      if (existingAccountsMenu && existingAccountsMenu.parentElement) existingAccountsMenu.parentElement.removeChild(existingAccountsMenu);

      header = {
        'Content-Type': 'application/json'
      };
      requestData = { userId: encodeURIComponent(userId),
                      account_id: encodeURIComponent(account_id),
                      service_id: encodeURIComponent(service_id),
                      task: encodeURIComponent("delete_csv"),
                      task_type: encodeURIComponent("export")};      
      sendToServer(header, 'POST', '/delete_csv', requestData, (data) => {
        // Обработка успешного результата
        location.reload();
      }, (data) => {
        // Обработка ошибки
      });
    });
    li4.addEventListener('click', (event) => {
      // Нажата - Удалить всё
      event.stopPropagation();
      const existingAccountsMenu = document.querySelector('ul.dynamic-accountsMenu');
      if (existingAccountsMenu && existingAccountsMenu.parentElement) existingAccountsMenu.parentElement.removeChild(existingAccountsMenu);

      header = {
        'Content-Type': 'application/json'
      };
      requestData = { userId: encodeURIComponent(userId),
                      account_id: encodeURIComponent(account_id),
                      service_id: encodeURIComponent(service_id),
                      task: encodeURIComponent("delete_all"),
                      task_type: encodeURIComponent("export")}; 
      sendToServer(header, 'POST', '/delete_all', requestData, (data) => {
        // Обработка успешного результата
        location.reload();
      }, (data) => {
        // Обработка ошибки
      });
    });
    
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    accountsMenu.appendChild(ul);
    
    document.addEventListener('click', (clicker) => {
      clicker.stopPropagation();
      const existingAccountsMenu = document.querySelector('ul.dynamic-accountsMenu');
      if (existingAccountsMenu && existingAccountsMenu.parentElement) existingAccountsMenu.parentElement.removeChild(existingAccountsMenu);
    });
  });
}