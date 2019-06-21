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

//  высота mapPinMain
var mapPinMainHeigth = mapPinMain.offsetHeight;
//  ширина mapPinMain
var mapPinMainWidth = mapPinMain.offsetWidth;
//  кординаты pin*a на карте
var mapPinCordinatY = mapPinMain.offsetTop + mapPinMainHeigth / 2;
var mapPinCordinatX = mapPinMain.offsetLeft + mapPinMainWidth / 2;
// помещаемем координаты mapPinCordinats в noticeBlockFormAdress
noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;


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
  //  кординаты pin*a на карте
  mapPinCordinatY = mapPinMain.offsetTop + mapPinMainHeigth + 22;
  mapPinCordinatX = mapPinMain.offsetLeft + mapPinMainWidth / 2;
  // помещаемем координаты mapPinCordinats в noticeBlockFormAdress
  noticeBlockFormAdress.value = mapPinCordinatX + ', ' + mapPinCordinatY;
  mapPin.appendChild(fragment);
});

//  5
//  заголовок обьявления
var noticeTitle = noticeBlock.querySelector('.notice__title');
//  добавляем арибуты
noticeTitle.setAttribute('minlength', 30);
noticeTitle.setAttribute('maxlength', 100);
noticeTitle.setAttribute('require', true);
noticeTitle.setAttribute('type', 'text');

//  цена за ночь обьявления
var noticePrice = noticeBlock.querySelector('#price');
noticePrice.setAttribute('type', 'number');
noticePrice.min = 100;
noticePrice.setAttribute('require', true);
// тип жилья обьявления
var noticeTypeOfHousing = noticeBlock.querySelector('#type');

//  зависимость мин цены от выбора типа жилья цепляем на событие change
noticeTypeOfHousing.addEventListener('change', function () {

  switch (noticeTypeOfHousing.value) {
    case 'bungalo':
      noticePrice.min = '0';
      noticePrice.placeholder = '0';
      break;
    case 'flat':
      noticePrice.min = '1000';
      noticePrice.placeholder = '1000';
      break;
    case 'house':
      noticePrice.min = '5000';
      noticePrice.placeholder = '5000';
      break;
    case 'palace':
      noticePrice.min = '10000';
      noticePrice.placeholder = '10000';
      break;
  }

});

//  адрес обьявления
var noticeAdress = noticeBlock.querySelector('#address');
//  добавление атрибута координатам обьявления
noticeAdress.setAttribute('readonly', true);
//  время заезда
var noticeTineOfIncom = noticeBlock.querySelector('#timein');
//  время выезда
var noticeTineOfOutcom = noticeBlock.querySelector('#timeout');
//  количество комнат
var roomsNumber = noticeBlock.querySelector('#room_number');
// количество гостей
var capacityGests = noticeBlock.querySelector('#capacity');

//  синхронизация полей Время заезда/время выезда
noticeTineOfIncom.addEventListener('change', function () {

  switch (noticeTineOfIncom.value) {
    case '12:00':
      noticeTineOfOutcom.value = '12:00';
      break;
    case '13:00':
      noticeTineOfOutcom.value = '13:00';
      break;
    case '14:00':
      noticeTineOfOutcom.value = '14:00';
      break;
  }
});
noticeTineOfOutcom.addEventListener('change', function () {

  switch (noticeTineOfOutcom.value) {
    case '12:00':
      noticeTineOfIncom.value = '12:00';
      break;
    case '13:00':
      noticeTineOfIncom.value = '13:00';
      break;
    case '14:00':
      noticeTineOfIncom.value = '14:00';
      break;
  }
});
//  набросал как примерно будет выглядеть эта зависимость
//  Поле «Количество комнат» синхронизировано с полем «Количество мест»
roomsNumber.addEventListener('change', function () {
  switch (roomsNumber.value) {
    case '1':
      capacityGests.children[0].disabled = true;
      capacityGests.children[1].disabled = true;
      capacityGests.children[2].disabled = false;
      capacityGests.children[3].disabled = true;
      break;
    case '2':
      capacityGests.children[0].disabled = true;
      capacityGests.children[1].disabled = false;
      capacityGests.children[2].disabled = false;
      capacityGests.children[3].disabled = true;
      break;
    case '3':
      capacityGests.children[0].disabled = false;
      capacityGests.children[1].disabled = false;
      capacityGests.children[2].disabled = false;
      capacityGests.children[3].disabled = true;
      break;
    case '100':
      capacityGests.children[0].disabled = true;
      capacityGests.children[1].disabled = true;
      capacityGests.children[2].disabled = true;
      capacityGests.children[3].disabled = false;
      break;
  }
});
//  обратная зависимость форм «Количество комнат» с «Количество мест»
capacityGests.addEventListener('change', function () {
  switch (capacityGests.value) {
    case '3':
      roomsNumber.children[0].disabled = true;
      roomsNumber.children[1].disabled = true;
      roomsNumber.children[2].disabled = false;
      roomsNumber.children[3].disabled = true;
      break;
    case '2':
      roomsNumber.children[0].disabled = true;
      roomsNumber.children[1].disabled = false;
      roomsNumber.children[2].disabled = false;
      roomsNumber.children[3].disabled = true;
      break;
    case '1':
      roomsNumber.children[0].disabled = false;
      roomsNumber.children[1].disabled = false;
      roomsNumber.children[2].disabled = false;
      roomsNumber.children[3].disabled = true;
      break;
    case '0':
      roomsNumber.children[0].disabled = true;
      roomsNumber.children[1].disabled = true;
      roomsNumber.children[2].disabled = true;
      roomsNumber.children[3].disabled = false;
      break;
  }
});
