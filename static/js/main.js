import {boardsManager} from "./boardsManager.js";

function init() {
    boardsManager.loadBoards()
}

// function initCreateBoardButton() {
//     let submitBoardTitleButton = document.getElementById('board-name-submit')
//     submitBoardTitleButton.addEventListener('click', function () {
//         boardsManager.createBoards()
//     })
// }

init();
// initCreateBoardButton();
