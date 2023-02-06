var game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {

        var card = this.cards.filter(function (card) {
            return card.id === id;
        })[0];
        //ou
        // this.cards.filter(card=>card.id===id)[0];

        if (card.flipped || this.lockMode == true) {
            return false;
        }

        if (this.firstCard == null) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkForAMatch: function () {
        if (this.firstCard.icon === this.secondCard.icon) {
            return true;
        }

        //ou
        // return this.firstCard.icon === this.secondCard.icon;
    },

    unflipCards: function () {
        game.firstCard.flipped = false;
        game.secondCard.flipped = false;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    checkGameOver: function () {

        return this.cards.filter(function (card) {
            return card.flipped == false;
        }).length == 0;

    },

    techs:
        [
            'bootstrap',
            'css',
            'electron',
            'firebase',
            'html',
            'javascript',
            'jquery',
            'mongo',
            'node',
            'react',
        ],

    cards: null,

    createCardsFromTechs: function () {

        this.cards = [];

        for (let tech of this.techs) {
            this.cards.push(this.createPairFromTech(tech));
        }

        this.cards = this.cards.flat();

        this.shuffleCards();

        // return this.cards;

    },

    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]

    },

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    shuffleCards: function () {

        // var currentIndex = cards.length;
        // var randomIndex = 0;

        // while(currentIndex !== 0){
        //     randomIndex = Math.floor(Math.random() * currentIndex);
        //     currentIndex--;

        //     [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
        // }

        this.cards.sort(() => 0.5 - Math.random());

    },



}
