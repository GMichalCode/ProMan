export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
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
                        <input class="board-title" maxlength="40" id="board-title-${board.id}" value="${board.title}">
                        <button class="board-add" data-board-id="${board.id}">Add Card</button>
<!--                        <button class="board-toggle" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>-->
                        <button class="toggle-board-button" data-board-id="${board.id}">Show</button>
                    </div>
                    <div class="board-column"" data-board-id = "$board.id}"></div>
                 </section>
             </div>`

}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" id="card${card.id}" draggable="true">
                <div class="card-remove" id="removeCard${card.id}"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" id="cardTitle${card.id}">${card.title}</div>
                <input class="card-title" maxlength="40" id="card-title-${card.id}" value="${card.title}">
            </div>`;
}

function columnBuilder(boardId, column) {
    return `<div class="board-column" id="column${column.id}">
<!--                    <div class="board-column-title">${column.title}</div>-->
                        <input class="column-title" maxlength="40" id="column-title-${column.id}" value="${column.title}">
                    <div class="board${boardId}-column-content" data-column-id="${column.id}"></div>
            </div>`
}