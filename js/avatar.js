'use strict';
(function () {
  //  допустимые типы файлов картиновк
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  //  поле вставки картинок
  var fileChooser = document.querySelector('input[type=file]');
  //  картинка пина,которую нужно изменить
  var preview = document.querySelector('.map__pin--main img');
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
})();
