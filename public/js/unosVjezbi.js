let unosBrojaVjezbi = document.getElementById('brojVjezbi');
let poljeZaVjezbe = document.getElementById('unosZadataka');
let submitDugme = document.getElementById('posalji');
unosBrojaVjezbi.addEventListener('change', ()=>{VjezbeAjax.dodajInputPolja(poljeZaVjezbe, unosBrojaVjezbi.value)});
submitDugme.addEventListener('click', ()=>{
    let objekat = {
        brojVjezbi: unosBrojaVjezbi.value,
        brojZadataka: []
    };
    let zadaci = document.getElementsByClassName('zadatak');
    for (let i = 0; i < zadaci.length; i++)
    {
        objekat.brojZadataka.push(parseInt(zadaci[i].value));
    }
    VjezbeAjax.posaljiPodatke(objekat, ispisi);
});

function ispisi(error, data){
    if (error!=null)
        alert(`Greska: ${error}`);
    else
        alert(`Promjena uspjesna! Uneseno ${data.brojVjezbi} vjezbi!`);
}