'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var STATUS_GOOD = 200;
  var TIMEOUT = 5000;
  //  функция загрузки данных с сервера
  var load = function (onSuccess, createEror) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    //  событие загрузки
    xhr.addEventListener('load', function () {
      //  успешно
      if (xhr.status === STATUS_GOOD) {
        onSuccess(xhr.response);
        //  ошибка
      } else {
        createEror('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      createEror('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      createEror('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', LOAD_URL);
    xhr.send();
    xhr.timeout = TIMEOUT;
  };

  //  функция загрузки данных на сервер сформы
  var upload = function (data, onSuccess, onEror) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_GOOD) {
        onSuccess(xhr.response);
        //  ошибка
      } else {
        onEror('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onEror('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onEror('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

  //  реализация окна успешной отправки формы
  var successParent = document.querySelector('main');
  var successContainer = document.querySelector('#success')
    .content.querySelector('.success').cloneNode(true);


  var createSuccess = function () {
    successParent.appendChild(successContainer);

    //  обработчик события на кнопку ESC для окна успешной отправки формы
    var listener = function (evt) {
      if (evt.keyCode === 27) {
        successParent.removeChild(successContainer);
        document.removeEventListener('keydown', listener);
      }
    };
    //  закрытие окна успешной отправки формы
    document.addEventListener('keydown', listener);
  };

  //  сценарий ошибки загрузки данных
  var errorParent = document.querySelector('main');
  var errorContainer = document.querySelector('#error')
    .content.querySelector('.error').cloneNode(true);
  var errorMessage = errorContainer.querySelector('.error__message');
  var mapPin = document.querySelector('.map__pins');

  window.createEror = function (message) {
    errorMessage.textContent = message;
    errorParent.appendChild(errorContainer);
    //  обработчик события на кнопку ESC для окна ошибки получения данных
    var listenerError = function (evt) {
      if (evt.keyCode === 27) {
        errorParent.removeChild(errorContainer);
        document.removeEventListener('keydown', listenerError);
      }
    };
    //  закрытие окна ошибки отправки формы
    document.addEventListener('keydown', listenerError);
  };
  var noticeBlock = document.querySelector('.notice');
  //  форма ввода
  var formBlock = noticeBlock.querySelector('.ad-form');
  //  событие нажатия на кнопку отправки формы
  formBlock.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formBlock), createSuccess, window.createEror);
  });

  //  функция заполнения массива данными из сервера
  window.createDataPin = function (apartmentServerSideData) {
    //  создали пустой массив для данных с сервера
    window.apartmentsList = [];
    for (var i = 0; i < apartmentServerSideData.length; i++) {
      var apartment = apartmentServerSideData[i];
      window.apartmentsList.push(apartment);
    }

    window.pinsFragment = window.createPinsFragment(window.apartmentsList);
    //  функция отображения пинов после загрузки карты
    mapPin.appendChild(window.pinsFragment);
  };

  var errorButton = errorContainer.querySelector('.error__button');
  //  событие нажатия кнопки Еще раз для запроса данных с сервера
  errorButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    //  повторный запрос данных
    window.backend.load(window.createDataPin, window.createEror);
    //  закрытие окна

    errorParent.removeChild(errorContainer);
  });
})();
