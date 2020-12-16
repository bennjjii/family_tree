CREATE TABLE marriage_events
(
 UUID_marriage     uuid NOT NULL,
 date_of_marriage  date NOT NULL,
 male              uuid NOT NULL,
 female            uuid NOT NULL,
 place_of_marriage varchar(50) NULL,
 createdAt         date NOT NULL,
 updatedAt         date NOT NULL,
 UUID_family       uuid NOT NULL,
 CONSTRAINT PK_marriage_events PRIMARY KEY ( UUID_marriage ),
 CONSTRAINT FK_109 FOREIGN KEY ( UUID_family ) REFERENCES family ( UUID_family ),
 CONSTRAINT FK_55 FOREIGN KEY ( male ) REFERENCES family_members ( UUID ),
 CONSTRAINT FK_58 FOREIGN KEY ( female ) REFERENCES family_members ( UUID )
);

CREATE INDEX fkIdx_109 ON marriage_events
(
 UUID_family
);

CREATE INDEX fkIdx_55 ON marriage_events
(
 male
);

CREATE INDEX fkIdx_58 ON marriage_events
(
 female
);