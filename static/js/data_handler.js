export let dataHandler = {
    _data: {},
    _api_get: function (url, callback) {

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(json_response => callback(json_response));
    },
    _api_post: function (url, data, callback) {

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json_response => callback(json_response));
    },
    init: function () {
    },
    getBoards: function (callback) {

        this._api_get('/get-boards', (response) => {
            this._data = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_post("/create-new-board", {"data": boardTitle}, (response) => {
            this._data = response;
            callback(response);
        });
    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        this._api_post("/create-new-card", {"title": cardTitle, "board_id": boardId, "status_id": statusId},
            (response) => {
            this._data = response;
            callback(response, boardId);
            })
    },
    renameBoard: function (boardId, newBoardTitle, callback) {
        this._api_post("/rename-board", {"board_id": boardId, "new_title": newBoardTitle}, (response) => {
        this._data = response;
        callback(response);
        })

    },
    deleteCard: function (cardID, callback) {
        this._api_post("/delete-card", {"card_id": cardID}, (response) => {
            this._data = response;
            callback(response);
        })
    },
    deleteBoard: function (boardID, callback) {
        this._api_post("/delete-board", {"board_id": boardID}, (response) => {
            this._data = response;
            callback(response);
        })
    },
    createStatus: function (boardId, callback) {
        this._api_post("/create-new-status", {"board_id": boardId}, (response) => {
           this._data = response;
           callback(response);
        });
    }
};
