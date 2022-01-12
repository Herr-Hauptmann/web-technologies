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
            input.min = 0;
            input.max = 4;
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
                else
                    callbackFja(null, rezultat);
            }
            else if (ajax.readyState == 4)
                callbackFja(ajax.statusText,null);
        }

        ajax.send(JSON.stringify(vjezbeObjekat));
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
                else
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
            div.id=`vjezba${i}`;
            div.classList.add("card");
            div.classList.add("border-secondary");
            let naslov = iscrtajNaslovVjezbe(i+1);
            naslov.addEventListener('click', ()=>{iscrtajZadatke(div, objekat.brojZadataka[i])});
            div.appendChild(naslov);
            divDOMelement.appendChild(div);
        }
    };

    iscrtajZadatke = function(vjezbaDOMelement,brojZadataka){
        let vjezbe = vjezbaDOMelement.getElementsByClassName('collapse');
        if (vjezbe.length != 0)
        {
            if (vjezbe[0].classList.toggle('nePrikazuj'))
                vjezbe[0].classList.add('nePrikazuj');
            return;
        }

        let zadaci = document.createElement("div");
        zadaci.id = `collapse${vjezbaDOMelement.id[6]}`;
        zadaci.classList.add("collapse");
        zadaci.classList.add("show");

        let div = document.createElement("div");
        div.classList.add("card-body");
        div.classList.add("text-secondary");

        for (let i = 0; i < brojZadataka;i++)
        {
            let zadatak = document.createElement('button');
            zadatak.type = "button";
            zadatak.classList.add("btn");
            zadatak.classList.add("btn-outline-dark");
            zadatak.classList.add("mx-1");
            zadatak.classList.add('my-2');
            zadatak.innerHTML = `Zadatak ${i+1}`;
            div.appendChild(zadatak);
        }

        zadaci.appendChild(div);
        vjezbaDOMelement.appendChild(zadaci);
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
        button.innerHTML = `Vježba ${brojVjezbe}`;
        
        h2.appendChild(button);
        div.appendChild(h2);
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