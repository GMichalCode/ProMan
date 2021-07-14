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
        WHERE s.id = %(status_id)s
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
        ;
        """
    )


def get_board(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards b
        WHERE b.id = %(board_id)s
        ;
        """, {"board_id": board_id}
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """, {"board_id": board_id})
    return matching_cards


def get_card(card_id):
    card = data_manager.execute_select(
        """
        SELECT * FROM cards c
        WHERE c.id = %(card_id)s
        ;
        """, {"card_id": card_id}, False)

    return card


def get_statuses():
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """
    )


def get_status(status_id):
    return data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """, {"status_id": status_id}, False)


def add_board(board_title):
    if check_if_board_title_exist(board_title):
        raise Exception

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
