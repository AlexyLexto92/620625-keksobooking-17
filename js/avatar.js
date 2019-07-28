'use strict';
(function () {
  //  допустимые типы файлов картиновк
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imageUploadPreviewWidth = 'auto';
  var imageUploadPreviewMinWidth = '70px';
  var imgElementWidth = 75;
  var imgElementHeight = 75;
  var imgElementMarginRight = '5px';
  //  поле вставки картинок
  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  //  картинка пина,которую нужно изменить
  var preview = document.querySelector('.ad-form-header__preview img');
  //  событие изменения
  fileChooser.addEventListener('change', function () {
    //   если что-то выбрано
    var file = fileChooser.files[0];
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
  });
  //  реализация загрузки множества картинок
  //  поле вставки картинок
  var imageUploadChooser = document.querySelector('.ad-form__upload input[type=file]');
  //  поле в которум отображаються картинки
  var imageUploadPreview = document.querySelector('.ad-form__photo');

  imageUploadChooser.addEventListener('change', function () {
    var file = imageUploadChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        //  создаём елемента img
        var imgElement = document.createElement('img');
        //  добавляем кго в поле отбражения
        imageUploadPreview.appendChild(imgElement);
        var reader = new FileReader();
        //  для каждой загрузки изображения добавляем стили как картинке так и принимающему блоку
        reader.addEventListener('load', function () {
          imageUploadPreview.style.width = imageUploadPreviewWidth;
          imageUploadPreview.style.minWidth = imageUploadPreviewMinWidth;
          imgElement.classList.add('ad-form__photo-item');
          imgElement.src = reader.result;
          imgElement.width = imgElementWidth;
          imgElement.height = imgElementHeight;
          imgElement.style.marginRight = imgElementMarginRight;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
