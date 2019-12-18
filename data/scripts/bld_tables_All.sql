USE db_nds;

CREATE TABLE tbl_library(
    id serial PRIMARY KEY,
    data_json jsonb NOT NULL DEFAULT '{"nuns":"bums"}'::jsonb
);