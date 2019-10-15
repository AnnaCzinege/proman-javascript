// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.testFunction(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards.boards){
            boardList += `<li>${board.title}</li>`;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    testFunction: function (boards) {
        let boardContainer = document.createElement("div");
        for (let board of boards.boards) {


            let boardSection = document.createElement("section");
            let boardHeader = document.createElement("div");
            let boardTitle = document.createElement("span");
            let addBtn = document.createElement("button");
            let boardToggle = document.createElement("button");
            let boardI = document.createElement("i");
            let boardBackground = document.createElement("div");

            boardContainer.setAttribute("class", "board-container");
            boardSection.setAttribute("class", "board");
            boardHeader.setAttribute("class", "board-header");
            boardTitle.setAttribute("class", "board-title");
            addBtn.setAttribute("class", "board-add");
            boardToggle.setAttribute("class", "board-toggle");
            boardI.setAttribute("class", "fas fa-chevron-down");
            boardBackground.setAttribute("class", "board-columns");

            boardTitle.innerText = board.title;
            addBtn.innerText = "Add new board";
            boardToggle.appendChild(boardI);
            for (let child of [boardTitle, addBtn, boardToggle]) {
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
        document.body.appendChild(boardContainer);
    }
};
