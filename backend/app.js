const express = require("express");
const mysql = require('mysql');
const fs = require("fs");
const cors = require('cors')

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

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));

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
    connection.query(`SELECT * FROM PlaylistTracks WHERE playlistId=${req.params.id}`, (err, rows, fields) => {
      if (err) {
        res.status(500).send(`Error querying Playlist Tracks`)
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
    // const playlist = await storage.getItem(req.params.name.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    // const index = playlist.indexOf(req.body.track_id.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    // playlist.splice(index, 1);
    // if (index > -1) {
    //   await storage.updateItem(req.params.name.replace(/</g, "&lt;").replace(/>/g, "&gt;"), playlist);
    // }
    // res.send(await storage.getItem(req.params.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")));
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
    connection.query(`INSERT INTO UserPlaylists (uid, playlistName) VALUES ('iUMOeYpLWsb8mvoxqYtWJLHPabE2', '${req.body.name}')`, (err, rows, fields) => {
      if (err) {
        if (err.errno === 1062) {
          res.status(500).send(`Playlist with that name already exists.`);
        } else {
          res.status(500).send(`Error Inserting.`);
        }
      } else {
        console.log("Inserted");
        connection.query(`SELECT * FROM UserPlaylists WHERE uid='iUMOeYpLWsb8mvoxqYtWJLHPabE2'`, (err, rows, fields) => {
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
    // const body = req.body;
    // const playlist = await storage.getItem(body.playlistName.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    // const track = await dataReader.getTrackById(body.track_id.replace(/</g, "&lt;").replace(/>/g, "&gt;"));

    // if(playlist && track && playlist.indexOf(body.track_id.replace(/</g, "&lt;").replace(/>/g, "&gt;")) < 0) {
    //   await storage.updateItem(body.playlistName.replace(/</g, "&lt;").replace(/>/g, "&gt;"), [...playlist, body.track_id.replace(/</g, "&lt;").replace(/>/g, "&gt;")]);
    //   res.send(track);
    // } else {
    //   res.status(404).send();
    // }
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