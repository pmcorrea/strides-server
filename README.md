# Strides
https://strides.now.sh
https://github.com/pmcorrea/strides-client
https://github.com/pmcorrea/strides-server

## Summary
As the perfect companion for developing new habits, Strides helps users create and track personalized habits for thirty days. As you complete daily logs, Strides automatically updates to determine total logs, perfect streaks, biggest steaks, total of completed habits and present that information to you.

Be the best version of youself and push yourself to achieve perfect streaks.

## Technologies
- **React**: building user interface 
- **Node**: JavaScript runtime enviroment
- **Express**: web application framework
- **express-graphql**: GraphQL server
- **Apollo**: GraphQL client
- **Knex**: SQL query builder
- **Postgres**: relational database
- **Mocha**: test framework
- **Chai**: assertion library
- **Supertest**: endpoint testing library
- **bcrypt**: implementation of bcrupt hashing function
- **JSON Web Token**: authorization implementation via JWTs
- **Postgrator**: database migration handleing 
- **Testing Library**: testing React components
- **XSS**: sanitizing user inputs
- **date-fs**: date utility library
- **cors**: express middleware for CORS configuration
- **helmet**: express middleware for securing HTTP headers
- **morgan**: express middleware for logging
- **nodemon**: server hot-reload

## API
### Endpoints
```
.
├── /graphql
│   └── POST
```

### Types
#### Habit
```
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
last_scheduled_logged: { type: GraphQLString },
logged_on_schedule: { type: GraphQLString },
logged_off_schedule: { type: GraphQLString },
logged_missed: { type: GraphQLString },
logged_total: { type: GraphQLString },
habit_start_date: { type: GraphQLString },
last_log: { type: GraphQLString },
current_streak: { type: GraphQLInt },
highest_streak: { type: GraphQLInt },
perfect_streak: { type: GraphQLString },
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
```
##### Habit
```
id: { type: GraphQLString },
user_name: { type: GraphQLString },
user_password: { type: GraphQLString },
avatar: { type: GraphQLString },
logged_total: { type: GraphQLString },
perfect_habits: { type: GraphQLString },
biggest_streak: { type: GraphQLString },
habits_done: { type: GraphQLString }
```

##### Login
```
id: { type: GraphQLString },
user_name: { type: GraphQLString },
user_password: { type: GraphQLString },
token: { type: GraphQLString }
```

### Queries
#### getUserByName
Retrieves a user given a username as an argument.
```
query getUserByName($user_name: String!){
		getUserByName(user_name: $user_name) {
			user_name
		}
	}
```

#### habits
Retrieves all habits by all users.
```
{
	habits {
		title
		id
		userid
		title
		sunday
		monday
		tuesday
		wednesday
		thursday
		friday
		saturday
		logged_on_schedule
		logged_off_schedule
		logged_missed
		logged_total
		habit_start_date
		perfect_streak
		last_scheduled_logged
		day0
		day1
		day2
		day3
		day4
		day5
		day6
		day7
		day8
		day9
		day10
		day11
		day12
		day13
		day14
		day15
		day16
		day17
		day18
		day19
		day20
		day21
		day22
		day23
		day24
		day25
		day26
		day27
		day28
		day29
	}
}
```

#### habitById
Retrieves a single habit given an id as an argument.
```
query habitById ($id: String!){
		habitById(id: $id) {
			title
			id
			user_id
			title
			sunday
			monday
			tuesday
			wednesday
			thursday
			friday
			saturday
			logged_on_schedule
			logged_off_schedule
			logged_missed
			logged_total
			habit_start_date
			last_log
			current_streak
			highest_streak
			perfect_streak
			last_scheduled_logged
			day0
			day1
			day2
			day3
			day4
			day5
			day6
			day7
			day8
			day9
			day10
			day11
			day12
			day13
			day14
			day15
			day16
			day17
			day18
			day19
			day20
			day21
			day22
			day23
			day24
			day25
			day26
			day27
			day28
			day29
		}
}
```

#### habitsByUser
Retrieves all habits for a single user.
```
query habitsByUser{
	habitsByUser {
		id
		title
		sunday
		monday
		tuesday
		wednesday
		thursday
		friday
		saturday
		current_streak
		last_log
		highest_streak
		habit_start_date
		perfect_streak
		last_scheduled_logged
	}
}
```

