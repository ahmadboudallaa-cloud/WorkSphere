const sallesConfig = {
    'salle-conference': { 
        nom: 'Salle de conférence', 
        max: 10, 
        roles: ['Manager', 'Autres roles', 'Agents de nettoyage', 'Réceptionnistes', 'Techniciens IT', 'Agents de sécurité']
    },
    'reception': { 
        nom: 'Réception', 
        max: 10, 
        roles: ['Réceptionnistes', 'Manager']
    },
    'salle-serveurs': { 
        nom: 'Salle des serveurs', 
        max: 3, 
        roles: ['Techniciens IT', 'Manager']
    },
    'salle-securite': { 
        nom: 'Salle de sécurité', 
        max: 2, 
        roles: ['Agents de sécurité', 'Manager']
    },
    'salle-personnel': { 
        nom: 'Salle du personnel', 
        max: 8, 
        roles: ['Manager', 'Agents de nettoyage', 'Autres roles', 'Réceptionnistes', 'Techniciens IT', 'Agents de sécurité']
    },
    'salle-archives': { 
        nom: 'Salle d\'archives', 
        max: 2, 
        roles: ['Manager', 'Autres roles']
    }
};

const DEFAULT_PHOTO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlsFAzBV-hQgLpJydoIb3NfWraLprFKW0fA&s";

let dataEmploye = [];
let employesAssignes = {
    'salle-conference': [],
    'reception': [],
    'salle-serveurs': [],
    'salle-securite': [],
    'salle-personnel': [],
    'salle-archives': []
};

let mode = "create";
let tempIndex;
let experienceCount = 0;

const ajouter = document.getElementById('Ajouter');
const container2 = document.getElementById('container2');
const close = document.getElementById('close');
const closex = document.getElementById('closex');
const container_3 = document.getElementById('container_3');
const enrgEmp = document.getElementById('enregistrer');
const nom = document.getElementById('nom');
const role = document.getElementById('role');
const photo = document.getElementById('photo');
const mail = document.getElementById('mail');
const tel = document.getElementById('tel');
const btnExperience = document.getElementById('ajouter_experience');
const infoExperience = document.getElementById('info_experience');

document.addEventListener('DOMContentLoaded', function() {
    initialiserApp();
});

function initialiserApp() {
    ajouter.onclick = () => ouvrirModalAjout();
    close.onclick = () => fermerModalAjout();
    closex.onclick = () => fermerModalAjout();
    
    if (btnExperience && infoExperience) {
        btnExperience.addEventListener('click', ajouterExperience);
    }
    
    photo.addEventListener('input', function() {
        previewPhoto(this.value);
    });
    
    initialiserSalles();
    
    voirData();
    updateAffichageSalles();
}



function ajouterExperience() {
    experienceCount++;
    
    const nouvelleExperience = document.createElement('div');
    nouvelleExperience.className = 'experience-groupe';
    nouvelleExperience.innerHTML = `
        <div class="titre-experience-groupe">
            <h3>Expérience ${experienceCount}</h3>
            <button type="button" class="supprimer-experience" onclick="supprimerExperience(this)">×</button>
        </div>
        <div class="champs-experience">
            <h4>Nom d'entreprise</h4>
            <input type="text" class="entreprise" placeholder="Nom d'entreprise">
            <h4>Poste</h4>
            <input type="text" class="poste" placeholder="Votre poste dans l'entreprise">
            <h4>Date de début</h4>
            <input type="date" class="dateDeb">
            <h4>Date de fin</h4>
            <input type="date" class="dateFin">
        </div>
        <div class="tres-exp"></div>
    `;
    
    infoExperience.appendChild(nouvelleExperience);
}

