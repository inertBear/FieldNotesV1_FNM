<?php
	session_start();
	include "FieldNotes_awsconfig_6_10_2017.php";

	if($_SERVER['REQUEST_METHOD'] == 'POST') {
					
		$name = $_SESSION['userName'];
		$editWellName = trim($_POST["wellName"]);
		$editDateStart = trim($_POST["dateStart"]);
		$editTimeStart = trim($_POST["timeStart"]);
		$editMileageStart = trim($_POST["mileageStart"]);
		$editDescription = trim($_POST["description"]);
		$editMileageEnd = trim($_POST["mileageEnd"]);
		$editDateEnd = trim($_POST["dateEnd"]);
		$editTimeEnd = trim($_POST["timeEnd"]);
		$editProject = trim($_POST["projectNumber"]);
		$editLocation = trim($_POST["location"]);
		$editGps = trim($_POST["gps"]);
		$editBilling = trim($_POST["billing"]);

		$stmt = $db->prepare("UPDATE data SET wellName = ?, dateStart = ?, timeStart = ?, mileageStart = ?, description = ?, 
							mileageEnd = ?, dateEnd = ?, timeEnd = ?, projectNumber = ?, location = ?, gps = ?, billing = ? WHERE ticketNumber = ?");
		$stmt->bind_param('sssssssssssssi', $editWellName, $editDateStart, $editTimeStart, $editMileageStart, $editDescription, $editMileageEnd, 
							$editDateEnd, $editTimeEnd,  $editProject, $editLocation, $editGps, $editBilling);
   		
   		if($stmt->execute()) {  			
   			$stmt->close();
			mysqli_close($db);
			$AJAXresponse = "1";
   		
   		}	else {
   			$AJAXresponse = "2";
   		}
		
		echo $AJAXresponse;
	}
?>