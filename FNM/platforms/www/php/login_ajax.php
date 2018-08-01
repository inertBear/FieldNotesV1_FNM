<?php
	session_start();
	include "awsconfig.php";

	if(isset($_POST['login_btn'])) {
					
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);

		try {
		
			stmt = $db->prepare("SELECT * FROM rhl_login WHERE rhl_username = '" . $username . "'";
			$stmt->execute;
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$count = $stmt->rowCount();
		
			if ($row['username'] == $password) { 
				echo "ok";
				$_SESSION['user_session'] = $row['username'];
			} else {
				echo"Your username or password is invalid";
			}
		} catch(PDOEXCEPTION $e) {
			echo->getMessage();
		}
	}
?>