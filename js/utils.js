'use strict';
(function () {
  //  функция добавления/удаления атрибута Disabled в елемента массива
  window.changeElementDisabledAtribute = function (elementArray, bool) {
    for (var i = 0; i < elementArray.length; i++) {
      elementArray[i].disabled = bool;
    }
  };
  //  удаление елементов с карты
  window.removeElement = function (element) {
    document.querySelectorAll(element).forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };

  window.onInactiveState = function () {
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
    //  картинка пина,которую изменили
    var preview = document.querySelector('.map__pin--main img');
    preview.src = 'img/muffin-red.svg';
  };
  window.showCard = function () {
    var newPins = document.querySelectorAll('.new-pin');
    //  нажатие на любой из пинов
    newPins.forEach(function (elem) {
      elem.addEventListener('click', window.onMapPinClick);
    });
  };
})();
