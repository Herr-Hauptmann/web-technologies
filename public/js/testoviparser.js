let TestoviParser=(function(){
    let ucitajJson = function(parametar){
        let rezultatTestiranja = JSON.parse(parametar);
        if (rezultatTestiranja.tests == undefined || rezultatTestiranja.failures == undefined || rezultatTestiranja.stats.passes == undefined || rezultatTestiranja.stats.tests == undefined)
            throw error;
        return rezultatTestiranja;
    }

    let dajTacnost = function(jsonString){
        try{
            var rezultatTestiranja = ucitajJson(jsonString);
        }
        catch{
            return{"tacnost": `0%`, "greske": ["Testovi se ne mogu izvršiti"]};
        }
        const procenat = Math.round((rezultatTestiranja.stats.passes/rezultatTestiranja.stats.tests)*1000)/10;
        let greske = [];
        rezultatTestiranja.failures.forEach(function (greska) {
            greske.push(greska.fullTitle);
        });
        return {"tacnost": `${procenat}%`, "greske": greske};
    }

    let pronadjiTest = function(test, testovi)
    {
        for (let i = 0; i < testovi.length; i++)
        {
            if (testovi[i].fullTitle == test.fullTitle)
                return true;
        }
        return false;
    }

    let uporediTestove = function(testovi1, testovi2)
    {
        if (testovi1.length != testovi2.length)
            return false;
        for (let i = 0; i < testovi1.length; i++)
        {
            if (!pronadjiTest(testovi1[i], testovi2))
                return false;
        }
        return true;
    }
    
    let porediRezultate = function(rezultat1, rezultat2){
        try{
            var rezultatTestiranja1 = ucitajJson(rezultat1);
            var rezultatTestiranja2 = ucitajJson(rezultat2);
        }
        catch{
            return{"promjena": `0%`, "greske": ["Testovi se ne mogu izvršiti"]};
        }
        if (uporediTestove(rezultatTestiranja1.tests, rezultatTestiranja2.tests))
        {
            let povratni = dajTacnost(rezultat2);
            povratni.greske.sort((a, b) => a.localeCompare(b));
            return{"promjena": `${povratni.tacnost}`, "greske": povratni.greske};
        }
        //Ovdje mozemo pretpostaviti da testovi nisu isti
        let greske1 = rezultatTestiranja1.failures;
        // console.log({"Greske 1 prije filtriranja" : greske1});
        greske1.filter(test => pronadjiTest(test, rezultatTestiranja2.tests));
        // console.log({"Greske 1 poslije filtriranja" : greske1});
        let greske2 = rezultatTestiranja2.failures;
        // console.log({"Greske 2 prije sortiranja" : greske2});
        greske1.sort((a, b) => a.fullTitle.localeCompare(b.fullTitle));
        greske2.sort((a, b) => a.fullTitle.localeCompare(b.fullTitle));
        let x = (greske1.length+greske2.length)/(greske1.length+rezultatTestiranja2.tests.length)*100;
        x = Math.round(x*10)/10;
        let sveGreske = Array.from(greske1.concat(greske2), x => x.fullTitle);
        return{"promjena": `${x}%`, "greske": sveGreske};
    }
    
    return{
        dajTacnost: dajTacnost,
        porediRezultate: porediRezultate
    };
}());