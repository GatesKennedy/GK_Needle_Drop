USE db_nds;

CREATE TABLE tbl_library(
    id SERIAL PRIMARY KEY,
    data_json jsonb NOT NULL DEFAULT '{"nuns":"bums"}'::jsonb,
    song_url VARCHAR NOT NULL DEFAULT 'NO_URL'
);


CREATE TABLE tbl_user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_join date NOT NULL DEFAULT CURRENT_DATE
);


CREATE TYPE entity AS ENUM ('personal', 'biz_sml', 'biz_med', 'biz_lrg');
CREATE TABLE tbl_profile(
    user_id INTEGER REFERENCES tbl_user(id),
    entity_type entity NOT NULL DEFAULT 'personal',
    payment_info VARCHAR NOT NULL
);

CREATE TABLE tbl_playlist(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES tbl_user(id),
    name_plist VARCHAR NOT NULL
);

CREATE TABLE tbl_history(
    user_id INTEGER REFERENCES tbl_user(id),
    library_id INTEGER REFERENCES tbl_library(id),
    playlist_id INTEGER REFERENCES tbl_playlist(id),
    payment_status BOOLEAN NOT NULL DEFAULT 'false',
    PRIMARY KEY (user_id, library_id)
);

