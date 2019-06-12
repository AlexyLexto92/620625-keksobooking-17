'use strict';
var mapVision = document.querySelector('.map');
mapVision.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
var mapPinWidth = mapPin.offsetWidth; //  ширина окна
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth; // ширина пина
var pinHeight = pin.offsetHeight; //  высота пина

//  тип квартиры
var typeArray = ['palace', 'flat', 'house', 'bungalo'];

//  создания массива с адресами аватарок
var avatarArray = [];

function avatar(intArray, count) {
  for (var i = 1; i <= count; i++) {
    if (i < 10 && i > 0) {
      var s = '0' + i;
    } else {
      s = i;
    }
    var source = 'img/avatars/user' + s + '.png';
    intArray.push(source);
  }
  return intArray;
}
avatar(avatarArray, 8);

//  сортировка ейтса
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
shuffleArray(avatarArray);

//  функция генерации КООРДИНАТ
var locations = [];

function randomNumber(min, max, count, intArray) {
  for (var i = 1; i <= count; i++) {
    intArray.push({
      x: Math.round(0 + Math.random() * (mapPinWidth - 0)) - pinWidth / 2,
      y: Math.round(min + Math.random() * (max - min)) - pinHeight
    });
  }
  return intArray[i];
}
randomNumber(130, 630, 8, locations);

//  общий обьект оьектов для построения
var similarAds = [];

function generatePinArray(targetArray, count) {
  var author = {};
  var offer = {};
  var location = {};
  for (var i = 0; i <= count - 1; i++) {

    author = {
      avatar: avatarArray[i]
    };
    offer = {
      type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))]
    };
    location = {
      x: locations[i].x,
      y: locations[i].y
    };
    targetArray.push({ //  вот тут проблемное место,оно каким-то образом ломает сборку массива обьектов
      //  если же писать в ES6 всё сразу становиться гуд
      avatar: author,
      type: offer,
      x: location,
      y: location
    });
  }
  return targetArray;
}
generatePinArray(similarAds, 8);

//  3
var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


var createPin = function (properties) {
  var PinElement = similarMapPinTemplate.cloneNode(true);
  PinElement.style.top = properties.location.y + 'px';
  PinElement.style.left = properties.location.x + 'px';
  PinElement.querySelector('img').setAttribute('src', properties.author);
  PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативній текст');
  return PinElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < similarAds.length; i++) {
  fragment.appendChild(createPin(similarAds[i]));

}
mapPin.appendChild(fragment);