function supprimerExperience(bouton) {
    const experienceGroupe = bouton.closest('.experience-groupe');
    experienceGroupe.remove();
    experienceCount--;
    
    // Renuméroter les expériences restantes
    const tousLesGroupes = document.querySelectorAll('.experience-groupe');
    tousLesGroupes.forEach((groupe, index) => {
        const titre = groupe.querySelector('h3');
        titre.textContent = `Expérience ${index + 1}`;
    });
    experienceCount = tousLesGroupes.length;
}

function getExperiences() {
    const experiences = [];
    const groupesExperience = document.querySelectorAll('.experience-groupe');
    
    groupesExperience.forEach(groupe => {
        const entreprise = groupe.querySelector('.entreprise').value;
        const poste = groupe.querySelector('.poste').value;
        const dateDeb = groupe.querySelector('.dateDeb').value;
        const dateFin = groupe.querySelector('.dateFin').value;
        
        if (entreprise || poste || dateDeb || dateFin) {
            experiences.push({
                entreprise: entreprise,
                poste: poste,
                dateDeb: dateDeb,
                dateFin: dateFin
            });
        }
    });
    
    return experiences;
}

function clearExperiences() {
    infoExperience.innerHTML = '';
    experienceCount = 0;
}



function ouvrirModalAjout() {
    container2.classList.add("show");
    clearData();
}

function fermerModalAjout() {
    container2.classList.remove("show");
    mode = "create";
    clearData();
}

function previewPhoto(url) {
    const preview = document.getElementById('photoPreview');
    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
        preview.innerHTML = `<img src="${url}" alt="Preview" onerror="this.src='${DEFAULT_PHOTO}'">`;
    } else {
        preview.innerHTML = '';
    }
}



function validerFormulaire() {
    if (!nom.value.trim()) {
        alert("Veuillez entrer le nom complet");
        return false;
    }
    
    if (role.value === "null") {
        alert("Veuillez sélectionner un rôle");
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mail.value && !emailRegex.test(mail.value)) {
        alert("Veuillez entrer un email valide");
        return false;
    }
    
    const telRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
    if (tel.value && !telRegex.test(tel.value)) {
        alert("Veuillez entrer un numéro de téléphone valide");
        return false;
    }
    
    const groupesExperience = document.querySelectorAll('.experience-groupe');
    for (let groupe of groupesExperience) {
        const dateDeb = groupe.querySelector('.dateDeb').value;
        const dateFin = groupe.querySelector('.dateFin').value;
        
        if (dateDeb && dateFin) {
            const debut = new Date(dateDeb);
            const fin = new Date(dateFin);
            if (debut >= fin) {
                alert("La date de début doit être antérieure à la date de fin");
                return false;
            }
        }
    }
    
    return true;
}



enrgEmp.onclick = function() {
    if (!validerFormulaire()) return;
    
    const experiences = getExperiences();
    
    let newEmp = {
        nom: nom.value.trim(),
        role: role.value,
        photo: photo.value.trim() || DEFAULT_PHOTO,
        mail: mail.value.trim(),
        tel: tel.value.trim(),
        experiences: experiences,
        id: Date.now()
    };
    
    if (mode === "create") {
        dataEmploye.push(newEmp);
    } else {
        dataEmploye[tempIndex] = newEmp;
        mode = "create";
    }
    
    fermerModalAjout();
    voirData();
};

function clearData() {
    nom.value = "";
    role.value = "null";
    photo.value = "";
    mail.value = "";
    tel.value = "";
    document.getElementById('photoPreview').innerHTML = "";
    clearExperiences();
}

