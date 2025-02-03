<?php

	error_reporting(E_ALL);
	ini_set('display_errors', 1);

	$inData = getRequestInfo();

	$phoneNumber = $inData["phoneNumber"];
	$emailAddress = $inData["emailAddress"];
	$newFirst = $inData["newFirst"];
	$newLast = $inData["newLast"];
	$id = $inData["id"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName = ?, LastName = ?, Phone = ?, Email = ? WHERE (ID = ? AND UserID = ?)");
		$stmt->bind_param("ssssii", $newFirst, $newLast, $phoneNumber, $emailAddress, $id, $userId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson($obj)
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError($err)
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson($retValue);
	}
?>
