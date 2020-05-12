const dateHelper = require("date-fns")


const service_app = {

	// Habits Methods
	getHabitById(knex, id) {
		return knex
			.select("*")
			.from("habits")
			.where("id", id)
	},

	getHabitsByUserId(knex, userId) {
		return knex
			.select("*")
			.from("habits")
			.where("user_id", userId)
	},

	addHabit(knex, habit) {
		return knex
			.insert(habit)
			.into("habits")
			.returning("*")

	},

	deleteHabit(knex, id) {
		return knex("habits")
			.where("id", id)
			.del()
	},

	deleteHabitsByUserId(knex, user_id) {
		return knex("habits")
			.where("user_id", user_id)
			.del()
	},

	grabStartDateById(knex, id) {
		return knex
			.select("habit_start_date")
			.from("habits")
			.where("id", id)
	},

	logHabit(knex, id, dayNumber) {
		let column = `day${dayNumber}`
		
		return knex("habits")
		.where("id", id)
		.update(column, true)
		.returning("*")		
	},

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
			.returning(["id", "user_name"])

	},
	
	deleteUser(knex, id) {
		return knex("users")
			.where("id", id)
			.del()
	},

};

module.exports = service_app;


