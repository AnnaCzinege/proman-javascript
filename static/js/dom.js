// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
import { nav } from "./nav.js";

export let dom = {
    oldContent: "",
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showTable(boards);
        });
    },
    showTable: function (boards) {
        let boardContainer = document.createElement("div");
        boardContainer.setAttribute("class", "board-container");
        let addBoardBtn = document.createElement("button");
        addBoardBtn.setAttribute("class", "new-board");
        addBoardBtn.innerText = "Add board";
        addBoardBtn.addEventListener("click", dom.createBoard);
        for (let board of boards.boards) {

            let boardSection = document.createElement("section");
            let boardHeader = document.createElement("div");
            let boardTitle = document.createElement("span");
            let addCardBtn = document.createElement("button");
            let addStatusBtn = document.createElement("button");
            let deleteBoardBtn = document.createElement("button");
            let boardToggle = document.createElement("button");
            let boardI = document.createElement("i");
            let boardBackground = document.createElement("div");

            boardSection.setAttribute("class", "board");
            boardSection.setAttribute("id", board.id);
            boardHeader.setAttribute("class", "board-header");
            boardTitle.setAttribute("class", "board-title");
            boardTitle.addEventListener("click", dom.clickBoardTitle);
            addCardBtn.setAttribute("class", "board-add");
            deleteBoardBtn.setAttribute("class", "board-add");
            addStatusBtn.setAttribute("class", "add-column");
            boardToggle.setAttribute("class", "board-toggle");
            boardToggle.setAttribute("data-toggle", "true");
            boardI.setAttribute("class", "fas fa-chevron-down");
            boardBackground.setAttribute("class", "board-columns");

            boardTitle.innerText = board.title;
            addCardBtn.innerText = "Add card";
            deleteBoardBtn.innerText = "Delete board";
            let boardID = board.id;
            addCardBtn.addEventListener("click", dom.createCard);
            deleteBoardBtn.addEventListener("click", function () {
                dataHandler.deleteBoard(boardID, (response) => {
                    let toBeDeletedBoardSection = document.getElementById(`${boardID}`);
                    toBeDeletedBoardSection.parentNode.removeChild(toBeDeletedBoardSection);
                })
            });
            addStatusBtn.innerText = "Add status";
            addStatusBtn.addEventListener("click", dom.createStatus);
            boardToggle.appendChild(boardI);
            boardToggle.addEventListener("click", nav.clickToggle);
            for (let child of [boardTitle, addCardBtn, addStatusBtn, deleteBoardBtn, boardToggle]) {
                boardHeader.appendChild(child);
            }

            for (let status of boards.statuses) {
                if (board.id === status.board_id) {
                    let container = document.createElement("div");
                    let columnTitle = document.createElement("div");
                    let columnContent = document.createElement("div");

                    container.setAttribute("class", "board-column");
                    container.setAttribute("data-status-id", status.id);
                    columnTitle.setAttribute("class", "board-column-title");
                    columnContent.setAttribute("class", "board-column-content");
                    columnTitle.innerText = status.title;

                    for (let card of boards.cards) {

                        if (status.id === card.status_id && board.id === card.board_id) {
                            let cardBox = document.createElement("div");
                            let cardRemove = document.createElement("div");
                            let cardI = document.createElement("i");
                            let cardTitle = document.createElement("div");

                            cardBox.setAttribute("class", "card");
                            cardBox.setAttribute("data-card-id", card.id);
                            cardRemove.setAttribute("class", "card-remove");
                            cardI.setAttribute("class", "fas fa-trash-alt");
                            cardTitle.setAttribute("class", "card-title");

                            cardTitle.innerText = card.title;
                            cardRemove.appendChild(cardI);
                            cardBox.appendChild(cardRemove);
                            cardBox.appendChild(cardTitle);
                            columnContent.appendChild(cardBox);

                            let cardID = card.id;
                            cardRemove.addEventListener("click", function () {
                                dataHandler.deleteCard(cardID, (response) => {
                                    let toBeDeletedCardDiv = document.querySelector(`[data-card-id="${response['card_id']}"]`);
                                    toBeDeletedCardDiv.parentNode.removeChild(toBeDeletedCardDiv)
                                })
                            })
                        }
                    }
                    container.appendChild(columnTitle);
                    container.appendChild(columnContent);
                    boardBackground.appendChild(container);
                }
                boardSection.appendChild(boardHeader);
                boardSection.appendChild(boardBackground);
                boardContainer.appendChild(boardSection);
            }

        }
        document.body.appendChild(addBoardBtn);
        document.body.appendChild(boardContainer);
    },
    createBoard: function () {
        dataHandler.createNewBoard("New board", function (data) {
            dom.showNewBoard(data);
        });
    },
    showNewBoard: function (data) {
        let boardContainer = document.querySelector(".board-container");
        let boardSection = document.createElement("section");
        let boardHeader = document.createElement("div");
        let boardTitle = document.createElement("span");
        let addCardBtn = document.createElement("button");
        let addStatusBtn = document.createElement("button");
        let deleteBoardBtn = document.createElement("button");
        let boardToggle = document.createElement("button");
        let boardI = document.createElement("i");
        let boardBackground = document.createElement("div");

        boardContainer.setAttribute("class", "board-container");
        boardSection.setAttribute("class", "board");
        boardSection.setAttribute("id", data["id"]);
        boardHeader.setAttribute("class", "board-header");
        boardTitle.setAttribute("class", "board-title");
        boardTitle.addEventListener("click", dom.clickBoardTitle);
        addCardBtn.setAttribute("class", "board-add");
        addStatusBtn.setAttribute("class", "add-column");
        deleteBoardBtn.setAttribute("class", "board-add");
        boardToggle.setAttribute("class", "board-toggle");
        boardI.setAttribute("class", "fas fa-chevron-down");
        boardBackground.setAttribute("class", "board-columns");

        boardTitle.innerText = "New board";
        addCardBtn.innerText = "Add card";
        deleteBoardBtn.innerText = "Delete board";
        let boardID = data["id"];
        addCardBtn.addEventListener("click", dom.createCard);
        addCardBtn.addEventListener("click", dom.createCard);
        addStatusBtn.innerText = "Add status";
        addStatusBtn.addEventListener("click", dom.createStatus);
        deleteBoardBtn.addEventListener("click", function () {
            dataHandler.deleteBoard(boardID, (response) => {
                let toBeDeletedBoardSection = document.getElementById(`${boardID}`);
                toBeDeletedBoardSection.parentNode.removeChild(toBeDeletedBoardSection);
            })
        });
        boardToggle.appendChild(boardI);
        for (let child of [boardTitle, addCardBtn, addStatusBtn, deleteBoardBtn, boardToggle]) {
            boardHeader.appendChild(child);
        }

        for (let status of ["new", "in progress", "testing", "done"]) {
            let container = document.createElement("div");
            let columnTitle = document.createElement("div");
            let columnContent = document.createElement("div");

            container.setAttribute("class", "board-column");
            for (let i = 0; i < data.statuses.length; ++i){
                if (data.statuses[i].title === status) {
                 container.setAttribute("data-status-id", data.statuses[i].id)
                }
            }
            columnTitle.setAttribute("class", "board-column-title");
            columnContent.setAttribute("class", "board-column-content");
            columnTitle.innerText = status;
            container.appendChild(columnTitle);
            container.appendChild(columnContent);
            boardBackground.appendChild(container);
        }
        boardSection.appendChild(boardHeader);
        boardSection.appendChild(boardBackground);
        boardContainer.appendChild(boardSection);
    },
    createCard: function () {
        let boardId = this.parentElement.parentElement.id;
        let boardPlace = document.getElementById(boardId);
        let statusIdPlace = boardPlace.querySelector(".board-columns").firstChild;
        let statusId = statusIdPlace.dataset.statusId;
        dataHandler.createNewCard("new card", boardId, statusId, function (data, boardId) {
            dom.showNewCard(data, boardId)
        })
    },
    showNewCard: function (data, boardId) {
        let targetBoard = document.getElementById(boardId);
        let cardPlace = targetBoard.children[1].children[0].children[1];
        let cardBox = document.createElement("div");
        let cardRemove = document.createElement("div");
        let cardI = document.createElement("i");
        let cardTitle = document.createElement("div");

        cardBox.setAttribute("class", "card");
        cardBox.setAttribute("data-card-id", data["id"]);
        cardRemove.setAttribute("class", "card-remove");
        cardI.setAttribute("class", "fas fa-trash-alt");
        cardTitle.setAttribute("class", "card-title");

        cardTitle.innerText = "new card";
        cardRemove.appendChild(cardI);
        cardBox.appendChild(cardRemove);
        cardBox.appendChild(cardTitle);
        cardPlace.appendChild(cardBox);

        let cardID = data["id"];
        cardRemove.addEventListener("click", function () {
            dataHandler.deleteCard(cardID, (response) => {
                let toBeDeletedCardDiv = document.querySelector(`[data-card-id="${response['card_id']}"]`);
                toBeDeletedCardDiv.parentNode.removeChild(toBeDeletedCardDiv)
            })
        })
    },
    clickBoardTitle: function () {
        dom.oldContent = this.innerText;
        this.outerHTML = "<input type='text' value='" + dom.oldContent + "' class='board-title new-title'>";
        document.querySelector(".new-title").addEventListener("keypress", dom.renameBoardTitle)
    },
    switchBackToSpan: function (data, placeToChange) {
        let parentNode = placeToChange.parentNode;
        placeToChange.outerHTML = "<span class='board-title'>" + data["title"] + "</span>";
        let boardTitle = parentNode.querySelector(".board-title");
        boardTitle.addEventListener("click", dom.clickBoardTitle);
    },
    renameBoardTitle: function (e) {
        let key = e.which || e.keyCode;
        if (key === 13) {
            let boardId = this.parentElement.parentElement.id;
            let newTitle = document.querySelector(".new-title").value;
            dataHandler.renameBoard(boardId, newTitle, (data) => {
                dom.switchBackToSpan(data, this);
            })
        }
    },
    createStatus: function () {
        let boardId = this.parentElement.parentElement.id;
        dataHandler.createStatus(boardId, function (data) {
            dom.showNewStatus(data);
        })
    },
    showNewStatus: function (data) {
        let targetBoard = document.getElementById(data["board_id"]);
        let placeToAdd = targetBoard.querySelector(".board-columns");
        let container = document.createElement("div");
        let columnTitle = document.createElement("div");
        let columnContent = document.createElement("div");

        container.setAttribute("class", "board-column");
        columnTitle.setAttribute("class", "board-column-title");
        columnContent.setAttribute("class", "board-column-content");
        columnTitle.innerText = "new status";

        container.appendChild(columnTitle);
        container.appendChild(columnContent);
        placeToAdd.appendChild(container);
    }
};