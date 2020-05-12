require("dotenv").config()
const dateHelper = require('date-fns')
const knex = require("knex")

const service_app = require('../service_app')
const service_auth = require('../service_auth')
const { HabitType, UserType, LoginType } = require("./types.js")
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean
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
		// Get a single user
		userById: {
			type: new GraphQLList(UserType),
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {

				let userById = async () => {

					try {
						let result = await service_app.getUserById(
							knexInstance,
							args.id
						)

						return result;
					} catch(err) {
						console.log("userById err: ", err)
					}
					
				}

				return userById()
			}
		},

		// Get all habits by user_id
		habitsByUser: {
			type: new GraphQLList(HabitType),
			resolve(parent, args, context) {

				let token = context.headers.authorization
				token = token.slice(7, token.length);

				let payload = service_auth.verifyJwt(token);
				let user_id = payload.id

				let habitsByUser = async () => {
					try {
						let result = await service_app.getHabitsByUserId(
							knexInstance,
							user_id
						)
						
						return result;
					} catch(err) {
						console.log("habitsByUser err: ", err)
					}
					
				}

				return habitsByUser()
			}
		},

		loginUser: {
			type: LoginType,
			args: {
				user_name: { type: GraphQLString },
				user_password: { type: GraphQLString }
			},
			resolve(parent, args) {
				let userFound = async () => {
					try {
						let result = await service_auth.getUser(
							knexInstance,
							args.user_name
						)

						if (result == undefined) {
							throw new Error("Username or password is incorrect.")
						}

						let passwordCheck = await service_auth.comparePasswords(
							args.user_password,
							result.user_password
						)

						if (!passwordCheck) {
							throw new Error("Username or password is incorrect.")
						}

						if (passwordCheck) {
							let createToken = await service_auth.createJwt(
								result.user_name,
								{
									"id": result.id,
									"user_name": result.user_name,
								}
							)

							return { ...result, token: createToken }
						} 
					} catch(error) {
						throw new Error("Username or password is incorrect.")
					}
				}
				return userFound()
			}
		},

		habitById: {
			type: HabitType,
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				let singleHabit = async() => {
					try {
						let result = await service_app.getHabitById(
							knexInstance,
							args.id
						)
						return result[0]
					} catch(error) {
						console.log("habitById err: ", err)
						throw Error(err)
					}
					
				}

				return singleHabit()
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
				sunday: { type: new GraphQLNonNull(GraphQLBoolean) },
				monday: { type: new GraphQLNonNull(GraphQLBoolean) },
				tuesday: { type: new GraphQLNonNull(GraphQLBoolean) },
				wednesday: { type: new GraphQLNonNull(GraphQLBoolean) },
				thursday: { type: new GraphQLNonNull(GraphQLBoolean) },
				friday: { type: new GraphQLNonNull(GraphQLBoolean) },
				saturday: { type: new GraphQLNonNull(GraphQLBoolean) },
			},
			resolve(parents, args, context) {
				let token = context.headers.authorization
				token = token.slice(7, token.length);

				let payload = service_auth.verifyJwt(token);
				let user_id = payload.id

				let startDate_iso = new Date().toISOString()
				let startDate = dateHelper.parseISO(startDate_iso)

				let obj = {
					user_id: user_id,
					title: args.title,
					sunday: args.sunday,
					monday: args.monday,
					tuesday: args.tuesday,
					wednesday: args.wednesday,
					thursday: args.thursday,
					friday: args.friday,
					saturday: args.saturday,
					habit_start_date: startDate
				}
				
				let addHabit = async () => {
					try {
						let result = await service_app.addHabit(
							knexInstance,
							obj
						)
						return result[0]
					} catch(err) {
						console.log("addHabit err: ", err)
					}		
				}

				return addHabit()

			}
		},

		// Add a habit
		editHabit: {
			type: HabitType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				sunday: { type: new GraphQLNonNull(GraphQLBoolean) },
				monday: { type: new GraphQLNonNull(GraphQLBoolean) },
				tuesday: { type: new GraphQLNonNull(GraphQLBoolean) },
				wednesday: { type: new GraphQLNonNull(GraphQLBoolean) },
				thursday: { type: new GraphQLNonNull(GraphQLBoolean) },
				friday: { type: new GraphQLNonNull(GraphQLBoolean) },
				saturday: { type: new GraphQLNonNull(GraphQLBoolean) },
			},
			resolve(parents, args, context) {
				let token = context.headers.authorization
				token = token.slice(7, token.length);

				let payload = service_auth.verifyJwt(token);
				let user_id = payload.id

				let startDate_iso = new Date().toISOString()
				let startDate = dateHelper.parseISO(startDate_iso)

				let obj = {
					user_id: user_id,
					title: args.title,
					sunday: args.sunday,
					monday: args.monday,
					tuesday: args.tuesday,
					wednesday: args.wednesday,
					thursday: args.thursday,
					friday: args.friday,
					saturday: args.saturday,
					habit_start_date: startDate
				}

				let editHabit = async () => {
					try {
						let result = await service_app.addHabit(
							knexInstance,
							obj
						)
						return result[0]
					} catch (err) {
						console.log("addHabit err: ", err)
					}
				}

				return editHabit()

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
					try {
						let result = await service_app.deleteHabit(
							knexInstance,
							args.id
						)

						if (result == 0 ) {
							
							return result
						} else if (result == 1 ) {
							
							return result
						}

						return result
					} catch(err) {
						console.log("deleteHabit err:", err)
					}
					
				}

				return deleteHabit()

			}
		},

		// Delete habits by user_id
		deleteHabitsByUserId: {
			type: HabitType,
			args: {
				user_id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parents, args) {
				let deleteHabitsByUserId = async () => {
					try {
						let result = await service_app.deleteHabitsByUserId(
							knexInstance,
							args.user_id
						)

						if (result == 0) {
							
							return result
						} else if (result == 1) {
							
							return result
						}
						
						return result
					} catch(err) {
						console.log("deleteHabitsByUserId err: ", err)
					}
					
				}

				deleteHabitsByUserId()

			}
		},

		// Add a user
		addUser: {
			type: UserType,
			args: {
				user_name: { type: new GraphQLNonNull(GraphQLString) },
				user_password: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parents, args) {

				let addUser = async () => {
					try {
						let encryptedPw = await service_auth.encryptPw(args.user_password)

						let obj = {
							user_name: args.user_name,
							user_password: encryptedPw,
							avatar: null
						}

						let result = await service_app.addUser(
							knexInstance,
							obj
						)

						return result[0]
					} catch(err) {
						console.log("addUser err: ", err)
						throw Error(err)
					}
					
				}

				return addUser()
			}
		},

		// Delete a user
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parents, args) {
				let deleteUser = async () => {
					try {
						let result = await service_app.deleteUser(
							knexInstance,
							args.id
						)

						if (result == 0) {
							
							return result
						} else if (result == 1) {
							return result
						}

						return result
					} catch(err) {
						console.log('deleteUser err: ', err)
					}
					
				}

				return deleteUser()

			}
		},

		// Log habit by id
		logHabit: {
			type: HabitType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString)},
				column: { type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, args) {

				let logHabit = async() => {
					try {
						let logged = async() => {
							try {
								let result = await service_app.logHabit(
									knexInstance,
									args.id,
									args.column
									)	
									return result[0]
								} catch(err) {
								console.log('logged err', err)
								}
						}
								
						return logged()
								
					} catch (err) {
						console.log('logHabit err', err)
					}
							
				} 
				return logHabit()
							
			}
		},

		
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
