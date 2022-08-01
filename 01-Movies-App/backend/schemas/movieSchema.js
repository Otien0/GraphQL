const graphql = require("graphql");
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const movies = [
    { title: 'Avatar', genre: 'Sci-fi', id: '1', directorId: '1'},
    { title: 'Titanic', genre: 'Romance', id: '2', directorId: '1'},
    { title: 'The Killer', genre: 'Action', id: '3', directorId: '2'},
    { title: 'Lord Of The Rings', genre: 'Adventure', id: '4', directorId: '3'},
    { title: 'Pirates Of The Carribean', genre: 'Adventure', id: '5', directorId: '4'},
    { title: 'Avengers', genre: 'Sci-fi', id: '6', directorId: '5'},
    { title: 'Hard Boiled', genre: 'Action', id: '7', directorId: '2'},
    { title: 'Face/Off', genre: 'Action', id: '8', directorId: '2'},
    { title: 'Gray Man', genre: 'Action', id: '9', directorId: '5'}
]

const directors = [
    { name: 'James Cameron', age: '67', id: '1'},
    { name: 'John Woo', age: '76', id: '2'},
    { name: 'Peter Jackson', age: '60', id: '3'},
    { name: 'Gore Verbinski', age: '65', id: '4'},
    { name: 'Ruso Brothers', age: '50', id: '5'}
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parrent, args){
                return _.find(directors, { id: parrent.directorId })
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parrent, args){
                return _.filter(movies, { directorId: parrent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parrent, args) {
                // Get data from database
                // console.log(typeof args.id)
                return _.find(movies, { id: args.id })
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parrent, args) {
                // Get data from database
                // console.log(typeof args.id)
                return _.find(directors, { id: args.id })
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
                resolve(parrent, args){
                    return movies
                }
        },
        directors: {
            type: new GraphQLList(DirectorType),
                resolve(parrent, args){
                    return directors
                }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})