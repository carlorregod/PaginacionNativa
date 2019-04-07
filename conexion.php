<?php

function getConnect()
{
    //PREVINIENDO ERRORES
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    /*DEFINIENDO PARAMETROS DE CONEXION*/

    $arg = 'pgsql:dbname=Voto;host=localhost;port=5432';

    $usuario = 'carlos';
    $pass = '2004330';

    //Estableciendo la conexion
    
    $mbd = new PDO($arg, $usuario, $pass) or die('Falló la conexion');
    //Retorno del objeto de la conexion
    return $mbd;
}
