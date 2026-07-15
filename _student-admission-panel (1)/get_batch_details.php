<?php
include "../dp.php";

if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$id = $_GET['id'];
$sql = "SELECT t_id, t_type, t_sdate, t_cdate, b_status FROM rishikeshttc WHERE t_id = ? 
        UNION 
        SELECT t_id, 'sound_healing' AS t_type, t_sdate, t_cdate, t_month AS b_status FROM sound_healing_rishikesh WHERE t_id = ?
        UNION 
        SELECT t_id, 'yoga_retreat' AS t_type, t_sdate, t_cdate, t_month AS b_status FROM yoga_retreats WHERE t_id = ?
        UNION 
        SELECT t_id, 'hatha' AS t_type, t_sdate, t_cdate, b_status FROM hatha_dates WHERE t_id = ?
        UNION 
        SELECT t_id, 'ashtanga' AS t_type, t_sdate, t_cdate, b_status FROM ashtanga_dates WHERE t_id = ?
        UNION 
        SELECT t_id, 'pranayama' AS t_type, t_sdate, t_cdate, b_status FROM pranayama_dates WHERE t_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiiiii", $id, $id, $id, $id, $id, $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row) {
    $sdate = new DateTime($row['t_sdate']);
    $cdate = new DateTime($row['t_cdate']);
    $formatted_sdate = ordinal($sdate->format('j')) . $sdate->format(' F Y');
    $formatted_cdate = ordinal($cdate->format('j')) . $cdate->format(' F Y');
    $batch = [
        'id' => $row['t_id'],
        't_type' => $row['t_type'],
        'start_date' => $formatted_sdate,
        'date_range' => $formatted_sdate . ' - ' . $formatted_cdate,
        'status' => $row['b_status']
    ];
    echo json_encode($batch);
} else {
    echo json_encode(['error' => 'Batch not found']);
}

$stmt->close();
$conn->close();

function ordinal($number) {
    $ends = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    if ((($number % 100) >= 11) && (($number % 100) <= 13)) return $number . 'th';
    else return $number . $ends[$number % 10];
}
?>