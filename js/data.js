'use strict';

//   МОДУЛЬ СОЗДАНИЯ ДАННЫХ
(function () {

  var mapPin = document.querySelector('.map__pins');
  var mapPinWidth = mapPin.offsetWidth; //  ширина окна

  //  тип квартиры
  var typeArray = ['palace', 'flat', 'house', 'bungalo'];

  //  функция создания  массива значений src
  function avatar(count) {
    //  обьявление временого массива
    var newArr = [];
    for (var i = 1; i <= count; i++) {
      //  условие по которому мы будем записывать числа в src если число > 10
      var s = (i < 10) ? ('0' + i) : i;
      newArr.push('img/avatars/user' + s + '.png');
    }
    return newArr;
  }
  //  создания массива с адресами аватарок
  var avatarArray = avatar(8);

  //  сортировка ейтса ,на вход берет массив array ,на выходе получаем массив arr
  function sortArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    //  по логике этого  сортировщика он выводит входящий массив
    return array;
  }
  //  создания сортированого массива с адресами аватарок
  var sortedAvatarArray = sortArray(avatarArray);

  //  функция генерации КООРДИНАТ
  function locationsCoordinats(min, max, count) {
    //   создание пустого массива
    var arr = [];
    for (var i = 1; i <= count; i++) {
      arr.push({
        x: Math.round(0 + Math.random() * (mapPinWidth - 0)),
        y: Math.round(min + Math.random() * (max - min))
      });
    }
    return arr;
  }
  //  создание  массива с координатами 'Х' и 'У'
  var locations = locationsCoordinats(130, 630, 8);
  //  функция для построения массива обьектов со свойствами
  function generatePinArray(count) {
    //  создал пустой массив для занесения в него всех данных
    var arr = [];
    for (var i = 0; i < count; i++) {
      //  пушим обьекты с свойствами в массив arr
      arr.push({
        author: {
          avatar: sortedAvatarArray[i]
        },
        offer: {
          type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))]
        },
        location: {
          x: locations[i].x,
          y: locations[i].y
        }
      });
    }
    return arr;
  }
  //  создание финального массива с  8 обьектами для отрисовки елементов pin
  window.similarAds = generatePinArray(8);
})();
