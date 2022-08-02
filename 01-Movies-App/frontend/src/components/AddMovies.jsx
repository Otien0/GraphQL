import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_DIRECTORS_QUERY } from '../queries/queries';

function AddMovies() {

  const { loading, data, error } = useQuery(GET_DIRECTORS_QUERY)

  const renderDirectors = () => {
    if(loading) return <option disabled> Loading...</option>
    if(error) return <option disabled> Something Went Wrong!</option>

    return data.directors.map( director => {
        return <option key={director.id}>{director.name}</option>
    })

  }

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
                    <option>Select a Director</option>
                    {renderDirectors()}
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