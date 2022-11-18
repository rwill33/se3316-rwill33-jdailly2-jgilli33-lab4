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

async function insertGenres() {
  genres = await dataReader('genres.csv');
  return new Promise((resolve, reject) => {
    con.connect(async function(err) {
      if (err) throw err;
      console.log("Connected!");
      Promise.allSettled(genres.map((genre) => {
        return new Promise((resolve, reject) => {
          var sql = `INSERT INTO Genres (genreId, parentId, title) VALUES ('${genre.genre_id}', '${genre.parent}', '${genre.title}')`;
          con.query(sql, function (err, result) {
            if (err){
              console.log(err);
              reject();
            } else {
              console.log("1 record inserted");
              resolve();
            }``
          })
        })
      }))
      .then(resolve)
    });
  })
};


insertGenres()
.then(() => console.log("Done"))
.finally(() => process.exit(0))




