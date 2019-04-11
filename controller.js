var capsula = function() {
	//Como funciones "privadas"
	_ajaxCallback = function(params, method, url, callback, asynchr=true )
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
		//params: los parámetros empaquetados. Ojo si va por GET este argumento debe declararse como null.
		//url: El url a donde se comunicaro, ejemplo: php/command.php
		//asynchr: Es opcional, por defecto es true (as�ncrono), sise desea que sea s�ncrono, que sea false.
		//Ejemplo: ajaxPOST(null, "GET","php/command.php", fn_callback)
		//la función callback o mejor dicho, fn_callback se trabajará ahora
		return false;
	};

	_callback_lista_entregada = function(resp) {
		document.getElementById('listado_personas').innerHTML=resp;
	};

	_callback_numpag = function(resp) {
		document.getElementById('numero_pag').innerHTML=resp;
	};
	//Retorno como funciones "publicas"
	this.ajaxCallback = function(params, method, url, callback, asynchr=true ) {
		return _ajaxCallback(params, method, url, callback, asynchr);
	};

	this.callback_lista_entregada = function(resp) {
		return _callback_lista_entregada(resp);
	};

	this.callback_numpag = function(resp) {
		return _callback_numpag(resp);
	};

};

caps = new capsula();
//Carga primera en navegador
window.onload = function() {
	var pagina =1;
	params = '&cmd=cargaPaginaNumero' +
			 '&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero'+
			 '&pagina='  +pagina;
	caps.ajaxCallback(params, method, url, caps.callback_numpag); 
};
//Click en pagina
function siguiente_pagina(evento) {
	var pagina = evento.value;
	params = '&cmd=cargaPaginaNumero' +
				'&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero' +
				'&pagina='  +pagina;

	caps.ajaxCallback(params, method, url, caps.callback_numpag);
}
//Click en anterior
function opcion_anterior(evento) {
	var pagina = parseInt(evento.id);
	pagina-=1;
	params = '&cmd=cargaPaginaNumero' +
				'&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero' +
				'&pagina='  +pagina;

	caps.ajaxCallback(params, method, url, caps.callback_numpag);
}
//Click en Siguiente
function opcion_siguiente(evento) {
	var pagina = parseInt(evento.id);
	pagina +=1;
	params = '&cmd=cargaPaginaNumero' +
				'&pagina='  +pagina;
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = '&cmd=actualizaPaginaNumero' +
				'&pagina='  +pagina;

	caps.ajaxCallback(params, method, url, caps.callback_numpag);
}




