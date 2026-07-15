<?php
// Disable error display
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/your/error.log');

ob_start();
header('Content-Type: application/json');

include "../dp.php";

// Input
$month  = isset($_GET['month']) ? $_GET['month'] : '';
$gender = isset($_GET['gender']) ? $_GET['gender'] : '';

if (!$month || !$gender) {
    echo json_encode(['error' => 'Month or gender not provided']);
    exit;
}

$validMonths = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
];

$month = ucfirst(strtolower($month));

if (!in_array($month, $validMonths)) {
    echo json_encode(['error' => 'Invalid month']);
    exit;
}

if (!in_array($gender, ['male','female'])) {
    echo json_encode(['error' => 'Invalid gender']);
    exit;
}

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Room groups
$doubleRooms = ['SATYA','SHANTI','SANKALPA','BODHI'];
$tripleRooms = ['ANUSHASANA','SHADHNA','BHAKTI','ANANDA','NIYAMA','ABHYASA','NIRVANA','DHYANA'];

$roomsWithMales = [];
$roomsWithFemales = [];
$occupancy = [];

// Fetch occupants
$q = "SELECT ro_name, `$month` AS occupants FROM rooms_name";
$r = mysqli_query($conn, $q);

while ($row = mysqli_fetch_assoc($r)) {

    $base = preg_replace('/-[A-Z]$/', '', $row['ro_name']);
    $students = $row['occupants'] ? explode(',', $row['occupants']) : [];

    if (!isset($occupancy[$base])) $occupancy[$base] = 0;
    $occupancy[$base] += count($students);

    $hasMale = false;
    $hasFemale = false;

    foreach ($students as $s) {
        $s = trim($s);
        if (strpos($s, '-M') !== false) $hasMale = true;
        if (strpos($s, '-F') !== false) $hasFemale = true;
    }

    if ($hasMale && !in_array($base, $roomsWithMales))     $roomsWithMales[]   = $base;
    if ($hasFemale && !in_array($base, $roomsWithFemales)) $roomsWithFemales[] = $base;
}

// Calculate available rooms
$availableRooms = [];
$allRooms = array_unique(array_merge($doubleRooms, $tripleRooms));

foreach ($allRooms as $room) {

    $count = isset($occupancy[$room]) ? $occupancy[$room] : 0;

    // gender restriction
    if ($gender === 'male' && in_array($room, $roomsWithFemales)) continue;
    if ($gender === 'female' && in_array($room, $roomsWithMales)) continue;

    // capacity
    if (in_array($room, $doubleRooms) && $count < 2) $availableRooms[] = $room;
    if (in_array($room, $tripleRooms) && $count < 3) $availableRooms[] = $room;
}

// Default full status
$doubleFull = true;
$tripleFull = true;

foreach ($availableRooms as $room) {
    if (in_array($room, $doubleRooms)) $doubleFull = false;
    if (in_array($room, $tripleRooms)) $tripleFull = false;
}

/* ---------------------------------------------------
   YOUR SPECIAL RULE:
   Triple Sharing ON only if any triple room has male
------------------------------------------------------*/

if ($gender === 'male') {

    $maleInTriple = false;

    foreach ($roomsWithMales as $rm) {
        if (in_array($rm, $tripleRooms)) {
            $maleInTriple = true;
            break;
        }
    }

    if (!$maleInTriple) {
        // Force disable triple sharing for males
        $tripleFull = true;

        // Remove triple rooms from available list
        $availableRooms = array_filter($availableRooms, function($r) use ($doubleRooms) {
            return in_array($r, $doubleRooms);
        });
    }
}

// Final response
$response = [
    'availableRooms' => array_values(array_unique($availableRooms)),
    'doubleSharingBooked' => $doubleFull,
    'tripleSharingBooked' => $tripleFull
];

error_log("room_availability ($month, $gender) => " . json_encode($response));

echo json_encode($response);
exit;

?>
