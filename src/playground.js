const dateHelper = require('date-fns')

// // // // Habit Creation Algorithm // // // //
// Generate startDate
let startDate_iso = new Date().toISOString()
let startDate = dateHelper.parseISO(startDate_iso)
console.log(startDate)
// Store in DB under startDate column






// // // // Logged Algorithm // // // //
// Fetch startDate from DB

// Generate current date (adding five days to facilitate)
let addFiveDays = dateHelper.add(startDate, {
	days: 5
})

// Compare diff in days
let diff = dateHelper.differenceInCalendarDays(
	addFiveDays,
	startDate
)

// Use string interpolation to place True value into column `day${diff}`
console.log(`day${diff}`)