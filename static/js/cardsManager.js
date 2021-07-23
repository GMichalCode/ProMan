import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";


// export let cardsManager = {
//     loadCards: async function (boardId) {
//         const cards = await dataHandler.getCardsByBoardId(boardId);
//         for (let card of cards) {
//             const cardBuilder = htmlFactory(htmlTemplates.card);
//             const content = cardBuilder(card)
//             // domManager.addChild(`.board[data-board-id="${boardId}"]`, content)
//             // domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
//         }
//     },
// }

export let cardsManager = {
    loadCards: async function (boardId, columnId) {
        const cards = await dataHandler.getCardsByColumn(columnId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card)
            // domManager.addChild(`.board${boardId}-column-content[data-column-id="${card.columnId}"]`, content);
            domManager.addChild(`#board${boardId}-column${columnId}-content`, content);
            // domManager.addChild(`.board[data-board-id="${boardId}"]`, content)
            // domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
        }
    },
}

// function deleteButtonHandler(clickEvent) {

// function cardDragStart(dragEvent) {
// }