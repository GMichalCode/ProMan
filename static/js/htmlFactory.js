export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3,
    defaultColumns: 4
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
        case htmlTemplates.defaultColumns:
            return getDefaultColumnsHTML
        default:
            console.error("Undefined template: " + template)
            return () => {
                return ""
            }
    }
}

function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board" data-board-id="${board.id}" id="board${board.id}">
                    <div class="board-header">
                        <input class="board-title" maxlength="40" id="board-title-${board.id}" value="${board.title}" draggable="false">
                        <button class="board-add" data-board-id="${board.id}">Add Card</button>
<!--                       
 <button class='board-toggle[data-board-id="${board.id}"]' data-board-id="${board.id}">Show<i class="fas fa-chevron-down"></i></button>-->
                    <button class="board-toggle" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
                    </div>
           <div class="board-columns" data-board-id="${board.id}" id="board-${board.id}" hidden></div>
                </section>
             </div> `
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" id="card${card.id}" draggable="true" >
                <div class="card-remove" id="removeCard${card.id}"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" id="cardTitle${card.id}">${card.title}</div>
            </div>`;
}

function columnBuilder(boardId, column) {
    return `<div class="board-column" id="column${column.id}">
                    <input class="column-title" id="column-title-${column.id}" value="${column.title}">
                    <div class='board${boardId}-column-content[data-column-id=${column.id}]' id='board${boardId}-column${column.id}-content'></div>
            </div>`
}

function getDefaultColumnsHTML(boardId, columnIds) {
    return `<div class="board-column" id="column${columnIds[0]['id']}">
                    <input class="column-title" id="column-title-${columnIds[0]['id']}" value="${'New'}">
                    <div class='board${boardId}-column-content[data-column-id=${columnIds[0]['id']}]' id='board${boardId}-column${columnIds[0]['id']}-content'></div>
            </div>

            <div class="board-column" id="column${columnIds[1]['id']}">
                    <input class="column-title" id="column-title-${columnIds[1]['id']}" value="${'In Progress'}">
                    <div class='board${boardId}-column-content[data-column-id=${columnIds[1]['id']}]' id='board${boardId}-column${columnIds[1]['id']}-content'></div>
            </div>
            
            <div class="board-column" id="column${columnIds[2]['id']}">
                    <input class="column-title" id="column-title-${columnIds[2]['id']}" value="${'Testing'}">
                    <div class='board${boardId}-column-content[data-column-id=${columnIds[2]['id']}]' id='board${boardId}-column${columnIds[2]['id']}-content'></div>
            </div>

            <div class="board-column" id="column${columnIds[3]['id']}">
                    <input class="column-title" id="column-title-${columnIds[3]['id']}" value="${'Done'}">
                    <div class='board${boardId}-column-content[data-column-id=${columnIds[3]['id']}]' id='board${boardId}-column${columnIds[3]['id']}-content'></div>
            </div>`
}