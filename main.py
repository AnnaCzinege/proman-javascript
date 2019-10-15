from flask import Flask, render_template, url_for, jsonify, request
import requests
import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get-boards")
def get_boards():
    return jsonify(data_handler.get_boards())


@app.route("/create-new-board", methods=['GET', 'POST'])
def create_new_board():
    if request.method == "POST":
        print("post")
        board_dict = request.get_json("body")
        print(board_dict)
        board_name = board_dict["data"]
        data_handler.save_new_board(board_name)

    return jsonify(data_handler.get_latest_board())


@app.route("/get-cards/<int:board_id>")
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
