'use strict';

var mapVision = document.querySelector('.map');
//  mapVision.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
var mapPinWidth = mapPin.offsetWidth; //  ширина окна
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth; // ширина пина
var pinHeight = pin.offsetHeight; //  высота пина

//  тип квартиры
var typeArray = ['palace', 'flat', 'house', 'bungalo'];

//  функция создания  массива значений src
function avatar(count) {
  //  обьявление временого массива
  var newArr = [];
  for (var i = 1; i <= count; i++) {
    //  условие по которому мы будем записывать числа в src если число > 10
    if (i < 10 || i > 0) {
      var s = '0' + i;
    } else {
      //  если i >=10 то "0" перед числом не ставиться
      s = i;
    }
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
var similarAds = generatePinArray(8);


//  3 часть задания
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
for (var i = 0; i < similarAds.length; i++) {
  fragment.appendChild(createPin(similarAds[i]));
}

//  большая метка нанеактивной карте
var mapPinMain = document.querySelector('.map__pin--main');
//  видимая часть карты

var formFieldAll = document.querySelector('.ad-form');
// находим все fieldset формы обьявления
var formFieldset = formFieldAll.querySelectorAll('fieldset');
//  форма фильтры
var formFilters = document.querySelector('.map__filters');
formFilters.classList.add('ad-form--disabled');
//  находим все select формы фильтров
var formFiltersFieldset = formFilters.querySelectorAll('select');
//  добавляем всем филдсетам disabled=true
addDisabled(formFiltersFieldset, true);

//  форма отправки обьявления
var noticeBlock = document.querySelector('.notice');
// форма блока отправки обьявления
var noticeBlockForm = noticeBlock.querySelector('.ad-form');
//  добаления атрабута ACTION
noticeBlockForm.action = 'https://js.dump.academy/keksobooking';
//  форма адресса  блока отправки обьявления
var noticeBlockFormAdress = noticeBlockForm.querySelector('#address');
//  функция добавления атрибута Disabled в елемента массива
function addDisabled(elementArray, bool) {
  for (i = 0; i < elementArray.length; i++) {
    elementArray[i].disabled = bool;
  }
  return elementArray;
}
//  добавляем всем филдсетам disabled=true
addDisabled(formFieldset, true);
//  событие при счелчке на pin
mapPinMain.addEventListener('click', function () {
  //  убираем класс map--faded
  mapVision.classList.remove('map--faded');
  //  убираем у формы  ad-form--disabled
  formFieldAll.classList.remove('ad-form--disabled');
  //  изменяем всем филдсетам disabled=false
  addDisabled(formFieldset, false);
  //  добавляем всем филдсетам disabled=false
  addDisabled(formFiltersFieldset, false);
  // разблокируем форму с фильтрами
  formFilters.classList.remove('ad-form--disabled');

  //  вычисляем размеры mapPinMain
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeigth = mapPinMain.offsetHeight;
  //  кординаты pin*a на карте
  var mapPinCordinatY = mapPinMain.offsetTop + mapPinMainHeigth + 22;
  var mapPinCordinatX = mapPinMain.offsetLeft + mapPinMainWidth / 2;
  // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
  noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
  mapPin.appendChild(fragment);
});
