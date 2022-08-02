import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_MOVIES_QUERY } from '../queries/queries';
import MovieDetails from './MovieDetails';


function MovieList() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { loading, data, error } = useQuery(GET_MOVIES_QUERY);

  if(loading) return <p> Loading... </p>
  
  const renderMovies = () => {
    return(
      data.movies.map(movie => {
        return(
          <li key={movie.id} onClick={(e)=> setSelectedMovie(movie.id)}>{movie.title}</li>
        )
      })
    )
  }


  return (
    <div>
        <ul>
          {renderMovies()}
        </ul>
        <MovieDetails selectedMovie={selectedMovie}/>
    </div>
  )
}

export default MovieList