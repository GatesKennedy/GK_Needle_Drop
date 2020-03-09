
DROP TABLE IF EXISTS tbl_user CASCADE;
DROP TABLE IF EXISTS tbl_profile CASCADE;
DROP TABLE IF EXISTS tbl_favorites CASCADE;
DROP TABLE IF EXISTS tbl_playlist CASCADE;
DROP TABLE IF EXISTS tbl_history CASCADE;

DROP TYPE IF EXISTS entity CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tbl_user(
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_join date NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id)
);

CREATE TYPE entity AS ENUM ('personal', 'biz_sml', 'biz_med', 'biz_lrg');

CREATE TABLE tbl_profile(
    user_id UUID REFERENCES tbl_user(id),
    entity_type entity NOT NULL DEFAULT 'personal',
    payment_info VARCHAR NOT NULL,
    location VARCHAR(50)
);

CREATE TABLE tbl_favorites(
    user_id UUID REFERENCES tbl_user(id),
    song_id INTEGER REFERENCES tbl_library(id),
    PRIMARY KEY (user_id, song_id)
);

CREATE TABLE tbl_playlist(
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES tbl_user(id),
    name_plist VARCHAR NOT NULL
);

CREATE TABLE tbl_history(
    user_id UUID REFERENCES tbl_user(id),
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

SELECT * FROM tbl_user;
SELECT * FROM tbl_profile;

--  .sql Script from CMD
--===============================
--  psql -U ohnodamn -d db_nds -a -f <file_path>
--  psql -U ohnodamn -d db_nds -a -f C:\Programming\Gates_Kennedy\GK_Needle_Drop\nds_db\scripts\userMgmt\user_rebuild_tbls.sql