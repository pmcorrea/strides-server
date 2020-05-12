const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean
} = require('graphql');

const HabitType = new GraphQLObjectType({
	name: 'Habit',
	fields: () => ({
		id: { type: GraphQLString },
		user_id: { type: GraphQLString },
		title: { type: GraphQLString },
		sunday: { type: GraphQLString },
		monday: { type: GraphQLString },
		tuesday: { type: GraphQLString },
		wednesday: { type: GraphQLString },
		thursday: { type: GraphQLString },
		friday: { type: GraphQLString },
		saturday: { type: GraphQLString },
		logged_on_schedule: { type: GraphQLString },
		logged_off_schedule: { type: GraphQLString },
		logged_missed: { type: GraphQLString },
		logged_total: { type: GraphQLString },
		habit_start_date: { type: GraphQLString },
		day0: { type: GraphQLString },
		day1: { type: GraphQLString },
		day2: { type: GraphQLString },
		day3: { type: GraphQLString },
		day4: { type: GraphQLString },
		day5: { type: GraphQLString },
		day6: { type: GraphQLString },
		day7: { type: GraphQLString },
		day8: { type: GraphQLString },
		day9: { type: GraphQLString },
		day10: { type: GraphQLString },
		day11: { type: GraphQLString },
		day12: { type: GraphQLString },
		day13: { type: GraphQLString },
		day14: { type: GraphQLString },
		day15: { type: GraphQLString },
		day16: { type: GraphQLString },
		day17: { type: GraphQLString },
		day18: { type: GraphQLString },
		day19: { type: GraphQLString },
		day20: { type: GraphQLString },
		day21: { type: GraphQLString },
		day22: { type: GraphQLString },
		day23: { type: GraphQLString },
		day24: { type: GraphQLString },
		day25: { type: GraphQLString },
		day26: { type: GraphQLString },
		day27: { type: GraphQLString },
		day28: { type: GraphQLString },
		day29: { type: GraphQLString }
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

const LoginType = new GraphQLObjectType({
	name: 'Login',
	fields: () => ({
		id: { type: GraphQLString },
		user_name: { type: GraphQLString },
		user_password: { type: GraphQLString },
		token: { type: GraphQLString }
	})
})

module.exports = {
	HabitType: HabitType,
	UserType: UserType,
	LoginType: LoginType
}