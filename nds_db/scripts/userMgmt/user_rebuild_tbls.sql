
DROP TABLE IF EXISTS tbl_user CASCADE;
DROP TABLE IF EXISTS tbl_profile CASCADE;
DROP TABLE IF EXISTS tbl_favorites CASCADE;
DROP TABLE IF EXISTS tbl_favorite CASCADE;
DROP TABLE IF EXISTS tbl_playlist CASCADE;
DROP TABLE IF EXISTS tbl_history CASCADE;

DROP TYPE IF EXISTS entity_type CASCADE;
DROP TYPE IF EXISTS role_type CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE entity_type  AS ENUM ('personal', 'biz_sml', 'biz_med', 'biz_lrg');
CREATE TYPE role_type   AS ENUM ('admin', 'dev', 'user');

CREATE TABLE tbl_user(
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role role_type NOT NULL DEFAULT 'user',
    date_join date NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id)
);


CREATE TABLE tbl_profile(
    user_id UUID REFERENCES tbl_user(id),
    entity entity_type NOT NULL DEFAULT 'personal',
    payment_info VARCHAR NOT NULL,
    location VARCHAR(50)
);

CREATE TABLE tbl_favorite(
    user_id UUID REFERENCES tbl_user(id),
    song_id INTEGER REFERENCES tbl_library(id),
    PRIMARY KEY (user_id, song_id)
);

CREATE TABLE tbl_history(
    user_id UUID REFERENCES tbl_user(id),
    song_id INTEGER REFERENCES tbl_library(id),
    payment_status BOOLEAN NOT NULL DEFAULT 'false',
    PRIMARY KEY (user_id, song_id)
);

SELECT * FROM tbl_user;
SELECT * FROM tbl_profile;

--  .sql Script from CMD
--===============================
--  psql -U ohnodamn -d db_nds -a -f <file_path>
--  psql -U ohnodamn -d db_nds -a -f C:\Programming\Gates_Kennedy\GK_Needle_Drop\nds_db\scripts\userMgmt\user_rebuild_tbls.sql