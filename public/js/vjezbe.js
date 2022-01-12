let vjezbe = document.getElementById('odabirVjezbe');

VjezbeAjax.dohvatiPodatke(crtaj);
function crtaj(greska, rezultat){
    if (greska == null)
        VjezbeAjax.iscrtajVjezbe(vjezbe, rezultat);
    else
        console.log(greska);
}
