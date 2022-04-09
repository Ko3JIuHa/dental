$(document).ready(function () {
  //Отправка ajax формы
  $(".ajax_form").submit(function (event) {
    event.preventDefault();
    //Запрос
    $.ajax({
      type: $(this).attr("method"),
      url: $(this).attr("action"),
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function (res
      ) {
        console.log(res);
        //очищаем поля формы
        $('#send_form_name').val('');
        $('#send_form_phone').val('');
        $('#datepicker').val('');
        $('#begintime').val('');

        $('#modal__mail').show();

        setTimeout(() => {
          $('#modal__mail').hide();
        }, 1800);
      }
    });
  });
});