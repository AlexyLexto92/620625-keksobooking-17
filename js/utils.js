'use strict';
(function () {
  //  функция добавления атрибута Disabled в елемента массива
  window.chengeElementDisabledAtribute = function (elementArray, bool) {
    for (var i = 0; i < elementArray.length; i++) {
      elementArray[i].disabled = bool;
    }
    return elementArray;
  };
})();
