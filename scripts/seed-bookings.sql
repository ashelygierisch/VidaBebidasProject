-- =============================================
-- SEED EXISTING BOOKINGS - Run in Supabase SQL Editor
-- =============================================
-- This script adds 9 confirmed bookings to the database
-- Run this ONCE in your Supabase SQL Editor (Dashboard > SQL Editor)

-- First, insert users (ON CONFLICT will skip if email already exists)
INSERT INTO users (id, name, email, phone, "confirmWaiver", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Juan Del Rio', 'Vburci@yahoo.com', '4694383969', false, NOW(), NOW()),
  (gen_random_uuid(), 'Daniela Alanor', 'Daniela.y.alanor@gmail.com', '9729036889', false, NOW(), NOW()),
  (gen_random_uuid(), 'Dina Barroso', 'dinabarroso@rocketmail.com', '4693635942', false, NOW(), NOW()),
  (gen_random_uuid(), 'Anthony Vargas Jr', 'antvargas4114@gmail.com', '2148549752', false, NOW(), NOW()),
  (gen_random_uuid(), 'Delia Zozaya', 'delaiazozaya@yahoo.com', '2148784520', false, NOW(), NOW()),
  (gen_random_uuid(), 'Estela Munoz and Jose Nuno', 'FTW.Events@outlook.com', NULL, false, NOW(), NOW()),
  (gen_random_uuid(), 'Daniella Dominguez', 'liledersmom@yahoo.com', '2147172656', false, NOW(), NOW()),
  (gen_random_uuid(), 'Stephanie Santibanez', 'Stephaniesantibanez318@gmail.com', '4695764254', false, NOW(), NOW()),
  (gen_random_uuid(), 'Dalia Cipriano', 'ddcipriano1@gmail.com', '2142327213', false, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Now insert the bookings
-- Booking 1: Juan Del Rio - March 21, 2026
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-03-21'::date,
  '2026-03-21 18:00:00'::timestamp,
  '2026-03-22 00:00:00'::timestamp,
  'Añejo Package',
  400,
  'TBD',
  'TBD',
  '300 E Ledbetter Dr',
  'Dallas (Oak Cliff)',
  'Juan Del Rio',
  'Vburci@yahoo.com',
  '4694383969',
  'CONFIRMED',
  true,
  'Bar on sight',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'Vburci@yahoo.com';

-- Booking 2: Daniela Alanor - November 28, 2026 (Wedding)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-11-28'::date,
  '2026-11-28 18:00:00'::timestamp,
  '2026-11-29 00:00:00'::timestamp,
  'Reposado Package',
  280,
  'Daniela''s Wedding',
  'Wedding',
  '595 Haines Rd',
  'Seagoville',
  'Daniela Alanor',
  'Daniela.y.alanor@gmail.com',
  '9729036889',
  'CONFIRMED',
  true,
  'Mobile Bar Required',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'Daniela.y.alanor@gmail.com';

-- Booking 3: Dina Barroso - March 14, 2026 (50th Birthday)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-03-14'::date,
  '2026-03-14 18:00:00'::timestamp,
  '2026-03-15 00:00:00'::timestamp,
  'Reposado Package',
  100,
  'Dinas 50th Birthday Party',
  'Birthday Party',
  '2497 US 69, Greenville TX',
  'Greenville, Texas',
  'Dina Barroso',
  'dinabarroso@rocketmail.com',
  '4693635942',
  'CONFIRMED',
  true,
  'Bar On Sight',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'dinabarroso@rocketmail.com';

-- Booking 4: Anthony Vargas Jr - March 7, 2026 (Wedding)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-03-07'::date,
  '2026-03-07 18:00:00'::timestamp,
  '2026-03-08 00:00:00'::timestamp,
  'Reposado Package',
  200,
  'Anthony Vargas Jr Wedding',
  'Wedding',
  '10230 Co Rd 202',
  'Forney, Texas',
  'Anthony Vargas Jr',
  'antvargas4114@gmail.com',
  '2148549752',
  'CONFIRMED',
  true,
  'Bar On Sight',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'antvargas4114@gmail.com';

-- Booking 5: Delia Zozaya - September 5, 2026 (Wedding)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-09-05'::date,
  '2026-09-05 18:00:00'::timestamp,
  '2026-09-06 00:00:00'::timestamp,
  'Añejo Package',
  250,
  'Delias Wedding',
  'Wedding',
  '3601 Mapleshade Ln',
  'Plano, Texas',
  'Delia Zozaya',
  'delaiazozaya@yahoo.com',
  '2148784520',
  'CONFIRMED',
  true,
  'Mobile Bar Needed',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'delaiazozaya@yahoo.com';

-- Booking 6: Estela Munoz and Jose Nuno - October 3, 2026 (Wedding)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-10-03'::date,
  '2026-10-03 18:00:00'::timestamp,
  '2026-10-04 00:00:00'::timestamp,
  'Añejo Package',
  275,
  'Estela Munoz and Jose Nuno Wedding',
  'Wedding',
  'Union House - 1312 FM 4, 76031',
  'Cleburne, Texas',
  'Estela Munoz and Jose Nuno',
  'FTW.Events@outlook.com',
  NULL,
  'CONFIRMED',
  true,
  'Bar on Sight',
  'VENUE',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'FTW.Events@outlook.com';

-- Booking 7: Daniella Dominguez - May 15, 2026 (Wedding)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-05-15'::date,
  '2026-05-15 18:00:00'::timestamp,
  '2026-05-16 00:00:00'::timestamp,
  'Reposado Package',
  150,
  'Wedding',
  'Wedding',
  '222 Betchan Dr Hickory Creek, Tx',
  'Lake Dallas, Texas',
  'Daniella Dominguez',
  'liledersmom@yahoo.com',
  '2147172656',
  'CONFIRMED',
  true,
  'Bar on Sight',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'liledersmom@yahoo.com';

-- Booking 8: Stephanie Santibanez - May 15, 2026 (Wedding)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-05-15'::date,
  '2026-05-15 18:00:00'::timestamp,
  '2026-05-16 00:00:00'::timestamp,
  'Añejo Package',
  300,
  'Wedding',
  'Wedding',
  '5576 N I-45 Frontage Rd Ennis, Texas 75119',
  'Ennis, Texas',
  'Stephanie Santibanez',
  'Stephaniesantibanez318@gmail.com',
  '4695764254',
  'CONFIRMED',
  true,
  'Mobile Bar Needed',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'Stephaniesantibanez318@gmail.com';

-- Booking 9: Dalia Cipriano - May 15, 2026 (Birthday)
INSERT INTO bookings (
  id, "eventDate", "startTime", "endTime", "serviceType", "guestCount", 
  "venueName", "venueType", address, city, "clientName", "clientEmail", "clientPhone",
  status, "depositPaid", "barOption", source, "userId", "createdAt", "updatedAt"
)
SELECT 
  gen_random_uuid(),
  '2026-05-15'::date,
  '2026-05-15 18:00:00'::timestamp,
  '2026-05-16 00:00:00'::timestamp,
  'Añejo Package',
  150,
  'Dalia Birthday Celebration',
  'Birthday',
  '5576 N I-45 Frontage Rd Ennis, Texas 75119',
  'Dallas, Texas',
  'Dalia Cipriano',
  'ddcipriano1@gmail.com',
  '2142327213',
  'CONFIRMED',
  true,
  'Bar Provided',
  'REFERRAL',
  id,
  NOW(),
  NOW()
FROM users WHERE email = 'ddcipriano1@gmail.com';

-- =============================================
-- VERIFY THE INSERTS
-- =============================================
SELECT 
  b."clientName",
  b."eventDate",
  b."serviceType",
  b.city,
  b.status,
  b."depositPaid"
FROM bookings b
ORDER BY b."eventDate" ASC;
