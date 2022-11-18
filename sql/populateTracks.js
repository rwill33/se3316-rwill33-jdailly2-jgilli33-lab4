var mysql = require('mysql');
const fs = require("fs");
const csv = require("csv-parser");

const config = JSON.parse(fs.readFileSync('sqlconfig.json'));
const con = mysql.createConnection(config);

function dataReader(fileName) {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(fileName).pipe(csv({}))
    .on('error', error => {
      reject(error);
    })
    .on('data', (data) => {
      if (results.length < 1000) {
        results.push(data)
      }})  
    .on('end', () => {
      resolve(results);
    })
  })
}

async function insertTracks() {
  tracks = await dataReader('raw_tracks.csv');
  return new Promise((resolve, reject) => {
    con.connect(async function(err) {
      if (err) throw err;
      console.log("Connected!");
      Promise.allSettled(tracks.map((track) => {
        return new Promise((resolve, reject) => {
          var sql = `INSERT INTO Tracks (trackId, trackTitle, artistId, artistName, albumId, albumTitle, trackDuration, trackGenres, tags, trackDateCreated, trackDateRecorded) VALUES ("${track.track_id}", "${track.track_title}", "${track.artist_id}", "${track.artist_name}", "${track.album_id ? track.album_id : NULL}", "${track.album_title}", "${track.track_duration}", "${track.track_genres}", "${track.tags}", "${track.track_date_created}", "${track.track_date_recorded}")`;
          con.query(sql, function (err, result) {
            if (err){
              console.log(err);
              reject();
            } else {
              console.log("1 record inserted");
              resolve();
            }
          })
        })
      }))
      .then(resolve)
    });
  })
};


insertTracks()
.then(() => console.log("Done"))
.finally(() => process.exit(0))