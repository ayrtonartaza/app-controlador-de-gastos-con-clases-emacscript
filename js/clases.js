class Persona {
    constructor(nombre,apellido){
        this.nombre = nombre;
        this.apellido = apellido;
    }
    infoCompleta(){
        return `Hola ${this.nombre} ${this.apellido}`
    }
    static saludar(){
        return `Bienvenido`
    }
}
let javier = new Persona('javier','perez')
console.log(javier.infoCompleta())




class Jugador extends Persona{
    constructor(nombre,apellido,deporte){
        super(nombre,apellido)
        this.deporte = deporte;
    }
    /* reescribiendo un metodo, solo hace falta nombrarlo de la misma manera en esta clase */
    infoCompleta(){
        return `Hola ${this.nombre} ${this.apellido} tu deporte es ${this.deporte}`
    }
}
let javierJugador = new Jugador('javier','perez','tenis')
console.log(javierJugador.infoCompleta())
