<?php	
	session_start();
	include "FieldNotes_awsconfig_6_10_2017.php";
			
	if($_SERVER['REQUEST_METHOD'] == 'POST') {		
		$userName = $_SESSION['userName'];
		
		//$wellName = trim($_POST["wellName"]);
		
		$dateStart = trim($_POST["dateStart"]);
		$dateEnd = trim($_POST["dateEnd"]);
	
		//$sql_wellNameSearch = "SELECT * FROM data WHERE userName = '" .$userName. "' AND wellName = '" .$wellName. "' ";
		$sql_dateRangeSearch = "SELECT * FROM data WHERE username = '" .$userName. "' AND dateStart >= '" .$dateStart. "' AND dateEnd <= '".$dateEnd. "' ";
		//$sql_inclusiveSearch = "SELECT * FROM data WHERE userName = '" .$userName. "' AND wellName = '" .$wellName. "' AND dateStart = '" .$dateStart. "' AND dateEnd = '" .$dateEnd. "' ";
		
		//if(!$dateStart == "" && !$dateEnd == ""){
			$result = $db->query($sql_dateRangeSearch);
		//}
		
		if($result){
			if($result->num_rows == 1){	
				$AJAXresponse_array = mysqli_fetch_row($result);
				echo json_encode($AJAXresponse_array); 
			} else if($result->num_rows > 1) {	
				$AJAXresponse_assoc_array = array();
				$array = array();
				while($row = $result->fetch_assoc()){
				    $array[] = $row;
				    //$AJAXresponse_assoc_array = array_merge($AJAXresponse_assoc_array, $temp_merge_array);
				}
				echo json_encode( $array);
			}
		} else {
			$AJAXresponse_string = "no data found";
			echo json_encode($AJAXresponse_string);
		}
	} else {
		$AJAXresponse_boolean = false;
		echo json_encode($AJAXresponse_boolean);
	}
	$conn->close;		
?>