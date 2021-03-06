DROP DATABASE DBTEST;
CREATE DATABASE DBTEST;
USE DBTEST;

CREATE TABLE PLAYERS(
    PLAYER_ID INT NOT NULL AUTO_INCREMENT,
    PLAYER_PW VARCHAR(64) NOT NULL,
    PLAYER_NAME VARCHAR(20) NOT NULL,
    PLAYER_EMAIL VARCHAR(64) NOT NULL,
    PRIMARY KEY (PLAYER_ID)
);
ALTER TABLE PLAYERS AUTO_INCREMENT=1000000;

CREATE TABLE ITEMS(
    ITEM_ID INT NOT NULL,
    ITEM_NAME VARCHAR(20) NOT NULL,
    ITEM_VALUE INT NOT NULL,
    PRIMARY KEY (ITEM_ID)
);


CREATE TABLE CHARACTERS(
    CHAR_ID INT NOT NULL,
    PLAYER_ID INT,
    CHAR_NAME VARCHAR(12) NOT NULL,
    CHAR_HP INT NOT NULL DEFAULT 100,
    CHAR_CUR_HP INT NOT NULL DEFAULT 100,
    CHAR_MP INT NOT NULL DEFAULT 10,
    CHAR_CUR_MP INT NOT NULL DEFAULT 10,
    CHAR_ATK INT NOT NULL DEFAULT 20,
    CHAR_DEF INT NOT NULL DEFAULT 5,
    CHAR_LV INT NOT NULL DEFAULT 1,
    CHAR_CUR_EXP INT NOT NULL DEFAULT 0,
    CHAR_EXP INT NOT NULL DEFAULT 10,
    CHAR_MONEY INT NOT NULL DEFAULT 0,
    PRIMARY KEY (CHAR_ID),
    FOREIGN KEY (PLAYER_ID) REFERENCES PLAYERS(PLAYER_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE INVENTORY(
    CHAR_ID INT NOT NULL,
    ITEM_ID INT NOT NULL,
    ITEM_NAME VARCHAR(20) NOT NULL,
    ITEM_QTY INT NOT NULL,
    FOREIGN KEY (ITEM_ID) REFERENCES ITEMS(ITEM_ID),
    FOREIGN KEY (CHAR_ID) REFERENCES CHARACTERS(CHAR_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT CHAR_ITEM PRIMARY KEY (CHAR_ID, ITEM_ID)
);

CREATE TABLE MOBS(
    MOB_ID INT NOT NULL,
    MOB_NAME VARCHAR(20) NOT NULL,
    MOB_HP INT NOT NULL,
    MOB_ATK INT NOT NULL,
    MOB_DEF INT NOT NULL,
    MOB_EXP INT NOT NULL,
    ITEM_ID INT NOT NULL,
    DROP_RATE INT NOT NULL,
    PRIMARY KEY (MOB_ID),
    FOREIGN KEY (ITEM_ID) REFERENCES ITEMS(ITEM_ID)
);

-- CREATE TABLE SKILLS(
--     SKILL_ID INT NOT NULL,
--     SKILL_NAME VARCHAR(30) NOT NULL,
--     REQ_LV INT NOT NULL,
--     COST_MP INT NOT NULL,
--     PRIMARY KEY (SKILL_ID)
-- );

