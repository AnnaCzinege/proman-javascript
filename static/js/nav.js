export let nav = {
    clickToggle: function () {
        let board = this.parentNode.parentNode;
        let placeToToggle = board.querySelector(".board-columns");
        placeToToggle.classList.toggle("closed");
    }
};