import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import {cardsManager} from "./cardsManager.js";
import {columnsManager} from "./columnsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board)
            domManager.addChild('#root', content);
            domManager.addEventListener(`.board-toggle[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
            domManager.addEventListener(`#board-title-${board.id}`, "change", changeBoardTitle);
        }
    },
    createBoards: async function () {
        let input = document.getElementById('board-name-input').value;
        //todo: check if board with input name already exists
        dataHandler.createNewBoard(input);
        let newBoard = {'id': null, 'title': input, 'is_deleted': false};
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(newBoard);
        domManager.addChild('#root', content);
    }
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    columnsManager.loadColumns(boardId, function () {
        cardsManager.loadCards(boardId);
    })
}

function changeBoardTitle(clickEvent) {
    let target = clickEvent.target;
    let boardToUpdateID = target.id.slice(12, 16);
    let newBoardTitle = target.value;
    dataHandler.updateBoardTitle(boardToUpdateID, newBoardTitle)
}
