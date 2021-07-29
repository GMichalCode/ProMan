import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";

export let cardsManager = {
    loadCards: async function (boardId, columnId) {
        const cards = await dataHandler.getCardsByColumn(columnId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card)
            domManager.addChild(`#board${boardId}-column${columnId}-content`, content);
            domManager.addEventListener(`.card-remove[id="removeCard${card.id}"]`, "click", deleteButtonHandler)
            domManager.addEventListener(`#card-title-${card.id}`, "change", changeCardTitle);

        }
        setDragStartAndDragEnd(document.querySelectorAll(`.card`));
        setDragEnterAndLeave(document.querySelectorAll('.dropzone'));
        setDropAndDragOver(document.querySelectorAll('.dropzone'));
        // setIds(document.querySelectorAll('.card'));
    },
}

function deleteButtonHandler(clickEvent) {
    const cardToDelete = clickEvent.target.parentNode;
    const cardId = cardToDelete.id.slice(10);
    cardToDelete.parentNode.remove();
    return dataHandler.deleteCard(cardId);
}

function changeCardTitle(clickEvent) {
    let target = clickEvent.target;
    let cardToUpdateID = target.id.slice(11);
    let newCardTitle = target.value;
    dataHandler.updateCardTitle(cardToUpdateID, newCardTitle);
}


function setDragStartAndDragEnd(list) {
    list.forEach(function (el) {
        el.addEventListener("dragstart", onDragStartHandler);
        el.addEventListener("dragend", onDragEndHandler);
        el.childNodes.forEach(function (child) {
            child.addEventListener("dragstart", onDragStartHandler);
            child.addEventListener("dragend", onDragEndHandler);
        })
    })
}

function onDragStartHandler(event) {
    // console.debug("on drag start: " + event.target.id)
    event.dataTransfer.setData('plain/text', event.target.getAttribute('id'));
    let dropzones = document.querySelectorAll(`.dropzone`)
    dropzones.forEach(function (dropzone) {
        dropzone.removeAttribute('hidden')
    })
}

function onDragEndHandler(event) {
    console.debug("on drag end: " + event.target.id)
    event.dataTransfer.setData('plain/text', event.target.getAttribute('id'));
    let dropzones = document.querySelectorAll(`.dropzone`)
    dropzones.forEach(function (dropzone) {
        dropzone.setAttribute('hidden', "")
    })
}

function setDragEnterAndLeave(list) {
    list.forEach(function (el) {
        el.addEventListener("dragenter", onDragEnterHandler);
        el.addEventListener("dragleave", onDragLeaveHandler);
    })
}

function onDragEnterHandler(event) {
    // console.debug("on drag enter: " + event.target.id)
    event.dataTransfer.getData('plain/text')
}

function onDragLeaveHandler(event) {
    // console.debug("on drag leave: " + event.target.id)
    event.target.innerHTML = "Drop here to add!"
}

function setDropAndDragOver(list) {
    list.forEach(function (el) {
        el.addEventListener("drop", onDropHandler);
        el.addEventListener("dragover", onDragOverHandler);
    })
}

function onDropHandler(event) {
    // console.debug("on drop: " + event.target.id)
    event.target.innerHTML = "Drop here to add!"
    let dropzones = document.querySelectorAll(`.dropzone`)
    dropzones.forEach(function (dropzone) {
        dropzone.setAttribute('hidden', "")
    })
//todo: jak odczytać id elementu draggowanego

}

function onDragOverHandler(event) {
    event.preventDefault();
}

