<?php
	session_start();
	include "awsconfig.php";

	if($_SERVER['REQUEST_METHOD'] == 'POST') {
					
		$name = trim($_POST["userName"]);
		$wellName = trim($_POST["wellName");
		$dateStart = trim($_POST["dateStart");
		$timeStart = trim($_POST["timeStart");
		$mileageStart = trim($_POST["mileageStart");
		$description = trim($_POST["description");
		$mileageEnd = trim($_POST["mileageEnd");
		$dateEnd = trim($_POST["dateEnd");
		$timeEnd = trim($_POST["timeEnd");
		$project = trim($_POST["projectNumber");
		$location = trim($_POST["location");
		$gps = trim($_POST["gps");
		$billing = trim($_POST["billing"]);

		$stmt = $db->prepare("INSERT INTO data(userName, wellName, dateStart, timeStart, mileageStart, description, mileageEnd, dateEnd, timeEnd, projectNumber, location, gps, billing) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssssssssss", $name, $wellName, $dateStart, $timeStart, $mileageStart, $description, $mileageEnd, $dateEnd, $timeEnd, $project, $location, $gps, $billing);
   		

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