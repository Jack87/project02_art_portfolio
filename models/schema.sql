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


INSERT INTO Artwork (title, description, dateCreated, imgURL, category, price, size, medium, artist, onCarousel) 
values 
('Kurt Cobain', 'Kurt Cobain Nirvana vocalist.', '2018-08-23', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/nirvana.jpg?alt=media&token=d2309f06-ff2d-48d7-aa4f-ee95075aec4a', 'Music', 70.00, '1363px x 905px', 'Digital', 'CJ Frei', 1),
("Woman in Red Swimming", "Woman in red", "2017-07-07", "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/women_in_red_swimming.jpg?alt=media&token=b5157b96-d52f-4269-a144-1071628cb7d8", "Women", 70.00, "1500 x 600", "Digital", "CJ Frei", 1),
('Bruce Lee', 'Bruce Lee, Martial Artist', '2017-08-17', "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/bruce_lee.jpg?alt=media&token=c798f530-cad3-4ad4-b9b1-93e6157bc58b","Martial Arts", 70.00, '1363px x 905px', 'Digital', 'CJ Frei', 1 ),
("Hell Fairy", "Hell Fairy", "2015-07-09", "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/hell_fairy.jpg?alt=media&token=cf63cbec-1982-490e-b1d8-6172f36cd423", "Magical Creatures", 70.00, "1050 x 900px", "Digital", "CJ Frei", 1),
('Adam West', 'Adam West revealing Batman logo on chest.', '2017-02-10', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/adam_west_batman.jpg?alt=media&token=6fa6ee9e-3d07-4165-853e-fb4b1b2ccccb', 'Batman', 70.00, '1609px x 2048px', 'Digital', 'CJ Frei', 0),
('Campfire', 'Campfire', '2018-09-15', "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/camp_fire.jpg?alt=media&token=a0e3ba49-94b2-41a4-bffb-071fe119b464", "Nature", 70.00, "1363px x 900px", "Digital","CJ Frei",0),
("The Turtles", "Ninja Turtles", "2017-07-25", "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/the_tutles.jpg?alt=media&token=b3ba1ef0-4032-4198-95d8-c6d78e6dfba6","TV Shows", 70.00, "1300px x 900px", "Digital", "CJ Frei", 1)
("Friends", "Friends, TV Show", "2004-06-09", "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/friends.jpg?alt=media&token=5083ab93-49cc-488d-9477-9cfec39e5e46", "TV Shows", 70.00, "1350 x 950", "Digital","CJ Frei", 0),
('Batman from the Ages', 'A series of all the different live action Batmans through the years.', '2017-02-10', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/allBatmanLive.jpg?alt=media&token=25424a2c-8895-41ef-a76d-86ffa0fa178d', 'Batman', 70.00, '1302px x 919px', 'Digital', 'CJ Frei', 0),
('Batman w/ Joker Batterang', 'Batman holding a batterrang with Jokers name on it.', '2017-02-10', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/batman_joker_card.jpg?alt=media&token=bdb6aef9-6c67-4a40-a0e0-2122c059cc9b', 'Batman', 70.00, '1363px x 908px', 'Digital', 'CJ Frei', 0),
('Joker holding Batman card', 'Joker holding card with Batman image on it.', '2017-02-10', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/joker_batman_card.jpg?alt=media&token=5dc4e023-6757-4d2f-8372-65b2d3c174f2', 'Batman', 70.00, '1363px x 908px', 'Digital', 'CJ Frei', 0),
("Chester Bennington", "Chester Bennington, Vocalist for Linkin Park", "2018-01-09", "https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/chester_bennington_tribute.jpg?alt=media&token=de7685f6-0dab-4b83-99fe-15c42f6d3e90", "Music", 70,00, "1365px x 950px", "Digital", "CJ Frei", 0),
('Joker Depictions', 'Various depictions of the Joker.', '2016-05-18', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/jokers.jpg?alt=media&token=0f6a32f3-132e-4b2d-b7a1-72833f73b627', 'Batman', 70.00, '1363px x 851px', 'Digital', 'CJ Frei', 0),
('Raphael Depictions', 'Depictions of Raphael.', '2018-08-23', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/raphael_all.jpg?alt=media&token=266bae46-14a4-4838-9506-f40599db1bae', 'Ninja Turtles', 70.00, '619px x 930px', 'Digital', 'CJ Frei', 0),
('Robin Williams Tribute', 'Tribute to Robin Williams and the roles he played in films.', '2017-10-23', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/robin_williams_tribute.jpg?alt=media&token=42dd26e5-bf15-4eca-9ab6-504713148704', 'Actors', 70.00, '1162px x 930px', 'Digital', 'CJ Frei', 0)

-- UPDATE `portfolio_db`.`artwork` SET `imgURL` = 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/robin_williams_tribute.jpg?alt=media&token=42dd26e5-bf15-4eca-9ab6-504713148704' WHERE (`id` = '8');



INSERT INTO CommissionRequests (name, requestDetails, referenceImgURL, phone, email, medium, artist)
values ('Andy Marshall', 'Johnny Cash Portrait', 'http://www.gstatic.com/tv/thumb/persons/78737/78737_v9_bb.jpg', '555-5555', 'genericemail@gmail.com', 'digital', 'CJ Frei'),
('Akop Karapetyan', 'Photorealistic drawing of my motorcycle', 'https://firebasestorage.googleapis.com/v0/b/art-portfolio-project02.appspot.com/o/DirtyStreetTriple.jpg?alt=media&token=e0bd4a34-6bd2-4cb8-90bb-cb29e057106e', '555-7777', 'genericemail@gmail.com', 'digital', 'CJ Frei');

