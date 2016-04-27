$("#verificar").on("click", function() {
	var cadenaCandidata = $("#cadenaCandidata").val();
	if(cadenaCandidata != "") {
		var miReconocedor = new Reconocedor(cadenaCandidata);
		var respuesta = miReconocedor.analizar();
		$("#resultadoAnalisis").text(respuesta.mensaje);
		$('#respuesta').modal('show');
		console.log(respuesta);
		$("#cadenaCandidata").val("");
		if(respuesta.reconoce) {
			var aceptado = "<div class='alert alert-success alert-dismissible fade in' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button>"+cadenaCandidata+"</div>";
			$(".comandos-ingresados").prepend(aceptado);
		}else {
			var error = "<div class='alert alert-danger alert-dismissible fade in' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button><strong>"+cadenaCandidata+"</div>"
			$(".comandos-ingresados").prepend(error);
		}
	}else {
		$("#resultadoAnalisis").text("Tiene que ingresar una cadena para analizar. =/");
		$('#respuesta').modal('show');
	}
});