import {signInManager} from "./signInManager.js";
import {boardsManager} from "./boardsManager.js";
import {logInManager} from "./logInManager.js";

init();

function init() {
    initCreateBoardButton();
    signInManager.addEventListener()
    logInManager.addEventListener()
    boardsManager.loadBoards()
    console.debug("set drag start end 1")
    setDragStartAndDragEnd(document.querySelectorAll('.card'));
    // setDragEnterAndLeave(document.querySelectorAll('.'));
    // setDropAndDragOver(document.querySelectorAll('.'));
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

function setDragStartAndDragEnd(list) {
    console.debug(list)
    list.forEach(function (el) {
        console.debug("set drag start end 2")
        el.addEventListener("dragstart", onDragStartHandler);
        el.addEventListener("dragend", onDragEndHandler);
    })
}

function onDragStartHandler(event) {
    console.debug("onDragStartHandler")
    event.dataTransfer.setData('plain/text', event.target[0].id);
    console.debug(event)
    console.debug(event.target)
    console.debug(event.target[0])
    console.debug(event.target[0].id)
    // event.target[0].parentElement.classList.add('active-card');
}

function onDragEndHandler(event) {
    // event.target[0].parentElement.classList.remove('active-card');
}