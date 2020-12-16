CREATE TABLE family
(
 UUID_family uuid NOT NULL,
 family_name varchar(50) NOT NULL,
 createdAt   date NOT NULL,
 updatedAt   date NOT NULL,
 CONSTRAINT PK_user_family PRIMARY KEY ( UUID_family )
);