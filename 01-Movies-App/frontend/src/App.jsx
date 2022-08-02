import MovieList from "./components/MovieList"
import AddMovies from "./components/AddMovies";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Movie App Using MERNG</h1>
        <MovieList/>
        <AddMovies/>
    </div>
    </ApolloProvider>
  )
}

export default App
