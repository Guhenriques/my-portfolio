<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $title = $_POST['title'];
  $message = $_POST['message'];

  // Create a new PHPMailer instance
  $mail = new PHPMailer(true);

  try {
    // SMTP Configuration
    $mail->SMTPDebug = SMTP::DEBUG_OFF; // Disable verbose debug output
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Set your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'guhenriques1398@gmail.com'; // SMTP username
    $mail->Password = 'aveaqcsqyhltyopj'; // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
    $mail->Port = 465; // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // Sender and recipient
    $mail->setFrom('guhenriques1398@gmail.com', 'Message through my Portfolio');
    $mail->addAddress('guhenriques1398@gmail.com', 'GustavoTo');
    // Add more recipients or use BCC/CC if needed

    // Content
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = "<p>Name: $name<br>Email: $email<br>Message: $message</p>";
    $mail->AltBody = "Name: $name\nEmail: $email\nMessage: $message";

    $mail->send();
    $response = array('status' => 'success', 'message' => 'Message has been sent');
echo json_encode($response);;
  } catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
  }
} else {
  echo 'Invalid request method';
}
?>
