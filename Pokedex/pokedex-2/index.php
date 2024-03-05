<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pokedex</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <?php

    $servername = "localhost";
    $username = "root";
    $password = "root"; // Se utilizar o USBServer mudar para usbW
    $dbname = "db_pokedex"; // nome da base de dados

    // Create connection
    $conn = mysqli_connect ($servername, $username, $password, $dbname); // conectando com msqli (i=interface) . com servidor (localhost) e com a base de dados

    // // check connection
    // if (!$conn){
    //     die ("Conexão falho: " . mysqli_connect_error()); // die= encerra a conexão 
    // }   else {

    // echo "Conexão com sucesso";
    // }

    $sql = "SELECT cd_pokemon, nm_pokemon, ds_tipo1 , ds_tipo2, url_img FROM tb_pokemon";

    $result  = $conn -> query ($sql); // (Consulta) os dados da variavel $sql(selects) na tabela pokemon.
    
    if ($result->num_rows > 0) { // Na consulta obteve dados ? então entrará no while pois será maior que 0!  
        while ($row = $result -> fetch_assoc()){ // cada fileira(row) receberar o resultado que é o select da variavel até que o resultado seja vazio

            
            // echo "Código: " . $row ["cd_pokemon"]. " - Name: " . $row ["nm_pokemon"]. " Tipo: " . $row ["ds_tipo1"]. "/". $row ["ds_tipo2"] . " / ".  $row["url_img"]. "<br>";

            echo '<div class="card" style="width: 18rem; text-align: Center; margin: auto;">
            <img src="'.$row["url_img"].'" class="card-img-top" alt="'.$row["nm_pokemon"].'">
            <div class="card-body">
              <h5 class="card-title">'.$row["nm_pokemon"].'</h5>
              <p class="card-text">'. $row ["ds_tipo1"]. "/". $row ["ds_tipo2"] . '</p>
              <form action="deletar.php" method=GET>
              <input type="hidden" id="card" name="card">
              <input type="submit"  class="btn btn-primary" value="Deletar">
            </div>
          </div><br>';
        }
        } else {
                echo "0 results";
            }

    $conn -> close();
    



    ?>
</body>
</html>