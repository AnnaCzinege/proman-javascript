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
    },
    setModalListener: function () {
        document.querySelector(".signin").addEventListener("click", nav.choseModal);
        document.querySelector(".signup").addEventListener("click", nav.choseModal);
        document.querySelector(".modal-background").addEventListener("click", nav.hideModal);
    },
    choseModal: function () {
        let targetClass = this.className;
        let signIn = "/signin";
        let signUp = "/signup";
        switch (targetClass) {
            case "signin":
                nav.createModal(signIn, "Sign In");
                break;
            case "signup":
                nav.createModal(signUp, "Sign Up");
                break;
        }
    },
    createModal: function (url, btnContent) {
        let confirmBtn = document.createElement("button");
        confirmBtn.classList.add("confirm-btn");
        confirmBtn.textContent = btnContent;
        confirmBtn.addEventListener("click", function() {
            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;
            dataHandler.signIn(url, username, password, (response) => {
                localStorage.setItem("message", response.message);
                document.querySelector(".message").textContent = localStorage["message"];
            });
            nav.hideModal();
        });
        document.querySelector(".modal-content").appendChild(confirmBtn);
        document.querySelector(".modal-background").classList.remove("invisible");
        document.querySelector(".modal-content").classList.remove("invisible");
    },
    hideModal: function () {
        document.querySelector(".modal-background").classList.add("invisible");
        document.querySelector(".modal-content").classList.add("invisible");
        let btn = document.querySelector(".confirm-btn");
        btn.parentNode.removeChild(btn);
    },
};