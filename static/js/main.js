import {signInManager} from "./signInManager.js";
import {boardsManager} from "./boardsManager.js";

function init() {
    signInManager.addEventListener()
    boardsManager.loadBoards()
}

function initCreateBoardButton() {
    let submitBoardTitleButton = document.getElementById('board-name-submit')
    submitBoardTitleButton.addEventListener('click', function () {
        boardsManager.createBoard()
    })
}

init();
initCreateBoardButton();
