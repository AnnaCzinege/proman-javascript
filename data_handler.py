import database_common


def normalize_output_single_row(normalize_me):  # Creates a simple dictionary
    dump_dictionary = {}
    for row in normalize_me:
        for key, value in row.items():
            dump_dictionary[key] = value
    return dump_dictionary


def normalize_output_multiple_rows(normalize_me):  # Creates dictionaries in a list
    normalized_output = []
    for row in normalize_me:
        dump_dictionary = {}
        for key, value in row.items():
            dump_dictionary[key] = value
        normalized_output.append(dump_dictionary)
    return normalized_output


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT * FROM boards
                    ORDER BY id
                    """)
    boards = normalize_output_multiple_rows(cursor.fetchall())

    cursor.execute("""
                    SELECT * FROM cards;                    
                    """)
    cards = normalize_output_multiple_rows(cursor.fetchall())

    cursor.execute("""
                    SELECT * FROM statuses;                    
                    """)
    statuses = normalize_output_multiple_rows(cursor.fetchall())

    return {
        "boards": boards,
        "cards": cards,
        "statuses": statuses
        }


@database_common.connection_handler
def save_new_board(cursor, board_name):
    cursor.execute("""
                    INSERT INTO boards(title)
                    VALUES (%(board_name)s)
                    """, {"board_name": board_name})


@database_common.connection_handler
def get_latest_board(cursor):
    cursor.execute("""
                    SELECT id FROM boards
                    ORDER BY id DESC 
                    LIMIT 1
                    """)
    return normalize_output_single_row(cursor.fetchall())


@database_common.connection_handler
def save_new_card(cursor, card_dict):
    cursor.execute("""
                    SELECT MAX("order") as max from cards;
                    """)
    max_order = normalize_output_single_row(cursor.fetchall())["max"]
    if max_order is None:
        max_order = 0
    else:
        max_order += 1
    board_id = card_dict["board_id"]
    status_id = card_dict["status_id"]
    title = card_dict["title"]
    cursor.execute("""
                    INSERT INTO cards (board_id, title, status_id, "order")
                    VALUES (%(board_id)s, %(title)s, %(status_id)s, %(max_order)s) 
                    """, {"board_id": board_id,
                          "title": title,
                          "status_id": status_id,
                          "max_order": max_order
                          })


@database_common.connection_handler
def get_latest_card(cursor):
    cursor.execute("""
                    SELECT id FROM cards
                    ORDER BY  id DESC
                    LIMIT 1
                    """)
    return normalize_output_single_row(cursor.fetchall())


@database_common.connection_handler
def rename_board_title(cursor, new_title_dict):
    board_id = new_title_dict["board_id"]
    new_title = new_title_dict["new_title"]
    cursor.execute("""
                    UPDATE boards
                    SET title = %(new_title)s
                    WHERE id = %(board_id)s
                    """, {"new_title": new_title,
                          "board_id": board_id})


@database_common.connection_handler
def delete_card_by_id(cursor, card_id_dict):
    card_id = card_id_dict["card_id"]
    cursor.execute("""
                    DELETE 
                    FROM cards
                    WHERE cards.id = %(card_id)s
                    """, {"card_id": card_id})


@database_common.connection_handler
def delete_board_by_id(cursor, board_id_dict):
    board_id = board_id_dict["board_id"]
    cursor.execute("""
                    DELETE
                    FROM cards
                    WHERE cards.board_id = %(board_id)s
                    """, {"board_id": board_id})

    cursor.execute("""
                        DELETE
                        FROM statuses
                        WHERE statuses.board_id = %(board_id)s
                        """, {"board_id": board_id})

    cursor.execute("""
                        DELETE 
                        FROM boards
                        WHERE boards.id = %(board_id)s
                        """, {"board_id": board_id})


@database_common.connection_handler
def add_board_statuses(cursor, board_id):
    static_statuses = ["new", "in progress", "testing", "done"]

    for status in static_statuses:
        cursor.execute("""
                        INSERT INTO statuses (title, board_id)
                        VALUES (%(status)s, %(board_id)s)
                        """, {"status": status,
                              "board_id": board_id})


@database_common.connection_handler
def get_latest_statuses(cursor):
    cursor.execute("""
                    SELECT id, title FROM statuses
                    ORDER BY id DESC
                    LIMIT 4
                    """)
    return normalize_output_multiple_rows(cursor.fetchall())


@database_common.connection_handler
def add_new_status(cursor, board_id):
    cursor.execute("""
                    INSERT INTO statuses (title, board_id)
                    VALUES ('new status', %(board_id)s)
                    """, {"board_id": board_id})
