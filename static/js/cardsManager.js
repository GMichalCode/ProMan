import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card)
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content)
            domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
        }
    },
}

function deleteButtonHandler(clickEvent) {
}

