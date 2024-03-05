<?php

$nm_pokemon = $_GET['nm_pokemon'];
$ds_tipo1 = $_GET['ds_tipo1'];
$ds_tipo2 = $_GET['ds_tipo2'];
$url_img = $_GET['url_img'];

$servername = "localhost";
    $username = "root";
    $password = "root"; // Se utilizar o USBServer mudar para usbW
    $dbname = "db_pokedex"; // nome da base de dados


    $conn = new mysqli($servername, $username, $password, $dbname);

    // // check connection
    // if (!$conn){
    //     die ("Conexão falho: " . mysqli_connect_error()); // die= encerra a conexão 
    // }   else {

    // echo "Conexão com sucesso";
    // }

    $sql ='INSERT INTO tb_pokemon (nm_pokemon, ds_tipo1, ds_tipo2, url_img) VALUES
    ('."'". $nm_pokemon. "'" . ','."'". $ds_tipo1."'".','."'".$ds_tipo2."'".','."'".$url_img."'".')';
    
    if ($conn->query($sql) === TRUE){
        echo "Pokemon cadastrado com sucesso!!!";
    }else{
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }