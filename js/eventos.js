console.log(1)
document.addEventListener('DOMContentLoaded',()=> console.log(2))

console.log(3)


const cuadrado = document.querySelector('.rectangle');
const input = document.getElementById('input');
const form= document.getElementById('form');
/* form.addEventListener('input',(e)=> {
    if (e.target.value === '') {
        console.log('campo obligatorio')
    }
})
 */

form.addEventListener('submit', (e)=>{
    
   
    console.log(input.value)
    e.preventDefault();
})


/* window.addEventListener('scroll',()=>{
    const ubicacion = cuadrado.getBoundingClientRect();
    console.log(ubicacion.top)
    if(ubicacion.top < 300){
        console.log('es visible')
        cuadrado.classList.toggle('rojo')
    }
}) */


/* event bublinf */


function prevenirEventBubbling (e){
    /* stop propagation previen el event bubbling, cuando una funcion se cumple cuando otra lo hace,
    puede suceder por ejemplo en cards donde el titulo llame a la funcion de card por estar dentro 
    de ella */
    e.stopPropagation();

}
/* tambien se puede prevenir usando e.target */