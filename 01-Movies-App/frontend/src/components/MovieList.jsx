import React from 'react'
import { useQuery, gql } from '@apollo/client';


const GET_MOVIES_QUERY = gql`
  {
    movies{
      title
      genre
      id
    }
  }
`

function MovieList() {

  const { loading, data, error } = useQuery(GET_MOVIES_QUERY)
  if(loading) return <p> Loading... </p>
  
  const renderMovies = () => {
    return(
      data.movies.map(movie => {
        return(
          <li key={movie.id}>{movie.title}</li>
        )
      })
    )
  }


  return (
    <div>
        <ul>
          {renderMovies()}
        </ul>
    </div>
  )
}

export default MovieList