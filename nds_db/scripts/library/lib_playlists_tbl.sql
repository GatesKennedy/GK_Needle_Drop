USE db_nds;

DROP TABLE IF EXISTS tbl_playlists CASCADE;

CREATE TABLE IF NOT EXISTS tbl_playlists(
    id SERIAL PRIMARY KEY,
    list_name TEXT NOT NULL,
    song_id INTEGER REFERENCES tbl_library(id)
);


INSERT INTO tbl_playlists( list_name, song_id )
VALUES
    ('GoodList',34),
    ('BadList',256),
    ('Better than bad..',334),
    ('GoodList',134),
    ('GoodList',846),
    ('GoodList',346),
    ('Better than bad..',95),
    ('GoodList',80),
    ('Better than bad..',456),
    ('Better than bad..',342),
    ('Better than bad..',37),
    ('BadList',394),
    ('BadList',253)
;

SELECT * FROM tbl_playlists;

--  .sql Script from CMD
--===============================
--  psql -U ohnodamn -d db_nds -a -f <file_path>
--  psql -U ohnodamn -d db_nds -a -f C:\Programming\Gates_Kennedy\GK_Needle_Drop\nds_db\scripts\library\lib_playlists_tbl.sql