<?php



$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "db_pokedex";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// sql to delete a record
$sql = 'DELETE FROM tb_pokemon WHERE  $_GET["card"] ';

if (mysqli_query($conn, $sql)) {
  echo "Record deleted successfully";
} else {
  echo "Error deleting record: " . mysqli_error($conn);
}

mysqli_close($conn);
?>