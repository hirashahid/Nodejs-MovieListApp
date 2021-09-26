import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, movieReview: review,
    });

    setMovieList([...movieList, { movie_name: movieName, movie_review: review },
    ]);
  };

  const deleteReview = (movie) => {

    Axios.delete(`http://localhost:3001/api/delete/${movie}`).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update/", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview('');
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form" id="id-1">
        <label>Movie Name:</label>
        <input type="text" id="id-2" onChange={(e) => setMovieName(e.target.value)} />
        <label>Review:</label>
        <input type="text" id="id-3" onChange={(e) => setReview(e.target.value)} />

        <button onClick={submitReview}>Submit</button>

        {movieList.map((val) => {
          return (
            <div key={val.id} className="card" >
              <h1>{val.movie_name}</h1>
              <p>{val.movie_review}</p>

              <button onClick={() => { deleteReview(val.movie_name) }}>Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value);
              }} />
              <button onClick={() => { updateReview(val.movie_name) }} >Update</button>
            </div>);
        })}
      </div>
    </div>
  );
}

export default App;
