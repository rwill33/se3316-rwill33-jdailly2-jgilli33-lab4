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

async function insertArtists() {
  artists = await dataReader('raw_artists.csv');
  return new Promise((resolve, reject) => {
    con.connect(async function(err) {
      if (err) throw err;
      console.log("Connected!");
      Promise.allSettled(artists.map((artist) => {
        return new Promise((resolve, reject) => {
          let sql = `INSERT INTO Artists (artistId, artistName, artistContact, artistActiveYearBegin, artistLocation, tags, artistHandle) VALUES ("${artist.artist_id}", "${artist.artist_name}", "${artist.artist_contact}", "${artist.artist_active_year_begin}", "${artist.artist_location}", "${artist.tags}", "${artist.artist_handle}")`;
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


insertArtists()
.then(() => console.log("Done"))
.finally(() => process.exit(0))