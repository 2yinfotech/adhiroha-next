<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
include "../dp.php";

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Helper function to sanitize strings (replacement for FILTER_SANITIZE_STRING)
function sanitize_string($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// Retrieve and sanitize POST data
$name = isset($_POST['b_name']) ? sanitize_string($_POST['b_name']) : '';
$gender = isset($_POST['b_gender']) ? sanitize_string($_POST['b_gender']) : '';
$country = isset($_POST['b_country']) ? sanitize_string($_POST['b_country']) : '';
$number = isset($_POST['b_number']) ? sanitize_string($_POST['b_number']) : '';
$email = filter_input(INPUT_POST, 'b_email', FILTER_SANITIZE_EMAIL) ?? '';
$course = isset($_POST['b_course']) ? sanitize_string($_POST['b_course']) : '';
$acco = isset($_POST['b_acco']) ? sanitize_string($_POST['b_acco']) : 'Triple Sharing';
$ramount = filter_input(INPUT_POST, 'b_ramount', FILTER_VALIDATE_FLOAT) ?? 0;
$balance = filter_input(INPUT_POST, 'b_balance', FILTER_VALIDATE_FLOAT) ?? 0;
$city = isset($_POST['b_city']) ? sanitize_string($_POST['b_city']) : '';
$month = isset($_POST['b_month']) ? sanitize_string($_POST['b_month']) : '';
$bmonth_y = isset($_POST['bmonth_y']) ? sanitize_string($_POST['bmonth_y']) : 'N/A';
$room_no = isset($_POST['room_no']) ? sanitize_string($_POST['room_no']) : 'N/A';
$b_code = isset($_POST['b_code']) ? sanitize_string($_POST['b_code']) : '';
$location = isset($_POST['b_location']) ? sanitize_string($_POST['b_location']) : 'Rishikesh';
$status = isset($_POST['b_status']) ? sanitize_string($_POST['b_status']) : 'pending';
$stime = isset($_POST['b_stime']) ? sanitize_string($_POST['b_stime']) : date('Y-m-d H:i:s');
$mail = isset($_POST['b_mail']) ? sanitize_string($_POST['b_mail']) : '1';
$a_paid = filter_input(INPUT_POST, 'a_paid', FILTER_VALIDATE_FLOAT) ?? null;
$p_method = isset($_POST['p_method']) ? sanitize_string($_POST['p_method']) : 'N/A';
$r_no = isset($_POST['r_no']) ? sanitize_string($_POST['r_no']) : 'N/A';
$remarks = isset($_POST['b_remarks']) ? sanitize_string($_POST['b_remarks']) : 'N/A';
$reg = isset($_POST['b_reg']) ? sanitize_string($_POST['b_reg']) : 'N/A';
$inv = filter_input(INPUT_POST, 'b_inv', FILTER_VALIDATE_INT) ?? null;
$check_inv = filter_input(INPUT_POST, 'b_check_inv', FILTER_VALIDATE_INT) ?? null;
$source = isset($_POST['b_source']) ? sanitize_string($_POST['b_source']) : 'website';
$ref_code = isset($_POST['b_ref_code']) ? sanitize_string($_POST['b_ref_code']) : '';
$c_form = isset($_POST['c_form']) ? sanitize_string($_POST['c_form']) : 'Not-Uploaded';
$c_name = isset($_POST['c_name']) ? sanitize_string($_POST['c_name']) : '';

// Validate required fields
$required_fields = [
    'b_name' => $name,
    'b_gender' => $gender,
    'b_country' => $country,
    'b_number' => $number,
    'b_email' => $email,
    'b_course' => $course,
    'b_code' => $b_code
];

foreach ($required_fields as $field => $value) {
    if (empty($value)) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

// Prepare SQL statement
$stmt = $conn->prepare("
    INSERT INTO bookings (
        b_name, b_gender, b_country, b_number, b_email, b_course,
        b_acco, b_ramount, b_balance, b_city, b_month, bmonth_y,
        room_no, b_code, b_location, b_status, b_stime, b_mail,
        a_paid, p_method, r_no, b_remarks, b_reg, b_inv,
        b_check_inv, b_source, c_form, c_name, b_ref_code
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to prepare SQL statement: ' . $conn->error]);
    exit;
}

// Bind parameters with correct types
// s = string, d = double/float, i = integer
$stmt->bind_param(
    "sssssssddssssssssdsssssiiisss",
    $name, $gender, $country, $number, $email, $course,
    $acco, $ramount, $balance, $city, $month, $bmonth_y,
    $room_no, $b_code, $location, $status, $stime, $mail,
    $a_paid, $p_method, $r_no, $remarks, $reg, $inv,
    $check_inv, $source, $c_form, $c_name, $ref_code
);

// Execute statement
if ($stmt->execute()) {
    $insert_id = $conn->insert_id;
    
    // Send email using PHPMailer
    require 'vendors/autoload.php';
    
    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@adhiroha.com';
        $mail->Password = 'qplwjiijsarjupwq';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        
        $mail->setFrom('info@adhiroha.com', 'Adhiroha Yoga Centre');
        $mail->addReplyTo('info@adhiroha.com', 'Adhiroha Yoga Centre');
          //   $mail->addAddress('aryan.sammy123@gmail.com', 'Sammy');
    $mail->addAddress('info@adhiroha.com', 'Adhiroha Yoga Centre');
        
        $ccRecipients = array("2yinfotech@gmail.com");
        foreach ($ccRecipients as $ccRecipient) {
            $mail->addCC($ccRecipient);
        }
        
        // Set email subject and message
        $subject = "$name Started Registration on adhiroha.com";
        $message = "<p><strong>$name Started Registration on adhiroha.com</strong></p>
                    <table border='1'>
                        <tr><td>Batch</td><td>$month</td></tr>
                        <tr><td>Course Type</td><td>$course</td></tr>
                        <tr><td>Country</td><td>$country</td></tr>
                        <tr><td>Email</td><td>$email</td></tr>
                        <tr><td>Name</td><td>$name</td></tr>
                        <tr><td>Contact</td><td>$number</td></tr>
                        <tr><td>Gender</td><td>$gender</td></tr>
                        <tr><td>City</td><td>$city</td></tr>
                        <tr><td>Location</td><td>$location</td></tr>
                    </table>";
        
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->isHTML(true);
        
        // Send email
        $mail->send();
        echo json_encode(['success' => true, 'id' => $insert_id, 'message' => 'Student added and email sent successfully.']);
    } catch (Exception $e) {
        echo json_encode(['success' => true, 'id' => $insert_id, 'message' => 'Student added, but email could not be sent: ' . $mail->ErrorInfo]);
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to execute SQL statement: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>