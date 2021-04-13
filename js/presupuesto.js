/* variables form ingreso */
let inputdinero =document.getElementById('dinero__input');
let formdinero= document.getElementById('form__dinero');
let error__form__dinero = document.getElementById('error__dinero');
let disponiblehtml = document.getElementById('span__disponible');


/* variables form gasto */
let inputgastotipo =document.getElementById('tipo__gasto');
let inputgastocantidad =document.getElementById('cantidad__gasto');
let formgasto= document.getElementById('form__gasto');
let gastoscontainerhtml= document.getElementById('gastos');
let error__gasto__tipo = document.getElementById('error__gasto__tipo');
let error__gasto__cantidad = document.getElementById('error__gasto__cantidad');
/* clases */
class Disponible{
    constructor(disponible){
        this.disponible = disponible;
    }
    obtenerDisponible(){
        total += this.disponible;
        return total;
    }
    obtenerGastos(gastos){
        gastos.forEach(gasto => {
        this.gastotipo = gasto.tipo,
        this.gastocantidad = gasto.cantidad
        })  
        return gastos;
    }
    restarGastosaDisponible(){
        total  -= this.gastocantidad;
        return total;
    }
}


class UI extends Disponible{
    escribirDisponible(){
        disponiblehtml.textContent=total;
    }
    escribirGastos(){
        gastoscontainerhtml.innerHTML='';
        gastos.forEach(gasto =>{
            gastoscontainerhtml.innerHTML+=`<li>${gasto.tipo} ${gasto.cantidad}</li>`;
        })
        
    }
}


/* instanciando */
let ui;
let disponible;
let total =0;
let gastos=[];

let gastocantidad;
let gastotipo;

/* funciones */
formdinero.addEventListener('submit',ingresarDinero)
function ingresarDinero(e){
    e.preventDefault();
    let dinero = parseFloat(inputdinero.value);
    if(dinero === ''){
        error__form__dinero.textContent ='Campo vacio';
        return false;
    }else if(isNaN(dinero)){
        error__form__dinero.textContent ='No es un numero';
        return false;
    }
    error__form__dinero.textContent ='';
    formdinero.reset()
    
    /* clase disponible */
    disponible = new Disponible(dinero);
    disponible.obtenerDisponible(dinero);


    /* pintando en html */
    ui = new UI();
    ui.escribirDisponible()
}

/* ingresar gasto */
inputgastotipo.addEventListener('blur',comprobarTipo);
function comprobarTipo(){
    gastotipo =inputgastotipo.value;
    if(gastotipo === ''){
        error__gasto__tipo.textContent = 'Campo vacio'
        return false;
    }else if(parseFloat(gastotipo)){
        error__gasto__tipo.textContent = 'Solo palabras'
        return false;
    }
    error__gasto__tipo.textContent = '';
    return gastotipo;
}

inputgastocantidad.addEventListener('blur',comprobarCantidad);
function comprobarCantidad(){
    gastocantidad = parseFloat(inputgastocantidad.value);
    if(gastocantidad === ''){
        error__gasto__cantidad.textContent = 'Campo vacio'
        return false;
    }else if(isNaN(gastocantidad)){
        error__gasto__cantidad.textContent = 'No es un numero'
        return false;
    }
    error__gasto__cantidad.textContent = '';
    return gastocantidad;
}

formgasto.addEventListener('submit',ingresarGasto);
function ingresarGasto(e){
        e.preventDefault();
        comprobarTipo();
        comprobarCantidad()
        formgasto.reset()
        let gasto ={
            tipo:gastotipo,
            cantidad:gastocantidad
        }
        gastos.push(gasto)

        /* clase disponible con gastos añadidos */
        disponible = new UI(gastos);
        disponible.obtenerGastos(gastos);
        disponible.restarGastosaDisponible(gastos);
        /* escribir en html el total con los gastos añadidos*/
        ui = new UI();
        ui.escribirDisponible()
        ui.escribirGastos()
}