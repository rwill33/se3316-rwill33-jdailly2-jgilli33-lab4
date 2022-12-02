USE lab43316;
DROP TABLE IF EXISTS Disputes;
DROP TABLE IF EXISTS Policys;


CREATE TABLE Disputes (
	reviewId int NOT NULL PRIMARY KEY,
	dateRequest varchar(5000) NOT NULL,
	dateNotice datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dateDispute varchar (5000) NOT NULL,
    FOREIGN KEY (reviewId) REFERENCES Reviews(reviewId) ON DELETE CASCADE
);

CREATE TABLE Policys (
	policysId int NOT NULL auto_increment PRIMARY KEY,
	policyDoc mediumtext NOT NULL

);