let resultados =document.getElementById('resultados');
const year = document.getElementById('year')
const estado = document.getElementById('estado')


window.addEventListener('load',evenlisteners);
function evenlisteners (){
    escribirDatos(autos)
    llenarSelect(autos)
}

const datosBusqueda ={
    marca:'',
    epoca:null,
    estado:'',
    puertas:''
}

/* escuchar selects */
year.addEventListener('change',determinarEpoca)
function determinarEpoca (e){
    datosBusqueda.epoca =e.target.value;
    filtrarAuto()
}
estado.addEventListener('change',determinarEstado)
function determinarEstado(e){
    datosBusqueda.estado =e.target.value;
    filtrarAuto()
}


function escribirDatos (autos){
    limpiarDatosHtml()
    autos.forEach(i =>{
        const {marca,epoca,estado,puertas} = i;
        const autohtml = document.createElement('p');
        autohtml.textContent=`
            ${marca} ${epoca} ${estado} ${puertas}
        `
        resultados.appendChild(autohtml)
        return autohtml;
    })
}

function limpiarDatosHtml(){
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild)
    }
}


/* poner los valores en los selects */
function llenarSelect (){
    for (let i = 2020; i >= 2010; i--) {
        let option = document.createElement('option');
        option.textContent=i;
        year.appendChild(option) 
    }
}


/* filtrar global*/
function filtrarAuto(){
    const resultado = autos.filter(filtrarEpoca).filter(filtrarEstado)
    if(resultado.length){
        escribirDatos(resultado)
    }else{
        noResultado()
    }
}
function noResultado(){
    limpiarDatosHtml()


    const noResultado = document.createElement('p');
    noResultado.textContent = 'No tenemos disponibles autos con esas caracteristicas';
    resultados.appendChild(noResultado)
}

function filtrarEpoca(auto){
    if(datosBusqueda.epoca){
        return auto.epoca == datosBusqueda.epoca;
    }
    return auto;
}
function filtrarEstado(auto){
    if(datosBusqueda.estado){
        return auto.estado == datosBusqueda.estado;
    }
    return auto;
}
/* nota para mi: en la funcion filtrar auto en vez de pasar el parametro ahi mismo
se pasa en lafuncion que filtra autos.filter(item => item.epoca )*/