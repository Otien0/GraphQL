import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_MOVIE_QUERY } from '../queries/queries';

function MovieDetails({selectedMovie}) {

  const { loading, data, error } = useQuery(GET_MOVIE_QUERY, {
    variables: { id: selectedMovie }
  })

  if(loading) return <p> Loading... </p>
  
  const renderMovieDetails = () => {
    const { movie } = data || {}

    if(movie){
        return(
            <div>
                <hr />
                <h2>{movie.title}</h2>
                <p><strong>Genre -</strong> {movie.genre}</p>
                <p><strong>Directed By:</strong> { movie.director.name }</p>
                <p>Other Movies by this director:</p>
                <ul>
                    { movie.director.movies.map((item) => {
                        return <li key={item.id}>{item.title}</li>
                    })}
                </ul>
                <hr />
            </div>
        )
    }
    else{
        return <div>
            <h3>No Movie Selected. Please Select a Movie!</h3>
        </div>
    }
  }


  return (
    <div>
        {renderMovieDetails()}
    </div>
  )
}

export default MovieDetails