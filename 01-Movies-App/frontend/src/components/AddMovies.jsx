import React from 'react'
import { useQuery, gql } from '@apollo/client';


const GET_DIRECTORS_QUERY = gql`
  {
    directors{
      name
      age
      id
    }
  }
`

function AddMovies() {

  const { loading, data, error } = useQuery(GET_DIRECTORS_QUERY)
  if(loading) return <p> Loading... </p>

  return (
    <div>
        <form id='add-movie'>

            <div>
                <label htmlFor="movie-name">Movie Name:</label>
                <input id="movie-name" name="movie-name" type="text" />
            </div>

            <div>
                <label htmlFor="genre">Genre:</label>
                <input id="genre" name="genre" type="text" />
            </div>

            <div>
                <label htmlFor="director">Director:</label>

                <select name="director" id="director">
                    <option value="director">Select a Director</option>
                </select>
            </div>

            <div>
                <button type="submit"> Add New Movie</button>
            </div>

        </form>
    </div>
  )
}

export default AddMovies