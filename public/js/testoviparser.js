let TestoviParser=(function(){
    let dajTacnost = function(jsonString){
        let rezultatTestiranja;
        try{
            rezultatTestiranja = JSON.parse(jsonString);
            if (rezultatTestiranja.failures == undefined || rezultatTestiranja.stats.passes == undefined || rezultatTestiranja.stats.tests == undefined)
                throw error;
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
    return{dajTacnost: dajTacnost};
}());