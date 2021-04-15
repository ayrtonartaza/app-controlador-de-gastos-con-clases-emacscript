/* variables form ingreso */
let inputdinero =document.getElementById('dinero__input');
let formdinero= document.getElementById('form__dinero');
let error__form__dinero = document.getElementById('error__dinero');
let disponiblehtml = document.getElementById('span__disponible');
let containerdisponiblehtml = document.getElementById('disponible');

/* variables form gasto */
let inputgastotipo =document.getElementById('tipo__gasto');
let inputgastocantidad =document.getElementById('cantidad__gasto');
let formgasto= document.getElementById('form__gasto');
let gastoscontainerhtml= document.getElementById('container__cards__gastos');
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
        if(total <0){
            containerdisponiblehtml.style.background ='#F2DBDB';
        }
        disponiblehtml.textContent=total;
    }
    escribirGastos(){
        gastoscontainerhtml.innerHTML='';
        gastos.forEach(gasto =>{
            gastoscontainerhtml.innerHTML+=`
            <div id="gastos">
            <div class="info__detail"> 
                <span class="gastos__info__titulo">Tipo</span> <span id="span__gastos__tipo">${gasto.tipo}</span>
            </div>
            <div class="info__detail">
                <span class="gastos__info__titulo">Cantidad</span> <span id="span__gastos__cantidad">$${gasto.cantidad}</span>
            </div>
        </div>
            `;
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
    else if(dinero <= 0){
        error__form__dinero.textContent ='Es menor a 0';
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
function comprobarTipo(e){
    gastotipo =inputgastotipo.value;
    if(gastotipo === ''){
        error__gasto__tipo.textContent = 'Campo vacio'
        e.preventDefault()
    }else if(parseFloat(gastotipo)){
        error__gasto__tipo.textContent = 'Solo palabras'
        e.preventDefault()
    }
    error__gasto__tipo.textContent = '';
}

inputgastocantidad.addEventListener('blur',comprobarCantidad);
function comprobarCantidad(e){
    gastocantidad = parseFloat(inputgastocantidad.value);
    if(gastocantidad === ''){
        error__gasto__cantidad.textContent = 'Campo vacio'
        e.preventDefault()
    }else if(isNaN(gastocantidad)){
        error__gasto__cantidad.textContent = 'No es un numero'
        e.preventDefault()
    }
    else if(gastocantidad <= 0){
        error__gasto__cantidad.textContent ='Menor a 0'
        e.preventDefault()
    }
    error__gasto__cantidad.textContent = '';
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