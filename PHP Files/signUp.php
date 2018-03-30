	<?php
	session_start();

// Importing DBConfig.php file.
	include 'DBConfig.php';

// Connecting to MySQL Database. tested ok with hard coded data
	$conn = new mysqli($hostName, $username, $password, $databaseName);

 // Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

	$fullname = $obj['userFullname'];

	$username = $obj['userName'];
 //$username = 'umar';

	$email = $obj['userEmail'];

	$password = $obj['userPassword'];
 //$password = '123';

	//generating random 6-digit number
	$tasCode = rand(100000, 999999);


	if (!empty($username) && !empty($password) && !empty($fullname) && !empty($email)) {


		$sql = "INSERT INTO member (fullname, username, email, password, tasCode)
		VALUES ('$fullname', '$username', '$email', '$password', '$tasCode')";

	//Checking for duplicates
		$dupesql_username = "SELECT * FROM member where (username = '$username')";
		$dupesql_email = "SELECT * FROM member where (email = '$email')";

		$duperaw_username = $conn->query($dupesql_username);
		$duperaw_email = $conn->query($dupesql_email);

		if (mysqli_num_rows($duperaw_username) > 0) {
			$MSG = 'The username already exists' ;
		// Converting the message into JSON format.
			$json = json_encode($MSG);
		// Echo the message.
			echo $json ;
		}

		else if(mysqli_num_rows($duperaw_email) > 0){
			$MSG = 'The email already exists' ;
		// Converting the message into JSON format.
			$json = json_encode($MSG);
		// Echo the message.
			echo $json ;
		}

		else{

			if ($conn->query($sql) === TRUE) {
				//I started session, as I wanted to use it in the next page
				$_SESSION['username'] = $username;
				$MSG = 'Registered successfully' ;
				// Converting the message into JSON format.
				$json = json_encode($MSG);
				// Echo the message.
				echo $json ;
			} else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}

		}

	}
	else{
		$MSG = 'Please, fill out the fields' ;
				// Converting the message into JSON format.
		$json = json_encode($MSG);
				// Echo the message.
		echo $json ;
	}


	$conn->close();


	?>
