#!/usr/bin/php

<?
$data = $_POST['data'];
$URL_REF = parse_url($_SERVER['HTTP_REFERER']);
$URL_REF_HOST = $URL_REF['host'];
$URL_REF_PATH = str_replace("/", "_", $URL_REF['path']);
if (!file_exists('data/' . $URL_REF_HOST . $URL_REF_PATH)) {
    mkdir('data/' . $URL_REF_HOST . $URL_REF_PATH, 0777, true);
}
$a = fopen("data/" . $URL_REF_HOST . $URL_REF_PATH . "/Response_" . date('Y-m-d_H-i-s') . "_" . rand(1,5000) .  ".txt", "a");
fwrite($a, $data . "\n");
fclose($a);
?>