#### loginUser
Retrieves username and token for a single user given login credentials.
```
query loginUser($user_name: String!, $user_password: String!) {
	loginUser(user_name: $user_name, user_password: $user_password) {
		id
		user_name
		token
	}
}
```

#### addUser
Inserts a user given credentials.
```
mutation addUser($user_name: String!, $user_password: String!) {
	addUser(user_name: $user_name, user_password: $user_password) {
		id
		user_name
	}
}
```

#### addHabit
Inserts a habit given arguments for title and appropriate days of the week.
```
	mutation addHabit(
		$title: String!, 
		$sunday: Boolean!,
		$monday: Boolean!,
		$tuesday: Boolean!,
		$wednesday: Boolean!,
		$thursday: Boolean!,
		$friday: Boolean!,
		$saturday: Boolean!) {
			addHabit(
				title: $title,
				sunday: $sunday,
				monday: $monday,
				tuesday: $tuesday,
				wednesday: $wednesday,
				thursday: $thursday,
				friday: $friday,
				saturday: $saturday
					) {
						id
						title
					}
	}
```

#### logHabit
Updates a habit details.
```
	mutation logHabit($id: String!, $column: String!, $current_streak: Int!, $last_log: String, $highest_streak: Int!,
		$habit_start_date: String!, $perfect_streak: String, $last_scheduled_logged: String, $sunday: String!, $monday: String!, $tuesday: String!, $wednesday: String!, $thursday: String!, $friday: String!, $saturday: String!) {
		logHabit(id: $id, column: $column, current_streak: $current_streak, last_log: $last_log, highest_streak: $highest_streak,
			habit_start_date: $habit_start_date, perfect_streak: $perfect_streak, last_scheduled_logged: $last_scheduled_logged, sunday: $sunday, monday: $monday, tuesday: $tuesday, wednesday: $wednesday, thursday: $thursday, friday: $friday, saturday: $saturday) {
			id
			title
		}
	}
```

#### deleteHabit
Deletes a habit provided an id.
```
	mutation deleteHabit($id: String!) {
		deleteHabit(id: $id) {
			id
			title
		}
	}
```

#### editHabit
Updates a habit.
```
	mutation editHabit(
		$title: String!, 
		$sunday: Boolean!,
		$monday: Boolean!,
		$tuesday: Boolean!,
		$wednesday: Boolean!,
		$thursday: Boolean!,
		$friday: Boolean!,
		$saturday: Boolean!) {
			editHabit(
				title: $title,
				sunday: $sunday,
				monday: $monday,
				tuesday: $tuesday,
				wednesday: $wednesday,
				thursday: $thursday,
				friday: $friday,
				saturday: $saturday
					) {
						id
						title
					}
	}
```

#### userById
Retrieves a user given an id as an argument.
```
	query userById {
		userById {
			user_name
			avatar
			logged_total
			habits_done
			perfect_habits 
			biggest_streak
		}
	}
```

#### logged_total
Updates the logged_total total for a user.
```
	mutation logged_total($value: String!) {
		logged_total(value: $value) {
			id
			user_name
			logged_total
		}
	}
```

#### perfect_habits
Updates the perfect_streaks total for a user.
```
	mutation perfect_habits($value: String!) {
		perfect_habits(value: $value) {
			id
			user_name
			perfect_habits
		}
	}
```

#### biggest_streak
Updates the biggest_streak total for a user.
```
	mutation biggest_streak($value: String!) {
		biggest_streak(value: $value) {
			id
			user_name
			biggest_streak
		}
	}
```

#### habits_done
Updates the total habits completed for a user.
```
	mutation habits_done($value: String!) {
		habits_done(value: $value) {
			id
			user_name
			habits_done
		}
	}
```

## Screenshots
<img src="https://live.staticflickr.com/65535/49898909472_11d43fc3e6.jpg" width="231" height="500" alt="IMG_4768">
<img src="https://live.staticflickr.com/65535/49898909447_b73eeccd01.jpg" width="231" height="500" alt="IMG_4769">
<img src="https://live.staticflickr.com/65535/49898909427_12195cc9d0.jpg" width="231" height="500" alt="IMG_4770">
<img src="https://live.staticflickr.com/65535/49898909532_fa0e703eac.jpg" width="231" height="500" alt="IMG_4767">

## Credits
Images and assests are credited to Pexels, Flat-Icon, Freepic, and Luis Quintero (https://www.pexels.com/@jibarofoto)

## Usage
Not intended for personal or commerical use. Use at your own risk. 
