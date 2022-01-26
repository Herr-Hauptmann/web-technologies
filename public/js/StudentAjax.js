let StudentAjax = (function(){
    let dodajStudenta = async function(student,callbackFja){
        var ajax = new XMLHttpRequest();
        ajax.open("POST","http://localhost:3000/student",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.onreadystatechange = function() {
            console.log(ajax.responseText);
            var rezultat = JSON.parse(ajax.responseText);
            if (ajax.readyState == 4 && ajax.status == 200){
                callbackFja(rezultat);
            }
            else if (ajax.readyState == 4)
                callbackFja(rezultat);
        }
        ajax.send(JSON.stringify(student));
    }

    let postaviGrupu = function(index,grupa,fnCallback){

    }

    let dodajBatch = function (csvStudenti,fnCallback){

    }
    return{
        dodajStudenta: dodajStudenta,
        postaviGrupu: postaviGrupu,
        dodajBatch: dodajBatch
    };
}());