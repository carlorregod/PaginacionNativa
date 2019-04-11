var capsula = function() {
	//Como funciones "privadas"
	_ajaxCallback = function(params, method, url, callback, asynchr=true )
	{
		$.ajax({
			asynchr: asynchr,
			method: method,
			url: url,
			data: params
			//dataType: 'mycustomtype'
		})
		.done(function(respuesta) {
			callback(respuesta);
		})
		.fail(function() {
			console.log('Ha fallado...');
		})
		return false;
	};

	_callback_lista_entregada = function(resp) {
		$('#listado_personas').html(resp);
	};

	_callback_numpag = function(resp) {
		$('#numero_pag').html(resp);
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
inicio = function() {
	var pagina =1;
	params = {
		'cmd':'cargaPaginaNumero',
		'pagina': pagina
	};
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = {
		'cmd':'actualizaPaginaNumero',
		'pagina': pagina
	};
	caps.ajaxCallback(params, method, url, caps.callback_numpag);
};
$(document).ready(inicio());


//Click en pagina
function siguiente_pagina(evento) {
	var pagina = evento.value;
	params = {
		'cmd':'cargaPaginaNumero',
		'pagina': pagina
	};
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = {
		'cmd':'actualizaPaginaNumero',
		'pagina': pagina
	};

	caps.ajaxCallback(params, method, url, caps.callback_numpag);
}
//Click en anterior
function opcion_anterior(evento) {
	var pagina = parseInt(evento.id);
	pagina-=1;
	params = {
		'cmd':'cargaPaginaNumero',
		'pagina': pagina
	};
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 
	
	params = {
		'cmd':'actualizaPaginaNumero',
		'pagina': pagina
	};

	caps.ajaxCallback(params, method, url, caps.callback_numpag);
}
//Click en Siguiente
function opcion_siguiente(evento) {
	var pagina = parseInt(evento.id);
	pagina +=1;
	params = {
		'cmd':'cargaPaginaNumero',
		'pagina': pagina
	};
	method = "POST";
	url = "modelo.php";
	caps.ajaxCallback(params, method, url, caps.callback_lista_entregada); 

	params = {
		'cmd':'actualizaPaginaNumero',
		'pagina': pagina
	};

	caps.ajaxCallback(params, method, url, caps.callback_numpag);
}




