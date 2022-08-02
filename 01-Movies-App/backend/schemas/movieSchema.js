const graphql = require("graphql");
const _ = require('lodash');
const Movie = require('../models/movies');
const Director = require('../models/directors');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

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
                return Director.findById(parrent.directorId)
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
                return Movie.find({ directorId: parrent.id })
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
                return Movie.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parrent, args) {
                // Get data from database
                // console.log(typeof args.id)
                // return _.find(directors, { id: args.id })
                return Director.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
                resolve(parrent, args){
                    // return movies
                    return Movie.find({})
                }
        },
        directors: {
            type: new GraphQLList(DirectorType),
                resolve(parrent, args){
                    // return directors
                    return Director.find({})
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parrent, args){
                let director = new Director({
                    name: args.name,
                    age: args.age
                })
                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parrent, args){
                let movie = new Movie({
                    title: args.title,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})