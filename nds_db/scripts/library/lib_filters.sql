USE db_nds;

DROP TABLE IF EXISTS tbl_filters CASCADE;
DROP TABLE IF EXISTS tbl_genre CASCADE;
DROP TABLE IF EXISTS tbl_instrument CASCADE;
DROP TABLE IF EXISTS tbl_keyword CASCADE;
DROP TABLE IF EXISTS tbl_project CASCADE;

CREATE TABLE IF NOT EXISTS tbl_filters(
    id SERIAL PRIMARY KEY,
    category text NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_genre(
    id SERIAL PRIMARY KEY,
    genre text NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_instrument(
    id SERIAL PRIMARY KEY,
    instrument text NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_keyword(
    id SERIAL PRIMARY KEY,
    keyword text NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_project(
    id SERIAL PRIMARY KEY,
    project text NOT NULL
);

INSERT INTO tbl_filters( category )
VALUES
    ('genre'),
    ('instrument'),
    ('keyword'),
    ('project')
;

INSERT INTO tbl_genre( genre )
VALUES
    ('ambient'),
    ('cinematic'),
    ('dance'),
    ('electronic'),
    ('folk/americana'),
    ('holiday'),
    ('indie'),
    ('pop'),
    ('rock'),
    ('slowjams'),
    ('world'),
    ('blues/roots/jazz'),
    ('orchestral'),
    ('experimental')
;

INSERT INTO tbl_instrument( instrument )
VALUES
    ('acoustic guitar'),
    ('bass'),
    ('backing vocal'),
    ('drum machine'),
    ('claps'),
    ('electric guitar'),
    ('horns'),
    ('piano'),
    ('bells/chimes'),
    ('glock/toy piano'),
    ('percussion'),
    ('strings'),
    ('synth'),
    ('ukulele'),
    ('organ'),
    ('whistle')
;

INSERT INTO tbl_keyword( keyword )
VALUES
    ('anthemic'),
    ('epic'),
    ('calm'),
    ('dark'),
    ('tense'),
    ('ethereal'),
    ('fun'),
    ('energizing'),
    ('playful'),
    ('quirky'),
    ('happy'),
    ('uplifting'),
    ('intimate'),
    ('lo-fi'),
    ('pensive'),
    ('romantic'),
    ('sad'),
    ('sentimental'),
    ('emotional'),
    ('sexy'),
    ('soulful'),
    ('psychedelic'),
    ('retro'),
    ('swagger')
;

INSERT INTO tbl_project( project )
VALUES
    ('action'),
    ('avant garde'),
    ('business'),
    ('childrens'),
    ('drama/documentary'),
    ('holiday'),
    ('horror'),
    ('lookbook/fashion'),
    ('road trip'),
    ('indie'),
    ('romantic'),
    ('scifi/fantasy'),
    ('sports'),
    ('thriller'),
    ('wedding'),
    ('western')
;

SELECT * FROM tbl_filters;
SELECT * FROM tbl_genre;
SELECT * FROM tbl_instrument;
SELECT * FROM tbl_keyword;
SELECT * FROM project;