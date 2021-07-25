import re

import bcrypt
from flask import Flask, render_template, url_for, request, make_response, jsonify

import queries
from util import json_response

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/ProMan'

sessions = []


@app.route("/", methods=["GET", "POST"])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')
    # return render_template('index.html', logged=authenticate_user(request))


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


@app.route("/get-column-cards/<int:column_id>")
@json_response
def get_column_cards(column_id):
    return queries.get_column_cards(column_id)


@app.route("/get-columns/<int:board_id>")
@json_response
def get_columns(board_id):
    return queries.get_columns(board_id)


@app.route("/get-column/<int:column_id>")
@json_response
def get_column(column_id):
    return queries.get_column(column_id)


# @app.route("/get-board-cards/<int:board_id>")
# @json_response
# def get_cards_for_board(board_id: int):
#     """
#     All cards that belongs to a board
#     :param board_id: id of the parent board
#     """
#     return queries.get_cards_for_board(board_id)


@app.route("/get-cards/<int:card_id>")
@json_response
def get_card(card_id: int):
    return queries.get_card(card_id)


# @app.route("/check-if-board-title-exists")
# @json_response
# def check_if_board_title_exists(board_title: str):
#     answer = queries.check_if_board_title_exist(board_title)
#     return {'exist': answer}


@app.route("/add-board", methods=['POST'])
@json_response
def add_board():
    board_title = request.json['boardTitle']
    new_board_id = queries.add_board(board_title)['id']
    new_columns_ids = queries.add_default_columns(new_board_id)

    return [{"new_board_id": new_board_id}, {"new_columns_ids": new_columns_ids}]


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

    return """{"status": "success"}"""


@app.route("/update-column-title", methods=['PUT'])
@json_response
def update_column_title():
    column_to_update_id = request.json['columnID']
    new_column_title = request.json['newColumnTitle']
    queries.update_column_title(column_to_update_id, new_column_title)

    return """{"status": "success"}"""


@app.route("/login", methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    user_from_db = queries.login(email, False)
    if user_from_db is not None and verify_password(password, user_from_db['password']):
        resp = make_response(jsonify({'message': "Ok"}))
        resp.set_cookie('SESSION', str(user_from_db['id']))
        sessions.append(user_from_db['id'])
        return resp
    else:
        return {'message': "Incorrect email/password"}


@app.route('/register', methods=["POST"])
def registration():
    email = request.json['email']
    account = queries.check_new_user(email)
    if request.json['password'] == "":
        return {'message': 'Please fill out ALL forms !'}
    else:
        password = hash_password(request.json['password'])
    if email == "":
        return {'message': 'Please fill out ALL forms !'}
    elif account:
        return {'message': 'This email is already in use !'}
    elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return {'message': "Invalid email address !"}
    else:
        queries.register_new_user(email, password)
        return {'message': "Ok"}, 200


@app.route('/logout', methods=["POST"])
def logout():
    id_authenticator = int(request.cookies.get('SESSION'))
    sessions.remove(id_authenticator)
    return {'message': "Ok"}, 200


# def authenticate_user(request):
#     id_authenticator = int(request.cookies.get('SESSION'))
#     return id_authenticator in sessions


# def current_user(request):
#     current_user_id = request.cookies.get('SESSION')
#     return queries.get_user_by_id(current_user_id)


def hash_password(plain_password):
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')


def verify_password(plain_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_bytes_password)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
