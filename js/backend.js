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

  /*  ЗАГРУЗКА ДАННЫХ*/
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
      }
      document.removeEventListener('keydown', listenerError);
    };
    //  закрытие окна ошибки отправки формы
    document.addEventListener('keydown', listenerError);
  };

  //  функция заполнения массива данными из сервера
  window.createDataPin = function (apartmentServerSideData) {
    //  создали пустой массив для данных с сервера
    window.apartmentsList = [];
    for (var i = 0; i < apartmentServerSideData.length; i++) {
      var apartment = apartmentServerSideData[i];
      window.apartmentsList.push(apartment);
    }

    //   !!!!-----ЗАДАНИЕ 7-------!!!!
    //  сортировка ейтса ,на вход берет массив array
    function sortArray(array) {
      for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      //  по логике этого  сортировщика он выводит входящий массив
      return array;
    }

    //  Создал новый массив
    window.apartmentsListSlice = [];
    //  Сортируем исходный массив в рандомном порядке и записываем его в новый массив
    window.apartmentsListSlice = sortArray(window.apartmentsList).slice(0, 5);
    //  задал аргументом новый массив
    window.pinsFragment = window.createPinsFragment(window.apartmentsListSlice);
    //  функция отображения пинов после загрузки карты
    mapPin.appendChild(window.pinsFragment);

    //  набор пинов
    var newPins = document.querySelectorAll('.new-pin');
    //  нажатие на любой из пинов
    Array.from(newPins).forEach(function (elem) {
      elem.addEventListener('click', window.onMapPinClick);
    });
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

  /* ВЫГРУЗКА ДАННЫХ */
  //  реализация окна успешной отправки формы
  var createSuccessUpload = function () {
    var successParent = document.querySelector('main');
    var successContainer = document.querySelector('#success')
      .content.querySelector('.success').cloneNode(true);

    successParent.appendChild(successContainer);
    window.removeElement('.new-pin');
    window.removeElement('.map__card');

    document.querySelector('.map').classList.add('map--faded');
    var formFieldAll = document.querySelector('.ad-form');
    formFieldAll.classList.add('ad-form--disabled');
    var formFilters = document.querySelector('.map__filters');
    formFilters.classList.add('ad-form--disabled');
    var formFiltersFieldset = formFilters.querySelectorAll('select');
    window.changeElementDisabledAtribute(formFiltersFieldset, true);
    var formFieldset = formFieldAll.querySelectorAll('fieldset');
    window.changeElementDisabledAtribute(formFieldset, true);
    document.querySelectorAll('form').forEach(function (elem) {
      elem.reset();
    });
    document.querySelector('.map__pin--main').style.left = '570' + 'px';
    document.querySelector('.map__pin--main').style.top = '375' + 'px';

    //  большая метка нанеактивной карте
    var mapPinMain = document.querySelector('.map__pin--main');
    //  высота mapPinMain
    var mapPinMainHeigth = mapPinMain.offsetHeight;
    //  ширина mapPinMain
    var mapPinMainWidth = mapPinMain.offsetWidth;
    //  координаты пина на карте
    var noticeBlockFormAdress = document.querySelector('#address');
    var mapPinCordinatY = mapPinMain.offsetTop + mapPinMainHeigth + 15;
    var mapPinCordinatX = mapPinMain.offsetLeft + Math.floor((mapPinMainWidth / 2));
    // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
    noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
    window.dataLoad = false;
    window.appActive = false;

    //  обработчик события на кнопку ESC для окна успешной отправки формы
    var listener = function (evt) {
      if (evt.keyCode === 27) {
        window.removeElement('.success');
        document.removeEventListener('keydown', listener);
      }
      window.removeElement('.success');
      document.removeEventListener('click', listener);
    };
    //  закрытие окна успешной отправки формы
    document.addEventListener('keydown', listener);
    document.addEventListener('click', listener);
  };

  var noticeBlock = document.querySelector('.notice');
  //  форма ввода
  var formBlock = noticeBlock.querySelector('.ad-form');
  //  событие нажатия на кнопку отправки формы
  formBlock.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formBlock), createSuccessUpload, window.createEror);
  });

})();
