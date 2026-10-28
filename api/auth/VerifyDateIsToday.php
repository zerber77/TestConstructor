<?php

function verifyDateIsToday($inputDate):bool
{
    $dateObject = DateTime::createFromFormat('Y-m-d', $inputDate);

    // Проверяем корректность формата даты
    if (!$dateObject || $dateObject->format('Y-m-d') !== $inputDate) {
        return false;
    }

    // Получаем текущую дату
    $today = new DateTime('today');

    // Сравниваем даты
    if ($dateObject->format('Y-m-d') === $today->format('Y-m-d')) {
        return true;
    } else {
        return false;
    }
}
