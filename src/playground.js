const dateHelper = require('date-fns')

let habit = {
	sunday: true,
	monday: false,
	tuesday: false,
	wednesday: true,
	thursday: true,
	friday: false, 
	saturday: true,
	perfect: true,
	last_scheduled_logged: '',
	start_date: '2020-05-01T00:00:00.000Z'
}


function perfectStreak(obj) {
	// Data
	let start_date = dateHelper.parseISO(obj.start_date)
	let addThirtyDays = dateHelper.add(start_date, {
		days: 30
	})

	let today_iso = new Date().toISOString()
	today = dateHelper.parseISO(today_iso)

	// Run only if perfect streak is true
	if (obj["perfect"] !== true) {
		return
	}

	// Get all scheduled days
	let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	let scheduledDays = []

	days.map((day) => {
		for (let prop in obj) {
			if (prop == day && obj[prop] == true) {
				scheduledDays.push(day)
			}
		}
	})	


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
			return
		}
		
		if (scheduledDates[index - 1] == new Date(obj["last_scheduled_logged"]).toISOString().substr(0, 10)) {
			console.log('Another perfect streak.')
			// Update last_scheuled_log to today
		} else {
			console.log('You lost your perfect streak.')
			// Update date perfect to false
		}
	} else {
		// Do nothing
		console.log('Not on scheuled day.')
	}

	return 
}


perfectStreak(habit)
