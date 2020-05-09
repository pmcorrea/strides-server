const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList
} = require('graphql');

const HabitType = new GraphQLObjectType({
	name: 'Habit',
	fields: () => ({
		id: { type: GraphQLString },
		userid: { type: GraphQLString },
		title: { type: GraphQLString },
		sunday: { type: GraphQLString },
		monday: { type: GraphQLString },
		tuesday: { type: GraphQLString },
		wednesday: { type: GraphQLString },
		thursday: { type: GraphQLString },
		friday: { type: GraphQLString },
		saturday: { type: GraphQLString },
		logged_days: { type: GraphQLString },
		missed_days: { type: GraphQLString },
		starthabit_date: { type: GraphQLString },
		endhabit_date: { type: GraphQLString },
	})
})

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLString },
		user_name: { type: GraphQLString },
		user_password: { type: GraphQLString },
		avatar: { type: GraphQLString }
	})
})

module.exports = {
	HabitType: HabitType,
	UserType: UserType,
}