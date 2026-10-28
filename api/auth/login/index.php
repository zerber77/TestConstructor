<?php
header('Access-Control-Allow-Origin: http://localhost:9000');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Ramsey\UUID\Uuid; 

require("../Firebase/JWT.php");
require("../Firebase/Key.php");
// DB connection
include("../../const.php");

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO("mysql:host=$db; dbname=$dbname; charset=utf8mb4", $dbuser, $dbpasswd, $options);
} catch (\PDOException $e) {
  throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  //  JSON from POST 
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  if (!$data || !isset($data['login']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request data']);
    exit;
  }

  $login = $data['login'];
  $plainPassword = $data['password'];

  // check login is free
  try {
    $stmt = $pdo->prepare("SELECT id, name, password, role FROM users WHERE login = :login");
    $stmt->execute(['login' => $login]);
  }catch (\PDOException $e) {
    echo json_encode(['error' => 'Ошибка БД'.$e->getMessage()]);
    exit;
  }
  $user = $stmt->fetch();

  if (!$user || !password_verify($plainPassword, $user['password'])) {
//    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Uncorrect login / password or you is unregistered']);
    exit;
  }

    // Генерируем JWT токен
  $payload = [
    "iss" => "http://mysite.org",
    "aud" => "http://mysite.com",
    "iat" => time(),
    "exp" => time() + 5,
    "data" => [
      "id" => $user['id'],
      "login" => $login,
      "name" => $user['name'],
      "role" => $user['role'],
    ]
  ];
  $jwt = JWT::encode($payload, $key,'HS256');

    // send token to client
    http_response_code(200); // OK
    echo json_encode(['token_data' => $payload,'token' => $jwt]);
}
?>
