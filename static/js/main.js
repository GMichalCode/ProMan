import {signInManager} from "./signInManager.js";
import {boardsManager} from "./boardsManager.js";
import {logInManager} from "./logInManager.js";

function init() {
    signInManager.addEventListener()
    boardsManager.loadBoards()
    logInManager.addEventListener()
}

// function initCreateBoardButton() {
//     let submitBoardTitleButton = document.getElementById('board-name-submit')
//     submitBoardTitleButton.addEventListener('click', function () {
//         boardsManager.createBoards()
//     })
// }

init();
// initCreateBoardButton();
