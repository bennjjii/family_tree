CREATE TABLE family_members
(
 UUID        uuid NOT NULL,
 first_name  varchar(50) NOT NULL,
 middle_name varchar(50) NULL,
 last_name   varchar(50) NOT NULL,
 photo       varchar(200) NULL,
 notes       varchar(500) NULL,
 createdAt   date NOT NULL,
 updatedAt   date NOT NULL,
 UUID_family uuid NOT NULL,
 gender      varchar(10) NOT NULL,
 CONSTRAINT PK_individuals PRIMARY KEY ( UUID ),
 CONSTRAINT FK_33 FOREIGN KEY ( UUID_family ) REFERENCES family ( UUID_family )
);

CREATE INDEX fkIdx_33 ON family_members
(
 UUID_family
);