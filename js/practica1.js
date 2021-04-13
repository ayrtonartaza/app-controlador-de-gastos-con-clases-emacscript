/* se llama inmediatamente */
(function ver(){
    console.log('ver')
}())

const persona1 ={
    nombre :'ayrton',
    saludar(){
        console.log('hi'+" "+ this.nombre)
    },
    comer(comida){
        console.log('hi'+' '+this.nombre+" "+'heres your'+' '+comida)
    }
}
const persona2 ={
    nombre :'pep',
}
persona1.comer('sopa')
persona1.saludar.call(persona2)
persona1.comer.call(persona2,'milanesa')

const comer= persona1.comer.bind(persona2,'ensalada');
comer()





    
