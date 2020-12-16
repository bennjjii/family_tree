CREATE TABLE users
(
 UUID_user       uuid NOT NULL,
 username        varchar(50) NOT NULL,
 email           varchar(50) NOT NULL,
 hashed_password varchar(50) NOT NULL,
 UUID_family     uuid NOT NULL,
 super_user      boolean NOT NULL,
 CONSTRAINT PK_users PRIMARY KEY ( UUID_user ),
 CONSTRAINT FK_101 FOREIGN KEY ( UUID_family ) REFERENCES family ( UUID_family )
);

CREATE INDEX fkIdx_101 ON users
(
 UUID_family
);