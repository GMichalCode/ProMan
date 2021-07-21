import {signInManager} from "./signInManager.js";
import {boardsManager} from "./boardsManager.js";

function init() {
    signInManager.addEventListener()
    boardsManager.loadBoards()
}

function initCreateBoardButton() {
    let submitBoardTitleButton = document.getElementById('board-name-submit')
    submitBoardTitleButton.addEventListener('click', function () {
        if (document.getElementById('board-name-input').value !== "") {
            boardsManager.createBoard()
        } else {
            document.getElementById('board-name-input').setAttribute('placeholder', 'Insert new board title!')
        }
    })
}

init();
initCreateBoardButton();
