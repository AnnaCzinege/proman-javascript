from flask import Flask, render_template, url_for, jsonify, request, session
import data_handler
import hash

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get-boards")
def get_boards():
    return jsonify(data_handler.get_boards())


@app.route("/create-new-board", methods=['POST'])
def create_new_board():
    board_dict = request.json
    board_name = board_dict["data"]
    data_handler.save_new_board(board_name)
    latest_board = data_handler.get_latest_board()
    data_handler.add_board_statuses(latest_board["id"])
    latest_statuses = data_handler.get_latest_statuses()
    latest_board["statuses"] = latest_statuses
    return jsonify(latest_board)


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


@app.route("/rename-card", methods=["POST"])
def rename_card():
    data_dict = request.get_json("body")
    data_handler.rename_card_title(data_dict)
    return jsonify({"title": data_dict["new_title"]})


@app.route("/create-new-status", methods=['POST'])
def create_new_status():
    board_id_dict = request.get_json("body")
    board_id = board_id_dict["board_id"]
    data_handler.add_new_status(board_id)
    return jsonify(board_id_dict)


@app.route("/delete-card", methods=["POST"])
def delete_card():
    card_id_dict = request.get_json("body")
    data_handler.delete_card_by_id(card_id_dict)
    return jsonify({"card_id": card_id_dict['card_id']})


@app.route("/delete-board", methods=["POST"])
def delete_board():
    board_id_dict = request.get_json("body")
    data_handler.delete_board_by_id(board_id_dict)
    return jsonify({"board_id": board_id_dict['board_id']})


@app.route("/move-card", methods=["POST"])
def move_card():
    data = request.get_json("body")
    data_handler.change_card_pos(data)
    return jsonify({"done": "done"})


@app.route("/rename-status", methods=["POST"])
def rename_status():
    data = request.get_json("body")
    data_handler.rename_status(data)
    return jsonify({"new_title": data["new_title"]})


@app.route("/signin", methods=["POST"])
def sign_in():
    data_from_js = request.get_json("body")
    usernames = [item["username"] for item in data_handler.get_all_username()]
    if data_from_js["username"] in usernames and hash.verify_pass(data_from_js["password"], data_handler.get_pass_by_username(data_from_js["username"])["password"]):
        session["username"] = data_from_js["username"]
        return jsonify({"message": f"You are logged in as {data_from_js['username']}"})
    else:
        return jsonify({"message": "Wrong username or password"})


@app.route("/signup", methods=["POST"])
def sign_up():
    usernames = [item["username"] for item in data_handler.get_all_username()]
    data_from_js = request.get_json("body")
    if data_from_js["username"] in usernames:
        return jsonify({"message": "Username is already taken"})
    else:
        data_from_js["password"] = hash.hash_pass(data_from_js["password"])
        data_handler.add_new_user(data_from_js)
        return jsonify({"message": "Registration successful"})


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
