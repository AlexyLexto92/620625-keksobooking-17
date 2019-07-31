'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var STATUS_GOOD = 200;
  var TIMEOUT = 5000;
  var ARRAY_LENGTH = 5;
  var ARRAY_FIRST_ELEMENT = 0;

  window.sendRequest = function (onSuccess, createEror) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_GOOD) {
        onSuccess(xhr.response);
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
    xhr.timeout = TIMEOUT;
    return xhr;
  };
  //  функция загрузки данных с сервера
  var load = function (onSuccess, createEror) {

    var xhr = window.sendRequest(onSuccess, createEror);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };
  //  функция загрузки данных на сервер сформы
  var upload = function (data, onSuccess, createEror) {
    var xhr = window.sendRequest(onSuccess, createEror);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);

  };
  var nodeParent = document.querySelector('main');
  /*  ЗАГРУЗКА ДАННЫХ*/
  //  сценарий ошибки загрузки данных
  var errorContainer = document.querySelector('#error')
    .content.querySelector('.error').cloneNode(true);
  var errorMessage = errorContainer.querySelector('.error__message');
  var mapPin = document.querySelector('.map__pins');

  var createEror = function (message) {

    errorMessage.textContent = message;
    nodeParent.appendChild(errorContainer);
    //  обработчик события на кнопку ESC для окна ошибки получения данных

    var onErorClose = function () {
      window.removeElement('.error');
      window.onInactiveState();
      document.removeEventListener('mousedown', onErorClose);
    };
    var onErorCloseEsc = function (evt) {
      window.isEsc(evt, onErorClose);
      document.removeEventListener('keydown', onErorCloseEsc);
    };

    //  закрытие окна ошибки отправки формы
    document.addEventListener('keydown', onErorCloseEsc);
    document.addEventListener('mousedown', onErorClose);
  };

  //  функция заполнения массива данными из сервера
  window.createDataPin = function (apartmentServerSideData) {
    //  создали пустой массив для данных с сервера
    window.apartmentsList = apartmentServerSideData;

    for (var i = 0; i < window.apartmentsList.length; i++) {
      window.apartmentsList[i].id = i;
    }
    //  Сортируем исходный массив в рандомном порядке и записываем его в новый массив
    window.apartmentsListSlice = window.yatesSort(window.apartmentsList).slice(ARRAY_FIRST_ELEMENT, ARRAY_LENGTH);
    //  задал аргументом новый массив
    window.pinsFragment = window.createPinsFragment(window.apartmentsListSlice);
    //  функция отображения пинов после загрузки карты
    mapPin.appendChild(window.pinsFragment);
  };
  //  нужно изолировать функции в событии  каждой отправки/ приёма даных
  var errorButton = errorContainer.querySelector('.error__button');
  //  событие нажатия кнопки Еще раз для запроса данных с сервера
  errorButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.onInactiveState();
    //  закрытие окна
    window.removeElement('.error');
  });

  /* ВЫГРУЗКА ДАННЫХ */
  //  реализация окна успешной отправки формы
  var successContainer = document.querySelector('#success')
    .content.querySelector('.success').cloneNode(true);
  var createSuccessUpload = function () {
    nodeParent.appendChild(successContainer);
    window.onInactiveState();
    //  обработчик события на кнопку ESC для окна успешной отправки формы

    var onSuccessClose = function () {
      window.removeElement('.success');
      document.removeEventListener('click', onSuccessClose);
    };
    var onSuccessCloseEsc = function (evt) {
      window.isEsc(evt, onSuccessClose);
      document.addEventListener('keydown', onSuccessCloseEsc);
    };
    //  закрытие окна успешной отправки формы
    document.addEventListener('keydown', onSuccessCloseEsc);
    document.addEventListener('click', onSuccessClose);
  };

  var noticeBlock = document.querySelector('.notice');
  //  форма ввода
  var formBlock = noticeBlock.querySelector('.ad-form');
  //  событие нажатия на кнопку отправки формы
  formBlock.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formBlock), createSuccessUpload, window.backend.createEror);
  });
  window.backend = {
    load: load,
    upload: upload,
    createEror: createEror
  };
})();
