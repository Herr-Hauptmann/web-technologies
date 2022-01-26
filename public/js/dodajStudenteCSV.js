let csv = document.getElementById('csv');
let ajaxstatus = document.getElementById('ajaxstatus');
let forma = document.getElementById('forma');
let submitDugme = document.getElementById('posalji');

submitDugme.addEventListener('click', (event)=>{
    StudentAjax.dodajBatch(csv.value, ispisi);
});

function ispisi(data){
    ajaxstatus.classList.add("alert");
    ajaxstatus.classList.add("alert-success");
    ajaxstatus.innerHTML = data.status;
    forma.reset();
}