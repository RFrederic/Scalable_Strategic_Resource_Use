<?php header('Access-Control-Allow-Origin: *');
$file_result = "";
if ($_FILES["fileToUpload"]["error"] > 0){
	$file_result .= "No File Uploaded or Invalid File ";
	$file_result .= "Error Code: " . $_FILES["fileToUpload"]["error"] . "<br>";
} else{
	$file_result .= 
	"Upload: " . $_FILES["fileToUpload"]["name"] . "<br>" .
	"Type: " . $_FILES["fileToUpload"]["type"] . "<br>" .
	"Size: " . ($_FILES["fileToUpload"]["size"] / 1024) . " Kb<br>" .
	"Temp file: " . $_FILES["fileToUpload"]["tmp_name"] . "<br>";

	move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "/upload" . $_FILES["fileToUpload"]["name"]);

	$file_result .= "File Upload Successful!";
}
?>