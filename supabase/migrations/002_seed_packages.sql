-- Seed initial membership packages
insert into public.packages (name, price, duration, badge, features, is_active)
values
  (
    'Quarterly',
    4599,
    '3 Months + 1 Month FREE',
    null,
    array['Cardio Access', 'Weight Training', 'Trainer Guidance', 'Locker Room'],
    true
  ),
  (
    'Half Yearly',
    6599,
    '6 Months',
    'Popular',
    array['Cardio Access', 'Weight Training', 'Trainer Guidance', 'Locker Room', 'Diet Consultation'],
    true
  ),
  (
    'Annual',
    8999,
    '12 Months',
    'Best Value',
    array['Cardio Access', 'Weight Training', 'Trainer Guidance', 'Locker Room', 'Diet Consultation', 'Body Assessment'],
    true
  );
