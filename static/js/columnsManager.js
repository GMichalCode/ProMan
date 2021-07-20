import {dataHandler} from "./dataHandler.js";
import {htmlFactory, htmlTemplates} from "./htmlFactory.js";
import {domManager} from "./domManager.js";
import {cardsManager} from "./cardsManager.js";

export let columnsManager = {
    loadColumns: async function (boardId) {
        const columns = await dataHandler.getColumns(boardId);
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(boardId, column)
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content)
            domManager.addEventListener(`#column-title-${column.id}`, "change", changeColumnTitle);
            await cardsManager.loadCards(boardId, column.id)
        }
    },
    // hideColumns: async function (boardId, callback) {
    //     const columns = await dataHandler.getColumnsByBoardId(boardId);
    //
    // }
}

function changeColumnTitle(clickEvent) {
    let target = clickEvent.target;
    let columnToUpdateID = target.id.slice(13, 16);
    let newColumnTitle = target.value;
    dataHandler.updateColumnTitle(columnToUpdateID, newColumnTitle);
}


// function deleteButtonHandler(clickEvent) {
// }