<?php
// Database configuration
$host = 'localhost'; // Database host
$db   = 'your_database_name'; // Database name
$user = 'your_database_user'; // Database user
$pass = 'your_database_password'; // Database password

// Create a new MySQLi connection
$conn = new mysqli($host, $user, $pass, $db);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>
