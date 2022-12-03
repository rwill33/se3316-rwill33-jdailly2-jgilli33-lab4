const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const cors = require('cors');
var https = require("https");

const config = JSON.parse(fs.readFileSync('../sql/sqlconfig.json'));
const connection = mysql.createConnection(config);

const router = express.Router();
const app = express();


const port = process.env.PORT || 3000;

// Parse data in body as JSON
router.use(express.json());

// Setup middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url} | ${req.hostname} | ${req.headers['x-forwarded-for']} | ${req.socket.remoteAddress}`);
  next();
})


const admin = require("firebase-admin");
const auth = require('firebase-admin/auth');
const fb = require('firebase/app');
const realtime = require('firebase/database')
const similarity = require('string-similarity')
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
  origin: 'https://ronin.software',
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
  router.route('/track/:id')
  .get((req, res) => {
    connection.query(`SELECT * FROM Tracks WHERE trackId=${req.params.id}`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error querying Track`)
      } else {
        res.send(rows);
      }
    })
  })

  router.route('/tracks/:name')
  .get(async (req, res) => {
    let name = req.params.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    name2 = name.split(',')
    name = name.split(',')
    for(let i in name){
      name[i] = name[i].toString()
    }

   // var matches = stringSimilarity.
   // console.log(matches)

    for(let i =0; i<name2.length;i++){
      
    name2[i] = '%'+name2[i]+'%';
    if(name2[i]=== "%%"){
     name2[i]=null;
    }
    }

    const query = "SELECT * FROM Tracks;";
    let genreTitle;
    let genreTitles = [];
    let title;

          connection.query(query, (err, rows, fields) => {
            if (err) {
              console.log(err);
              res.status(500).send(`Error querying genres`)
            } else {
              const tracks = [];
              rows.map((track) => {
                genreTitle = track.trackGenres.split('}, {')
                for(let i in genreTitle){
                    if(genreTitle[i]){
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
                
                if(checkIf(name[0], track.artistName, name[1], track.trackTitle, name[2], genreTitles[0])){
                  tracks.push({
                    id: track.trackId,
                    name: track.artistName,
                    title: track.trackTitle,
                    genre: genreTitle,
                    time: track.trackDuration,
                    year: track.trackDateCreated
          
              })}
              genreTitles = []
            })
              res.send(tracks);
            }
          })
    }
  )

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

router.route('/countTracks/:playlistId')
  .get((req, res) => {
    connection.query(`SELECT COUNT(pt.trackId) as count, SUM(trackDuration) as duration, AVG(rating) as rating FROM PlaylistTracks pt JOIN Tracks t ON pt.trackId=t.trackId LEFT OUTER JOIN Reviews r ON pt.playlistId=r.playlistId WHERE pt.playlistId=${req.params.playlistId}`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Counting Tracks.`);
      } else {
        res.send(rows[0]);
      }
    });
  })


