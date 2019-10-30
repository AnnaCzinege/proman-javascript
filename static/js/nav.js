import {dataHandler} from "./data_handler.js";

export let nav = {
    draggedObj: "",
    clickToggle: function () {
        let board = this.parentNode.parentNode;
        let placeToToggle = board.querySelector(".board-columns");
        placeToToggle.classList.toggle("closed");
    },
    setSoloDraggable: function (card) {
        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", nav.dragStart);
    },
    setSoloDragPlace: function (status) {
        status.addEventListener('dragenter', nav.dragEnter);
        status.addEventListener('dragover', nav.dragOver);
        status.addEventListener('dragleave', nav.dragLeave);
        status.addEventListener('drop', nav.dragDrop);
    },
    setDraggable: function () {
        let cards = document.querySelectorAll(".card");
        for (let card of cards) {
            card.setAttribute("draggable", "true");
            card.addEventListener("dragstart", nav.dragStart);
        }
    },
    setDragPlaces: function () {
        let dragPlaces = document.querySelectorAll(".board-column-content");
        for (let dragPlace of dragPlaces) {
            dragPlace.addEventListener('dragenter', nav.dragEnter);
            dragPlace.addEventListener('dragover', nav.dragOver);
            dragPlace.addEventListener('dragleave', nav.dragLeave);
            dragPlace.addEventListener('drop', nav.dragDrop);
        }
    },
    dragStart: function () {
        nav.draggedObj = this;
    },
    dragDrop: function () {
        this.appendChild(nav.draggedObj);
        let cardId = nav.draggedObj.dataset.cardId;
        let tableId = this.parentElement.parentElement.parentElement.id;
        let statusId = this.parentElement.dataset.statusId;
        dataHandler.moveCard(cardId, tableId, statusId, () => {})
    },
    dragEnter: function (e) {
        e.preventDefault();
    },
    dragOver: function (e) {
        e.preventDefault();
    },
    dragLeave: function (e) {
        e.preventDefault();
    }
};