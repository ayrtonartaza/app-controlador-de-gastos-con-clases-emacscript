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
        localStorage.setItem('disponible',JSON.stringify(total))
        return total;
    }
    obtenerGastos(){
        gastos.forEach(gasto => {
        this.gastotipo = gasto.tipo,
        this.gastocantidad = gasto.cantidad
        })  
        localStorage.setItem('gastos',JSON.stringify(gastos))
        return gastos;
    }
    
    restarGastosaDisponible(){
        total  -= this.gastocantidad;
        localStorage.setItem('disponible',JSON.stringify(total))
        return total;
    }
    
    eliminarGastos(){
        for (let i = 0; i < gastos.length; i++) {
            if(gastos[i].id == gastoid){
                gastos.splice(i,1)
            }
        }
        total += parseFloat(gastocantidad);
        console.log(total)
        localStorage.setItem('gastos',JSON.stringify(gastos))
        localStorage.setItem('disponible',JSON.stringify(total))
        return total;
     }
}


class UI extends Disponible{
    escribirDisponible(){
        if(total <0){
            containerdisponiblehtml.style.background ='#F2DBDB';
        }
        else{
            containerdisponiblehtml.style.background ='#8DF0C0';
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
                <span class="gastos__info__titulo">Cantidad</span> <span id="span__gastos__cantidad" class="gastocantidadspan">${gasto.cantidad}</span>
            </div>
            <button class='buttoneliminar' id="${gasto.id}">Eliminar</button>
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
let gasto;
let gastocantidad;
let gastotipo;

/* local storage disponible */
document.addEventListener('DOMContentLoaded',localStorageDisponible)
function localStorageDisponible(){
    if(JSON.parse(localStorage.getItem('disponible'))){
        total = JSON.parse(localStorage.getItem('disponible'))
        localStorage.setItem('disponible',JSON.stringify(total))
        ui = new UI();
        ui.escribirGastos()
        ui.escribirDisponible()
    }
}
/* local storage gastos */
document.addEventListener('DOMContentLoaded',localStorageGastos)
function localStorageGastos(){
    if(JSON.parse(localStorage.getItem('gastos'))){
        gastos=JSON.parse(localStorage.getItem('gastos'));
        localStorage.setItem('gastos',JSON.stringify(gastos))
        ui = new UI();
        ui.escribirGastos()
       /*  ui.escribirDisponible() */
    }
}



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
        gasto ={
            tipo:gastotipo,
            cantidad:gastocantidad,
            id:Date.now()
        }
        gastos.push(gasto)

        /* clase disponible con gastos añadidos */
        disponible = new UI(gastos);
        disponible.obtenerGastos();
        disponible.restarGastosaDisponible(gastos);
        /* escribir en html el total con los gastos añadidos*/
        ui = new UI();
        ui.escribirDisponible()
        ui.escribirGastos()
}

gastoscontainerhtml.addEventListener('click',(e)=>{
    if(e.target.classList.contains('buttoneliminar')){
        gastoid = e.target.id;
        gastocantidad=e.target.parentElement.querySelector('.info__detail .gastocantidadspan').textContent;
        disponible = new Disponible(gastos)
        disponible.obtenerGastos(gastos)
        disponible.eliminarGastos();
        console.log(gastoid)
        console.log(gastocantidad)
        ui = new UI();
        ui.escribirDisponible()
        ui.escribirGastos()
    }
   
})