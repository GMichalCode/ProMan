import {boardsManager} from "./boardsManager.js";

function init() {
    boardsManager.loadBoards()
}

function initCreateBoardButton() {
    let button = document.getElementById('board-name-submit')
    button.addEventListener('click', function () {
        boardsManager.createBoards()
        //todo: odświeżenie widoku na stronie, najlepiej dodać DOMem te dane mimo, że ich jeszcze nie ma w DB
    })
}

init();
// initCreateBoardButton();