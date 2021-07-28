export let dataHandler = {
    getBoards: async function () {
        return await apiGet('/get-boards')
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        return await apiGet(`/get-boards/${boardId}`)
    },
    checkIfBoardTitleExists: async function (boardTitle) {
        return await apiGet(`/check-if-board-title-exists`)
    },
    getColumns: async function (boardId) {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet(`/get-columns/${boardId}`)
    },
    getColumn: async function (columnId) {
        // the status is retrieved and then the callback function is called with the status
        return await apiGet(`/get-column/${columnId}`)
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/get-board-cards/${boardId}`)
    },
    getCardsByColumn: async function (columnId) {
        return await apiGet(`get-column-cards/${columnId}`)
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
        return await apiGet(`/get-cards/${cardId}`)
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        return await apiPost('/add-board', {'boardTitle': boardTitle})
    },
    createNewCard: async function (cardTitle, boardId, columnId) {
        // creates new card, saves it and calls the callback function with its data
        let newCardData = {"cardTitle": cardTitle, "boardId": boardId, "columnId": columnId}
        await apiPost(`/add-card`, newCardData)
    },
    updateBoardTitle: async function (boardId, newBoardTitle) {
        //updates board title in db
        let newBoardTitleToUpdate = {'boardID': boardId, 'newBoardTitle': newBoardTitle}
        await apiPut(`/update-board-title`, newBoardTitleToUpdate)
    },
    updateColumnTitle: async function (columnToUpdateID, newColumnTitle) {
        let newColumnTitleToUpdate = {'columnID': columnToUpdateID, 'newColumnTitle': newColumnTitle}
        await apiPut(`/update-column-title`, newColumnTitleToUpdate)
    },
    updateCardTitle: async function (cardToUpdateID, newCardTitle){
        let newCardTitleToUpdate = {'cardID': cardToUpdateID, 'newCardTitle': newCardTitle}
        await apiPut(`/update-card-title`, newCardTitleToUpdate)
    },
    signIn: async function (formData) {
        return await apiPost('/login', Object.fromEntries(formData))
    },

    deleteCard: async function (cardId){
        return await apiDelete(`/delete-card/${cardId}`)
    },
     deleteColumn: async function (columnId) {
         return await apiDelete(`/delete-column/${columnId}`)
     },
    deleteBoard: async function (boardId) {
         return await apiDelete(`/delete-board/${boardId}`)
     },
    register: async function (email, password) {
        let registerUser = {"email": email, "password": password}
        return await apiPost('/register', registerUser)
    },
    login: async function (email, password) {
        let loginUser = {"email": email, "password": password}
        return await apiPost('/login', loginUser)
    },
    logout: async function() {
        return await apiPost('/logout')
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET'
    })
    if (response.status === 200) {
        return response.json()
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.status === 200) {
        return response.json()
    }
}

async function apiDelete(url) {
    let response = await fetch(url, {
        method: 'DELETE'
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.status === 200) {
        let data = response.json()
        return data
    }
}

