<?php
require 'conexion.php';

$comando = $_POST['cmd'];
$reg_por_pagina=7;


switch($comando)
{
	case 'cargaRegistro':
		$pgsql = getConnect();
		$consulta = "SELECT * FROM persona.personas LIMIT '$reg_por_pagina' OFFSET 0";
		$resp = $pgsql->prepare($consulta);
		$resp->execute();
		$array = $resp->fetchAll();
		$lista = '';
		foreach($array as $fila)
		{
			$lista .='<div class="alert alert-info" role="alert">'.$fila['nombrepersona'].'</div>';
		}
		echo $lista;
		break;


	case 'cargaPagina':
		$pgsql = getConnect();
		$consulta = "SELECT * FROM persona.personas";
		$resp = $pgsql->prepare($consulta);
		$resp->execute();
		$cuentafilas = $resp->rowCount(); //Cuenta cant de registros (33)
		$paginas_totales = ceil($cuentafilas/$reg_por_pagina); //(5)
		$listapagina='<li class="page-item disabled"><a class="page-link"  tabindex="-1" aria-disabled="true">Anterior</a></li><li class="page-item active" aria-current="page"><a class="page-link">1<span class="sr-only">(current)</span></a></li>';
		for($i=2;$i<=$paginas_totales;$i++)
		{
			$listapagina .='<li class="page-item"><input type="button" class="page-link" id="opcion'.$i.'" value="'.$i.'" onclick="siguiente_pagina(this);">
			</li>';
		}
		$listapagina .='<li class="page-item"><input type="button" class="page-link" tabindex="-1" value="Siguiente" id="1" onclick="opcion_siguiente(this);"></li>';
		echo $listapagina;
		break;

	case 'cargaPaginaNumero':
		$offset = $_POST['pagina'];
		$offset = ($offset-1)*7;
		$pgsql = getConnect();
		$consulta = "SELECT * FROM persona.personas LIMIT '$reg_por_pagina' OFFSET '$offset'";
		$resp = $pgsql->prepare($consulta);
		$resp->execute();
		$array = $resp->fetchAll();
		$lista = '';
		foreach($array as $fila)
		{
			$lista .='<div class="alert alert-info" role="alert">'.$fila['nombrepersona'].'</div>';
		}
		echo $lista;
		break;

	case 'actualizaPaginaNumero':
		$pagina_clickeada = $_POST['pagina'];
		$pgsql = getConnect();
		$consulta = "SELECT * FROM persona.personas";
		$resp = $pgsql->prepare($consulta);
		$resp->execute();
		$cuentafilas = $resp->rowCount(); //Cuenta cant de registros (33)
		$paginas_totales = ceil($cuentafilas/$reg_por_pagina); //(5)
		//Trabajando el anterior
		if($pagina_clickeada == 1)
		{
			$listapagina='<li class="page-item disabled"><a class="page-link" tabindex="-1" aria-disabled="false">Anterior</a></li>';
		}
		else
		{
			$listapagina='<li class="page-item"><input type="button" class="page-link" tabindex="-1" value="Anterior" id="'.$pagina_clickeada.'" onclick="opcion_anterior(this);"></li>';
		}
		//Completando las páginas
		for($i=1;$i<=$paginas_totales;$i++)
		{
			if($pagina_clickeada == $i)
			{
				$listapagina .='<li class="page-item active" aria-current="page"><a class="page-link">'
				.$i.
				'<span class="sr-only">(current)</span></a></li>';
			}
			else
			{
				$listapagina .='<li class="page-item"><input type="button" class="page-link" id="opcion'
				.$i.
				'" value="'
				.$i.
				'" onclick="siguiente_pagina(this);"></li>';
			}
			
		}
		//Trabajando el "siguiente"
		if($pagina_clickeada == $paginas_totales)
		{
			$listapagina .='<li class="page-item disabled"><a class="page-link" tabindex="-1" aria-disabled="false">Siguiente</a></li>';
		}
		else
		{
			$listapagina .='<li class="page-item"><input type="button" class="page-link" tabindex="-1" value="Siguiente" id="'.$pagina_clickeada.'" onclick="opcion_siguiente(this);"></li>';
		}
		echo $listapagina;
		break;

 	default:
        break;
}
