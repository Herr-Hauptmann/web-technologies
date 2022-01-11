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

        ajax.send();
    }

    let dohvatiPodatke = function(callbackFja){
        var ajax = new XMLHttpRequest();
        ajax.open("GET","http://localhost:3000/vjezbe",true);
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
        ajax.send();
    }

    iscrtajVjezbe = function(divDOMelement,objekat){
        for (let i = 0; i < objekat.brojVjezbi; i++)
        {
            let div = document.createElement('div');
            div.classList.add("card");
            div.classList.add("border-secondary");
            div.appendChild(iscrtajNaslovVjezbe(i+1));
            divDOMelement.appendChild(div);
        }
    };

    iscrtajZadatke = function(vjezbaDOMelement,brojZadataka){
        // <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#odabirVjezbe">
        //                 <div class="card-body text-secondary">
        //                     <button type="button" class="btn btn-outline-dark my-2">Zadatak 1</button>
        //                     <button type="button" class="btn btn-outline-dark my-2">Zadatak 2</button>
        //                     <button type="button" class="btn btn-outline-dark my-2">Zadatak 3</button>
        //                     <button type="button" class="btn btn-outline-dark my-2">Zadatak 4</button>
        //                 </div>
        //               </div>
    };

    iscrtajNaslovVjezbe = function(brojVjezbe){
        div = document.createElement("div");
        div.classList.add('card-header');
        div.id=`heading${brojVjezbe}`;
        
        h2 = document.createElement("h2");
        h2.classList.add('mb-0');
        
        
        button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-link');
        button.classList.add('btn-block');
        button.classList.add('text-dark');
        button.classList.add('text-left');
        button.type = "button";
        button.dataset.toggle="collapse";
        button.dataset.target=`#collapse${brojVjezbe}`;
        button.setAttribute("aria-expanded", "true");
        button.setAttribute('aria-controls', `collapse${brojVjezbe}`);
        button.innerHTML = `Vježba ${brojVjezbe}`;
        
        h2.appendChild(button);
        div.appendChild(h2);
        // <div class="card-header" id="headingOne">
        //     <h2 class="mb-0">
        //         <button class="btn btn-link btn-block text-left " type="button" 
        //         data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        //         Vježba 1
        //         </button>
        //     </h2>
        // </div>
        return div;
    }

    return{
        posaljiPodatke: posaljiPodatke, 
        dodajInputPolja: dodajInputPolja,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    };
}());