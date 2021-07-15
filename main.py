from flask import Flask, render_template, url_for, request

import queries
from util import json_response

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/ProMan'


@app.route("/", methods=["GET", "POST"])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/get-boards/<int:board_id>")
@json_response
def get_board(board_id):
    return queries.get_board(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    All the boards
    """
    return queries.get_statuses()


@app.route("/get-connections/<int:board_id>")
@json_response
def get_connections(board_id):
    """
    All the boards
    """
    return queries.get_connections(board_id)


@app.route("/get-statuses/<int:status_id>")
@json_response
def get_status(status_id):
    """
    All the boards
    """
    return queries.get_status(status_id)


@app.route("/get-board-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/get-cards/<int:card_id>")
@json_response
def get_card(card_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_card(card_id)


@app.route("/get-if-board-title-exists")
@json_response
def get_if_board_title_exists(board_title: str):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.check_if_board_title_exist(board_title)


@app.route("/add-board", methods=['POST'])
@json_response
def add_board():
    board_title = request.json['boardTitle']
    queries.add_board(board_title)


@app.route("/add-card")
@json_response
def add_card():
    pass


@app.route("/update-board-title", methods=['PUT'])
@json_response
def update_board_title():
    board_to_update_id = request.json['boardID']
    new_board_title = request.json['newBoardTitle']
    queries.update_board_title(board_to_update_id, new_board_title)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
