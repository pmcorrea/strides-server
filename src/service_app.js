const dateHelper = require("date-fns")


const service_app = {

	// Habits Methods
	getHabitsByUserId(knex, userId) {
		return knex
			.select("*")
			.from("habits")
			.where("userid", userId)
	},

	addHabit(knex, habit) {
		return knex
			.insert(habit)
			.into("habits")

	},

	deleteHabit(knex, id) {
		return knex("habits")
			.where("id", id)
			.del()
	},

	deleteHabitsByUserId(knex, id) {
		return knex("habits")
			.where("userid", id)
			.del()
	},

	// logHabitById(knex, id) {
	// 	return knex("habits")
	// 		.where("userid", id)
	// 		.del()
	// },

	// User Methods
	getUserById(knex, userId) {
		return knex
			.select("id", "user_name", "user_password", "avatar")
			.from("users")
			.where("id", userId)
	},

	addUser(knex, user) {
		return knex
			.insert(user)
			.into("users")

	},
	
	deleteUser(knex, id) {
		return knex("users")
			.where("id", id)
			.del()
	},

};

module.exports = service_app;


