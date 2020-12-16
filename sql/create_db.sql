-- ***************************************************;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;




-- ************************************** family_accounts

CREATE TABLE family_accounts
(
 UUID_family_account uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 family_name         varchar(50) NOT NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 CONSTRAINT PK_user_family PRIMARY KEY ( UUID_family_account )
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON family_accounts
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End family_accounts


 
 -- ************************************** users

CREATE TABLE users
(
 UUID_user           uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 username            varchar(50) NOT NULL,
 email               varchar(50) NOT NULL,
 hashed_password     varchar(50) NOT NULL,
 UUID_family_account uuid NOT NULL,
 super_user          boolean NOT NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 CONSTRAINT PK_users PRIMARY KEY ( UUID_user ),
 CONSTRAINT FK_101 FOREIGN KEY ( UUID_family_account ) REFERENCES family_accounts ( UUID_family_account )
);

CREATE INDEX fkIdx_101 ON users
(
 UUID_family_account
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End users



-- ************************************** family_members

CREATE TABLE family_members
(
 UUID_family_member  uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 first_name          varchar(50) NOT NULL,
 middle_name         varchar(50) NULL,
 last_name           varchar(50) NOT NULL,
 photo               varchar(200) NULL,
 notes               varchar(500) NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 UUID_family_account uuid NOT NULL,
 gender              varchar(10) NOT NULL,
 CONSTRAINT PK_individuals PRIMARY KEY ( UUID_family_member ),
 CONSTRAINT FK_33 FOREIGN KEY ( UUID_family_account ) REFERENCES family_accounts ( UUID_family_account )
);

CREATE INDEX fkIdx_33 ON family_members
(
 UUID_family_account
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON family_members
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End family_members





-- ************************************** birth_events

CREATE TABLE birth_events
(
 UUID_birth          uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 d_o_b               date NOT NULL,
 mother              uuid NOT NULL,
 father              uuid NOT NULL,
 child               uuid NOT NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 UUID_family_account uuid NOT NULL,
 CONSTRAINT PK_births PRIMARY KEY ( UUID_birth ),
 CONSTRAINT FK_112 FOREIGN KEY ( UUID_family_account ) REFERENCES family_accounts ( UUID_family_account ),
 CONSTRAINT FK_74 FOREIGN KEY ( mother ) REFERENCES family_members ( UUID_family_member ),
 CONSTRAINT FK_77 FOREIGN KEY ( father ) REFERENCES family_members ( UUID_family_member ),
 CONSTRAINT FK_80 FOREIGN KEY ( child ) REFERENCES family_members ( UUID_family_member )
);

CREATE INDEX fkIdx_112 ON birth_events
(
 UUID_family_account
);

CREATE INDEX fkIdx_74 ON birth_events
(
 mother
);

CREATE INDEX fkIdx_77 ON birth_events
(
 father
);

CREATE INDEX fkIdx_80 ON birth_events
(
 child
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON birth_events
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End birth_events





-- ************************************** marriage_events

CREATE TABLE marriage_events
(
 UUID_marriage       uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 date_of_marriage    date NOT NULL,
 male                uuid NOT NULL,
 female              uuid NOT NULL,
 place_of_marriage   varchar(50) NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 UUID_family_account uuid NOT NULL,
 CONSTRAINT PK_marriage_events PRIMARY KEY ( UUID_marriage ),
 CONSTRAINT FK_109 FOREIGN KEY ( UUID_family_account ) REFERENCES family_accounts ( UUID_family_account ),
 CONSTRAINT FK_55 FOREIGN KEY ( male ) REFERENCES family_members ( UUID_family_member ),
 CONSTRAINT FK_58 FOREIGN KEY ( female ) REFERENCES family_members ( UUID_family_member )
);

CREATE INDEX fkIdx_109 ON marriage_events
(
 UUID_family_account
);

CREATE INDEX fkIdx_55 ON marriage_events
(
 male
);

CREATE INDEX fkIdx_58 ON marriage_events
(
 female
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON marriage_events
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End marriage_events




-- ************************************** divorce_events

CREATE TABLE divorce_events
(
 UUID_divorce        uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 date_of_divorce     date NOT NULL,
 male                uuid NOT NULL,
 female              uuid NOT NULL,
 place_of_marriage   varchar(50) NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 UUID_family_account uuid NOT NULL,
 CONSTRAINT PK_marriage_events_clone PRIMARY KEY ( UUID_divorce ),
 CONSTRAINT FK_106 FOREIGN KEY ( UUID_family_account ) REFERENCES family_accounts ( UUID_family_account ),
 CONSTRAINT FK_55_clone FOREIGN KEY ( male ) REFERENCES family_members ( UUID_family_member ),
 CONSTRAINT FK_58_clone FOREIGN KEY ( female ) REFERENCES family_members ( UUID_family_member )
);

CREATE INDEX fkIdx_106 ON divorce_events
(
 UUID_family_account
);

CREATE INDEX fkIdx_55_clone ON divorce_events
(
 male
);

CREATE INDEX fkIdx_58_clone ON divorce_events
(
 female
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON divorce_events
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End divorce_events



-- ************************************** death_events

CREATE TABLE death_events
(
 UUID_birth          uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
 date_of_death       date NOT NULL,
 person              uuid NOT NULL,
 created_at          timestamp NOT NULL DEFAULT NOW(),
 updated_at          timestamp NOT NULL DEFAULT NOW(),
 UUID_family_account uuid NOT NULL,
 CONSTRAINT PK_births_clone PRIMARY KEY ( UUID_birth ),
 CONSTRAINT FK_115 FOREIGN KEY ( UUID_family_account ) REFERENCES family_accounts ( UUID_family_account ),
 CONSTRAINT FK_80_clone FOREIGN KEY ( person ) REFERENCES family_members ( UUID_family_member )
);

CREATE INDEX fkIdx_115 ON death_events
(
 UUID_family_account
);

CREATE INDEX fkIdx_80_clone ON death_events
(
 person
);

-- ************************************** PostScript

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON death_events
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- ************************************** PostScript End death_events