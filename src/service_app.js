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

	updateStreak(knex, id, value) {
		return knex("habits")
		.where("id", id)
		.update("current_streak", value)
	},

	updateHighestStreak(knex, id, value) {
		return knex("habits")
			.where("id", id)
			.update("highest_streak", value)
	},

	updateLastLog(knex, id, value) {
		return knex("habits")
			.where("id", id)
			.update("last_log", value)
	},

	// User Methods
	getUserById(knex, userId) {
		return knex
			.select("id", "user_name", "user_password", "avatar", "logged_total", "habits_done", "perfect_habits", "biggest_streak")
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

	// logged_total
	updateLogTotal(knex, id, value) {
		console.log(id, value)
		return knex("users")
			.where("id", id)
			.update("logged_total", value)
	},
	// habits_done
	updateHabitsDone(knex, id, value) {
		return knex("users")
			.where("id", id)
			.update("habits_done", value)
	},
	// perfect_habits 
	updatePerfectHabits(knex, id, value) {
		return knex("users")
			.where("id", id)
			.update("perfect_habits", value)
	},
	// biggest_streak
	updateBiggestStreak(knex, id, value) {
		return knex("users")
			.where("id", id)
			.update("biggest_streak", value)
	},

};

module.exports = service_app;


