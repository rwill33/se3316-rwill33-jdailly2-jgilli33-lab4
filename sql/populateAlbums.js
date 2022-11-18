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

async function insertAlbums() {
  albums = await dataReader('raw_albums.csv');
  return new Promise((resolve, reject) => {
    con.connect(async function(err) {
      if (err) throw err;
      console.log("Connected!");
      Promise.allSettled(albums.map((album) => {
        return new Promise((resolve, reject) => {
          var sql = `INSERT INTO Albums (albumId, albumDateCreated, albumHandle, albumTitle, albumType, artistName, tags) VALUES ("${album.album_id}", "${album.album_date_created}", "${album.album_handle}", "${album.albumTitle}", "${album.album_type}", "${album.artist_name}", "${album.tags}")`;
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


insertAlbums()
.then(() => console.log("Done"))
.finally(() => process.exit(0))