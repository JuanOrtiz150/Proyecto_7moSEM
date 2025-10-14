class Pila {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

class Convertidor {
  constructor() {
    this.pila = new Pila();
  }

  prioridad(op) {
    switch (op) {
      case "^":
        return 3;
      case "*":
      case "/":
        return 2;
      case "+":
      case "-":
        return 1;
      default:
        return 0;
    }
  }

  esOperador(c) {
    return ["+", "-", "*", "/", "^"].includes(c);
  }

  esOperando(c) {
    return /[a-zA-Z0-9]/.test(c);
  }

  convertirAPostfija(expresion, esParaPrefija = false) {
    let salida = "";
    this.pila = new Pila();

    for (let simbolo of expresion) {
      if (simbolo === "(") {
        this.pila.push(simbolo);
      } else if (simbolo === ")") {
        while (!this.pila.isEmpty() && this.pila.peek() !== "(") {
          salida += this.pila.pop();
        }
        this.pila.pop();
      } else if (this.esOperando(simbolo)) {
        salida += simbolo;
      } else if (this.esOperador(simbolo)) {
        while (
          !this.pila.isEmpty() &&
          this.esOperador(this.pila.peek()) &&
          (esParaPrefija
            ? this.prioridad(this.pila.peek()) > this.prioridad(simbolo)
            : this.prioridad(this.pila.peek()) >= this.prioridad(simbolo))
        ) {
          salida += this.pila.pop();
        }
        this.pila.push(simbolo);
      }
    }

    while (!this.pila.isEmpty()) {
      salida += this.pila.pop();
    }

    return salida;
  }

  convertirAPrefija(expresion) {
    let invertida = "";
    for (let i = expresion.length - 1; i >= 0; i--) {
      let simbolo = expresion[i];
      if (simbolo === "(") simbolo = ")";
      else if (simbolo === ")") simbolo = "(";
      invertida += simbolo;
    }

    let postfijaInvertida = this.convertirAPostfija(invertida, true);

    return postfijaInvertida.split("").reverse().join("");
  }
}

function convertir() {
  const expresion = document.getElementById("expresion").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const convertidor = new Convertidor();

  let resultado = "";
  if (tipo === "postfija") {
    resultado = convertidor.convertirAPostfija(expresion);
  } else {
    resultado = convertidor.convertirAPrefija(expresion);
  }

  document.getElementById("resultado").innerText = resultado;
}
