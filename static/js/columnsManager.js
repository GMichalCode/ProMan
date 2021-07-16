import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";

export let columnsManager = {
    loadColumns: async function (boardId, callback) {
        const columns = await dataHandler.getColumnsByBoardId(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(boardId, column)
            domManager.addChild('#board' + boardId, content)
            //domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content)
            domManager.addEventListener(`#column-title-${column.id}`, "change", changeColumnTitle);
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