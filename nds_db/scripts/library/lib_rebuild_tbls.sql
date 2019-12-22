USE db_nds;

DROP TABLE IF EXISTS tbl_library CASCADE;

CREATE TABLE tbl_library(
    id SERIAL PRIMARY KEY,
    data_json jsonb NOT NULL DEFAULT '{"nuns":"bums"}'::jsonb,
    song_url VARCHAR NOT NULL DEFAULT 'NO_URL'
);