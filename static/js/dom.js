// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showTable(boards);
        });
    },
    showTable: function (boards) {
        let boardContainer = document.createElement("div");
        let addBoardBtn = document.createElement("button");
        addBoardBtn.setAttribute("class", "new-board");
        addBoardBtn.innerText = "Add board";
        addBoardBtn.addEventListener("click", dom.createBoard);
        for (let board of boards.boards) {


            let boardSection = document.createElement("section");
            let boardHeader = document.createElement("div");
            let boardTitle = document.createElement("span");
            let addCardBtn = document.createElement("button");
            let boardToggle = document.createElement("button");
            let boardI = document.createElement("i");
            let boardBackground = document.createElement("div");

            boardContainer.setAttribute("class", "board-container");
            boardSection.setAttribute("class", "board");
            boardHeader.setAttribute("class", "board-header");
            boardTitle.setAttribute("class", "board-title");
            addCardBtn.setAttribute("class", "board-add");
            boardToggle.setAttribute("class", "board-toggle");
            boardI.setAttribute("class", "fas fa-chevron-down");
            boardBackground.setAttribute("class", "board-columns");

            boardTitle.innerText = board.title;
            addCardBtn.innerText = "Add card";
            boardToggle.appendChild(boardI);
            for (let child of [boardTitle, addCardBtn, boardToggle]) {
                boardHeader.appendChild(child);
            }

            for (let status of boards.statuses) {
                let container = document.createElement("div");
                let columnTitle = document.createElement("div");
                let columnContent = document.createElement("div");

                container.setAttribute("class", "board-column");
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
                        cardRemove.setAttribute("class", "card-remove");
                        cardI.setAttribute("class", "fas fa-trash-alt");
                        cardTitle.setAttribute("class", "card-title");

                        cardTitle.innerText = card.title;
                        cardRemove.appendChild(cardI);
                        cardBox.appendChild(cardRemove);
                        cardBox.appendChild(cardTitle);
                        columnContent.appendChild(cardBox);
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
        document.body.appendChild(addBoardBtn);
        document.body.appendChild(boardContainer);
    },
    createBoard: function () {
        dataHandler.getBoards(function (boards) {
            dom.showNewTable(boards);
            dataHandler.createNewBoard()
        })
    },
    showNewTable: function (boards) {
        let boardContainer = document.querySelector(".board-container");
        let boardSection = document.createElement("section");
        let boardHeader = document.createElement("div");
        let boardTitle = document.createElement("span");
        let addCardBtn = document.createElement("button");
        let boardToggle = document.createElement("button");
        let boardI = document.createElement("i");
        let boardBackground = document.createElement("div");

        boardContainer.setAttribute("class", "board-container");
        boardSection.setAttribute("class", "board");
        boardHeader.setAttribute("class", "board-header");
        boardTitle.setAttribute("class", "board-title");
        addCardBtn.setAttribute("class", "board-add");
        boardToggle.setAttribute("class", "board-toggle");
        boardI.setAttribute("class", "fas fa-chevron-down");
        boardBackground.setAttribute("class", "board-columns");

        boardTitle.innerText = "New board";
        addCardBtn.innerText = "Add card";
        boardToggle.appendChild(boardI);
        for (let child of [boardTitle, addCardBtn, boardToggle]) {
            boardHeader.appendChild(child);
        }

        for (let status of boards.statuses) {
            let container = document.createElement("div");
            let columnTitle = document.createElement("div");
            let columnContent = document.createElement("div");

            container.setAttribute("class", "board-column");
            columnTitle.setAttribute("class", "board-column-title");
            columnContent.setAttribute("class", "board-column-content");
            columnTitle.innerText = status.title;
            container.appendChild(columnTitle);
            container.appendChild(columnContent);
            boardBackground.appendChild(container);
        }
        boardSection.appendChild(boardHeader);
        boardSection.appendChild(boardBackground);
        boardContainer.appendChild(boardSection);
    }
};
