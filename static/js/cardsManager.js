import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";

export let cardsManager = {

    // loadStatuses: async function(boardId) {
    //     const statuses = await dataHandler.getStatusesByBoardId(boardId);
    //     for (let status of statuses) {
    //         const statusBuilder = htmlFactory(htmlTemplates.status)
    //         const content = statusBuilder(status)
    //         domManager.addChild(`.board[data-board-id="${boardId}"]`, content)
    //     }
    // },
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card)
            // domManager.addChild(`.board[data-board-id="${boardId}"]`, content)
            // domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
        }
    },
}

// function deleteButtonHandler(clickEvent) {

// function cardDragStart(dragEvent) {
// }