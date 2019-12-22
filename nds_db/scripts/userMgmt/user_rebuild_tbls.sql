USE db_nds;

DROP TABLE IF EXISTS tbl_user CASCADE;
DROP TYPE IF EXISTS entity CASCADE;
DROP TABLE IF EXISTS tbl_profile CASCADE;
DROP TABLE IF EXISTS tbl_playlist CASCADE;
DROP TABLE IF EXISTS tbl_history CASCADE;

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


INSERT INTO tbl_user( name, email, password )
VALUES
    ('coco','goodstuff@blah.com','ohnococo'),
    ('bobo','simplestuff@blah.com','ohnobobo'),
    ('jojo','safestuff@blah.com','ohnojojo')
;

INSERT INTO tbl_profile( user_id, entity_type, payment_info)
VALUES
    ('1', 'personal', 'Payment Info: broke AF')
;

SELECT * FROM tbl_user;
SELECT * FROM tbl_profile;