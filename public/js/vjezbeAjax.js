let VjezbeAjax = (function(){
    let dodajInputPolja = function(DOMelementDIVauFormi,brojVjezbi){
        DOMelementDIVauFormi.innerHTML='';
        for (i=0;i<brojVjezbi;i++){
            var labela = document.createElement("label");
            labela.classList.add('col-md-4');
            labela.classList.add('col-form-label');
            labela.classList.add('mt-2');
            labela.innerHTML=`Zadaci vjezbe${i+1}`;
            labela.for='z'+i;
            DOMelementDIVauFormi.appendChild(labela);
            var input = document.createElement("input");
            input.id = 'z'+i;
            input.type = "number";
            input.name = "z" + i;
            input.classList.add('form-control');
            input.classList.add('col-md-3');
            input.classList.add('mt-2');
            input.classList.add('zadatak');
            input.value = 4;
            input.required = true;
            DOMelementDIVauFormi.appendChild(input);
            var div = document.createElement('div');
            div.classList.add('col-md-5');
            DOMelementDIVauFormi.appendChild(div);
        }
    }
    let posaljiPodatke = function(vjezbeObjekat,callbackFja){
        var ajax = new XMLHttpRequest();
        ajax.open("POST","http://localhost:3000/vjezbe",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                var rezultat = JSON.parse(ajax.responseText);
                if (rezultat.status=="error")
                {
                    callbackFja(rezultat.data, null);
                }
                callbackFja(null, rezultat);
            }
            else if (ajax.readyState == 4)
                callbackFja(ajax.statusText,null);
        }

        ajax.send(JSON.stringify(vjezbeObjekat));
    }

    return{
        posaljiPodatke: posaljiPodatke, 
        dodajInputPolja:dodajInputPolja
    };
}());