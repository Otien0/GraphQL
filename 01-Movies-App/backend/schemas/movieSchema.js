const graphql = require("graphql");
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const movies = [
    { title: 'Avatar', genre: 'Sci-fi', id: '1'},
    { title: 'Titanic', genre: 'Romance', id: '2'},
    { title: 'Lord Of The Rings', genre: 'Adventure', id: '3'},
    { title: 'Pirates Of The Carribean', genre: 'Adventure', id: '4'},
    { title: 'Avengers', genre: 'Sci-fi', id: '5'},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parrent, args) {
                // Get data from database
                return _.find(movies, { id: args.id })
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})