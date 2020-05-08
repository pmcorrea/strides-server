const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = require("graphql");

const _ = require("lodash")

//Custom types
const { BookType, AuthorType } = require("./types.js")

// Dummy data
const db = require("./dummy-data")
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://pmcorrea:mongopassword@mongocluster0-ultix.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
	console.log('connected to mongo')
})

const MongoModelBook = require('../mongo-models/book')
const MongoModelAuthor = require('../mongo-models/author')


//Define the root queries
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				return MongoModelBook.findById(args.id)
			}
		},

		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				return MongoModelAuthor.findById(args.id)
			}
		},

		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return MongoModelBook.find({})
			}
		},

		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return MongoModelAuthor.find({})
			}
		}


	}
});

const RootMutation = new GraphQLObjectType({
	name: 'RootMutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parents, args){
				let author = new MongoModelAuthor({
					name: args.name,
					age: args.age
				})
				return author.save()
			}
		},

		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parents, args) {
				let book = new MongoModelBook({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId
				})
				return book.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
