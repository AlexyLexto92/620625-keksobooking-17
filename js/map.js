'use strict';
//  Модуль ПЕРЕТАСКИВАНИЯ ПОЛЬЩОВАТЕЛЬСКОГО ПИНА И ОТРИСОВКИ ПИНОВ НА КАРТE

// ОТРИСОВКА ПИНОВ

(function () {
  var mapPin = document.querySelector('.map__pins');
  var mapPinWidth = mapPin.offsetWidth; //  ширина окна
  var mapPin = document.querySelector('.map__pins');
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
  var formFiltersFieldset = formFilters.querySelectorAll('select');
  var formFieldAll = document.querySelector('.ad-form');
  // находим все fieldset формы обьявления
  var formFieldset = formFieldAll.querySelectorAll('fieldset');

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
    PinElement.style.top = properties.location.y - pinHeight + 'px';
    PinElement.style.left = properties.location.x - pinWidth / 2 + 'px';
    PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
    PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативній текст');
    return PinElement;
  };
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.similarAds.length; i++) {
    fragment.appendChild(createPin(window.similarAds[i]));
  }

  //  реализация перетаскивания пина по карте
  //  сcылка на елемент для захвата
  var appActive = false;


  //  событие захвата
  mapPinMain.addEventListener('mousedown', function (evt) {
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
      /*
      startCoordinats = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
      };
      */

      startCoordinats = {
        x: Math.min(Math.max(moveEvt.clientX, mapVision.offsetLeft), mapVision.offsetWidth + mapVision.offsetLeft),
        y: Math.min(Math.max(moveEvt.clientY, 130 - window.scrollY - mapPinMainHeigth), 630 - window.scrollY)
      };
      //  прописываем условие ограничений
      var positionPinY = mapPinMain.offsetTop - shift.y;
      if (positionPinY >= 130 - mapPinMainHeigth - 15 && positionPinY <= 630 - mapPinMainHeigth - 15) {
        mapPinMain.style.top = positionPinY + 'px';
      }
      var positionPinX = mapPinMain.offsetLeft - shift.x;
      if (positionPinX >= Math.floor((mapPinMainWidth / 2)) * (-1) && positionPinX <= mapPinWidth + (Math.floor(mapPinMainWidth / 2)) * (-1)) {
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
      if (!appActive) {
        //  убираем у формы  ad-form--disabled
        formFieldAll.classList.remove('ad-form--disabled');
        //  изменяем всем филдсетам disabled=false
        window.changeElementDisabledAtribute(formFieldset, false);
        //  добавляем всем филдсетам disabled=false
        window.changeElementDisabledAtribute(formFiltersFieldset, false);
        // разблокируем форму с фильтрами
        formFilters.classList.remove('ad-form--disabled');
        mapPin.appendChild(fragment);
        appActive = true;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };
    //  обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
