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
        board_dict = request.get_json("body")
        board_name = board_dict["data"]
        data_handler.save_new_board(board_name)

    return jsonify(data_handler.get_latest_board())


@app.route("/create-new-card", methods=['GET', 'POST'])
def create_new_card():
    if request.method == "POST":
        card_dict = request.get_json("body")
        data_handler.save_new_card(card_dict)

    return jsonify(data_handler.get_latest_card())


@app.route("/rename-board", methods=['GET', 'POST'])
def rename_board():
    if request.method == 'POST':
        new_title_dict = request.get_json("body")
        data_handler.rename_board_title(new_title_dict)

    return jsonify({"title": new_title_dict["new_title"]})


@app.route("/delete-card", methods=["POST"])
def delete_card():
    card_id_dict = request.get_json("body")
    data_handler.delete_card_by_id(card_id_dict)
    return jsonify({"card_id": card_id_dict['card_id']})


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
