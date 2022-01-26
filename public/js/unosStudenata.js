let ime = document.getElementById('ime');
let prezime = document.getElementById('prezime');
let grupa = document.getElementById('grupa');
let index = document.getElementById('index');
let ajaxstatus = document.getElementById('ajaxstatus');
let forma = document.getElementById('forma');
let submitDugme = document.getElementById('posalji');

submitDugme.addEventListener('click', (event)=>{
    let objekat = {
        "ime": ime.value,
        "prezime": prezime.value, 
        "index": index.value, 
        "grupa": grupa.value
    };
    StudentAjax.dodajStudenta(objekat, ispisi);
});

function ispisi(data){
    ajaxstatus.classList.add("alert");
    if (data.status.includes('Kreiran')){
        ajaxstatus.classList.add("alert-success");
        ajaxstatus.classList.remove("alert-danger");
    }
    else{
        ajaxstatus.classList.remove("alert-success");
        ajaxstatus.classList.add("alert-danger");
    }
    ajaxstatus.innerHTML = data.status;
    forma.reset();
}