import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId, callback) {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder()
            domManager.addChild('#board'+boardId, content)
            // domManager.addEventListener(`.column[data-column-id="${status.id}"]`, content)

        }
        callback();
    },
}

// function deleteButtonHandler(clickEvent) {
// }