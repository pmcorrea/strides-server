BEGIN;

TRUNCATE
  users, 
  habits
  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, user_password, avatar, habits_done, logged_total, perfect_habits, biggest_streak)
VALUES 
  ('user1', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg', 0, 0, 0, 0);


INSERT INTO habits (user_id, title, sunday, monday, tuesday, wednesday, thursday, friday, saturday, logged_on_schedule, logged_off_schedule, logged_missed, logged_total, habit_start_date, last_log, highest_streak, current_streak)
VALUES 
  (1, 'Today', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, 'Yesterday', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-02T20:29:19.760Z', '2020-05-11T20:29:19.760Z', 2, 2),
  (1, '2 days ago', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z', '2020-05-10T20:29:19.760Z', 2, 5),
  (1, 'Cook with Gordan', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-04T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, 'Write a short', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, 'Take online course', false, true, false, true, false, true, false, 0, 0, 0, 0, '2020-04-29T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, '100 days of code', true, true, true, true, true, true, true, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, 'Walk in the park', false, false, false, false, false, false, false, 0, 0, 0, 0, '2020-04-18T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, 'Practice photography', false, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0),
  (1, 'Yoga', true, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-05T20:29:19.760Z', '2020-05-12T20:29:19.760Z', 2, 0);


COMMIT;