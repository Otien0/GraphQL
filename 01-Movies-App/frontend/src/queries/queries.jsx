import { gql } from '@apollo/client';

const GET_MOVIES_QUERY = gql`
  {
    movies{
      title
      genre
      id
    }
  }
`

const GET_DIRECTORS_QUERY = gql`
  {
    directors{
      name
      age
      id
    }
  }
`

const ADD_MOVIE_MUTATION = gql`
    mutation( $title: String!, $genre: String!, $directorId: ID! ){
        addMovie(title: $title, genre: $genre, directorId: $directorId){
            title
            id
        }
    }
`

export { GET_MOVIES_QUERY, GET_DIRECTORS_QUERY, ADD_MOVIE_MUTATION }