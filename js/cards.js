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
  window.closeCardPopupEsc = function (evt) {
    if (evt.keyCode === 27) {
      document.querySelectorAll('.map__card').forEach(function (elem) {
        elem.parentNode.removeChild(elem);
      });
    }
    document.removeEventListener('keydown', window.closeCardPopupEsc);
  };
  window.closeCardPopup = function () {
    document.querySelectorAll('.map__card').forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };
  //  событие кликак по пину
  window.onMapPinClick = function (evt) {
    if (evt.target.classList.contains('new-pin')) {
      window.targetPath = evt.target.firstChild.alt;
    } else {
      window.targetPath = evt.target.alt;
    }
    // отрисовка карточек пинов
    var similarMapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    window.closeCardPopup();
    var renderCards = function () {
      var cardsElement = similarMapCardTemplate.cloneNode(true);
      window.apartmentsListSlice.forEach(function (ads) {
        if (window.targetPath === ads.offer.title) {
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
            if (elem !== undefined) {
              cardPhotos.innerHTML += '<img src="' + elem + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
            }
          });
        }
      });
      return cardsElement;
    };
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCards());
    var mapPin = document.querySelector('.map__pins');
    mapPin.appendChild(fragment);
    var onCloseCardButton = document.querySelector('.popup__close');
    onCloseCardButton.addEventListener('click', window.closeCardPopup);
    document.addEventListener('keydown', window.closeCardPopupEsc);
  };
})();
