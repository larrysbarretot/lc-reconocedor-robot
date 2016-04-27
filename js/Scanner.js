var Scanner = function(cadenaCandidata) {
	this._cadenaActual = cadenaCandidata;
	this._indiceAAnalizar = 0;
};

Scanner.prototype.obtenerToken = function() {
	var token = {};
	token.valor = "";
	token.tipo = "";
	this.quitarEspacios();
	var caracterAAnalizar = this._cadenaActual.charAt(this._indiceAAnalizar);
	if(this._indiceAAnalizar >= this._cadenaActual.length) {
		caracterAAnalizar = '$';
	}
	if(this.esLetra(caracterAAnalizar)) { // Letra, primera
		while(this.esLetra(caracterAAnalizar) || this.esNumero(caracterAAnalizar)) { // luego las demás pueden ser números
			token.valor = token.valor + caracterAAnalizar;
			this._indiceAAnalizar++;
			caracterAAnalizar = this._cadenaActual.charAt(this._indiceAAnalizar);
		}
		token.tipo = "ID";
	}else if(this.esNumero(caracterAAnalizar)) { // Número
		while(this.esNumero(caracterAAnalizar)) {
			token.valor = token.valor + caracterAAnalizar;
			this._indiceAAnalizar++;
			if(this._indiceAAnalizar >= this._cadenaActual.length) {
				caracterAAnalizar = '$';
			}else {
				caracterAAnalizar = this._cadenaActual.charAt(this._indiceAAnalizar);
			}
		}
		token.tipo = "NUM";
	}else if(this.esOperador(caracterAAnalizar)) { // Operador
		token.valor = caracterAAnalizar;
		var segundoCaracterAAnalizar = this._cadenaActual.charAt(this._indiceAAnalizar + 1);
		if(this.esOperadorCompuesto(token.valor, segundoCaracterAAnalizar)) {
			token.valor = token.valor + segundoCaracterAAnalizar;
			this._indiceAAnalizar++;
		}
		this._indiceAAnalizar++;
		token.tipo = "OPR";
	}else if(this.esFinDeCadena(caracterAAnalizar)) {
		token.valor = caracterAAnalizar;
		token.tipo = "$";
	}
	return token;
};

Scanner.prototype.esLetra = function(caracter) {
	if((caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z')) {
		return true;
	}
	return false;
};

Scanner.prototype.esNumero = function(caracter) {
	if(caracter >= '0' && caracter <= '9') {
		return true;
	}
	return false;
};

Scanner.prototype.esOperador = function(caracter) {
	if(caracter == ',' || caracter == '(' || caracter == ')' ||
		caracter == '=' || caracter == '*' || caracter == '/' ||
		caracter == '-' || caracter == '+' || caracter == '<' ||
		caracter == '>' || caracter == ';' || caracter == '{' ||
		caracter == '}') {
		return true;
	}
	return false;
};

Scanner.prototype.esOperadorCompuesto = function(primerCaracter, segundoCaracter) {
	if((primerCaracter == '-' && segundoCaracter == '-') ||
		(primerCaracter == '+' && segundoCaracter == '+') ||
		(primerCaracter == '<' && segundoCaracter == '=') ||
		(primerCaracter == '>' && segundoCaracter == '=')) {
		return true;
	}
	return false;
};

Scanner.prototype.esFinDeCadena = function(caracter) {
	if(caracter == '$') {
		return true;
	}
	return false;
};

Scanner.prototype.quitarEspacios = function() {
	while(this._cadenaActual.charAt(this._indiceAAnalizar) == ' ') {
		this._indiceAAnalizar++;
	}
};