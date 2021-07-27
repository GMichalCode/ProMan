export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3,
    signIn: 4,
    logIn: 5,
    defaultColumns: 6
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
        case htmlTemplates.signIn:
            return signInBuilder
        case htmlTemplates.logIn:
            return logInBuilder
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
                        <button class="board-remove"  id="removeBoard${board.id}">Delete board</button>
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
                    <div class="column-header">
                    <input class="column-title" id="column-title-${column.id}" value="${column.title}">
                    <div class="column-remove"  id="removeColumn${column.id}"><i class="fas fa-trash-alt"></i> </div>
                    </div>
                    <div class='board${boardId}-column-content[data-column-id=${column.id}]' id='board${boardId}-column${column.id}-content'></div>
            </div>`
}

function signInBuilder () {
    return `<div id="signInModal" class="modal">
    <div class="modal-content">
        <span id="closeSignInModal" align="right" class="close">&times;</span>
        <div align="center">
              <div align="center" class="border">
                 <div class="header">
                    <h1 class="word">Sign In</h1>
                 </div><br>
                    <h2 class="word">Please fill the form:</h2>
                 </div>
                <h2 class="word">
                    <form id="signInForm">
                      <div class="msg"></div><br>
                        <input id="email" name="email" type="text" placeholder="Enter Your Email" class="textbox"/><br><br>
                        <input id="password" name="password" type="password" placeholder="Enter Your Password" class="textbox"/><br><br>
                        <input id="login" type="submit" class="btn" value="Sign In"><br>
                    </form>
                </h2>
              </div>
            </div>
      </div>
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

function logInBuilder () {
    return `<div id="logInModal" class="modal">
    <div class="modal-content">
        <span id="closeLogInModal" align="right" class="close">&times;</span>
        <div align="center">
              <div align="center" class="border">
                 <div class="header">
                    <h1 class="word">Log In</h1>
                 </div><br>
                    <h2 class="word">Please fill the form:</h2>
                 </div>
                <h2 class="word">
                    <div id="logInForm">
                      <div id="login_message_div" class="msg"></div><br>
                        <input id="login_email" name="email" type="text" placeholder="Enter Your Email" class="textbox"/><br><br>
                        <input id="login_password" name="password" type="password" placeholder="Enter Your Password" class="textbox"/><br><br>
                        <button id="login_login" type="submit" class="btn" value="Log In">Enter the page</button><br>
                    </div>
                </h2>
              </div>
            </div>
      </div>
    </div>`
}