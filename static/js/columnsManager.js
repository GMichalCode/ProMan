import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId, callback) {
        const statuses = await dataHandler.getStatuses(boardId);
        for (let status of statuses) {
            const columnBuilder = htmlFactory(htmlTemplates.status);
            const content = columnBuilder(boardId, status)
            domManager.addChild('#board'+boardId, content)
        }
        callback();
    },
}

// function deleteButtonHandler(clickEvent) {
// }