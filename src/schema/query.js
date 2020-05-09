require("dotenv").config()
const knex = require("knex")
const service_app = require('../service_app')
const { HabitType, UserType } = require("./types.js")
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = require("graphql");

// Database
const knexInstance = knex({
	client: "pg",
	connection: process.env.DATABASE_URL
})

//Define queries 
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// Get all habits by userId
		habitsByUser: {
			type: new GraphQLList(HabitType),
			args: { 
				id: { type: GraphQLInt }
			},
			resolve(parent, args) {

				let habitsByUser = async () => {
					let result = await service_app.getHabitsByUserId(
						knexInstance,
						args.id
					)
				
					return result;
				}

				return habitsByUser()
			}
		},

		// Get a single user
		userById: {
			type: new GraphQLList(UserType),
			args: {
				id: { type: GraphQLInt }
			},
			resolve(parent, args) {

				let userById = async () => {
					let result = await service_app.getUserById(
						knexInstance,
						args.id
					)

					return result;
				}

				return userById()
			}
		},

	}
});

//Define mutations 
const RootMutation = new GraphQLObjectType({
	name: 'RootMutation',
	fields: {

		// Add a habit
		addHabit: {
			type: HabitType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				userid: { type: new GraphQLNonNull(GraphQLString) },
				sunday: { type: new GraphQLNonNull(GraphQLString) },
				monday: { type: new GraphQLNonNull(GraphQLString) },
				tuesday: { type: new GraphQLNonNull(GraphQLString) },
				wednesday: { type: new GraphQLNonNull(GraphQLString) },
				thursday: { type: new GraphQLNonNull(GraphQLString) },
				friday: { type: new GraphQLNonNull(GraphQLString) },
				saturday: { type: new GraphQLNonNull(GraphQLString) },
				logged_days: { type: new GraphQLNonNull(GraphQLString) },
				missed_days: { type: new GraphQLNonNull(GraphQLString) },
				starthabit_date: { type: new GraphQLNonNull(GraphQLString) },
				endhabit_date: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parents, args) {
				let obj = {
					title: args.title,
					userid: args.userid,
					sunday: args.sunday,
					monday: args.monday,
					tuesday: args.tuesday,
					wednesday: args.wednesday,
					thursday: args.thursday,
					friday: args.friday,
					saturday: args.saturday,
					logged_days: args.logged_days,
					missed_days: args.missed_days,
					starthabit_date: args.starthabit_date,
					endhabit_date: args.endhabit_date
				}
				
				let addHabit = async () => {
					let result = await service_app.addHabit(
						knexInstance,
						obj
					)
				}

				addHabit()
			}
		},
		// Delete a habit
		deleteHabit: {
			type: HabitType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parents, args) {
				let deleteHabit = async () => {
					let result = await service_app.deleteHabit(
						knexInstance,
						args.id
					)
				}

				deleteHabit()
			}
		},

		// Delete habits by user

		// Add a user

		// Delete a user
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parents, args) {
				let deleteUser = async () => {
					let result = await service_app.deleteUser(
						knexInstance,
						args.id
					)
				}

				deleteUser()
			}
		},

		// Log day
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
