'use strict';
(function () {
  //  функция добавления/удаления атрибута Disabled в елемента массива
  window.changeElementDisabledAtribute = function (elementArray, bool) {
    for (var i = 0; i < elementArray.length; i++) {
      elementArray[i].disabled = bool;
    }
  };
})();
