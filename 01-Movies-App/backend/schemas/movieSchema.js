const graphql = require("graphql");
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

const movies = [
    { title: 'Avatar', genre: 'Sci-fi', id: '1'},
    { title: 'Titanic', genre: 'Romance', id: '2'},
    { title: 'Lord Of The Rings', genre: 'Adventure', id: '3'},
    { title: 'Pirates Of The Carribean', genre: 'Adventure', id: '4'},
    { title: 'Avengers', genre: 'Sci-fi', id: '5'},
]

const directors = [
    { name: 'James Cameron', age: '67', id: '1'},
    { name: 'James Cameron', age: '67', id: '2'},
    { name: 'Peter Jackson', age: '60', id: '3'},
    { name: 'Gore Verbinski', age: '65', id: '4'},
    { name: 'Ruso Brothers', age: '50', id: '5'},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
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
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})