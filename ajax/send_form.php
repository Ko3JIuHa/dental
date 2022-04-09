<?php

//Параметры почтового соеденения
require 'mail.php';

//Обработка входных данных
$fio = htmlspecialchars($_POST['fio']);
$phone = htmlspecialchars($_POST['tel']);
$service_name = htmlspecialchars($_POST['service_name']);
$date = htmlspecialchars($_POST['date']);
$time = htmlspecialchars($_POST['time']);

//Получаем название клиники
$klinika = '';
if ((int)$service_name === 1) {
  $klinika = 'ул.Фёдора Полетаева д.9А';
} else if ((int)$service_name === 2) {
  $klinika = 'ул.2ая-Мелитопольская д.21 к.3';
} else if ((int)$service_name === 3) {
  $klinika = 'ул.Скобелевская д.25';
} else if ((int)$service_name === 4) {
  $klinika = 'Северный бульвар д.7Б';
}

//Формируем тело письма
$message = "
  ФИО: $fio<br>
  Телефон: $phone<br>
  Дата: $date<br>
  Время: $time<br>
  Клиника: $klinika
";

//Отправка письма через smtp
mailSend('idm7mnvuwmokjivosite-order@jivo-mail.com', 'Новая заявка с сайта dental-medical.ru', $message);
