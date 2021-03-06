--USE db_nds;

DROP TABLE IF EXISTS tbl_playall CASCADE;
DROP TABLE IF EXISTS tbl_playlists CASCADE;
DROP TABLE IF EXISTS tbl_playlist CASCADE;

CREATE TABLE IF NOT EXISTS tbl_playlist(
    id      SERIAL PRIMARY  KEY,
    creator UUID REFERENCES tbl_user(id) ON DELETE CASCADE,
    name    TEXT            NOT NULL,
    image   TEXT,
    date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tbl_playall(
    id          SERIAL PRIMARY  KEY,
    list_id     INTEGER         REFERENCES tbl_playlist(id) ON DELETE CASCADE,
    song_id     INTEGER         REFERENCES tbl_library(id) ON DELETE CASCADE,
    rank        INTEGER         NOT NULL DEFAULT 0
);

INSERT INTO tbl_playlist( creator, name)
VALUES
    ('ea52f9cd-4bc3-4fa2-a60b-b649122ede21', 'Good Bad Boy'),
    ('ea52f9cd-4bc3-4fa2-a60b-b649122ede21', 'Biden The Buyable'),
    ('ea52f9cd-4bc3-4fa2-a60b-b649122ede21', 'Realize .:. Real Lies'),
    ('ea52f9cd-4bc3-4fa2-a60b-b649122ede21', 'DeadAss'),
    ('ea52f9cd-4bc3-4fa2-a60b-b649122ede21', 'Family Planning')
;

INSERT INTO tbl_playall( list_id, song_id, rank )
VALUES
    (1,34,1),
    (3,256,2),
    (2,334,0),
    (1,134,0),
    (1,846,0),
    (1,346,0),
    (2,95,0),
    (1,80,0),
    (2,456,3),
    (2,342,1),
    (2,37,2),
    (3,394,5),
    (3,253,4),
    (4,666,1),
    (4,420,2),
    (5,69,1),
    (5,1987,2)
;

SELECT * FROM tbl_playlist;
SELECT * FROM tbl_playall;

--  .sql Script from CMD
--===============================
--  psql -U ohnodamn -d db_nds -a -f <file_path>
--  psql -U ohnodamn -d db_nds -a -f C:\Programming\Gates_Kennedy\GK_Needle_Drop\nds_db\scripts\library\bld-pop-Playlists.sql