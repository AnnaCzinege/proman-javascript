DROP TABLE IF EXISTS boards, cards, statuses;

CREATE TABLE boards(
    id serial primary key,
    title varchar(255)
);


CREATE TABLE cards(
    id serial primary key,
    board_id int references boards(id),
    title varchar(255),
    status_id int,
    "order" int
);

ALTER TABLE cards
    ADD constraint unique_order unique (
            board_id, status_id, "order"
        );

CREATE TABLE statuses(
    id serial primary key,
    title varchar(255),
    board_id int
);


