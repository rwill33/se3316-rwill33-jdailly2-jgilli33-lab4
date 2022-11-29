USE lab43316;

DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS PlaylistTracks;
DROP TABLE IF EXISTS UserPlaylists;

CREATE TABLE UserPlaylists (
	playlistId int NOT NULL auto_increment PRIMARY KEY,
	uid varchar(30) NOT NULL,
	playlistName varchar(50) NOT NULL,
    description varchar(1000) DEFAULT NULL,
    isPublic boolean DEFAULT FALSE,
	modifiedDate datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	UNIQUE(uid, playlistName)
);

CREATE TABLE PlaylistTracks (
	playlistId int NOT NULL,
    trackId int NOT NULL,
    PRIMARY KEY(playlistId, trackId),
    FOREIGN KEY (playlistId) REFERENCES UserPlaylists(playlistId) ON DELETE CASCADE,
    FOREIGN KEY (trackId) REFERENCES Tracks(trackId) ON DELETE CASCADE
);

CREATE TABLE Reviews (
	reviewId int NOT NULL auto_increment PRIMARY KEY,
    uid varchar(30) NOT NULL,
	username varchar(5000) NOT NULL,
    playlistId int NOT NULL,
    review varchar (5000) NOT NULL,
    rating int NOT NULL,
    createdAtDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isHidden boolean NOT NULL DEFAULT false,
    FOREIGN KEY (playlistId) REFERENCES UserPlaylists(playlistId) ON DELETE CASCADE
);
