const ajouter  = document.getElementById('Ajouter');
const container2 = document.getElementById('container2');
const close = document.getElementById('close');
const closex = document.getElementById('closex');
const closex2 = document.getElementById('closex2');

let enrgEmp = document.getElementById('enregistrer');
let nom = document.getElementById('nom');
let role = document.getElementById('role');
let photo = document.getElementById('photo');
let mail = document.getElementById('mail');
let tel = document.getElementById('tel');
let entreprise = document.getElementById('entreprise');
let poste = document.getElementById('poste');
let dateDeb = document.getElementById('dateDeb');
let dateFin = document.getElementById('dateFin');

// const openInfo  = document.getElementById('btn_info');
// const container_3 = document.getElementById('container_3');




// openInfo.addEventListener('click', () => {

// container_3.classList.add('show')



// }) ;

// closex2.addEventListener('click', () =>{

// container_3.classList.remove('show')



// }) ;








ajouter.addEventListener('click', () =>{

container2.classList.add('show')



}) ;
close.addEventListener('click', () =>{

container2.classList.remove('show')



}) ;
closex.addEventListener('click', () =>{


    container2.classList.remove('show')



}) ;


// create employe
let dataEmploye;
if(localStorage.employe != null){

    dataEmploye =  JSON.parse(localStorage.employe)
}else{

    dataEmploye = [];
 }


enrgEmp.onclick = function (){


   let newEmp = {

    nom:nom.value,
    role:role.value,
    photo:photo.value,
    mail:mail.value,
    tel:tel.value,
    entreprise:entreprise.value,
    poste:poste.value,
    dateDeb:dateDeb.value,
    dateFin:dateFin.value,

     
   }

   dataEmploye.push(newEmp);
   localStorage.setItem('employe',    JSON.stringify(dataEmploye)   );
   
   clearData();
   voirData();


}



// clear input

function clearData(){
     
    nom.value = '';
    photo.value = ''; 
    mail.value = '';
    tel.value = '';
    entreprise.value = '';
    poste.value = '';
    dateDeb.value = '';
    dateFin.value = '';

}


// read

function voirData(){

    let table = '';
    for(let i = 0; i < dataEmploye.length;i++){

        table += `
        <div class="employe">
            <img src="${dataEmploye[i].photo}" alt="">
            <div class="info_employe">
            <h2>${dataEmploye[i].nom}</h2>
            <h3>${dataEmploye[i].role}</h3>
            </div>
            <div class="btn-edit-info-delet">
            <button id="btn_info">info</button>
            <button id="btn_edit">Edit</button>
            <button onclick="deleteData(  ${i}  )" id="btn_delet">delet</button>
            </div>
         
        </div>
        ` 
       
    }



    document.getElementById('tous_les_employe').innerHTML = table;
}

voirData()

// delet
function deleteData(i){
    dataEmploye.splice(i,1);
    localStorage.employe = JSON.stringify(dataEmploye); 
    voirData()
}


