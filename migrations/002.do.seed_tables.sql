BEGIN;

TRUNCATE
  habits, 
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (user_name, user_password, avatar)
VALUES 
  ('Peter', '$2y$04$zSU5VoU8VRDKOkQhKb2b4O9O0.MZ7IJRePwLq3R.9J9F/q7cyRg3y', 'https://res.cloudinary.com/pmcorrea/image/upload/v1583012322/k2o16y7t0nob9dhovfsw.jpg');

INSERT INTO habits (userId, title, sunday, monday, tuesday, wednesday, thursday, friday, saturday, logged_days, missed_days, startHabit_date, endHabit_date)
VALUES 
  (1, 'Meditate', false, false, false, false, false, false, false, 0, 0, 'Mon, 1 Apr 2020 23:18:08 GMT', 'Mon, 29 Apr 2020 23:18:08 GMT');

COMMIT;