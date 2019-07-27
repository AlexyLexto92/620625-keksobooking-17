'use strict';
//  Модуль ПЕРЕТАСКИВАНИЯ ПОЛЬЩОВАТЕЛЬСКОГО ПИНА И ОТРИСОВКИ ПИНОВ НА КАРТE

// ОТРИСОВКА ПИНОВ

(function () {
  var mapPin = document.querySelector('.map__pins');
  var mapPinWidth = mapPin.offsetWidth; //  ширина окна
  //  большая метка нанеактивной карте
  var mapPinMain = document.querySelector('.map__pin--main');

  //  видимая часть карты
  var mapVision = document.querySelector('.map');
  var pin = document.querySelector('.map__pin');
  var pinWidth = pin.offsetWidth; // ширина пина
  var pinHeight = pin.offsetHeight; //  высота пина
  //  высота mapPinMain
  var mapPinMainHeigth = mapPinMain.offsetHeight;
  //  ширина mapPinMain
  var mapPinMainWidth = mapPinMain.offsetWidth;
  //  форма фильтры
  var formFilters = document.querySelector('.map__filters');
  //  находим все select формы фильтров
  var formFiltersFieldsets = formFilters.querySelectorAll('select');
  var formFieldAll = document.querySelector('.ad-form');
  // находим все fieldset формы обьявления
  var formFieldsets = formFieldAll.querySelectorAll('fieldset');

  //  кординаты pin*a на карте
  var mapPinCordinatY = mapPinMain.offsetTop + Math.floor(mapPinMainHeigth / 2);
  var mapPinCordinatX = mapPinMain.offsetLeft + Math.floor((mapPinMainWidth / 2));
  //  форма отправки обьявления
  var noticeBlock = document.querySelector('.notice');
  // форма блока отправки обьявления
  var noticeBlockForm = noticeBlock.querySelector('.ad-form');
  //  форма адресса  блока отправки обьявления
  var noticeBlockFormAdress = noticeBlockForm.querySelector('#address');
  // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
  noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;


  // отрисовка пинов
  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (properties) {
    var PinElement = similarMapPinTemplate.cloneNode(true);
    PinElement.dataset.id = properties.id;
    PinElement.style.top = properties.location.y - pinHeight + 'px';
    PinElement.style.left = properties.location.x - pinWidth / 2 + 'px';
    PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
    PinElement.classList.add('new-pin');
    return PinElement;
  };

  window.createPinsFragment = function (pinsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsArray.length; i++) {
      var newPin = createPin(pinsArray[i]);
      newPin.addEventListener('click', function (evt) {
        var uniqId = evt.currentTarget.dataset.id;
        window.apartmentsList.forEach(function (elem) {
          if (elem.id === Number(uniqId)) {
            mapPin.appendChild(window.renderCard(elem));
          }
        });
        //  навешиваем события закрытия карточки
        var onCloseCardButton = document.querySelector('.popup__close');
        onCloseCardButton.addEventListener('click', window.closeCardPopup);
        document.addEventListener('keydown', window.closeCardPopupEsc);
      });
      fragment.appendChild(newPin);
    }
    return fragment;
  };

  //  реализация перетаскивания пина по карте
  //  сcылка на елемент для захвата
  window.isAppActive = false;
  window.isDataLoad = false;
  // событие нажатия на Enter

  //  функция нажатия Enter на главный пин
  var onPressEnterPin = function (evt) {

    if (evt.keyCode === 13) {
      mapVision.classList.remove('map--faded');

      if (!window.isDataLoad) {
        window.backend.load(window.createDataPin, window.createEror);
        window.isDataLoad = true;
      }
      //  при активации пина координаты меняються от цента на конец  пина(48 пикселей)
      mapPinCordinatY += 48;
      //  определнние координат на случай если жвижение попапа отсутствует и происходит только нажатие
      noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
      if (!window.isAppActive) {
        //  убираем у формы  ad-form--disabled
        formFieldAll.classList.remove('ad-form--disabled');
        //  изменяем всем филдсетам disabled=false
        window.changeElementDisabledAtribute(formFieldsets, false);
        //  добавляем всем филдсетам disabled=false
        window.changeElementDisabledAtribute(formFiltersFieldsets, false);
        // разблокируем форму с фильтрами
        formFilters.classList.remove('ad-form--disabled');
        window.isAppActive = true;
      }
    }
    mapPinMain.removeEventListener('keydown', onPressEnterPin);
  };
  //  событие нажатия Enter на главный пин
  mapPinMain.addEventListener('keydown', onPressEnterPin);
  //  событие захвата
  mapPinMain.addEventListener('mousedown', function (evt) {
    //  реализация только одной загрузки данных без повторения при повторном нажатии на клик
    if (!window.isDataLoad) {
      window.backend.load(window.createDataPin, window.createEror);
      window.isDataLoad = true;
    }
    //  убираем класс map--faded
    mapVision.classList.remove('map--faded');
    evt.preventDefault();

    //  координаты точки с которой мы начали перемещать попап

    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY
    };
    //  событие перетаскивания

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      //  расстояние на которое пеетянули курсор
      var shift = {
        x: startCoordinats.x - moveEvt.clientX,
        y: startCoordinats.y - moveEvt.clientY
      };


      startCoordinats = {
        x: Math.min(Math.max(moveEvt.clientX, mapVision.offsetLeft), mapVision.offsetWidth + mapVision.offsetLeft),
        y: Math.min(Math.max(moveEvt.clientY, 130 - window.scrollY - mapPinMainHeigth), 630 - window.scrollY)
      };
      //  прописываем условие ограничений
      var positionPinY = mapPinMain.offsetTop - shift.y;
      if (positionPinY >= 130 - mapPinMainHeigth - 15 && positionPinY <= 630 - mapPinMainHeigth - 15) {
        mapPinMain.style.top = positionPinY + 'px';
      }
      var halfOfPinWidth = Math.floor((mapPinMainWidth / 2)) * (-1);
      var positionPinX = mapPinMain.offsetLeft - shift.x;
      if (positionPinX >= halfOfPinWidth && positionPinX <= mapPinWidth + halfOfPinWidth) {
        mapPinMain.style.left = positionPinX + 'px';
      }
      //  новые кординаты pin*a на карте
      mapPinCordinatY = mapPinMain.offsetTop + mapPinMainHeigth + 15;
      mapPinCordinatX = mapPinMain.offsetLeft + Math.floor((mapPinMainWidth / 2));
      // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
      noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;

    };
    var onMouseUp = function (upEvt) {

      upEvt.preventDefault();

      //  определнние координат на случай если жвижение попапа отсутствует и происходит только нажатие
      noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
      if (!window.isAppActive) {
        //  убираем у формы  ad-form--disabled
        formFieldAll.classList.remove('ad-form--disabled');
        //  изменяем всем филдсетам disabled=false
        window.changeElementDisabledAtribute(formFieldsets, false);
        //  добавляем всем филдсетам disabled=false
        window.changeElementDisabledAtribute(formFiltersFieldsets, false);
        // разблокируем форму с фильтрами
        formFilters.classList.remove('ad-form--disabled');

        window.isAppActive = true;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };
    //  обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
