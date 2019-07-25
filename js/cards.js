'use strict';
(function () {
  //  тип жилья
  var definitionTypeHousing = function (offerType) {
    switch (offerType) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }
    return offerType;
  };
  //  обработчик закрытия карточки нажатием ESC
  window.closeCardPopupEsc = function (evt) {
    if (evt.keyCode === 27) {
      window.removeElement('.map__card');
    }
    document.removeEventListener('keydown', window.closeCardPopupEsc);
  };

  //  обработчик закрытия карточки нажатием на елемент
  window.closeCardPopup = function () {
    window.removeElement('.map__card');
    document.removeEventListener('keydown', window.closeCardPopup);
  };
  //  функция отрисовки карточки
  window.renderCard = function (ads) {
    window.removeElement('.map__card');
    var similarMapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardsElement = similarMapCardTemplate.cloneNode(true);
    //  условие по ТЗ
    if (ads.offer) {
      //  заголовок
      cardsElement.querySelector('.popup__title').innerText = ads.offer.title;
      //  аватар
      cardsElement.querySelector('img').src = ads.author.avatar;
      //  адресс
      cardsElement.querySelector('.popup__text--address').innerText = ads.offer.address;
      //  цена
      cardsElement.querySelector('.popup__text--price').innerText = ads.offer.price + ' р/ночь';
      //  тип жилья
      cardsElement.querySelector('.popup__type').innerText = definitionTypeHousing(ads.offer.type);
      //  кол-во комнат / жильцов
      cardsElement.querySelector('.popup__text--capacity').innerText = 'комнат: ' + ads.offer.rooms + ' гостей: ' + ads.offer.guests;
      //  вреия заезда/выезда
      cardsElement.querySelector('.popup__text--time').innerText = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
      //  удобства
      var cardFature = cardsElement.querySelector('.popup__features');
      //  очищаем родмтельский елемент от содержимого
      cardFature.innerHTML = ' ';
      //  для каждого елемента массива создаём новый елемент и вставляем его в родительский
      ads.offer.features.forEach(function (elem) {
        cardFature.innerHTML += '<li class="popup__feature popup__feature--' + elem + '"></li>';
      });
      //  описание
      cardsElement.querySelector('.popup__description').innerText = ads.offer.description;
      //  фотографии
      var cardPhotos = cardsElement.querySelector('.popup__photos');
      //  очищаем родмтельский елемент от содержимого
      cardPhotos.innerHTML = '';
      //  для каждого елемента массива создаём новый елемент и вставляем его в родительский
      ads.offer.photos.forEach(function (elem) {
        if (elem) {
          cardPhotos.innerHTML += '<img src="' + elem + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
        }
      });
    }
    return cardsElement;
  };
})();
