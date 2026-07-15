<?php
include "../dp.php";

// This script should be called after PayPal payment is completed
// For simplicity, we assume payment is confirmed manually or via a return URL
// In a production environment, use PayPal IPN to verify the payment

// Get the student IDs from the session or URL parameter
// For this example, assume they are passed via GET (not secure, use sessions in production)
$student_ids = isset($_GET['student_ids']) ? explode(',', $_GET['student_ids']) : [];

if (empty($student_ids)) {
    die(json_encode(['error' => 'No student IDs provided']));
}

// Get the selected accommodation and room from the URL (or session)
$sharing_type = isset($_GET['sharing_type']) ? $_GET['sharing_type'] : '';
$room_name = isset($_GET['room_name']) ? $_GET['room_name'] : '';
$course = isset($_GET['course']) ? $_GET['course'] : '';

if (empty($sharing_type) || empty($room_name) || empty($course)) {
    die(json_encode(['error' => 'Missing required parameters']));
}

// Determine accommodation type
$acco = $sharing_type === 'triple' ? 'Triple Sharing' : 'Double Sharing';

// Fetch batch details to get total fees (assuming you have this data)
$batch_details = json_decode(file_get_contents('get_batch_details.php?id=' . $_GET['batch_id']), true);
$total_fee = $sharing_type === 'triple' ? $batch_details['t_triple'] : $batch_details['t_double'];

// Calculate balance fee
$courseTypeMap = [
    "200 Hour YTTC" => 200,
    "300 Hour YTTC" => 300,
    "500 Hour YTTC" => 500,
    "Sound Healing YTTC" => 100
];
$registrationFees = [
    200 => 300,
    300 => 500,
    500 => 750,
    100 => 100
];
$course_type = $courseTypeMap[$course];
$registration_fee = $registrationFees[$course_type];
$balance_fee = $total_fee - $registration_fee;

// Update each student's booking in the database
foreach ($student_ids as $student_id) {
    $stmt = $conn->prepare("UPDATE bookings SET b_status = ?, b_acco = ?, room_no = ?, b_balance = ?, p_method = ? WHERE id = ?");
    $status = 'confirmed';
    $payment_method = 'Paypal';
    $stmt->bind_param("sssssi", $status, $acco, $room_name, $balance_fee, $payment_method, $student_id);

    if (!$stmt->execute()) {
        echo json_encode(['error' => 'Error updating booking: ' . $stmt->error]);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();
}

$conn->close();
echo json_encode(['success' => true, 'message' => 'Payment confirmed and booking updated']);
?>