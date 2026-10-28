<?php
date_default_timezone_set('UTC');

// Load environment variables from .env file
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = parse_ini_file(__DIR__ . '/../.env');
    foreach ($dotenv as $key => $value) {
        $_ENV[$key] = $value;
    }
}

$db = $_ENV['DB_HOST'] ?? 'localhost';
$dbname = $_ENV['DB_NAME'] ?? 'TestConstructor';
$dbuser = $_ENV['DB_USER'] ?? 'root';
$dbpasswd = $_ENV['DB_PASSWORD'] ?? '';

$key = $_ENV['JWT_SECRET_KEY'] ?? 'fallback-key'; // Секретный ключ теперь в .env


//$key = "qwerty";

// $dblocation = "localhost";
// $dbname = "TestConstructor";
// $dbuser = "root";
// $dbpasswd = "";
// $dbcnx = @mysqli_connect($dblocation,$dbuser,$dbpasswd, $dbname);
// if ($dbcnx -> connect_errno) {
//   echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
//   exit();
// }
// $key = "Very_Strong_Key";
//mysqli_query($dbcnx, "SET NAMES utf8");



