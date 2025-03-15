<?php

$pahala = ["total" => 1000, "remaining" => 1000];
file_put_contents("pahala.json", json_encode($pahala));

session_start();
session_destroy();

echo "Pahala berhasil di-reset! 🎉";
?>
