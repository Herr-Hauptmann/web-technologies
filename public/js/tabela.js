let Tabela = (function () {
    const dajRed = function (tabela) {
        let red = document.createElement("tr");
        tabela.appendChild(red);
        return red;
    }
    const dajCeliju = function (red, prikazi) {
        let celija = document.createElement("td");
        if (!prikazi) celija.style = "display:none;";
        red.appendChild(celija)
        return celija;
    }
    const crtaj = function (x, y) {
        const body = document.getElementsByTagName("body")[0];
        let tabelaEl = document.createElement("table");
        body.appendChild(tabelaEl);
        for (let i = 0; i < y; i++) {
            let red = dajRed(tabelaEl);
            for (let j = 0; j < x; j++) {
                dajCeliju(red, j < i);
            }
        }
    }
    return {
        crtaj: crtaj
    }
 }());