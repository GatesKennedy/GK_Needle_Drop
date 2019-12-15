USE db_nds;

CREATE TABLE tbl_library(
    id serial PRIMARY KEY,
    info jsonb NOT NULL DEFAULT '{EMPTY}'::jsonb
);

INSERT INTO tbl_library(DEFAULT, info)
VALUES
()