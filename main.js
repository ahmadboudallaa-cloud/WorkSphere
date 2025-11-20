const ajouter  = document.getElementById('Ajouter');
const container2 = document.getElementById('container2');
const close = document.getElementById('close');
const closex = document.getElementById('closex');



ajouter.addEventListener('click', () =>{

container2.classList.add('show')



}) ;
close.addEventListener('click', () =>{

container2.classList.remove('show')



}) ;
closex.addEventListener('click', () =>{


    container2.classList.remove('show')



}) ;