router.route('/publicPlaylists')
  .get((req, res) => {
    connection.query(`SELECT * FROM UserPlaylists WHERE isPublic=true ORDER BY modifiedDate DESC`, (err, rows, fields) => {
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
    connection.query(`SELECT * FROM UserPlaylists WHERE uid='${req.query.uid}' ORDER BY modifiedDate DESC`, (err, rows, fields) => {
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

  router.route('/disputes')
  .put(async(req, res) => {
    console.log("here in disputes")
    console.log(req.body.reviewId);
    console.log(req.body.dateD);
    console.log(req.body.dateR);
    connection.query(`INSERT INTO disputes (reviewId,dateRequest,dateDispute) VALUES ('${req.body.reviewId}','${req.body.dateR}','${req.body.dateD}')`,(err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Getting disputes.`);
      } else {
        console.log("made it")
        res.send(rows);
      }
    });
  }).get(async (req, res) => {
    connection.query(`SELECT * FROM disputes`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Selecting disputes.`);
      } else {
        res.send(rows);
      }
    });
  })
  
  router.route('/policys')
  .post(async(req, res) => {
    console.log(req.body.pol);
      connection.query(`UPDATE policys SET policyDoc = '${req.body.pol}' WHERE policysId = '${req.body.id}'`,(err, rows, fields) => {
        if (err) {
          res.status(500).send(`Error Getting policys.`);
        } else {
          console.log("made it")
          res.send(rows);
        }
      });
    })

  router.route('/policys/:id')
  .get(async(req, res) => {
  console.log(req.params.id);
    connection.query(`SELECT * FROM policys WHERE policysId='${req.params.id}'`,(err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error Getting policys.`);
      } else {
        console.log("made it")
        res.send(rows);
      }
    });
  })


function checkIf(n1, n2, n3, n4, n5, n6){
  let bool = false;
  if (n1) n1 = n1.toString().toLowerCase()
  if (n2) n2 = n2.toString().toLowerCase()
  if (n3) n3 = n3.toString().toLowerCase()
  if (n4) n4 = n4.toString().toLowerCase()
  if (n5) n5 = n5.toString().toLowerCase()
  if (n6) n6 = n6.toString().toLowerCase()
  if (!n2) n2 = "NULL VALUE SHOULD NOT MATCH"
  if (!n4) n4 = "NULL VALUE SHOULD NOT MATCH"
  if (!n6) n6 = "NULL VALUE SHOULD NOT MATCH"
  if(n1 && !n3 && !n5){
    if(similarity.compareTwoStrings(n1, n2) > 0.5 || n2.includes(n1)){bool = true}
  }
  else if(!n1 && n3 && !n5){
    if(similarity.compareTwoStrings(n3, n4) > 0.5 || n4.includes(n3)){bool = true}
  }
  else if(!n1 && !n3 && n5){
    if(similarity.compareTwoStrings(n5, n6) > 0.5 || n6.includes(n5)){bool = true}
  }
  else if(n1 && n3 && !n5){
    if((similarity.compareTwoStrings(n1, n2) > 0.5 && similarity.compareTwoStrings(n3, n4) > 0.5) || 
    (n2.includes(n1) && n4.includes(n3)) || (similarity.compareTwoStrings(n1, n2) > 0.5 && n4.includes(n3)) ||
    (n2.includes(n1) && similarity.compareTwoStrings(n3, n4) > 0.5)){bool = true}
  }
  else if(n1 && !n3 && n5){
    if((similarity.compareTwoStrings(n1, n2) > 0.5 && similarity.compareTwoStrings(n5, n6) > 0.5) || 
    (n2.includes(n1) && n6.includes(n5)) || (similarity.compareTwoStrings(n1, n2) > 0.5 && n6.includes(n5)) ||
    (n2.includes(n1) && similarity.compareTwoStrings(n5, n6) > 0.5)){bool = true}
  }
  else if(!n1 && n3 && n5){
    if((similarity.compareTwoStrings(n3, n4) > 0.5 && similarity.compareTwoStrings(n5, n6) > 0.5) || 
    (n4.includes(n3) && n6.includes(n5)) || (similarity.compareTwoStrings(n3, n4) > 0.5 && n6.includes(n5)) ||
    (n4.includes(n3) && similarity.compareTwoStrings(n5, n6) > 0.5)){bool = true}
  }
  else if(n1 && n3 && n5){
    if((similarity.compareTwoStrings(n1, n2) > 0.5 && similarity.compareTwoStrings(n3, n4) > 0.5 && similarity.compareTwoStrings(n5, n6) > 0.5) ||
        (similarity.compareTwoStrings(n1, n2) > 0.5 && similarity.compareTwoStrings(n3, n4) > 0.5 && n6.includes(n5)) ||
        (similarity.compareTwoStrings(n1, n2) > 0.5 && n4.includes(n3) && similarity.compareTwoStrings(n5, n6) > 0.5) ||
        (n2.includes(n1) && similarity.compareTwoStrings(n3, n4) > 0.5 && similarity.compareTwoStrings(n5, n6) > 0.5) ||
        (n2.includes(n1) && n4.includes(n3) && similarity.compareTwoStrings(n5, n6) > 0.5) ||
        (n2.includes(n1) && n6.includes(n5) && similarity.compareTwoStrings(n3, n4) > 0.5) ||
        (n6.includes(n5) && n4.includes(n3) && similarity.compareTwoStrings(n1, n2) > 0.5) ||
        (n2.includes(n1) && n4.includes(n3) && n6.includes(n5))){
          bool = true;
        }
  }
  return bool;
}

app.use('/api', router);

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("certificate.pem"),
    },
    app
  )
  .listen(port, () => console.log(`Listening on port ${port}...`));