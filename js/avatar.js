'use strict';
(function () {
  //  допустимые типы файлов картиновк
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var IMAGE_UPLOAD_PREVIEW_WIDTH = 'auto';
  var IMG_ELEMENT_WIDTH = '75px';
  var IMG_ELEMENT_HEIGHT = '75px';
  var IMG_ELEMENT_MARGIN_RIGHT = '5px';
  //  поле вставки картинок
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  //  картинка пина,которую нужно изменить
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  //  событие изменения
  var uploadImage = function (file, preview) {
    //   если что-то выбрано
    //  переводим всё в нижеий регистр для проверки
    var fileName = file.name.toLowerCase();
    //   проверяем  файл имеет ли одно из расширений
    var matches = FILE_TYPES.some(function (it) {
      // определяем, заканчивается ли строка символами другой строки
      return fileName.endsWith(it);
    });
    //  если имеет
    if (matches) {
      //  присваеваем переменной  конструктор
      var reader = new FileReader();
      //  вешаем на него событие загрузки
      reader.addEventListener('load', function () {
        //  задаем атрибут блоку  принимающему картинку результат работы
        preview.src = reader.result;
      });
      //  после завершения result-атрибута содержит data:URL-адрес, представляющий данные файла.
      reader.readAsDataURL(file);
    }
  };
  avatarFileChooser.addEventListener('change', function () {
    uploadImage(avatarFileChooser.files[0], avatarPreview);
  });

  avatarDropZone.addEventListener('drop', function (evt) {
    avatarFileChooser.files = evt.dataTransfer.files;
    uploadImage(avatarFileChooser.files[0], avatarPreview);
  });
  window.addEventListener('drop', function (evt) {
    evt.preventDefault();
  });
  window.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });


  //  реализация загрузки множества картинок
  // Для фотографий
  var photosDropZone = document.querySelector('.ad-form__drop-zone');
  var photosFileChooser = document.querySelector('.ad-form__input[type=file]');
  var photoWrapper = document.querySelector('.ad-form__photo');
  photoWrapper.style.width = IMAGE_UPLOAD_PREVIEW_WIDTH;
  var createPhotoPreview = function () {

    var image = document.createElement('img');
    image.style.width = IMG_ELEMENT_WIDTH;
    image.style.height = IMG_ELEMENT_HEIGHT;
    image.style.marginRight = IMG_ELEMENT_MARGIN_RIGHT;
    photoWrapper.appendChild(image);
    return image;
  };
  photosFileChooser.addEventListener('change', function () {
    Array.from(photosFileChooser.files).forEach(function (element) {
      uploadImage(element, createPhotoPreview());
    });
  });
  photosDropZone.addEventListener('drop', function (evt) {
    photosFileChooser.files = evt.dataTransfer.files;
    Array.from(photosFileChooser.files).forEach(function (element) {
      uploadImage(element, createPhotoPreview());
    });
  });
})();
