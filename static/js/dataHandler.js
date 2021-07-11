export let dataHandler = {
    getBoards: async function () {
        return await apiGet('/get-boards')
    },
    getBoard: async function(boardId) {
        // the board is retrieved and then the callback function is called with the board
        return await apiGet('/get-boards/${boardId}`')
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet('/get-statuses')
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
        return await apiGet('/get-statuses/${statusId}`')
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet('/get-board-cards/${boardId}`')
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
        return await apiGet('/get-cards/${cardId}`')
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        await apiPost("/add-board", boardTitle)
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET',
    })
    if (response.status === 200) {
        return response.json()
    }
}

async function apiPost(url, payload) {

}

async function apiDelete(url) {
}

async function apiPut(url) {
}
