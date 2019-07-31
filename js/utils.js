'use strict';
(function () {
  var ESC_BUTOON = 'Escape';
  window.isEsc = function (evt, action) {
    if (evt.code === ESC_BUTOON) {
      action();
    }
  };
  //  функция устранения дребезга
  window.debounce = function (time, cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, time);
    };
  };
  //  функция добавления/удаления атрибута Disabled в елемента массива
  window.changeElementDisabledAtribute = function (elementArray, bool) {
    for (var i = 0; i < elementArray.length; i++) {
      elementArray[i].disabled = bool;
    }
  };
  //  удаление елементов с карты
  window.removeElement = function f(element) {
    document.querySelectorAll(element).forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };
  //  сортировка ейтса ,на вход берет массив array
  window.yatesSort = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    //  по логике этого  сортировщика он выводит входящий массив
    return array;
  };
})();
