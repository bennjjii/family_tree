CREATE TABLE death_event
(
 UUID_birth    uuid NOT NULL,
 date_of_death date NOT NULL,
 person        uuid NOT NULL,
 createdAt     date NOT NULL,
 updatedAt     date NOT NULL,
 UUID_family   uuid NOT NULL,
 CONSTRAINT PK_births_clone PRIMARY KEY ( UUID_birth ),
 CONSTRAINT FK_115 FOREIGN KEY ( UUID_family ) REFERENCES family ( UUID_family ),
 CONSTRAINT FK_80_clone FOREIGN KEY ( person ) REFERENCES family_members ( UUID )
);

CREATE INDEX fkIdx_115 ON death_event
(
 UUID_family
);

CREATE INDEX fkIdx_80_clone ON death_event
(
 person
);