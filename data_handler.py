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



