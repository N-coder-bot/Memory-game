//cardArray for storing details(name and location in folder) of a card(image).
const cardArray = [{
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }
    ]
    //sorting cardArray randomly everytime a new game is started.
cardArray.sort(() => 0.5 - Math.random());

//storing grid div in gridDisplay.
const gridDisplay = document.querySelector('#grid');

//storing result para in result.
const result = document.querySelector('#result');

let cardsChosen = [] //whenever two cards are selected their details(names only) will   be stored in this array
let cardsChosenIds = []; //whenever two cards are selected their ids will be stored in this array.
let cardsWon = []; //Whenever two selected cards are matched the cardsWon array is updated by the details(cardsChosen) of the cards that were matched. 

//function for creating the board grid.
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {

        const card = document.createElement('img'); //creating <img> element.
        card.setAttribute('src', 'images/blank.png'); //setting source attribute of image to blank image loc.
        card.setAttribute('data-id', i); //also storing id.
        card.addEventListener('click', flipCard); //adding eventListener of type 'Click' to every card for future.
        gridDisplay.appendChild(card); //appending images to grid.


    }
}

createBoard();

//function for checking if the two cards selected are match or not.
function checkMatch() {

    const cards = document.querySelectorAll('#grid img'); //storing all the images present on grid as an array.

    const optionOneId = cardsChosenIds[0]; //chosen card id.

    const optionTwoId = cardsChosenIds[1]; //chosen card id.

    //incase you clicked the same image twice(since it will have same image id).

    if (optionOneId === optionTwoId) {
        alert('you have clicked the same image!');

        //we turn back the card to blank(original).
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');

    }

    //if not the below condition checks whether the two chosen cards have same name.
    else if (cardsChosen[0] === cardsChosen[1]) {
        // alert('matched');

        //we turn the card to white space(as if they are removed).
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');

        //we remove the Event listeners just so we cannot click the white image again.
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);

        //cardsWon array is updated by the details of the cardsChosen and matched.
        cardsWon.push(cardsChosen)

    }

    //else we turn the cards back to original.
    else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('try again! ');

    }

    //once one set of cards are selected we empty the chosen array and chosen id array so new cards can come in.
    cardsChosen = [];
    cardsChosenIds = [];

    //Score is being updated on Screen viz the length of cardsWon array.
    result.innerHTML = cardsWon.length;

    //When the length of CardsWon equals half of total cards. we show the following.
    if (cardsWon.length === (cardArray.length / 2)) result.innerHTML = 'Congratulations! You found them all!';


}
// console.log(gridDisplay)

//below function for fliping the card.
function flipCard() {
    let cardId = this.getAttribute('data-id'); //storing the card id attribute of the image.

    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);

    console.log(cardsChosen);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }

}