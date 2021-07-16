import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId, callback) {
        const statuses = await dataHandler.getStatuses(boardId);
        for (let status of statuses) {
            const columnBuilder = htmlFactory(htmlTemplates.status);
            const content = columnBuilder(boardId, status)
            domManager.addChild('#board' + boardId, content)
            domManager.addEventListener(`#status-title-${status.id}`, "change", changeColumnTitle);
        }
        callback();
    },
}

function changeColumnTitle(clickEvent) {
    let target = clickEvent.target;
    let columnToUpdateID = target.id.slice(13, 16);
    let newColumnTitle = target.value;
    dataHandler.updateColumnTitle(columnToUpdateID, newColumnTitle);
}


// function deleteButtonHandler(clickEvent) {
// }