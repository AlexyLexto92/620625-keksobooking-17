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
    var mapPinCordinatY = mapPinMain.offsetTop + mapPinMainHeigth + 15 - 48;
    var mapPinCordinatX = mapPinMain.offsetLeft + Math.floor((mapPinMainWidth / 2));
    // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
    noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
    window.isDataLoad = false;
    window.isAppActive = false;
    //  картинка пина,которую изменили
    var preview = document.querySelector('.map__pin--main img');
    preview.src = 'img/muffin-red.svg';
  };

  //  сортировка ейтса ,на вход берет массив array
  function yatesSort(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    //  по логике этого  сортировщика он выводит входящий массив
    return array;
  }
  window.yatesSort = yatesSort;
})();
