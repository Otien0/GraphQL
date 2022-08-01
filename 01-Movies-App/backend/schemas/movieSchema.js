const graphql = require("graphql");
const _ = require('lodash');
const Movie = require('../models/movies');
const Director = require('../models/directors');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parrent, args){
                // return _.find(directors, { id: parrent.directorId })
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
                // return _.filter(movies, { directorId: parrent.id })
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
                // return _.find(movies, { id: args.id })
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parrent, args) {
                // Get data from database
                // console.log(typeof args.id)
                // return _.find(directors, { id: args.id })
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
                resolve(parrent, args){
                    // return movies
                }
        },
        directors: {
            type: new GraphQLList(DirectorType),
                resolve(parrent, args){
                    // return directors
                }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parrent, args){
                let director = new Director({
                    name: args.name,
                    age: args.age
                })
                director.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})