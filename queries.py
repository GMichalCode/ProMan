import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s AND s.is_deleted = FALSE
        ;
        """, {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE is_deleted = FALSE
        ;
        """
    )


def get_board(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards b
        WHERE b.id = %(board_id)s AND b.is_deleted = FALSE
        ;
        """, {"board_id": board_id}
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE board_id = %(board_id)s AND is_deleted = FALSE
        ;
        """, {"board_id": board_id})
    return matching_cards


def get_card(card_id):
    card = data_manager.execute_select(
        """
        SELECT * FROM cards c
        WHERE c.id = %(card_id)s AND c.is_deleted = FALSE
        ;
        """, {"card_id": card_id}, False)

    return card


def get_statuses(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.board_id = %(board_id)s AND s.is_deleted = FALSE
        ;
        """, {"board_id": board_id})


# def get_connections(boardId):
#     return data_manager.execute_select(
#         """
#         SELECT board_id FROM connections c
#         WHERE c.board_id = %(boardId)s
#         """, {"boardId": boardId}


def get_status(status_id):
    return data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s AND s.is_deleted = FALSE
        ;
        """, {"status_id": status_id}, False)



def get_board_statuses(board_id):
    data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE board_id = %(board_id)s AND is_deleted = FALSE
        """, {"boardId": board_id}
    )

def get_statuses_for_board(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.board_id = %(board_id)s AND s.is_deleted = FALSE
        ;
        """, {"board_id": board_id})



def add_board(board_title):
    if not check_if_board_title_exist(board_title):
        data_manager.execute_insert(
            """
            INSERT INTO boards (title)
            VALUES (%(board_title)s);
            """, {"board_title": board_title})


def check_if_board_title_exist(board_title):
    board_id = data_manager.execute_select("""
    SELECT id FROM boards
    WHERE title = (%(board_title)s)
    """, {"board_title": board_title})
    if board_id:
        return True
    return False


def update_board_title(board_id, new_board_title):
    data_manager.execute_insert(
        """
        UPDATE boards
        SET title = (%(new_board_title)s)
        WHERE id = (%(board_id)s)
        """, {'board_id': board_id, 'new_board_title': new_board_title}
    )


def update_column_title(column_to_update_id, new_column_title):
    data_manager.execute_insert(
        """
        UPDATE statuses
        SET title = (%(new_column_title)s)
        WHERE id = (%(column_to_update_id)s)
        """, {'new_column_title': new_column_title, 'column_to_update_id': column_to_update_id}
    )

