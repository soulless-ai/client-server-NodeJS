import { sendToServer } from "./config.js";
import { showHiddenElement } from "./config.js";

const authToken = localStorage.getItem('authToken');
let header, requestData;
// Отправка индивидуального токена пользователя на сервер и переадресация в профиль.
if (authToken) {
  header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };

  sendToServer(header, 'POST', '/remember', {}, (data) => {
    // Обработка успешного результата
    window.location.href = "../client/profile.html";
  }, (error) => {
    // Обработка ошибки
    console.error("Ошибка при получении данных клиента:", error.message);
  });
}
// Список форм для Авторизации и Регистрации.
const signInForm = document.getElementById('signIn_form');
const forgotEmailForm = document.getElementById('get_email_form-forgot');
const forgotVerForm = document.getElementById('get_email-Ver_form-forgot');
const forgotChangePasswordForm = document.getElementById('get_change-password_form');
const emailForm = document.getElementById('get_email_form');
const verForm = document.getElementById('get_email-Ver_form');
const infoForm = document.getElementById('get_data_form');

const signInSubmit = document.getElementById('signIn');
if (signInSubmit) {
  signInSubmit.addEventListener('click', async function(event) {
    event.preventDefault();
    if (signInForm.emailIn.value && signInForm.passwordIn.value) {
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };

      requestData = {
        email: encodeURIComponent(signInForm.emailIn.value),
        password: encodeURIComponent(signInForm.passwordIn.value)
        //checker: signInForm.remember.checked
      };

      sendToServer(header, 'POST', '/login', requestData, (data) => {
        // Обработка успешного результата
        // Сохраняем токен в localStorage или другом месте по вашему выбору
        if (data.token) localStorage.setItem('authToken', data.token);
        if (data.userId) localStorage.setItem('userId', data.userId);
        window.location.href = "../client/profile.html";
      }, (data) => {
        // Обработка ошибки
        signInSubmit.style.backgroundColor = '#8f0a30';
        let delay = 500;
        function changeColorsBack() {
          signInSubmit.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, delay);
      });
    }  else {
      signInSubmit.style.backgroundColor = '#8f0a30';
      let delay = 500;
      function changeColorsBack() {
        signInSubmit.style.backgroundColor = '#FD6A02';
      }
      setTimeout(changeColorsBack, delay);
    }
  });
}

const forgotButton = document.getElementById('forgotButton');
if (forgotButton) {
  forgotButton.addEventListener('click', async function(event) {
    showHiddenElement(event, forgotEmailForm, signInForm);
    showHiddenElement(event, null, forgotButton);
  })
}

const continueVerificationForgot = document.getElementById('continueVerificationForgot');
if (continueVerificationForgot) {
  continueVerificationForgot.addEventListener('click', async function(event) {
    event.preventDefault();
    if (forgotEmailForm.emailForgot.value) {
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };
  
      requestData = {
        emailForgot: encodeURIComponent(forgotEmailForm.emailForgot.value)
      };
  
      sendToServer(header, 'POST', '/forgot', requestData, (data) => {
        // Обработка успешного результата
        showHiddenElement(event, forgotVerForm, forgotEmailForm);
      }, (data) => {
        // Обработка ошибки
        continueVerificationForgot.style.backgroundColor = '#8f0a30';
        let delay = 500;
        function changeColorsBack() {
          continueVerificationForgot.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, delay);
      });
    }  else {
      continueVerificationForgot.style.backgroundColor = '#8f0a30';
      let delay = 500;
      function changeColorsBack() {
        continueVerificationForgot.style.backgroundColor = '#FD6A02';
      }
      setTimeout(changeColorsBack, delay);
    }
  });
}

const continueToChangePassword = document.getElementById('continueToChangePassword');
if (continueToChangePassword) {
  continueToChangePassword.addEventListener('click', async function(event) {
    event.preventDefault();
    if (forgotVerForm.verificationForgot.value) {
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };
  
      requestData = {
        emailForgot: encodeURIComponent(forgotEmailForm.emailForgot.value),
        verificationForgot: forgotVerForm.verificationForgot.value
      };
  
      sendToServer(header, 'POST', '/forgot-ver', requestData, (data) => {
        // Обработка успешного результата
        showHiddenElement(event, forgotChangePasswordForm, forgotVerForm);
      }, (data) => {
        // Обработка ошибки
        continueToChangePassword.style.backgroundColor = '#8f0a30';
        let delay = 500;
        function changeColorsBack() {
          continueToChangePassword.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, delay);
      });
    } else {
      continueToChangePassword.style.backgroundColor = '#8f0a30';
        let delay = 500;
        function changeColorsBack() {
          continueToChangePassword.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, delay);
    }
  });
}

