<?php
include "../dp.php";
$type = isset($_GET['type']) ? $_GET['type'] : null;
$month = isset($_GET['month']) ? $_GET['month'] : null;

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if ($type === 'yoga_retreat') {
    $sql = "SELECT t_id, t_sdate, t_cdate, t_month, t_month AS b_status 
            FROM yoga_retreats 
            ORDER BY t_id";
    $stmt = $conn->prepare($sql);
} elseif ($type === 'sound_healing') {
    if ($month) {
        $sql = "SELECT t_id, t_sdate, t_cdate, t_month, t_month AS b_status 
                FROM sound_healing_rishikesh 
                WHERE t_month = ? 
                ORDER BY t_id";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $month);
    } else {
        $sql = "SELECT t_id, t_sdate, t_cdate, t_month, t_month AS b_status 
                FROM sound_healing_rishikesh 
                ORDER BY t_id";
        $stmt = $conn->prepare($sql);
    }
} elseif ($type === 'hatha') {
    $sql = "SELECT t_id, t_sdate, t_cdate, b_status 
            FROM hatha_dates 
            ORDER BY t_id";
    $stmt = $conn->prepare($sql);
} elseif ($type === 'ashtanga') {
    $sql = "SELECT t_id, t_sdate, t_cdate, b_status 
            FROM ashtanga_dates 
            ORDER BY t_id";
    $stmt = $conn->prepare($sql);
} elseif ($type === 'pranayama') {
    $sql = "SELECT t_id, t_sdate, t_cdate, b_status 
            FROM pranayama_dates 
            ORDER BY t_id";
    $stmt = $conn->prepare($sql);
} else {
    $sql = "SELECT t_id, t_sdate, t_cdate, b_status 
            FROM rishikeshttc 
            WHERE t_type = ? 
            ORDER BY t_id";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $type);
}

$stmt->execute();
$result = $stmt->get_result();
$batches = [];
while ($row = $result->fetch_assoc()) {
    $sdate = new DateTime($row['t_sdate']);
    $cdate = new DateTime($row['t_cdate']);
    $formatted_sdate = ordinal($sdate->format('j')) . $sdate->format(' F Y');
    $formatted_cdate = ordinal($cdate->format('j')) . $cdate->format(' F Y');
    $batches[] = [
        'id' => $row['t_id'],
        'start_date' => $formatted_sdate,
        'date_range' => $formatted_sdate . ' - ' . $formatted_cdate,
        'status' => $row['b_status']
    ];
}
echo json_encode($batches);
$stmt->close();
$conn->close();

function ordinal($number) {
    $ends = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    if ((($number % 100) >= 11) && (($number % 100) <= 13)) return $number . 'th';
    else return $number . $ends[$number % 10];
}
?>