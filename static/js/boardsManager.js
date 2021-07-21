import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
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

    createBoard: async function () {
        let input = document.getElementById('board-name-input').value;
        document.getElementById('board-name-input').value = "In progress, please wait..";
        //todo: check on front if board with input name already exists
        // dataHandler.checkIfBoardTitleExists(input)
        //todo: break it into smaller pieces

        let newTmpBoard = {'id': 'tmpBoard', 'title': input, 'is_deleted': false};
        const boardTmpBuilder = htmlFactory(htmlTemplates.board);
        const content = boardTmpBuilder(newTmpBoard);
        domManager.addChild('#root', content);

        let newBoardData = await dataHandler.createNewBoard(input);
        let newBoard = {'id': newBoardData[0]['new_board_id'], 'title': input, 'is_deleted': false};
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const boardContent = boardBuilder(newBoard);
        const defaultColumnsBuilder = htmlFactory(htmlTemplates.defaultColumns);
        const defaultColumnsContent = defaultColumnsBuilder(newBoardData[0]['new_board_id'], newBoardData[1]['new_columns_ids']);
        makeDocChangesAfterAddingBoard(newBoard['id'], boardContent, defaultColumnsContent);
        document.querySelector('#board-tmpBoard').parentNode.remove()
    }
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    columnsManager.loadColumns(boardId)
}

function makeDocChangesAfterAddingBoard(boardId, boardContent, defaultColumnsContent) {
    domManager.addChild('#root', boardContent);
    domManager.addChild(`#board-${boardId}`, defaultColumnsContent);
    domManager.addEventListener(`.board-toggle[data-board-id="${boardId}"]`, "click", showHideButtonHandler);
    domManager.addEventListener(`#board-title-${boardId}`, "change", changeBoardTitle);
    document.getElementById('board-name-input').value = "";
}

// if (clickEvent.target.innerHTML === "Hide") {
//     let board = document.querySelector('#board' + boardId)
//     let board_children = Array.from(board.children)
//     let length = board.children.length;
//     while (length > 2) {
//         board.removeChild(board.lastChild);
//         length--;
//     }
//
//     //todo: add allboards div and add id to it and via doc.sel set atrib hiden
//
//     // for (let i = 0; i < board.childElementCount; i ++) {
//     //     if (board.children[i].classList.includes('board-column')) {
//     //         board.children[i].remove();
//     //     }
//     // }
//     clickEvent.target.textContent = "Show"
// } else {
//     columnsManager.loadColumns(boardId, function () {
//         cardsManager.loadCards(boardId);
//     })
//     clickEvent.target.textContent = "Hide"
// }}

function changeBoardTitle(clickEvent) {
    //todo: make input as inactive, activate it on click
    let target = clickEvent.target;
    let boardToUpdateID = target.id.slice(12, 16);
    let newBoardTitle = target.value;
    dataHandler.updateBoardTitle(boardToUpdateID, newBoardTitle)
}
