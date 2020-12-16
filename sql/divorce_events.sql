CREATE TABLE divorce_events
(
 UUID_divorce      uuid NOT NULL,
 date_of_divorce   date NOT NULL,
 male              uuid NOT NULL,
 female            uuid NOT NULL,
 place_of_marriage varchar(50) NULL,
 createdAt         date NOT NULL,
 updatedAt         date NOT NULL,
 UUID_family       uuid NOT NULL,
 CONSTRAINT PK_marriage_events_clone PRIMARY KEY ( UUID_divorce ),
 CONSTRAINT FK_106 FOREIGN KEY ( UUID_family ) REFERENCES family ( UUID_family ),
 CONSTRAINT FK_55_clone FOREIGN KEY ( male ) REFERENCES family_members ( UUID ),
 CONSTRAINT FK_58_clone FOREIGN KEY ( female ) REFERENCES family_members ( UUID )
);

CREATE INDEX fkIdx_106 ON divorce_events
(
 UUID_family
);

CREATE INDEX fkIdx_55_clone ON divorce_events
(
 male
);

CREATE INDEX fkIdx_58_clone ON divorce_events
(
 female
);