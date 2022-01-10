let unosBrojaVjezbi = document.getElementById('brojVjezbi');
let poljeZaVjezbe = document.getElementById('unosZadataka');
unosBrojaVjezbi.addEventListener('change', ()=>{VjezbeAjax.dodajInputPolja(poljeZaVjezbe, unosBrojaVjezbi.value)});

