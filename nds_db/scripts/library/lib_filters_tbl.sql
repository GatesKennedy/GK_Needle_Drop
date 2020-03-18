USE db_nds;

DROP TABLE IF EXISTS tbl_filters CASCADE;
DROP TABLE IF EXISTS tbl_filter CASCADE;
DROP TABLE IF EXISTS tbl_genre CASCADE;
DROP TABLE IF EXISTS tbl_instrument CASCADE;
DROP TABLE IF EXISTS tbl_keyword CASCADE;
DROP TABLE IF EXISTS tbl_project CASCADE;

CREATE TABLE IF NOT EXISTS tbl_filter(
    id SERIAL PRIMARY KEY,
    genus text NOT NULL,
    species text NOT NULL
);


INSERT INTO tbl_filter( genus, species )
VALUES
    ('genre','ambient'),
    ('genre','cinematic'),
    ('genre','dance'),
    ('genre','electronic'),
    ('genre','folk/americana'),
    ('genre','holiday'),
    ('genre','indie'),
    ('genre','pop'),
    ('genre','rock'),
    ('genre','slowjams'),
    ('genre','world'),
    ('genre','blues/roots/jazz'),
    ('genre','orchestral'),
    ('genre','experimental'),

    ('instrument','acoustic guitar'),
    ('instrument','bass'),
    ('instrument','backing vocal'),
    ('instrument','drum machine'),
    ('instrument','claps'),
    ('instrument','electric guitar'),
    ('instrument','horns'),
    ('instrument','piano'),
    ('instrument','bells/chimes'),
    ('instrument','glock/toy piano'),
    ('instrument','percussion'),
    ('instrument','strings'),
    ('instrument','synth'),
    ('instrument','ukulele'),
    ('instrument','organ'),
    ('instrument','whistle'),

    ('keyword','anthemic'),
    ('keyword','epic'),
    ('keyword','calm'),
    ('keyword','dark'),
    ('keyword','tense'),
    ('keyword','ethereal'),
    ('keyword','fun'),
    ('keyword','energizing'),
    ('keyword','playful'),
    ('keyword','quirky'),
    ('keyword','happy'),
    ('keyword','uplifting'),
    ('keyword','intimate'),
    ('keyword','lo-fi'),
    ('keyword','pensive'),
    ('keyword','romantic'),
    ('keyword','sad'),
    ('keyword','sentimental'),
    ('keyword','emotional'),
    ('keyword','sexy'),
    ('keyword','soulful'),
    ('keyword','psychedelic'),
    ('keyword','retro'),
    ('keyword','swagger'),

    ('project','action'),
    ('project','avant garde'),
    ('project','business'),
    ('project','childrens'),
    ('project','drama/documentary'),
    ('project','holiday'),
    ('project','horror'),
    ('project','lookbook/fashion'),
    ('project','road trip'),
    ('project','indie'),
    ('project','romantic'),
    ('project','scifi/fantasy'),
    ('project','sports'),
    ('project','thriller'),
    ('project','wedding'),
    ('project','western')
;

SELECT * FROM tbl_filter;

--  .sql Script from CMD
--===============================
--  psql -U ohnodamn -d db_nds -a -f <file_path>
--  psql -U ohnodamn -d db_nds -a -f C:\Programming\Gates_Kennedy\GK_Needle_Drop\nds_db\scripts\library\lib_filters_tbl.sql
