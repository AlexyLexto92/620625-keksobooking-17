'use strict';
(function () {

  //  тип жилья
  var housingTypes = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  //  обработчик закрытия карточки нажатием ESC
  var onCardPopupCloseEsc = function (evt) {
    window.isEsc(evt, onCardPopupClose);
  };

  //  обработчик закрытия карточки нажатием на елемент
  var onCardPopupClose = function () {
    window.removeElement('.map__card');
    document.removeEventListener('keydown', onCardPopupClose);
  };
  var similarMapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  //  функция отрисовки карточки
  var renderCard = function (ads) {
    window.removeElement('.map__card');
    var card = similarMapCardTemplate.cloneNode(true);
    //  условие по ТЗ
    if (ads.offer) {
      //  заголовок
      card.querySelector('.popup__title').innerText = ads.offer.title;
      //  аватар
      card.querySelector('img').src = ads.author.avatar;
      //  адресс
      card.querySelector('.popup__text--address').innerText = ads.offer.address;
      //  цена
      card.querySelector('.popup__text--price').innerText = ads.offer.price + ' р/ночь';
      //  тип жилья
      card.querySelector('.popup__type').innerText = housingTypes[ads.offer.type];
      //  кол-во комнат / жильцов
      card.querySelector('.popup__text--capacity').innerText = 'комнат: ' + ads.offer.rooms + ' гостей: ' + ads.offer.guests;
      //  вреия заезда/выезда
      card.querySelector('.popup__text--time').innerText = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout;
      //  удобства
      var cardFature = card.querySelector('.popup__features');
      //  очищаем родмтельский елемент от содержимого
      cardFature.innerHTML = ' ';
      //  для каждого елемента массива создаём новый елемент и вставляем его в родительский
      ads.offer.features.forEach(function (elem) {
        cardFature.innerHTML += '<li class="popup__feature popup__feature--' + elem + '"></li>';
      });
      //  описание
      card.querySelector('.popup__description').innerText = ads.offer.description;
      //  фотографии
      var cardPhotos = card.querySelector('.popup__photos');
      //  очищаем родмтельский елемент от содержимого
      cardPhotos.innerHTML = '';
      //  для каждого елемента массива создаём новый елемент и вставляем его в родительский
      ads.offer.photos.forEach(function (elem) {
        if (elem) {
          cardPhotos.innerHTML += '<img src="' + elem + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
        }
      });
    }
    return card;
  };
  window.cards = {
    onCardPopupCloseEsc: onCardPopupCloseEsc,
    onCardPopupClose: onCardPopupClose,
    renderCard: renderCard
  };
})();
