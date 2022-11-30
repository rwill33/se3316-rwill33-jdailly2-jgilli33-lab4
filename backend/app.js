const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const cors = require('cors');
const { time } = require("console");

const config = JSON.parse(fs.readFileSync('../sql/sqlconfig.json'));
const connection = mysql.createConnection(config);

const router = express.Router();
const app = express();


const port = process.env.PORT || 3000;

// Parse data in body as JSON
router.use(express.json());

// Setup middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})


const admin = require("firebase-admin");
const auth = require('firebase-admin/auth');
const fb = require('firebase/app');
const realtime = require('firebase/database')
const fbapp = fb.initializeApp({
  apiKey: "AIzaSyCTLGFrqn1NOrtUQMN7WITJBSve7vrj7VQ",
  authDomain: "rwill33-lab4.firebaseapp.com",
  projectId: "rwill33-lab4",
  storageBucket: "rwill33-lab4.appspot.com",
  messagingSenderId: "724042200276",
  appId: "1:724042200276:web:f0315b5a4fb13260cc3741",
  measurementId: "G-J6E5PBL3P9"
})

const db = realtime.getDatabase(fbapp);

var serviceAccount = require("./rwill33-lab4-firebase-adminsdk-sumr7-9360b82130.json");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rwill33-lab4-default-rtdb.firebaseio.com"
});


var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));



router.route('/updateUser').post((req, res) => {
  auth.getAuth().updateUser(req.body.uid, {
    disabled: req.body.disabled,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
    realtime.update(realtime.ref(db, 'users/' + req.body.uid), {
      isDisabled: req.body.disabled
    });
    res.send(userRecord);
  })
  .catch((error) => {
    console.log('Error updating user:', error);
    res.status(500).send("Error updating user");
  });
})

// Get genre names, IDs and parent IDs.
router.route('/genres')
  .get(async (req, res) => {
          connection.query('SELECT * FROM Genres', (err, rows, fields) => {
            if (err) {
              res.status(500).send(`Error querying genres`)
            } else {
              const genres = [];
              rows.map((genre) => {
                genres.push({
                  name: genre.title,
                  id: genre.genreId,
                  parentId: genre.parentId
              })})
              res.send(genres);
            }
          })
    }
  )
 



  router.route('/tracks/:name')
  .get(async (req, res) => {
    const name = req.params.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");






    console.log("here")
    name2 = name.split(',')

   // var matches = stringSimilarity.
   // console.log(matches)


    console.log(name[1])
    for(let i =0; i<name2.length;i++){
      
    name2[i] = '%'+name2[i]+'%';
    if(name2[i]=== "%%"){
     name2[i]=null;
    }
      
    console.log(name2[i]);
    }
console.log(name2);

    const query = "SELECT * FROM tracks WHERE (artistName LIKE ? or ? IS NULL) AND (trackTitle LIKE ? or ? IS NULL) AND (trackGenres LIKE ? or ? IS NULL);";
 
    
    // 
 
    let genreTitle;
    let genreTitles = [];
    let title;

          connection.query(query,[name2[0],name2[0],name2[1],name2[1],name2[2],name2[2]], (err, rows, fields) => {
            if (err) {
              res.status(500).send(`Error querying genres`)
            } else {
              console.log("made it");
              const tracks = [];
              rows.map((track) => {
                genreTitle = track.trackGenres.split('}, {')
                for(let i in genreTitle){
                    if(genreTitle[i] != ''){
                      title = genreTitle[i].split(`title': '`)[1]
                      title = title.split(`', 'genre_url':`)[0]
                      genreTitles.push(title)
                    }
                }
                genreTitle = ''
                for( let i in genreTitles){
                  genreTitle += genreTitles[i]
                  if(i<genreTitles.length-1){
                    genreTitle += ', '
                  }
                }
                genreTitles = []
                tracks.push({
                  id: track.trackId,
                  name: track.artistName,
                  title: track.trackTitle,
                  genre: genreTitle,
                  time: track.trackDuration,
                  year: track.trackDateCreated
          
              })})
              console.log(tracks.name)



              res.send(tracks);
            }
          })
    }
  )

    

      
    

// Get the artist details (at least 6 key attributes) given  an artist ID.
router.route('/artists/:id')
  .get(async (req, res) => {
    // const id = req.params.id.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // const artist = await dataReader.getArtistById(id);
    // if (artist) {
    //   res.send(artist);
    // } else {
    //   res.status(404).send(`Artist with id=${id} was not found.`)
    // }
  })

// Get the following details for a given track ID: album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title
router.route('/tracks/:id')
  .get(async (req, res) => {
    // const id = req.params.id.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // const track = await dataReader.getTrackById(id);
    // if (track) {
    //   res.send(track);
    // } else {
    //   res.status(404).send(`Track with id=${id} was not found.`)
    // }
  })

// Get the first n number of matching track IDs for a given search pattern matching the track title or album. If the number of matches is less than n, then return all matches. Please feel free to pick a suitable value for n.
router.route('/tracks')
  .get(async (req, res) => {
    // const search = req.query.search.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // const tracks = await dataReader.getTracksByTitleOrAlbum(search, 10);
    // res.send(tracks);
  })
// Get all the matching artist IDs for a given search pattern matching the artist's name.
router.route('/artists')
  .get(async (req, res) => {
    // const search = req.query.search.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // const artists = await dataReader.getArtistsByName(search);
    // res.send(artists);
  })

