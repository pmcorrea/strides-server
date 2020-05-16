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
			resolve(parent, args, context) {

				let userById = async () => {

					let token = context.headers.authorization
					token = token.slice(7, token.length);

					let payload = service_auth.verifyJwt(token);
					let user_id = payload.id

					try {
						let result = await service_app.getUserById(
							knexInstance,
							user_id
						)

						return result;
					} catch(err) {
						console.log("userById err: ", err)
					}
					
				}

				return userById()
			}
		},

		// Get a single user
		getUserByName: {
			type: UserType,
			args: {
				user_name: { type: GraphQLString }
			},
			resolve(parent, args, context) {

				let getUserByName = async () => {
					try {
						let result = await service_app.getUserByName(
							knexInstance,
							args.user_name
						)
						return result[0]
						if (result.length !== 0) {
							result = result[0]
							console.log(result)
							return result;
						}
	
					} catch (err) {
						console.log("getUserByName err: ", err)
					}

				}

				return getUserByName()
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
					
						if (args.user_name == "" || args.user_password == "") {
							return new Error("Username and password must not be blank.")
						}

						let result = await service_auth.getUser(
							knexInstance,
							args.user_name
						)

						if (result == undefined) {
							return new Error("Username or password is incorrect.")
						}

						let passwordCheck = await service_auth.comparePasswords(
							args.user_password,
							result.user_password
						)

						if (!passwordCheck) {
							return new Error("Username or password is incorrect.")
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
						return new Error("Network or server error occured.")
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
				column: { type: new GraphQLNonNull(GraphQLString)},
				current_streak: { type: new GraphQLNonNull(GraphQLInt)},
				last_log: { type: GraphQLString },
				highest_streak: { type: new GraphQLNonNull(GraphQLInt) },

				habit_start_date: { type: new GraphQLNonNull(GraphQLString) },
				perfect_streak: { type: GraphQLString },
				sunday: { type: new GraphQLNonNull(GraphQLString) },
				monday: { type: new GraphQLNonNull(GraphQLString) },
				tuesday: { type: new GraphQLNonNull(GraphQLString) },
				wednesday: { type: new GraphQLNonNull(GraphQLString) },
				thursday: { type: new GraphQLNonNull(GraphQLString) },
				friday: { type: new GraphQLNonNull(GraphQLString) },
				saturday: { type: GraphQLString },
				last_scheduled_logged: { type: GraphQLString }
			},
			resolve(parent, args, context) {

				let logHabit = async() => {
					try {
						let token = context.headers.authorization
						token = token.slice(7, token.length);

						let payload = service_auth.verifyJwt(token);
						let user_id = payload.id

						let user = await service_app.getUserById(
							knexInstance,
							user_id
						)

						let logged_total = user[0].logged_total
						logged_total++
						let habits_done = user[0].habits_done
						let biggest_streak = user[0].biggest_streak

						let perfectObj = {
							id: args.id,
							habit_start_date: args.habit_start_date,
							perfect_streak: args.perfect_streak,
							sunday: args.sunday,
							monday: args.monday,
							tuesday: args.tuesday,
							wednesday: args.wednesday,
							thursday: args.thursday,
							friday: args.friday,
							saturday: args.saturday,
							last_scheduled_logged: args.last_scheduled_logged,
						}

						// let logged = async() => {
						// 	try {
	
								let today = new Date().toISOString()
								today = dateHelper.parseISO(today)
								
								let last_logged = args.last_log
								last_logged = dateHelper.parseISO(last_logged)
								
								
								let diff = dateHelper.differenceInCalendarDays(
									today,
									last_logged
								)

								await service_app.updateLogTotal(
									knexInstance,
									user_id,
									logged_total
								)


								// if diff >= 30; complete habit
								if (diff >= 30 ) {
									await service_app.updateHabitsDone(
										knexInstance,
										user_id,
										habits_done++
									)
								}

								// If user skips a day
								if (diff > 1) {	

									let logged = await service_app.logHabit(
										knexInstance,
										args.id,
										args.column
									)

									await service_app.updateLastLog(
										knexInstance,
										args.id,
										today
									)

									await service_app.updateStreak(
										knexInstance,
										args.id,
										1
									)

									// If highest streak = 0; increment 
									if (args.highest_streak == 0) {
										await service_app.updateHighestStreak(
											knexInstance,
											args.id,
											1
										)	
									}
								
								// If it's a consecutive day
								} else if (diff == 1) {

									// await service_app.logHabit(
									let logged = await service_app.logHabit(
										knexInstance,
										args.id,
										args.column
									)

									await service_app.updateLastLog(
										knexInstance,
										args.id,
										today
									)

									await service_app.updateStreak(
										knexInstance,
										args.id,
										args.current_streak + 1
									)	

									// If streak is greater than highest; update
									if (args.current_streak + 1 > args.highest_streak) {
										await service_app.updateHighestStreak(
											knexInstance,
											args.id,
											args.current_streak + 1
										)	
									}

									if (args.current_streak + 1 > biggest_streak) {
										await service_app.updateBiggestStreak(
											knexInstance,
											user_id,
											args.current_streak + 1
										)
									}

									return logged[0]

								}

								
								// } catch(err) {
								// console.log('logged err', err)
								// }
						// }
								
						// return logged()

						await service_app.perfectStreak(knexInstance,
							perfectObj
						)
								
					} catch (err) {
						console.log('logHabit err', err)
						return err
					}
							
				} 
				return logHabit()
							
			}
		},

		// logged_total
		logged_total: {
			type: UserType,
			args: {
				value: { type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, root, context) {
				
				let updateLogTotal = async() => {
					let token = context.headers.authorization
					token = token.slice(7, token.length);

					let payload = service_auth.verifyJwt(token);
					let user_id = payload.id

					let result = await service_app.updateLogTotal(
						knexInstance,
						user_id,
						args.value
					)

					return result
				}

				return updateLogTotal()
			}
		},
		// habits_done
		habits_done: {
			type: UserType,
			args: {
				value: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, root) {
				let updateHabitsDone = async () => {
					let token = context.headers.authorization
					token = token.slice(7, token.length);

					let payload = service_auth.verifyJwt(token);
					let user_id = payload.id

					let result = await service_app.updateHabitsDone(
						knexInstance,
						user_id,
						args.value
					)

					return result
				}

				return updateHabitsDone()
			}
		},
		// perfect_habits 
		perfect_habits: {
			type: UserType,
			args: {
				value: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, root) {
				let updatePerfectHabits = async () => {
					let token = context.headers.authorization
					token = token.slice(7, token.length);

					let payload = service_auth.verifyJwt(token);
					let user_id = payload.id

					let result = await service_app.updatePerfectHabits(
						knexInstance,
						user_id,
						args.value
					)

					return result
				}

				return updatePerfectHabits()
			}
		},
		// biggest_streak
		biggest_streak: {
			type: UserType,
			args: {
				value: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, root) {
				let updateBiggestStreak = async () => {
					let token = context.headers.authorization
					token = token.slice(7, token.length);

					let payload = service_auth.verifyJwt(token);
					let user_id = payload.id

					let result = await service_app.updateBiggestStreak(
						knexInstance,
						user_id,
						args.value
					)

					return result
				}

				return updateBiggestStreak()
			}
		},
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
