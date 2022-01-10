let VjezbeAjax = (function(){
    let dodajInputPolja = function(DOMelementDIVauFormi,brojVjezbi){
        for (i=0;i<brojVjezbi;i++){
            // Create an <input> element, set its type and name attributes
            var labela = document.createElement("label");
            labela.classList.add('col-md-4');
            labela.classList.add('col-form-label');
            labela.classList.add('mt-2');
            labela.innerHTML=`Broj zadataka vježbe ${i+1}`;
            labela.for='vjezba'+i;
            DOMelementDIVauFormi.appendChild(labela);
            var input = document.createElement("input");
            input.type = "number";
            input.name = "vjezba" + i;
            input.classList.add('form-control');
            input.classList.add('col-md-3');
            input.classList.add('mt-2');
            input.required = true;
            DOMelementDIVauFormi.appendChild(input);
            var div = document.createElement('div');
            div.classList.add('col-md-5');
            DOMelementDIVauFormi.appendChild(div);
        }
    }
    let posaljiPodatke = function(vjezbeObjekat,callbackFja){

    }

    return{
        posaljiPodatke: posaljiPodatke, 
        dodajInputPolja:dodajInputPolja
    };
}());