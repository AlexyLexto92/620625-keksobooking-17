'use strict';

//  МОДУЛЬ ФОРМЫ

(function () {
  var mapPin = document.querySelector('.map__pins');
  var formFieldAll = document.querySelector('.ad-form');
  // находим все fieldset формы обьявления
  var formFieldset = formFieldAll.querySelectorAll('fieldset');
  //  форма фильтры
  var formFilters = document.querySelector('.map__filters');
  formFilters.classList.add('ad-form--disabled');
  //  находим все select формы фильтров
  var formFiltersFieldset = formFilters.querySelectorAll('select');

  //  форма отправки обьявления
  var noticeBlock = document.querySelector('.notice');
  // форма блока отправки обьявления
  var noticeBlockForm = noticeBlock.querySelector('.ad-form');
  //  добаления атрабута ACTION
  noticeBlockForm.action = 'https://js.dump.academy/keksobooking';

  //  добавляем всем филдсетам disabled=true
  window.changeElementDisabledAtribute(formFiltersFieldset, true);
  //  добавляем всем филдсетам disabled=true
  window.changeElementDisabledAtribute(formFieldset, true);

  //  5
  //  заголовок обьявления
  var noticeTitle = noticeBlock.querySelector('#title');
  //  добавляем арибуты
  noticeTitle.setAttribute('minlength', 30);
  noticeTitle.setAttribute('maxlength', 100);
  noticeTitle.setAttribute('required', true);


  //  цена за ночь обьявления
  var noticePrice = noticeBlock.querySelector('#price');
  noticePrice.setAttribute('type', 'number');
  noticePrice.max = 1000000;
  //  прописал минимальное значение,что б при первом открытии не уходило в минусовое значение
  noticePrice.min = 0;
  noticePrice.setAttribute('required', true);
  // тип жилья обьявления
  var noticeTypeOfHousing = noticeBlock.querySelector('#type');

  //  зависимость мин цены от выбора типа жилья цепляем на событие change
  noticeTypeOfHousing.addEventListener('change', function () {

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
  });

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
  function typeOfHousingFilter(elem) {
    if (housingType.value === 'any') {
      return true;
    }
    return elem.offer.type === housingType.value;
  }

  //  фильтр стоимости
  var PriceOfHousing = formFilters.querySelector('#housing-price');

  function priceOfHousingfilter(elem) {
    if (PriceOfHousing.value === 'any') {
      return true;
    } else if (PriceOfHousing.value === 'low') {
      return elem.offer.price <= 10000;
    } else if (PriceOfHousing.value === 'high') {
      return elem.offer.price >= 50000;
    } else if (PriceOfHousing.value === 'middle') {
      return elem.offer.price >= 10000 && elem.offer.price <= 50000;
    }
    return false;
  }

  //  фильтрация по количеству комнат
  var numOfRums = formFilters.querySelector('#housing-rooms');

  function numOfRumsFilter(elem) {
    if (numOfRums.value === 'any') {
      return true;
    }
    return elem.offer.rooms === Number(numOfRums.value);
  }
  //  фильтрация по количеству гостей
  var numOfGuests = formFilters.querySelector('#housing-guests');

  function numOfGuestsFilter(elem) {
    if (numOfGuests.value === 'any') {
      return true;
    }
    return elem.offer.guests === Number(numOfGuests.value);
  }

  //  фильтрация по чекбоксам
  function featuresFilter(elem) {
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
  }

  //  общий фильтр
  function commonFilter(elem) {
    return typeOfHousingFilter(elem) && priceOfHousingfilter(elem) && numOfRumsFilter(elem) && numOfGuestsFilter(elem) && featuresFilter(elem);
  }

  var onChangePinFiltersFields = function () {
    //  удаление пинов
    window.removeElement('.new-pin');
    window.removeElement('.map__card');

    window.pinsFragment = window.createPinsFragment(window.apartmentsList.filter(commonFilter).slice(0, 5));
    //  функция отображения пинов
    mapPin.appendChild(window.pinsFragment);
    window.showCard();
  };
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

  var changeinputRoomNumber = function () {
    inputRoomNumberValidation();
  };
  //  обработчик события изменения количества комнат
  inputRoomNumber.addEventListener('change', changeinputRoomNumber);
  //  реализация функционала кнопки Оистить
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.onInactiveState();
  });

})();
