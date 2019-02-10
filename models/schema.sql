-- DROP DATABASE IF EXISTS portfolio_db;
-- CREATE DATABASE portfolio_db;

-- USE portfolio_db;

CREATE TABLE Artwork
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(160) NOT NULL,
	description varchar(255) NULL,
	dateCreated date NULL,
    imgURL varchar(255) NOT NULL,
	category varchar(160) NULL,
    price float(20,2) NULL,
    size varchar(50) NULL,
    medium varchar(50) NULL,
    artist varchar(50) NULL,
    onCarousel boolean NOT NULL DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE CommissionRequests
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(160) NOT NULL,
	requestDetails text NOT NULL,
    referenceImgURL varchar(255) NULL,
    phone varchar(20) NULL,
    email varchar(100) NOT NULL,
    medium varchar(50) NULL,
    artist varchar(50) NULL,
	PRIMARY KEY (id)
);
