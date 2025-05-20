
BEGIN;

SELECT plan(13);

-- Create test users
SELECT lives_ok(
  $$
    INSERT INTO auth.users (id, email) VALUES 
      ('00000000-0000-0000-0000-000000000001', 'talent@test.com'),
      ('00000000-0000-0000-0000-000000000002', 'recruiter@test.com'),
      ('00000000-0000-0000-0000-000000000003', 'admin@test.com');
      
    INSERT INTO profiles (id, name, role) VALUES
      ('00000000-0000-0000-0000-000000000001', 'Test Talent', 'user'),
      ('00000000-0000-0000-0000-000000000002', 'Test Recruiter', 'user'),
      ('00000000-0000-0000-0000-000000000003', 'Test Admin', 'admin');
      
    INSERT INTO talent_profiles (id, user_id) VALUES
      ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');
      
    INSERT INTO jobs (id, title, user_id, applicants) VALUES
      ('20000000-0000-0000-0000-000000000001', 'Test Job', '00000000-0000-0000-0000-000000000002', 0);
  $$,
  'Sample data inserted successfully'
);

-- Test if we can insert an application
SELECT lives_ok(
  $$
    INSERT INTO applications (id, job_id, talent_id, status) VALUES
      ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 
       '10000000-0000-0000-0000-000000000001', 'new');
  $$,
  'Can insert a new application'
);

-- Test if job applicants counter was incremented
SELECT is(
  (SELECT applicants FROM jobs WHERE id = '20000000-0000-0000-0000-000000000001'),
  1,
  'Job applicants counter should be incremented to 1'
);

-- Test if status update creates a history entry
SELECT lives_ok(
  $$
    SET LOCAL "request.jwt.claims" TO '{"role":"admin", "sub":"00000000-0000-0000-0000-000000000003"}';
    UPDATE applications
    SET status = 'in_review'
    WHERE id = '30000000-0000-0000-0000-000000000001';
  $$,
  'Can update application status'
);

-- Check if history was created
SELECT is(
  (SELECT COUNT(*) FROM application_status_history WHERE application_id = '30000000-0000-0000-0000-000000000001'),
  1::bigint,
  'One history record should be created'
);

-- Check if version was incremented
SELECT is(
  (SELECT version FROM applications WHERE id = '30000000-0000-0000-0000-000000000001'),
  2,
  'Version should be incremented to 2'
);

-- Test soft delete
SELECT lives_ok(
  $$
    SET LOCAL "request.jwt.claims" TO '{"role":"admin", "sub":"00000000-0000-0000-0000-000000000003"}';
    UPDATE applications
    SET deleted_at = now(), deleted_by = '00000000-0000-0000-0000-000000000003'
    WHERE id = '30000000-0000-0000-0000-000000000001';
  $$,
  'Can soft delete an application'
);

-- Check if job applicants counter was decremented
SELECT is(
  (SELECT applicants FROM jobs WHERE id = '20000000-0000-0000-0000-000000000001'),
  0,
  'Job applicants counter should be decremented back to 0'
);

-- Test DSGVO anonymization function
SELECT lives_ok(
  $$
    SET LOCAL "request.jwt.claims" TO '{"role":"admin", "sub":"00000000-0000-0000-0000-000000000003"}';
    SELECT anonymize_application('30000000-0000-0000-0000-000000000001');
  $$,
  'Can anonymize an application'
);

-- Check if application data was anonymized
SELECT is(
  (SELECT cover_letter FROM applications WHERE id = '30000000-0000-0000-0000-000000000001'),
  NULL,
  'Cover letter should be nullified after anonymization'
);

SELECT isnt(
  (SELECT anonymized_at FROM applications WHERE id = '30000000-0000-0000-0000-000000000001'),
  NULL,
  'Anonymized_at timestamp should be set'
);

-- Test RLS policies

-- Test talent can view own application
SELECT lives_ok(
  $$
    SET LOCAL "request.jwt.claims" TO '{"role":"user", "sub":"00000000-0000-0000-0000-000000000001"}';
    SELECT * FROM applications WHERE id = '30000000-0000-0000-0000-000000000001';
  $$,
  'Talent can view their own application'
);

-- Test recruiter can view job application
SELECT lives_ok(
  $$
    SET LOCAL "request.jwt.claims" TO '{"role":"user", "sub":"00000000-0000-0000-0000-000000000002"}';
    SELECT * FROM applications WHERE id = '30000000-0000-0000-0000-000000000001';
  $$,
  'Recruiter can view applications for their job'
);

-- Cleanup
SELECT * FROM finish();
ROLLBACK;
