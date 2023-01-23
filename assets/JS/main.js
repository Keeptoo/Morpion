const cells = document.querySelectorAll('[data-cell]');// je selectionne tout les element qui contienne la data-cell
const gameStatus = document.getElementById('gameStatus'); //je selectionne un element html grace a son id
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X'; const playerTwo = 'O';
let playerTurn = playerOne;
let random;
const winningPatterns = [ // Je creer içi un tableau qui va me permettre de verifié si un joueur a gagné
    [0, 1, 2],//Première ligne a l'horizontal
    [3, 4, 5],//Deuxiéme ligne a l'horizontal
    [6, 7, 8],//Troisiéme ligne a l'horizontal
    [0, 3, 6],//Première ligne a la vertical
    [1, 4, 7],//Deuxiéme ligne a la vertical
    [2, 5, 8],//Troisiéme ligne a la vertical
    [0, 4, 8],//Première diagonal de droite vers gauche
    [2, 4, 6]//Deuxiéme diagonal de gauche vers droite
]

cells.forEach(cell => {         //J'ajoute un addeventlistener click qui me permettra de cliquer sur mes cellules et qui au moment du clique appellera ma fonction playGame
    cell.addEventListener('click', playGame, { once: true });//once : true va me permettre de ne pas pouvoir cliquer plusieur fois sur la meme cellules 
});

function playGame(e) {// je creer un fonction playGame avec le parametre e pour event
    e.target.innerHTML = playerTurn;//je cible mon evenement grace a target et lui insere la variable playerTurn

    if (checkWin(playerTurn)) { // Je dit ici que si ma fonction a detecter la victoire d'un des deux joueurs 
        updateGameStatus('wins' + playerTurn) //alors j'envoie ma fonction qui me permet d'update ma phrases de fin de partie et de cours de partie et je lui demande d'affiché la condition win du joueurs ganant 
        return endGame();//Et d'envoyé ma fonction endGame
    } else if (checkDraw()) {// Pareille que pour checkWin mais avec egalité
        updateGameStatus('draw');
        return endGame();
    } else if (playerTurn = playerTwo) {
        Random()
        if (checkWin(playerTurn)) {
            updateGameStatus('wins' + playerTurn)
            return endGame()
        }
    }

    updateGameStatus(playerTurn);// J'appelle ma fonction qui me permet de mettre a jour mon texte en dessous de mon morpion
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
    //Cette ligne permet de Verifier si c'est au joueur un alors on passe au joueur deux et sinon on passe au joueur un
}

function checkWin(playerTurn) {// Je creer une variable qui va me permettre de :
    return winningPatterns.some(combinaison => {      //Verifié pour chaque pattern si la combinaison de symbole est vrai
        return combinaison.every(index => {// .some me permet de faire un test sur toute mes combinaison tandis que .every me permet de faire un test sur un element renvoyé dans notre function
            return cells[index].innerHTML == playerTurn;
        })
    })
}

function checkDraw() {
    return [...cells].every(cell => { //On verifie si toute les cellule (grace a .every) sont egale a playerOne ou PlayerTwo [...cells] me permet de transformer mes différente cellule en tableau d'element 
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo
    });
}

function updateGameStatus(status) {//Je creer une fonction qui va me permettre de modifier le texte a chaque tour
    let statusText;  // Je creer une variable statustext vide pour l'instant cette variable contientra le texte qu'on affichera pour dira a qui le tour de jouer

    switch (status) { // le switch va nous permettre de dire que en fonction de ce que va nous renvoyer la function alors on affichera :
        case 'X':// Si elle nous renvoie 'X' alors on affichera :
            statusText = "Au tour de l'Ordinateur (O)"
            break;
        case 'O':
            statusText = "L'Ordinateur a jouer Au tour du joueur 1 (X)"
            break;
        case 'winsX':
            statusText = 'le joueur 1 (X) a gagné'
            break;
        case 'winsO':
            statusText = "L'Ordinateur (O) a gagné"
            break;
        case 'draw':
            statusText = 'Egalité! Personne ne gagne!'
            break;
    }
    gameStatus.innerHTML = statusText;//A la fin de ma fonction je renvoie toujours mon texte dans le texte afficher pendant la partie
    endGameStatus.innerHTML = statusText;// Et le texte qui sera affiché en fin de partie
}
function endGame() {//Cette fonction endgame me permet de faire apparaitre mon interface de fin de partie
    document.getElementById('endGame').style.display = "block"// je selectionne mon element possédant l'id endGame qui est de base en display none dans mon css
    document.getElementById('gameStatus').style.display = "none"
    // Et je lui dit qu'il passe en display block pour qu'il s'affiche
}
function reloadGame() {
    window.location.reload()//Cette methode permet de recharger la ressource (La cible d'une requête HTTP ) depuis l'url actuelle
}
function Random() {
    random = randomNumber(0, 8)
    while (true) {
        if (document.querySelectorAll('.cell')[random].innerHTML != "") {
            random = randomNumber(0, 8)
        } else {
            document.querySelectorAll('.cell')[random].innerHTML = "O";
            break;
        }

    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
