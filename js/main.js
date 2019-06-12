'use strict';
var mapVision = document.querySelector('.map');
mapVision.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pin');
var mapPinWidth = mapPin.offsetWidth; //ширина окна
var mapPinHeight = mapPin.offsetHeight; //высота окна
var mapHeigth = mapVision.offsetHeight; //высота пина
var mapWidth = mapVision.offsetWidth; //ширина пина

//тип квартиры
var typeArray = ['palace', 'flat', 'house', 'bungalo'];

//создания массива с адресами аватарок
var avatarArray = [];

function avatar(intArray, count) {
  for (var i = 1; i <= count; i++) {
    if (i < 10 && i > 0) {
      var s = "0" + i;
    } else {
      s = i;
    }
    var source = 'img/avatars/user' + s + '.png';
    intArray.push(source);
  }
  return intArray;
};
avatar(avatarArray, 8);



//сортировка ейтса
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
shuffleArray(avatarArray);

//функция генерации КООРДИНАТ
var locations = [];


function randomNumber(min, max, count, intArray) {
  for (var i = 1; i <= count; i++) {
    intArray.push({
      x: Math.round(0 + Math.random() * (mapWidth - 0)) - mapPinHeight,
      y: Math.round(min + Math.random() * (max - min)) - mapPinWidth / 2
    });
  }
  return intArray[i];
}
randomNumber(130, 630, 8, locations);

//общий обьект оьектов для построения
var similarAds = [];
function generatePinArray(targetArray, count) {

  for (var i = 0; i <= count - 1; i++) {
    var author = {};
    var offer = {};
    var location = {};
    author.avatar = avatarArray[i];
    offer.type = typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))];
    location.x = locations[i].x;
    location.y = locations[i].y;
    targetArray.push({
      author,
      offer,
      location
    });
  }
  return targetArray;
}
generatePinArray(similarAds, 8);
console.log(similarAds);

//3
/*
var similarMapPin=document.querySelector('#pin').content.querySelector('.map__pin')


function createPin(left,top,src,alt){
  var PinElement=similarMapPin.cloneNode(true);
}
*/
