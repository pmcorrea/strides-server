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

	getUserByName(knex, user_name) {
		return knex
			.select("user_name")
			.from("users")
			.where("user_name", user_name)
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


	// Obj = id, start_date, perfect_streak, sun...sat, last_scheuled_log
	perfectStreak(knex, obj) {
		console.log(obj)
		// Data
		let start_date = dateHelper.parseISO(obj.habit_start_date)
		let addThirtyDays = dateHelper.add(start_date, {
			days: 30
		})

		let today_iso = new Date().toISOString()
		today = dateHelper.parseISO(today_iso)

		// Run only if perfect streak is true
		if (obj["perfect_streak"] !== "true") {
			return
		}

		// Get all scheduled days
		let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
		let scheduledDays = []

		days.map((day) => {
			for (let prop in obj) {
				if (prop == day && obj[prop] == "true") {
					scheduledDays.push(day)
				}
			}
		})
		console.log(scheduledDays)

		// Get all 30 dates
		let eachDate = dateHelper.eachDayOfInterval(
			{ start: start_date, end: addThirtyDays }
		)

		// Get all dates that are the scheuled days
		let scheduledDates = []
		eachDate.map((date) => {
			for (day in scheduledDays) {

				if (scheduledDays[day] == 'sunday' && dateHelper.isSunday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}

				if (scheduledDays[day] == 'monday' && dateHelper.isMonday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}

				if (scheduledDays[day] == 'tuesday' && dateHelper.isTuesday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}

				if (scheduledDays[day] == 'wednesday' && dateHelper.isWednesday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}

				if (scheduledDays[day] == 'thursday' && dateHelper.isThursday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}

				if (scheduledDays[day] == 'friday' && dateHelper.isFriday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}

				if (scheduledDays[day] == 'saturday' && dateHelper.isSaturday(date)) {
					scheduledDates.push(new Date(date).toISOString().substr(0, 10))
				}
			}
		})

		// Is today in scheuled days? && is today-1 last_scheuled_log?
		if (scheduledDates.includes(new Date(today).toISOString().substr(0, 10))) {
			let index = scheduledDates.indexOf(new Date(today).toISOString().substr(0, 10))

			// Check if this is the first scheuled logged
			if (obj["last_scheduled_logged"] == '') {
				console.log('First day added.')
				return knex("habits")
					.where("id", obj.id)
					.update("last_scheduled_logged", today)
				return
			}

			if (scheduledDates[index - 1] == new Date(obj["last_scheduled_logged"]).toISOString().substr(0, 10)) {
				console.log('Another perfect streak.')
				// Update last_scheuled_log to today
				return knex("habits")
					.where("id", obj.id)
					.update("last_scheduled_logged", today)
			} else {
				console.log('You lost your perfect streak.')
				// Update date perfect to false
				return knex("habits")
					.where("id", obj.id)
					.update("perfect_streak", "false")
			}
		} else {
			// Do nothing
			console.log('Not on scheuled day.')
		}

		return 
	}
};

module.exports = service_app;


