const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} = require('graphql');

const _ = require("lodash")

// Dummy data
const db = require("./dummy-data")

const MongoModelBook = require('../mongo-models/book')
const MongoModelAuthor = require('../mongo-models/author')

// Define Movie Type
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return MongoModelAuthor.findById(parent.authorId)
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLString },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return MongoModelBook.find({
					authorId: parent.id
				})
			}
		}
	})
})

module.exports = {
	BookType: BookType,
	AuthorType: AuthorType
}