<?php
require 'conexion.php';

class Menu
{
	public function __construct($cmd, $reg_x_pag, $offset)
	{
		$this->cmd 			= $cmd;
		$this->reg_x_pag 	= $reg_x_pag;
		$this->offset 		= $offset;
	}

	private function _opciones() 
	{
		switch($this->cmd)
		{
			case 'cargaPaginaNumero':
				$offset_reg = $this->offset;
				$cant_reg = $this->reg_x_pag;
				$offset_reg = ($offset_reg-1)*7;
				$pgsql = getConnect();
				$consulta = "SELECT * FROM persona.personas LIMIT '$cant_reg' OFFSET '$offset_reg'";
				$resp = $pgsql->prepare($consulta);
				$resp->execute();
				$array = $resp->fetchAll();
				$lista = '';
				foreach($array as $fila)
				{
					$lista .='<div class="alert alert-info" role="alert">'.$fila['nombrepersona'].'</div>';
				}
				return $lista;
				break;

			case 'actualizaPaginaNumero':
				$pagina_clickeada = $this->offset;
				$cant_reg = $this->reg_x_pag;
				$pgsql = getConnect();
				$consulta = "SELECT * FROM persona.personas";
				$resp = $pgsql->prepare($consulta);
				$resp->execute();
				$cuentafilas = $resp->rowCount(); //Cuenta cant de registros (33)
				$paginas_totales = ceil($cuentafilas/$cant_reg); //(5)
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
				return $listapagina;
				break;

			default:
				break;
		}

	}

	public function opciones()  
	{
		return $this->_opciones();
	}
}

$comando = $_POST['cmd'];
$reg_por_pagina=7;
$offset = $_POST['pagina'];

$options = new Menu($comando, $reg_por_pagina, $offset);
echo $options->opciones();