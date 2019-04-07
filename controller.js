
function ajaxCallback(params, method, url, callback, asynchr=true )
{
	var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) 
		{
			var resp = xhttp.responseText;
			//var respJson = JSON.parse(resp);
			callback(resp);
		}
		else
		{
			console.log("xhr ha fallado...");
		}
	};
	xhttp.open(method, url, asynchr);    // Tipo de comunicacion
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(params);  // envio de http
	console.log("Enviando peticion al servidor...");
	//method: Puede ser GET, POST, REQUEST,
	//params: los par�metros empaquetados. Ojo si va por GET este argumento debe declararse como null.
	//url: El url a donde se comunicaro, ejemplo: http://php.command.php
	//asynchr: Es opcional, por defecto es true (as�ncrono), sise desea que sea s�ncrono, que sea false.
	//Ejemplo: ajaxPOST(null, "GET","php/command.php", fn_callback)
	//la funci�n callback o mejor dicho, fn_callback se trabajar� ahora
	return false;
}

callback_lista_entregada = function(resp) {
	document.getElementById('listado_personas').innerHTML=resp;
};

callback_numpag = function(resp) {
	document.getElementById('numero_pag').innerHTML=resp;
};
//Carga primera en navegador
window.onload = function() {
	params = '&cmd=cargaRegistro';
	method = "POST";
	url = "modelo.php";
	ajaxCallback(params, method, url, callback_lista_entregada); 

	params = '&cmd=cargaPagina';
	ajaxCallback(params, method, url, callback_numpag); 
};
//Click en pagina
function siguiente_pagina(evento) {
	var pagina = evento.value;
	params = '&cmd=cargaPaginaNumero' +
				'&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	ajaxCallback(params, method, url, callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero' +
				'&pagina='  +pagina;

	ajaxCallback(params, method, url, callback_numpag);
}
//Click en anterior
function opcion_anterior(evento) {
	var pagina = parseInt(evento.id);
	pagina-=1;
	params = '&cmd=cargaPaginaNumero' +
				'&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	ajaxCallback(params, method, url, callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero' +
				'&pagina='  +pagina;

	ajaxCallback(params, method, url, callback_numpag);
}
//Click en Siguiente
function opcion_siguiente(evento) {
	var pagina = parseInt(evento.id);
	pagina +=1;
	params = '&cmd=cargaPaginaNumero' +
				'&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	ajaxCallback(params, method, url, callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero' +
				'&pagina='  +pagina;

	ajaxCallback(params, method, url, callback_numpag);
}





/*

pagina 1
imprima los registros 1° al 7°
BD: 1° reg=0 y 7° reg=6
Pagina 1=>offset = (n°pagina-1)*7
pagina 2
imprima los registros 8° al 14°
BD: 8° es el 7
pagina 2->8n° (n°pagina-1)*7=(2-1)*7=7
...

*/