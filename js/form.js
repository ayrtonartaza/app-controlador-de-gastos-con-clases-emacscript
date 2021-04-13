const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const button = document.getElementById('button');
const formsubmitemodal = document.querySelector('.modal');
const iconclose = document.querySelector('#icon__close');

const aviso__email__error = document.getElementById('aviso__email__error');
const aviso__subject__error = document.getElementById('aviso__subject__error');
const aviso__message__error = document.getElementById('aviso__message__error');

const form =document.querySelector('form');
const er =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


eventListeners();
/* var inputs */


/*  llama a las funciones cuando se carga el dom*/
function eventListeners(){
    document.addEventListener('DOMContentLoaded',iniciarApp);
    email.addEventListener('blur',comprobarInputs)
    subject.addEventListener('blur',comprobarInputs)
    message.addEventListener('blur',comprobarInputs)
}



function iniciarApp (){
    button.disabled = true;
}


/* validar inputs */
function comprobarInputs(e){
    
    /* comprobacion de email */
    if(e.target.type === 'email' && er.test(e.target.value) ){
        aviso__email__error.classList.remove('aviso__error')
        bordeNegro(e)
    }else if(e.target.type === 'email'){
        aviso__email__error.classList.add('aviso__error')
        bordeRojo(e)
    }

    /* comprobacion de subject */
    if(e.target.type === 'text'  && e.target.value.length <= 0 ){
        aviso__subject__error.classList.add('aviso__error')
        bordeRojo(e)
    }else if(e.target.type === 'text'  && e.target.value.length > 0 ){
        aviso__subject__error.classList.remove('aviso__error')
        bordeNegro(e)
    }
   
    /* comprobacion de message */
    if(e.target.type === 'textarea'  && e.target.value.length <= 0 ){
        aviso__message__error.classList.add('aviso__error')
        bordeRojo(e)
    }else if(e.target.type === 'textarea'  && e.target.value.length > 0 ){
        aviso__message__error.classList.remove('aviso__error')
        bordeNegro(e)
    }


    habilitarBoton()
}

function bordeRojo(e){
    e.target.style.borderColor ='red';
}
function bordeNegro(e){
    e.target.style.borderColor ='black';
}

function habilitarBoton (){
    if(er.test(email.value) && subject.value!== '' && message.value != ''){
        button.disabled =false;
    }else{
        button.disabled = true;
    }
}


form.addEventListener('submit',formEnviado)
/* form functions */
function formEnviado(){
    form.reset()
    formsubmitemodal.classList.add('form__submited');
}

iconclose.addEventListener('click',cerrarModal)
function cerrarModal(){
    formsubmitemodal.classList.remove('form__submited');
}

