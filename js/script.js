const meses = ['sopa','carne','leche'];
const meses2 = ['miel','banana','avena'];

const productos = [
    {nombre:'javier',precio:500},
    {nombre:'cesar',precio:100},
    {nombre:'juan',precio:300}
]

let total =0;

/* const existe = productos.reduce((item,productos)=> total+=productos.precio ,0) */
const existe = productos.filter(item => item.nombre == 'javier');
console.log(existe)
/* const existe = productos.find(item => item.precio == 300) */
/* const existe = productos.every(item => item.precio < 1000); */
/* meses3 = [...meses,...meses2]; */
/* const meses3 = [...meses,...meses2 , 'helado'] */
/* const producto2 = {nombre:'ayrton',precio:300}; */
/* un objeto no se le puede usar spread operator, no es iterable */
/* const carrito =[...productos,producto2];
console.log(carrito) */


/* carrito.push([productos]) */

/* let ver2 =function(x,y){
    return x + y;
}

const ver =(x,y) => {return x + y}

*/
document.addEventListener('DOMContentLoaded',() => console.log('listo'))