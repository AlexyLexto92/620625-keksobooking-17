'use strict';

//  МОДУЛЬ ФОРМЫ

(function () {
  var ARRAY_FILTERED_LENGTH = 5;
  var ARRAY_FILTERED_FIRST_ELEMENT = 0;
  var mapPin = document.querySelector('.map__pins');
  var formFieldAll = document.querySelector('.ad-form');
  // находим все fieldset формы обьявления
  var formFieldsets = formFieldAll.querySelectorAll('fieldset');
  //  форма фильтры
  var formFilters = document.querySelector('.map__filters');
  formFilters.classList.add('ad-form--disabled');
  //  находим все select формы фильтров
  var formFiltersFieldsets = formFilters.querySelectorAll('select');

  //  форма отправки обьявления
  var noticeBlock = document.querySelector('.notice');
  // форма блока отправки обьявления
  var noticeBlockForm = noticeBlock.querySelector('.ad-form');
  //  добаления атрабута ACTION
  noticeBlockForm.action = 'https://js.dump.academy/keksobooking';

  //  добавляем всем филдсетам disabled=true
  window.changeElementDisabledAtribute(formFiltersFieldsets, true);
  //  добавляем всем филдсетам disabled=true
  window.changeElementDisabledAtribute(formFieldsets, true);

  //  5
  //  заголовок обьявления
  var noticeTitle = noticeBlock.querySelector('#title');
  var noticeTitleMinLength = 30;
  var noticeTitleMaxLength = 100;
  var noticePriceMax = 1000000;
  var noticePriceMin = 0;
  //  добавляем арибуты
  noticeTitle.setAttribute('minlength', noticeTitleMinLength);
  noticeTitle.setAttribute('maxlength', noticeTitleMaxLength);
  noticeTitle.setAttribute('required', true);


  //  цена за ночь обьявления
  var noticePrice = noticeBlock.querySelector('#price');
  noticePrice.setAttribute('type', 'number');
  noticePrice.max = noticePriceMax;
  //  прописал минимальное значение,что б при первом открытии не уходило в минусовое значение
  noticePrice.min = noticePriceMin;
  noticePrice.setAttribute('required', true);
  // тип жилья обьявления
  var noticeTypeOfHousing = noticeBlock.querySelector('#type');

  //  зависимость мин цены от выбора типа жилья цепляем на событие change


  var onChangeNoticeTypeOfHousing = function () {

    switch (noticeTypeOfHousing.value) {
      case 'bungalo':
        noticePrice.min = '0';
        noticePrice.placeholder = '0';
        break;
      case 'flat':
        noticePrice.min = '1000';
        noticePrice.placeholder = '1000';
        break;
      case 'house':
        noticePrice.min = '5000';
        noticePrice.placeholder = '5000';
        break;
      case 'palace':
        noticePrice.min = '10000';
        noticePrice.placeholder = '10000';
        break;
    }
  };
  noticeTypeOfHousing.addEventListener('change', onChangeNoticeTypeOfHousing);
  //  запускаем функцию сразу после запуска приложения
  onChangeNoticeTypeOfHousing();
  //  адрес обьявления
  var noticeAdress = noticeBlock.querySelector('#address');
  //  добавление атрибута координатам обьявления
  noticeAdress.setAttribute('readonly', true);
  //  время заезда
  var noticeTineOfIncom = noticeBlock.querySelector('#timein');
  //  время выезда
  var noticeTineOfOutcom = noticeBlock.querySelector('#timeout');


  //  синхронизация полей Время заезда/время выезда
  noticeTineOfIncom.addEventListener('change', function () {

    switch (noticeTineOfIncom.value) {
      case '12:00':
        noticeTineOfOutcom.value = '12:00';
        break;
      case '13:00':
        noticeTineOfOutcom.value = '13:00';
        break;
      case '14:00':
        noticeTineOfOutcom.value = '14:00';
        break;
    }
  });
  noticeTineOfOutcom.addEventListener('change', function () {

    switch (noticeTineOfOutcom.value) {
      case '12:00':
        noticeTineOfIncom.value = '12:00';
        break;
      case '13:00':
        noticeTineOfIncom.value = '13:00';
        break;
      case '14:00':
        noticeTineOfIncom.value = '14:00';
        break;
    }
  });

  //  Создание фильтров
  var housingType = formFilters.querySelector('#housing-type');

  //  фильтр типа жилья
  var typeOfHousingFilter = function (elem) {
    if (housingType.value === 'any') {
      return true;
    }
    return elem.offer.type === housingType.value;
  };

  //  фильтр стоимости
  var priceOfHousing = formFilters.querySelector('#housing-price');
  var priceOfHousingfilter = function (elem) {
    var priceValue = false;
    switch (priceOfHousing.value) {
      case 'any':
        priceValue = 'true';
        break;
      case 'low':
        priceValue = elem.offer.price <= 10000;
        break;
      case 'high':
        priceValue = elem.offer.price >= 50000;
        break;
      case 'middle':
        priceValue = elem.offer.price >= 10000 && elem.offer.price <= 50000;
    }
    return priceValue;
  };


  //  фильтрация по количеству комнат
  var numOfRooms = formFilters.querySelector('#housing-rooms');

  var numOfRoomsFilter = function (elem) {
    if (numOfRooms.value === 'any') {
      return true;
    }
    return elem.offer.rooms === Number(numOfRooms.value);
  };
  //  фильтрация по количеству гостей
  var numOfGuests = formFilters.querySelector('#housing-guests');

  var numOfGuestsFilter = function (elem) {
    if (numOfGuests.value === 'any') {
      return true;
    }
    return elem.offer.guests === Number(numOfGuests.value);
  };

  //  фильтрация по чекбоксам
  var featuresFilter = function (elem) {
    var filterFeaturesCheckboxes = document.querySelectorAll('.map__features input[type=checkbox]:checked');
    var filtered = true;
    if (filterFeaturesCheckboxes.length) {
      filterFeaturesCheckboxes.forEach(function (chBox) {
        if (!elem.offer.features.includes(chBox.value)) {
          filtered = false;
        }
      });
    }
    return filtered;
  };

  //  общий фильтр
  var commonFilter = function (elem) {
    return typeOfHousingFilter(elem) && priceOfHousingfilter(elem) && numOfRoomsFilter(elem) && numOfGuestsFilter(elem) && featuresFilter(elem);
  };

  //  событие изменения фильтров пинов
  var onChangePinFiltersFields = window.debounce(500, function () {
    //  удаление пинов
    window.removeElement('.new-pin');
    //  удаление карточки
    window.removeElement('.map__card');
    window.pinsFragment = window.createPinsFragment(window.apartmentsList.filter(commonFilter).slice(ARRAY_FILTERED_FIRST_ELEMENT, ARRAY_FILTERED_LENGTH));
    mapPin.appendChild(window.pinsFragment);
  });
  //  для каждого елемента массива ставим слушатель
  formFilters.addEventListener('change', onChangePinFiltersFields);
  //  валидация формы количества гостей и кол-ва комнат
  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var inputCapacityOptions = inputCapacity.querySelectorAll('option');
  //  непосредственно функция валидации
  var inputRoomNumberValidation = function () {
    //  удаляем все option из select
    inputCapacityOptions.forEach(function (elem) {
      elem.remove();
    });
    //  функция добавления option[elem] в select(берем индексы подходящих значений кол-а гостей и вставляем в select)
    var insertInputCapacityOptions = function (elements) {
      elements.forEach(function (elem) {
        inputCapacity.appendChild(inputCapacityOptions[elem]);
      });
    };
    switch (inputRoomNumber.selectedIndex) {
      case 0:
        insertInputCapacityOptions([2]);
        break;
      case 1:
        insertInputCapacityOptions([1, 2]);
        break;
      case 2:
        insertInputCapacityOptions([0, 1, 2]);
        break;
      case 3:
        insertInputCapacityOptions([3]);
        break;
    }
  };
  //  сразу запускаем функцию для первой коректной связи между полями до изменения поля количества комнат
  inputRoomNumberValidation();
  //  и продолжаем при каждом изменении количества комнат
  var onInputRoomNumberChange = function () {
    inputRoomNumberValidation();
  };
  //  обработчик события изменения количества комнат
  inputRoomNumber.addEventListener('change', onInputRoomNumberChange);
  //  реализация функционала кнопки Оистить
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.onInactiveState();
  });
})();