const changePasswordButton = document.getElementById('changePasswordButton');
if (changePasswordButton) {
  changePasswordButton.addEventListener('click', async function(event) {
    event.preventDefault();
    if (forgotChangePasswordForm.changePasswordForgot.value && forgotChangePasswordForm.changePasswordForgotAuth.value && 
        forgotChangePasswordForm.changePasswordForgot.value === forgotChangePasswordForm.changePasswordForgotAuth.value) {
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };
  
      requestData = {
        emailForgot: encodeURIComponent(forgotEmailForm.emailForgot.value),
        changePasswordForgot: encodeURIComponent(forgotChangePasswordForm.changePasswordForgot.value)
      };
  
      sendToServer(header, 'POST', '/forgot-new-password', requestData, (data) => {
        // Обработка успешного результата
        showHiddenElement(event, signInForm, forgotChangePasswordForm);
      }, (data) => {
        // Обработка ошибки
        changePasswordButton.style.backgroundColor = '#8f0a30';
        let delay = 500;
        function changeColorsBack() {
          changePasswordButton.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, delay);
      });
    } else {
      changePasswordButton.style.backgroundColor = '#8f0a30';
      let delay = 500;
      function changeColorsBack() {
        changePasswordButton.style.backgroundColor = '#FD6A02';
      }
      setTimeout(changeColorsBack, delay);
    }
  });
}

const sendEmailToVerButton = document.getElementById('sendEmail');
let clickEnabled = true;
let countdownInterval;
let isRequestInProgress = false; // Add a flag to track request progress
if (sendEmailToVerButton) {
  sendEmailToVerButton.addEventListener('click', async function(event) {
    event.preventDefault();
    if (isRequestInProgress) return; // If request is in progress, ignore the click
    if (clickEnabled && emailForm.email.value && emailForm.check1.checked && emailForm.check2.checked) {
      clickEnabled = false;
      let countdown = 60;
      async function updateTimer() {
        let minutes = Math.floor(countdown / 60);
        let seconds = countdown % 60;
        sendEmailToVerButton.style.backgroundColor = '#8f0a30';
        sendEmailToVerButton.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
      updateTimer();
      
      countdownInterval = setInterval(() => {
        countdown -= 1;
        updateTimer();

        if (countdown <= 0) {
          clearInterval(countdownInterval);
          sendEmailToVerButton.style.backgroundColor = '#FD6A02';
          sendEmailToVerButton.textContent = `Отправить`;
          clickEnabled = true;
        }
      }, 1000);
      
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };
  
      requestData = {
        email: encodeURIComponent(emailForm.email.value)
      };
  
      isRequestInProgress = true;

      sendToServer(header, 'POST', '/send-confirmation-code', requestData, (data) => {
        // Обработка успешного результата
        sendEmailToVerButton.textContent = `Отправить`;
        showHiddenElement(event, verForm, emailForm);
        clickEnabled = true;
        clearInterval(countdownInterval);
        isRequestInProgress = false;
      }, (data) => {
        // Обработка ошибки
        if (data.message.includes('Данный email уже зарегистрирован')) {
          clearInterval(countdownInterval);
          sendEmailToVerButton.textContent = `Вы уже зарегистрированы`;
          sendEmailToVerButton.style.backgroundColor = '#8f0a30';
          clickEnabled = false;
        }
        sendEmailToVerButton.style.backgroundColor = '#FD6A02';
        isRequestInProgress = false;
      });
    } else {
      if (!check1.checked) {
        document.getElementById('check-error1').style.stroke = '#8f0a30';
      }
      if (!check2.checked) {
        document.getElementById('check-error2').style.stroke = '#8f0a30';
      }
      sendEmailToVerButton.style.backgroundColor = '#8f0a30';
      let delay = 500;
      function changeColorsBack() {
        document.getElementById('check-error1').style.stroke = 'white';
        document.getElementById('check-error2').style.stroke = 'white';
        sendEmailToVerButton.style.backgroundColor = '#FD6A02';
      }
      setTimeout(changeColorsBack, delay);
    }
  });
}

const continueVerification = document.getElementById('continueVerification');
const backToEmail = document.querySelectorAll('backToEmail');
if (continueVerification) {
  continueVerification.addEventListener('click', async function(event) {
    event.preventDefault();
    if (verForm.verification.value) {
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };
  
      requestData = {
        verification: verForm.verification.value,
        email: encodeURIComponent(emailForm.email.value)
      };
  
      sendToServer(header, 'POST', '/confirm-code', requestData, (data) => {
        // Обработка успешного результата
        showHiddenElement(event, document.getElementById('get_data_form'), document.getElementById('get_email-Ver_form'));
      }, (data) => {
        // Обработка ошибки
        backToEmail.style.backgroundColor = '#8f0a30';
        continueVerification.style.backgroundColor = '#8f0a30';
        function changeColorsBack() {
          backToEmail.style.backgroundColor = '#FD6A02';
          continueVerification.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, 500);
      });
    } else {
      backToEmail.style.backgroundColor = '#8f0a30';
      continueVerification.style.backgroundColor = '#8f0a30';
      function changeColorsBack() {
        backToEmail.style.backgroundColor = '#FD6A02';
        continueVerification.style.backgroundColor = '#FD6A02';
      }
      setTimeout(changeColorsBack, 500);
    }
  })
}

