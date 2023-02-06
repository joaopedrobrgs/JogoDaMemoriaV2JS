const FRONT = "card_front";
const BACK = "card_back";
const CARD = 'card';
const ICON = 'icon';
const FLIP = 'flip';

var gameBoard = document.getElementById("gameBoard");

startGame();

function startGame() {

    setTimeout(() => {
        getPlayerName();
    }, 500);
    game.createCardsFromTechs();
    initializeBoard();

}

function getPlayerName() {

    var playerName = prompt('Qual o seu nome?');
    var player = document.getElementById('player');
    player.innerHTML = playerName;

};

function initializeBoard() {

    gameBoard.innerHTML = '';

    for (let card of game.cards) {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;
        gameBoard.appendChild(cardElement);
        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

    }

}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, cardElement) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    cardElement.appendChild(cardElementFace);

    if (face === FRONT) {
        let cardElementImg = document.createElement('img');
        cardElementImg.classList.add(ICON);
        cardElementImg.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(cardElementImg);
    } else /*(face === BACK)*/ {
        cardElementFace.innerHTML = '&lt/&gt';
    }

}

function flipCard() {

    if (game.setCard(this.id) == true) {
        this.classList.add(FLIP);
        if (game.secondCard != null) {
            if (game.checkForAMatch()) {

                setTimeout(() => {
                    attemptsNumber();
                }, 500);

                game.clearCards();
                setTimeout(() => {
                    if (game.checkGameOver()) {
                        let gameOverLayer = document.getElementById('gameOver');
                        gameOverLayer.style.display = 'flex';
                    }
                }, 500);

            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);

                    attemptsNumber();

                    game.unflipCards();

                    game.clearCards();

                }, 800);
            }
        }
    }
}

var attempts = document.getElementsByTagName('span');
var attemptsValue = 0;

function restart() {

    var player = document.getElementById('player');
    let ranking = document.getElementById('rankingContent');

    ranking.innerHTML += "<p>" + player.innerHTML + "<br>" + attemptsValue + " tentativas" + "</p>" + "<br>";

    setTimeout(() => {

        attemptsValue = 0;
        for (let element of attempts) {
            element.innerHTML = attemptsValue;
        }

        player.innerHTML = '';

        let gameOverLayer = document.getElementById('gameOver');
        gameOverLayer.style.display = 'none';
        game.clearCards();
        startGame();

    }, 200);

}

function attemptsNumber() {

    attemptsValue++;

    for (let element of attempts) {
        element.innerHTML = attemptsValue;
    }
}




