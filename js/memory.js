let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
var interval;
var iconsFind = document.getElementsByClassName("find");
var modal = document.getElementById('modal');
var timer = document.querySelector('.timer');

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()
function resetGame(){
    modal.classList.remove('active');
    startGame();
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
function startGame() 
{
    clearInterval(interval);
    arrayVuoto = [];
   // (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
    var arrayShuffle = shuffle(arrayAnimali); 
    var grid = document.getElementById('griglia')
   // pulisce tutti gli elementi che eventualmente contiene
    grid.innerHTML = '';




    // poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
    arrayShuffle.forEach(element =>
    {
        let card = document.createElement('div');
        let sticker = document.createElement('div');
        sticker.className = 'icon';
        grid.appendChild(card).appendChild(sticker);
        sticker.innerHTML = element;   
    });

// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

    startTimer();


    function fac() {
    displayIcon();
    }



    
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    /*
        var icon = document.getElementsByClassName("icon");
        var icons = [...icon];
        è uguale a 
        var icons = document.getElementsByClassName("icon");
        //var icons = [...icon];
        è un operatore che serve per passare un array come argomento:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
        https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */
    icons.forEach(element => {
        element.addEventListener("click", displayIcon);
    });

    icons.forEach(element => {
        element.addEventListener("click", openModal);
    });
}
    

    //mette/toglie la classe show
    function displayIcon() {
        var icon = document.getElementsByClassName("icon");
        var icons = [...icon];
        this.classList.toggle("show");
     //aggiunge l'oggetto su cui ha cliccato all'array del confronto
        arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function openModal() {
    if (iconsFind.length == 24) {
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
        closeModal();
    }
}

// una funzione che nasconde la modal alla fine e riavvia il gioco
function closeModal() {
    closeicon.addEventListener("click", function (ab) {
        modal.classList.remove("active");
        startGame();
    });
}
// una funzione che calcola il tempo e aggiorna il contenitore sotto
function startTimer() {
    var minutes = 0;
    var seconds = 0;
    
    function increment() {
        seconds += 1;
        if(seconds === 60) {
            seconds = 0
            minutes += 1;
        }
        timer.innerHTML = 'Tempo' + minutes + " min " + seconds + " sec ";
    }
    interval = setInterval(increment, 1000)
}
