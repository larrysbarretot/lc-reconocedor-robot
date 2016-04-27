var Reconocedor = function(cadenaCandidata) {
	this._cadenaActual = cadenaCandidata;
	this._RECONOCE = false;
	this._ERROR = false;
	this._tokenActual = "";
	this._myScanner = new Scanner(cadenaCandidata);
};

Reconocedor.prototype.analizar = function() {
	var resultado = {};
	resultado.mensaje = "";
	resultado.reconoce = false;
	var q = 0;
	while(!this._RECONOCE && !this._ERROR) {
		this._tokenActual = this._myScanner.obtenerToken();
		console.log(this._tokenActual);
		switch(q) {
			case 0:
				if(this.esRobot()) {
					q = 1;
				}else if(this.esAvanzar()) {
					q = 10;
				}else if(this.esGirar()) {
					q = 14;
				}else if(this.esTele) {
					q = 18;
				}else {
					this._ERROR = true;
				}
				break;
			case 1:
				if(this.esID()) {
					q = 2;
				}else {
					this._ERROR = true;
				}
				break;
			case 2:
				if(this.esFinDeCadena()) {
					this._RECONOCE = true;
				}else if(this.esComa()) {
					q = 1;
				}else if(this.esParentesisIzquierdo()) {
					q = 3
				}else {
					this._ERROR = true;
				}
				break;
			case 3:
				if(this.esNumero()) {
					q = 4;
				}else {
					this._ERROR = true;
				}
				break;
			case 4:
				if(this.esComa()) {
					q = 5;
				}else {
					this._ERROR = true;
				}
				break;
			case 5:
				if(this.esNumero()) {
					q = 6;
				}else {
					this._ERROR = true;
				}
				break;
			case 6:
				if(this.esParentesisDerecho()) {
					q = 7;
				}else if(this.esComa()) {
					q = 8;
				}else {
					this._ERROR = true;
				}
				break;
			case 7:
				if(this.esFinDeCadena()) {
					this._RECONOCE = true;
				}else if(this.esComa()) {
					q = 1;
				}else {
					this._ERROR = true;
				}
				break;
			case 8:
				if(this.esMira()) {
					q = 9;
				}else {
					this._ERROR = true;
				}
				break;
			case 9:
				if(this.esParentesisDerecho()) {
					q = 7;
				}else {
					this._ERROR = true;
				}
				break;
			case 10:
				if(this.esID()) {
					q = 11;
				}else {
					this._ERROR = true;
				}
				break;
			case 11:
				if(this.esComa()) {
					q = 12;
				}else {
					this._ERROR = true;
				}
				break;
			case 12:
				if(this.esNumero()) {
					q = 13;
				}else if(this.esID()) {
					q = 11;
				}else {
					this._ERROR = true;
				}
				break;
			case 13:
				if(this.esFinDeCadena()) {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 14:
				if(this.esID()) {
					q = 15;
				}else {
					this._ERROR = true;
				}
				break;
			case 15:
				if(this.esComa()) {
					q = 16;
				}else {
					this._ERROR = true;
				}
				break;
			case 16:
				if(this.esMira()) {
					q = 17;
				}else {
					this._ERROR = true;
				}
				break;
			case 17:
				if(this.esFinDeCadena()) {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 18:
				if(this.esID()) {
					q = 19;
				}else {
					this._ERROR = true;
				}
				break;
			case 19:
				if(this.esComa()) {
					q = 20;
				}else {
					this._ERROR = true;
				}
				break;
			case 20:
				if(this.esParentesisIzquierdo()) {
					q = 21;
				}else if(this.esID()) {
					q = 19;
				}else {
					this._ERROR = true;
				}
				break;
			case 21:
				if(this.esNumero()) {
					q = 22;
				}else {
					this._ERROR = true;
				}
				break;
			case 22:
				if(this.esComa()) {
					q = 23;
				}else {
					this._ERROR = true;
				}
				break;
			case 23:
				if(this.esNumero()) {
					q = 24;	
				}else {
					this._ERROR = true;
				}
				break;
			case 24:
				if(this.esParentesisDerecho()) {
					q = 25;
				}else {
					this._ERROR = true;
				}
				break;
			case 25:
				if(this.esFinDeCadena()) {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
		}
	}
	if(this._RECONOCE) {
		resultado.mensaje = "Se reconoce =)";
		resultado.reconoce = true;
	}else {
		resultado.mensaje = "¡Error! =(, no se reconoce";
		resultado.reconoce = false;
	}
	return resultado;
};

/* ROBOT */
Reconocedor.prototype.esRobot = function() {
	if(this._tokenActual.valor == "ROBOT") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esAvanzar = function() {
	if(this._tokenActual.valor == "AVANZAR") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esGirar = function() {
	if(this._tokenActual.valor == "GIRAR") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esTele = function() {
	if(this._tokenActual.valor == "TELE") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esID = function() {
	if(this._tokenActual.tipo == "ID") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esFinDeCadena = function() {
	if(this._tokenActual.tipo == "$") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esComa = function() {
	if(this._tokenActual.valor == ",") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esParentesisIzquierdo = function() {
	if(this._tokenActual.valor == "(") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esNumero = function() {
	if(this._tokenActual.tipo == "NUM") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esParentesisDerecho = function() {
	if(this._tokenActual.valor == ")") {
		return true;
	}
	return false;
}

Reconocedor.prototype.esMira = function() {
	if(this._tokenActual.valor == "N" ||
		this._tokenActual.valor == "O" ||
		this._tokenActual.valor == "S" ||
		this._tokenActual.valor == "E") {
		return true;
	}
	return false;
}