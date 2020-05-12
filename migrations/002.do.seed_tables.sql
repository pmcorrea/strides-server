BEGIN;

TRUNCATE
  users, 
  habits
  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, user_password, avatar)
VALUES 
  ('Peter', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg'),
  ('Pedro', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg'),
  ('Miguel', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg'),
  ('Correa', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg'),
  ('Michael', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg');

INSERT INTO habits (user_id, title, sunday, monday, tuesday, wednesday, thursday, friday, saturday, logged_on_schedule, logged_off_schedule, logged_missed, logged_total, habit_start_date)
VALUES 
  (1, 'Meditate', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (1, 'Read a book', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-02T20:29:19.760Z'),
  (1, 'Run 2 miles', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (1, 'Cook with Gordan', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-04T20:29:19.760Z'),
  (1, 'Write a short', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (1, 'Take online course', false, true, false, true, false, true, false, 0, 0, 0, 0, '2020-04-029T20:29:19.760Z'),
  (1, '100 days of code', true, true, true, true, true, true, true, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (1, 'Walk in the park', false, false, false, false, false, false, false, 0, 0, 0, 0, '2020-04-18T20:29:19.760Z'),
  (1, 'Practice photography', false, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (1, 'Yoga', true, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-05T20:29:19.760Z'),

  (2, '2Meditate', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (2, '2Read a book', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-02T20:29:19.760Z'),
  (2, '2Run 2 miles', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (2, '2Cook with Gordan', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-04T20:29:19.760Z'),
  (2, '2Write a short', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (2, '2Take online course', false, true, false, true, false, true, false, 0, 0, 0, 0, '2020-04-029T20:29:19.760Z'),
  (2, '2100 days of code', true, true, true, true, true, true, true, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (2, '2Walk in the park', false, false, false, false, false, false, false, 0, 0, 0, 0, '2020-04-18T20:29:19.760Z'),
  (2, '2Practice photography', false, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (2, '2Yoga', true, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-05T20:29:19.760Z'),

  (3, '3Meditate', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (3, '3Read a book', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-02T20:29:19.760Z'),
  (3, '3Run 2 miles', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (3, '3Cook with Gordan', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-04T20:29:19.760Z'),
  (3, '3Write a short', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (3, '3Take online course', false, true, false, true, false, true, false, 0, 0, 0, 0, '2020-04-029T20:29:19.760Z'),
  (3, '3100 days of code', true, true, true, true, true, true, true, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (3, '3Walk in the park', false, false, false, false, false, false, false, 0, 0, 0, 0, '2020-04-18T20:29:19.760Z'),
  (3, '3Practice photography', false, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (3, '3Yoga', true, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-05T20:29:19.760Z'),

  (4, '4Meditate', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (4, '4Read a book', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-02T20:29:19.760Z'),
  (4, '4Run 2 miles', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (4, '4Cook with Gordan', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-04T20:29:19.760Z'),
  (4, '4Write a short', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (4, '4Take online course', false, true, false, true, false, true, false, 0, 0, 0, 0, '2020-04-029T20:29:19.760Z'),
  (4, '4100 days of code', true, true, true, true, true, true, true, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (4, '4Walk in the park', false, false, false, false, false, false, false, 0, 0, 0, 0, '2020-04-18T20:29:19.760Z'),
  (4, '4Practice photography', false, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (4, '4Yoga', true, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-05T20:29:19.760Z'),

  (5, '5Meditate', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (5, '5Read a book', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-02T20:29:19.760Z'),
  (5, '5Run 2 miles', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (5, '5Cook with Gordan', true, false, false, false, false, false, true, 0, 0, 0, 0, '2020-05-04T20:29:19.760Z'),
  (5, '5Write a short', false, true, true, true, true, true, false, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (5, '5Take online course', false, true, false, true, false, true, false, 0, 0, 0, 0, '2020-04-029T20:29:19.760Z'),
  (5, '5100 days of code', true, true, true, true, true, true, true, 0, 0, 0, 0, '2020-05-01T20:29:19.760Z'),
  (5, '5Walk in the park', false, false, false, false, false, false, false, 0, 0, 0, 0, '2020-04-18T20:29:19.760Z'),
  (5, '5Practice photography', false, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-03T20:29:19.760Z'),
  (5, '5Yoga', true, false, true, false, true, false, true, 0, 0, 0, 0, '2020-05-05T20:29:19.760Z');

COMMIT;