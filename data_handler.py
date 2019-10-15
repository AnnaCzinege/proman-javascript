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
                    SELECT * FROM boards;
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




