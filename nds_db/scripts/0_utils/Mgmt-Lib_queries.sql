--USE db_nds;

-- SELECT DISTINCT UNION
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--      TRK DATA    TRK DATA    TRK DATA
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SELECT DISTINCT feat        AS "Featured Options" FROM tbl_library;
SELECT DISTINCT type        AS "Song Type Options" FROM tbl_library;
SELECT DISTINCT tempo       AS "Tempo Options" FROM tbl_library;
SELECT DISTINCT arc         AS "Arc Options" FROM tbl_library;
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--        LIB TRAIT
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

WITH 
    libInstr AS (
        SELECT DISTINCT instr_1     AS Instrument FROM tbl_library
        UNION
        SELECT DISTINCT instr_2     AS Instrument FROM tbl_library
        UNION
        SELECT DISTINCT instr_3     AS Instrument FROM tbl_library
    )
SELECT DISTINCT 
ORDER BY 
    Instrument ASC;
-----------------------------------

WITH 
    libInstr AS (
        SELECT instr_1     AS Instrument FROM tbl_library
        UNION
        SELECT instr_2     AS Instrument FROM tbl_library
        UNION
        SELECT instr_3     AS Instrument FROM tbl_library
    )
SELECT COUNT(Instrument)
FROM libInstr
ORDER BY 
    Instrument ASC;
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--       LIB TRAIT
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SELECT DISTINCT tag_1       AS Tag FROM tbl_library
UNION
SELECT DISTINCT tag_2       AS Tag FROM tbl_library
UNION
SELECT DISTINCT tag_3       AS Tag FROM tbl_library
ORDER BY
    Tag ASC;
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--        LIB TRAIT
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SELECT DISTINCT kw_1        AS Keyword FROM tbl_library
UNION
SELECT DISTINCT kw_2        AS Keyword FROM tbl_library
UNION
SELECT DISTINCT kw_3        AS Keyword FROM tbl_library
ORDER BY 
    Keyword ASC;
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--        LIB TRAIT
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SELECT DISTINCT proj_1      AS Project FROM tbl_library
UNION
SELECT DISTINCT proj_2      AS Project FROM tbl_library
UNION
SELECT DISTINCT proj_3      AS Project FROM tbl_library
ORDER BY
    Project ASC;
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--        LIB TRAIT
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SELECT DISTINCT genre_1     AS Genre FROM tbl_library
UNION
SELECT DISTINCT genre_2     AS Genre FROM tbl_library
UNION
SELECT DISTINCT genre_3     AS Genre FROM tbl_library
ORDER BY
    Genre ASC;
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


--||||||||||||||||||||||||||||||||||||||||||||||||||||||||
--++++++++++++++++++++++++++++++++++++++++++++++++++++++++
--||||||||||||||||||||||||||||||||||||||||||||||||||||||||

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--      NOT EXIST   NOT EXIST   NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Instrument      NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WITH 
    libInstrument AS (
        SELECT DISTINCT instr_1     AS Instrument FROM tbl_library
        UNION
        SELECT DISTINCT instr_2     AS Instrument FROM tbl_library
        UNION
        SELECT DISTINCT instr_3     AS Instrument FROM tbl_library
    )
SELECT Instrument, COUNT(Instrument)
FROM libInstrument tI
WHERE NOT EXISTS (
        SELECT 
        FROM tbl_filter
        WHERE LOWER(species) = LOWER(tI.instrument)
            AND genus = 'instrument'
    )

GROUP BY Instrument
ORDER BY 
    Instrument ASC
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Instrument      NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Keyword     NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WITH 
    libKeyword AS (
        SELECT DISTINCT kw_1     AS kw FROM tbl_library
        UNION
        SELECT DISTINCT kw_2     AS kw FROM tbl_library
        UNION
        SELECT DISTINCT kw_3     AS kw FROM tbl_library
    )
SELECT kw AS keyword, count(kw)
FROM libKeyword tK
WHERE NOT EXISTS (
        SELECT 
        FROM tbl_filter
        WHERE LOWER(species) = LOWER(tK.kw)
            AND genus = 'keyword'
    )
GROUP BY kw
ORDER BY 
    kw ASC

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Keyword     NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Project     NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WITH 
    libProject AS (
        SELECT DISTINCT proj_1     AS proj FROM tbl_library
        UNION
        SELECT DISTINCT proj_2     AS proj FROM tbl_library
        UNION
        SELECT DISTINCT proj_3     AS proj FROM tbl_library
    )
SELECT proj AS project, COUNT(proj)
FROM libProject tP
WHERE NOT EXISTS (
        SELECT 
        FROM tbl_filter
        WHERE LOWER(species) = LOWER(tP.proj)
            AND genus = 'project'
    )
GROUP BY proj
ORDER BY 
    proj ASC

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Project     NOT EXIST
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
;
    
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Genre       NOT EXIST 
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
WITH 
    libGenre AS (
        SELECT DISTINCT genre_1     AS genre FROM tbl_library
        UNION
        SELECT DISTINCT genre_2     AS genre FROM tbl_library
        UNION
        SELECT DISTINCT genre_3     AS genre FROM tbl_library
    )
SELECT genre, COUNT(genre)
FROM libGenre tG
WHERE NOT EXISTS (
        SELECT 
        FROM tbl_filter
        WHERE LOWER(species) = LOWER(tG.genre)
            AND genus = 'genre'
    )
GROUP BY genre
ORDER BY 
    genre ASC

--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--  Genre       NOT EXIST 
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~
;


--  .sql Script from CMD
--===============================
--  psql -U ohnodamn -d db_nds -a -f <file_path>
--  psql -U ohnodamn -d db_nds -a -f C:\Programming\Gates_Kennedy\GK_Needle_Drop\nds_db\scripts\0_utils\Mgmt-Lib_queries.sql
