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
        }
        setDragStartAndDragEnd(document.querySelectorAll(`.card`));
        setDragEnterAndLeave(document.querySelectorAll('.dropzone'));
        setDropAndDragOver(document.querySelectorAll('.dropzone'));
        // setIds(document.querySelectorAll('.card'));
    },
}

// function deleteButtonHandler(clickEvent) {

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
    event.target.innerHTML = "Drop here to add!" + event.dataTransfer.getData("plain/text")
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
}

function onDragOverHandler(event) {
    event.preventDefault();
}