router.route('/playlists/tracks/:id')
  // Get all tracks in a playlist
  .get(async (req, res) => {
    connection.query(`SELECT t.* FROM PlaylistTracks pt JOIN Tracks t WHERE pt.trackId = t.trackId AND playlistId=${req.params.id}`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error querying Playlist Tracks`)
      } else {
        res.send(rows);
      }
    })
  })
  .put((req, res) => {
    connection.query(`INSERT INTO PlaylistTracks(playlistId, trackId) VALUES(${req.params.id}, ${req.body.trackId});`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Inserting Playlist Track.`)
      } else {
        res.send(rows);
      }
    })
  })
  .delete((req, res) => {
    connection.query(`DELETE FROM PlaylistTracks WHERE playlistId=${req.params.id} AND trackId=${req.body.trackId};`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error deleting track from playlist.`)
      } else {
        res.send(rows);
      }
    })
  })

router.route('/playlists/:id')
  // Get all tracks in a playlist
  .get(async (req, res) => {
    connection.query(`SELECT * FROM UserPlaylists WHERE playlistId=${req.params.id}`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error querying playlist details`)
      } else {
        res.send(rows[0]);
      }
    })
  })
  // Delete track from playlist
  .delete(async (req, res) => {
    connection.query(`DELETE FROM UserPlaylists WHERE playlistId=${req.params.id}`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error deleting playlist details`)
      } else {
        res.send(rows[0]);
      }
    })
  })

  router.route('/comment')
  .post((req, res) => {
    console.log(req.body.isHidden);
    connection.query(`UPDATE Reviews SET isHidden=${req.body.isHidden} WHERE reviewId='${req.body.reviewId}'`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Getting Comments.`);
      } else {
        res.send(rows);
      }
    });
  })

router.route('/publicComments/:id')
.get((req, res) => {
  connection.query(`SELECT * FROM Reviews WHERE playlistId='${req.params.id}' AND isHidden='false'`, (err, rows, fields) => {
    if (err) {
      res.status(500).send(`Error Getting Comments.`);
    } else {
      res.send(rows);
    }
  });
})

router.route('/comment/:id')
.get((req, res) => {
  connection.query(`SELECT * FROM Reviews WHERE playlistId='${req.params.id}'`, (err, rows, fields) => {
    if (err) {
      res.status(500).send(`Error Getting Comments.`);
    } else {
      res.send(rows);
    }
  });
})
.put((req, res) => {
  console.log(req.body);
  connection.query(`INSERT INTO Reviews(uid, username, playlistId, review, rating) VALUES('${req.body.uid}', '${req.body.username}', ${req.body.playlistId}, '${req.body.review}', ${req.body.rating});`, (err, rows, fields) => {
    if (err) {
      res.status(500).send(`Error Inserting Comment.`);
    } else {
      res.send(rows);
    }
  });

})


router.route('/publicPlaylists')
  .get((req, res) => {
    connection.query(`SELECT * FROM UserPlaylists WHERE isPublic=true`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Selecting Playlists.`);
      } else {
        res.send(rows);
      }
    });
  })

router.route('/playlists')
  // Get all playlists
  .get(async (req, res) => {
    connection.query(`SELECT * FROM UserPlaylists WHERE uid='iUMOeYpLWsb8mvoxqYtWJLHPabE2'`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Selecting Playlists.`);
      } else {
        res.send(rows);
      }
    });
  })
  // Create New Playlist
  .put(async (req, res) => {
    let query;
    if (req.body.description === "") {
      query = `INSERT INTO UserPlaylists (uid, playlistName) VALUES ('${req.body.uid}', '${req.body.name}')`;
    } else {
      query = `INSERT INTO UserPlaylists (uid, playlistName, description) VALUES ('${req.body.uid}', '${req.body.name}', '${req.body.description}')`;
    }
    connection.query(query, (err, rows, fields) => {
      if (err) {
        if (err.errno === 1062) {
          res.status(500).send(`Playlist with that name already exists.`);
        } else {
          res.status(500).send(`Error Inserting.`);
        }
      } else {
        console.log("Inserted");
        connection.query(`SELECT * FROM UserPlaylists WHERE uid='${req.body.uid}'`, (err, rows, fields) => {
          if (err) {
            res.status(500).send(`Error Selecting Playlists.`);
          } else {
            res.send(rows);
          }
        })
      }
    });
  })
  // Add to playlist
  .post(async (req, res) => {
    console.log(req.body);
    if(req.body.description && req.body.name){
      connection.query(`UPDATE UserPlaylists SET playlistName='${req.body.name}', description='${req.body.description}' WHERE playlistId=${req.body.playlistId}`, (err, rows, fields) => {
        if (err) {
          res.status(500).send(`Error Updating Playlist.`);
        } else {
          res.send(rows);
        }
      });
    } else if(req.body.name) {
      connection.query(`UPDATE UserPlaylists SET playlistName='${req.body.name}', description=null WHERE playlistId=${req.body.playlistId}`, (err, rows, fields) => {
        if (err) {
          res.status(500).send(`Error Updating Playlist.`);
        } else {
          res.send(rows);
        }
      });
    } else {
      connection.query(`UPDATE UserPlaylists SET isPublic=${req.body.isPublic} WHERE playlistId='${req.body.playlistId}'`, (err, rows, fields) => {
        if (err) {
          res.status(500).send(`Error Updating Playlist.`);
        } else {
          res.send(rows);
        }
      });
    }
  })
  // Delete Playlist
  .delete(async (req, res) => {
    // const playlist = req.body.playlistName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    // if (await storage.get(playlist)) {
    //   await storage.removeItem(playlist);
    //   res.send(await storage.data());
    // } else {
    //   res.status(404).send(`Playlist with name=${playlist}`)
    // }
  })

app.use('/api', router);
app.listen(port, () => console.log(`Listening on port ${port}...`));