const continueToProfile = document.getElementById('continueToProfile');
if (continueToProfile) {
  continueToProfile.addEventListener('click', async function(event) {
    event.preventDefault();
    if (document.getElementById('phone').value && 
        infoForm.password.value && infoForm.passwordVerification.value && 
        infoForm.user_name.value && infoForm.user_second_name.value) {
      const fullPhoneNumber = document.getElementById('country').value + document.getElementById('phone').value;
      header = {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer <token>'
      };
  
      requestData = {
        phone: encodeURIComponent(fullPhoneNumber),
        email: encodeURIComponent(emailForm.email.value),
        password: encodeURIComponent(infoForm.password.value),
        name: encodeURIComponent(infoForm.user_name.value),
        second_name: encodeURIComponent(infoForm.user_second_name.value),
      };
  
      sendToServer(header, 'POST', '/registration-last-request', requestData, (data) => {
        // Обработка успешного результата
        if (data.id) {
          localStorage.setItem('userId', data.id);
        }
        window.location.href = "../client/profile.html"; 
      }, (data) => {
        // Обработка ошибки
        backToEmail.style.backgroundColor = '#8f0a30';
        continueToProfile.style.backgroundColor = '#8f0a30';
        function changeColorsBack() {
          document.getElementById('check-error1').style.stroke = 'white';
          document.getElementById('check-error2').style.stroke = 'white';
          backToEmail.style.backgroundColor = '#FD6A02';
          continueToProfile.style.backgroundColor = '#FD6A02';
        }
        setTimeout(changeColorsBack, 500);
      });
    } else {
      backToEmail.style.backgroundColor = '#8f0a30';
      continueToProfile.style.backgroundColor = '#8f0a30';
      function changeColorsBack() {
        document.getElementById('check-error1').style.stroke = 'white';
        document.getElementById('check-error2').style.stroke = 'white';
        backToEmail.style.backgroundColor = '#FD6A02';
        continueToProfile.style.backgroundColor = '#FD6A02';
      }
      setTimeout(changeColorsBack, 500);
    }
  });
}

const mainButton = document.getElementById('main_button');
if (mainButton) {
  mainButton.addEventListener('click', function(event) {
    showHiddenElement(event, document.getElementById('formContainers'), null);
  });
}
backToEmail.forEach((element) => {
  element.addEventListener('click', async function(event) {
    if (verForm) showHiddenElement(event, emailForm, verForm);
    if (infoForm) showHiddenElement(event, emailForm, verForm);
  });
});
const backToSignInElements = document.querySelectorAll('.backToSignIn');
backToSignInElements.forEach((element) => {
  element.addEventListener('click', async function(event) {
    if (forgotEmailForm) { showHiddenElement(event, signInForm, forgotEmailForm); showHiddenElement(event, forgotButton, null);}
    if (forgotVerForm) { showHiddenElement(event, signInForm, forgotVerForm); showHiddenElement(event, forgotButton, null);}
  });
});


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

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a');

  anchorLinks.forEach(function(link) {
    link.addEventListener('dragstart', function(event) {
      // Предотвращаем перетаскивание содержимого при зажатой мышке
      event.preventDefault();
    });
  });
});
const checkElements = document.querySelectorAll('.check');

function handleHover(event) {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.classList.toggle('gold');
  })
}

checkElements.forEach(check => {
  check.addEventListener('mouseover', handleHover);
  check.addEventListener('mouseout', handleHover);
});

const connexionSection = document.querySelector('.connexion');
const enregistrerSection = document.querySelector('.enregistrer');
const btnEnregistrer = document.querySelector('.btn-enregistrer');
const btnConnexion = document.querySelector('.btn-connexion');
// Проверка, была ли нажата кнопка '.btn-enregistrer'
btnEnregistrer.addEventListener('click', async function(event) {
  connexionSection.classList.add('remove-section');
  enregistrerSection.classList.remove('active-section');
  btnEnregistrer.classList.remove('active');
  btnConnexion.classList.add('active');
})

// Проверка, была ли нажата кнопка '.btn-connexion'
btnConnexion.addEventListener('click', async function(event) {
  connexionSection.classList.remove('remove-section');
  enregistrerSection.classList.add('active-section');
  btnEnregistrer.classList.add('active');
  btnConnexion.classList.remove('active');
})