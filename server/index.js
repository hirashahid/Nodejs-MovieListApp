const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'crud_db'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * from movie_reviews';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = 'INSERT INTO movie_reviews (movie_name, movie_review) VALUES (? , ?);';
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result);
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const name = res.params.movieName;
    console.log(name);
    //const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ?";
    db.query(sqlDelete, name, (err, result) => {
        //if (err) console.log();
    });
});

app.put('/api/update', (req, res) => {
    const name = res.body.movieName;
    const review = res.body.movieReview;

    const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(3001, () => {
    console.log('Running on port 3000');
});

