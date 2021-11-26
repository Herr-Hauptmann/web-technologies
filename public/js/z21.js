let TestoviParser=(function(){
    let dajTacnost = function(jsonString){
        const rezultatTestiranja = JSON.parse(jsonString);
        const procenat = Math.round((rezultatTestiranja.stats.passes/rezultatTestiranja.stats.tests)*1000)/10;
        let greske = [];
        rezultatTestiranja.failures.forEach(function (greska) {
            greske.push(greska.fullTitle);
        });
        return {"tacost": `${procenat}%`, "greske": greske};
    }
    return{dajTacnost: dajTacnost};
}());

console.log(TestoviParser.dajTacnost("{\n    \"stats\":{\n        \"suites\":2,\n        \"tests\":2,\n        \"passes\":1,\n        \"pending \":0,\n        \"failures\":1,\n        \"start\":\"2021-11-05T15:00:26.343Z\",\n        \"end\":\"2021-11-05T15:00 :26.352Z\",\n        \"duration\":9\n    },\n    \"tests\":[\n        {\n            \"title\":\"should draw 3 rows when parameter are 2,3\",\n            \"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n            \"file\":null,\n            \"duration\":1,\n            \"currentRetry\":0,\n            \"speed\":\"fast\",\n            \"err\":{\n                \n            }\n        },\n        {\n            \"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\n            \"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n            \"file\":null,\n            \"duration\":0,\n            \"currentRetry\":0,\n            \"speed\":\"fast\",\n            \"err\":{\n                \n            }\n        }\n    ],\n    \"pending\":[\n        \n    ],\n    \"failures\":[\n        {\n            \"title\":\"should draw 2 columns in row 2 when parameter are 2,3\",\n            \"fullTitle\":\"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3\",\n            \"file\":null,\n            \"duration\":0,\n            \"currentRetry\":0,\n            \"speed\":\"fast\",\n            \"err\":{\n                \n            }\n        }\n    ],\n    \"passes\":[\n        {\n            \"title\":\"should draw 3 rows when parameter are 2,3\",\n            \"fullTitle\":\"Tabela crtaj() should draw 3 rows when parameter are 2,3\",\n            \"file\":null,\n            \"duration\":1,\n            \"currentRetry\":0,\n            \"speed\":\"fast\",\n            \"err\":{\n                \n            }\n        }\n    ]\n}"));