function voirData() {
    let table = "";
    const employesNonAssignes = dataEmploye.filter(emp => 
        !Object.values(employesAssignes).flat().some(empAssign => empAssign.id === emp.id)
    );
    
    if (employesNonAssignes.length === 0) {
        table = '<p style="color: #FCA311; text-align: center; padding: 20px;">Aucun employé non assigné</p>';
    } else {
        employesNonAssignes.forEach((emp, i) => {
            const index = dataEmploye.findIndex(e => e.id === emp.id);
            table += `
            <div class="employe">
                <img src="${emp.photo}" alt="${emp.nom}" onerror="this.src='${DEFAULT_PHOTO}'">
                <div class="info_employe">
                    <h2>${emp.nom}</h2>
                    <h3>${emp.role}</h3>
                </div>
                <div class="btn-edit-info-delet">
                    <button id="btn_info" onclick="showInfo(${index})">Info</button>
                    <button id="btn_edit" onclick="editData(${index})">Edit</button>
                    <button id="btn_delet" onclick="deleteData(${index})">Delete</button>
                </div>
            </div>
            `;
        });
    }
    
    document.getElementById("tous_les_employe").innerHTML = table;
}

function deleteData(i) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
        const employeId = dataEmploye[i].id;
        
        for (const salleId in employesAssignes) {
            employesAssignes[salleId] = employesAssignes[salleId].filter(emp => emp.id !== employeId);
        }
        
        dataEmploye.splice(i, 1);
        voirData();
        updateAffichageSalles();
    }
}

function editData(i) {
    mode = "update";
    tempIndex = i;
    
    let emp = dataEmploye[i];
    
    nom.value = emp.nom;
    role.value = emp.role;
    photo.value = emp.photo;
    mail.value = emp.mail;
    tel.value = emp.tel;
    
    clearExperiences();
    if (emp.experiences && emp.experiences.length > 0) {
        emp.experiences.forEach(exp => {
            ajouterExperience();
            const dernierGroupe = document.querySelector('.experience-groupe:last-child');
            dernierGroupe.querySelector('.entreprise').value = exp.entreprise || '';
            dernierGroupe.querySelector('.poste').value = exp.poste || '';
            dernierGroupe.querySelector('.dateDeb').value = exp.dateDeb || '';
            dernierGroupe.querySelector('.dateFin').value = exp.dateFin || '';
        });
    }
    
    previewPhoto(emp.photo);
    container2.classList.add("show");
}

function showInfo(i) {
    let emp = dataEmploye[i];
    
    let experiencesHTML = '';
    if (emp.experiences && emp.experiences.length > 0) {
        emp.experiences.forEach((exp, index) => {
            experiencesHTML += `
                <div class="experience-detail">
                    <h4>Expérience ${index + 1}</h4>
                    <p><strong>Entreprise:</strong> ${exp.entreprise || 'Non spécifié'}</p>
                    <p><strong>Poste:</strong> ${exp.poste || 'Non spécifié'}</p>
                    <p><strong>Date début:</strong> ${exp.dateDeb || 'Non spécifié'}</p>
                    <p><strong>Date fin:</strong> ${exp.dateFin || 'Non spécifié'}</p>
                </div>
            `;
        });
    } else {
        experiencesHTML = '<p>Aucune expérience professionnelle</p>';
    }
    
    let card = `
    <div class="card-2">
        <div class="titre-card">
            <h1>Info Employé</h1>
            <button onclick="container_3.classList.remove('show')">x</button>
        </div>
        <div class="input_info_employe">
            <div class="photo-info">
                <img src="${emp.photo}" alt="${emp.nom}" onerror="this.src='${DEFAULT_PHOTO}'">
            </div>
            <div class="nom-complet">
                <h1>Nom complet :</h1>
                <p>${emp.nom}</p>
            </div>
            <div class="role-info">
                <h1>Role :</h1>
                <p>${emp.role}</p>
            </div>
            <div class="mail-info">
                <h1>Email :</h1>
                <p>${emp.mail || 'Non spécifié'}</p>
            </div>
            <div class="tel-info">
                <h1>Téléphone :</h1>
                <p>${emp.tel || 'Non spécifié'}</p>
            </div>
            <div class="experience-info">
                <div class="titre-experience">
                    <div>Expériences Professionnelles</div>
                </div>
                ${experiencesHTML}
            </div>
        </div>
    </div>
    `;
    
    container_3.innerHTML = card;
    container_3.classList.add("show");
}

