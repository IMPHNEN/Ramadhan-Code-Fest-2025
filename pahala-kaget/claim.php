<?php
session_start();

if (isset($_SESSION['claimed'])) {
    echo json_encode(["message" => "Kamu sudah klaim pahala, jangan serakah! 😆"]);
    exit;
}

$pahala = json_decode(file_get_contents("pahala.json"), true);

if ($pahala['remaining'] <= 0) {
    echo json_encode(["message" => "Pahala sudah habis! 😭"]);
    exit;
}

$amount = rand(10, 100);
if ($amount > $pahala['remaining']) {
    $amount = $pahala['remaining'];
}

$pahala['remaining'] -= $amount;
file_put_contents("pahala.json", json_encode($pahala));

$_SESSION['claimed'] = true;

echo json_encode(["message" => "Selamat! Kamu dapat pahala sebesar $amount! 🎉"]);
?>
