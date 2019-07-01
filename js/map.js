'use strict';
//  Модуль ПЕРЕТАСКИВАНИЯ ПОЛЬЩОВАТЕЛЬСКОГО ПИНА И ОТРИСОВКИ ПИНОВ НА КАРТE

// ОТРИСОВКА ПИНОВ

(function () {

  //  высота mapPinMain
  var mapPinMainHeigth = window.mapPinMain.offsetHeight;
  //  ширина mapPinMain
  var mapPinMainWidth = window.mapPinMain.offsetWidth;
  //  кординаты pin*a на карте
  var mapPinCordinatY = window.mapPinMain.offsetTop + Math.floor(mapPinMainHeigth / 2);
  var mapPinCordinatX = window.mapPinMain.offsetLeft + Math.floor((mapPinMainWidth / 2));
  // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
  window.noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;


  // отрисовка пинов

  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createPin = function (properties) {
    var PinElement = similarMapPinTemplate.cloneNode(true);
    PinElement.style.top = properties.location.y - window.pinHeight + 'px';
    PinElement.style.left = properties.location.x - window.pinWidth / 2 + 'px';
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
  window.mapPinMain.addEventListener('mousedown', function (evt) {
    //  убираем класс map--faded
    window.mapVision.classList.remove('map--faded');
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
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      //  прописываем условие ограничений
      var positionPinY = window.mapPinMain.offsetTop - shift.y;
      if (positionPinY >= 130 - mapPinMainHeigth - 15 && positionPinY <= 630 - mapPinMainHeigth - 15) {
        window.mapPinMain.style.top = positionPinY + 'px';
      }
      var positionPinX = window.mapPinMain.offsetLeft - shift.x;
      if (positionPinX >= Math.floor((mapPinMainWidth / 2)) * (-1) && positionPinX <= window.mapPinWidth + (Math.floor(mapPinMainWidth / 2)) * (-1)) {
        window.mapPinMain.style.left = positionPinX + 'px';
      }
      //  новые кординаты pin*a на карте
      mapPinCordinatY = window.mapPinMain.offsetTop + mapPinMainHeigth + 15;
      mapPinCordinatX = window.mapPinMain.offsetLeft + Math.floor((mapPinMainWidth / 2));
      // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
      window.noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;

    };
    var onMouseUp = function (upEvt) {

      upEvt.preventDefault();
      //  определнние координат на случай если жвижение попапа отсутствует и происходит только нажатие
      window.noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
      if (!appActive) {
        //  убираем у формы  ad-form--disabled
        window.formFieldAll.classList.remove('ad-form--disabled');
        //  изменяем всем филдсетам disabled=false
        window.chengeElementDisabledAtribute(window.formFieldset, false);
        //  добавляем всем филдсетам disabled=false
        window.chengeElementDisabledAtribute(window.formFiltersFieldset, false);
        // разблокируем форму с фильтрами
        window.formFilters.classList.remove('ad-form--disabled');
        window.mapPin.appendChild(fragment);
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
