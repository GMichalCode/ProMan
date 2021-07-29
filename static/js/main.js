import {signInManager} from "./signInManager.js";
import {boardsManager} from "./boardsManager.js";
import {logInManager} from "./logInManager.js";

init();

function init() {
    initCreateBoardButton();
    signInManager.addEventListener()
    logInManager.addEventListener()
    boardsManager.loadBoards()
}

function initCreateBoardButton() {
    let submitBoardTitleButton = document.getElementById('board-name-submit')
    submitBoardTitleButton.addEventListener('click', function () {
        if (document.getElementById('board-name-input').value !== "") {
            let newBoardID = boardsManager.createBoard()
        } else {
            document.getElementById('board-name-input').setAttribute('placeholder', 'Insert new board title!')
        }
    })
}
