CREATE TABLE birth_events
(
 UUID_birth  uuid NOT NULL,
 d_o_b       date NOT NULL,
 mother      uuid NOT NULL,
 father      uuid NOT NULL,
 child       uuid NOT NULL,
 createdAt   date NOT NULL,
 updatedAt   date NOT NULL,
 UUID_family uuid NOT NULL,
 CONSTRAINT PK_births PRIMARY KEY ( UUID_birth ),
 CONSTRAINT FK_112 FOREIGN KEY ( UUID_family ) REFERENCES family ( UUID_family ),
 CONSTRAINT FK_74 FOREIGN KEY ( mother ) REFERENCES family_members ( UUID ),
 CONSTRAINT FK_77 FOREIGN KEY ( father ) REFERENCES family_members ( UUID ),
 CONSTRAINT FK_80 FOREIGN KEY ( child ) REFERENCES family_members ( UUID )
);

CREATE INDEX fkIdx_112 ON birth_events
(
 UUID_family
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