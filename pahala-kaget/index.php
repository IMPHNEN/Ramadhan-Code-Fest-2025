<?php

$pahala = json_decode(file_get_contents("pahala.json"), true);

$totalPahala = $pahala['total'];
$sisaPahala = $pahala['remaining'];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pahala Kaget</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
    </style>
</head>
<body>

<h1>🎁 Pahala Kaget! 🎁</h1>
<p>Total Pahala: <?= $totalPahala ?></p>
<p>Sisa Pahala: <?= $sisaPahala ?></p>

<?php if ($sisaPahala > 0): ?>
    <button onclick="claimPahala()">Klaim Pahala</button>
<?php else: ?>
    <p style="color: red;">Pahala sudah habis! 😢</p>
<?php endif; ?>

<script>
function claimPahala() {
    fetch('claim.php')
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));
}
</script>

</body>
</html>
