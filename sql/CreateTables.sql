CREATE DATABASE IF NOT EXISTS lab43316;

USE lab43316;

DROP TABLE IF EXISTS `Genres`;
DROP TABLE IF EXISTS `Albums`;
DROP TABLE IF EXISTS `Artists`;
DROP TABLE IF EXISTS `Tracks`;

CREATE TABLE `Genres` (
  `genreId` int NOT NULL,
  `parentId` int NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`genreId`),
  UNIQUE KEY `genreId_UNIQUE` (`genreId`)
);


CREATE TABLE `Albums` (
  `albumId` int NOT NULL,
  `albumDateCreated` varchar(500) DEFAULT NULL,
  `albumHandle` varchar(500) DEFAULT NULL,
  `albumTitle` varchar(1000) DEFAULT NULL,
  `albumType` varchar(1000) DEFAULT NULL,
  `artistName` varchar(1000) DEFAULT NULL,
  `tags` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`albumId`),
  UNIQUE KEY `albumId_UNIQUE` (`albumId`)
);


CREATE TABLE `Artists` (
  `artistId` int NOT NULL,
  `artistName` varchar(500) DEFAULT NULL,
  `artistBio` varchar(1000) DEFAULT NULL,
  `artistContact` varchar(500) DEFAULT NULL,
  `artistActiveYearBegin` varchar(500) DEFAULT NULL,
  `artistLocation` varchar(500) DEFAULT NULL,
  `tags` varchar(500) DEFAULT NULL,
  `artistHandle` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`artistId`),
  UNIQUE KEY `artistId_UNIQUE` (`artistId`)
);

CREATE TABLE `Tracks` (
  `trackId` int NOT NULL,
  `trackTitle` varchar(500) DEFAULT NULL,
  `artistId` int DEFAULT NULL,
  `artistName` varchar(500) DEFAULT NULL,
  `albumId` int DEFAULT NULL,
  `albumTitle` varchar(500) DEFAULT NULL,
  `trackDuration` varchar(10) DEFAULT NULL,
  `trackGenres` varchar(500) DEFAULT NULL,
  `tags` varchar(500) DEFAULT NULL,
  `trackDateCreated` varchar(500) DEFAULT NULL,
  `trackDateRecorded` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`trackId`),
  UNIQUE KEY `trackId_UNIQUE` (`trackId`)
);



