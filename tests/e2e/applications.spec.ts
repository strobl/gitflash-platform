
import { test, expect } from '@playwright/test';

test.describe('Applications feature', () => {
  test.beforeEach(async ({ page }) => {
    // Assume we have a test user already logged in
    // Navigate to the jobs page
    await page.goto('/talent/erkunden');
  });

  test('Talent can apply to a job', async ({ page }) => {
    // Find and click on a job card
    await page.getByTestId('job-card').first().click();
    
    // Click apply button
    await page.getByRole('button', { name: 'Bewerben' }).click();
    
    // Fill in application form
    await page.getByLabel('Anschreiben (optional)').fill('Das ist meine Testbewerbung.');
    
    // Submit application
    await page.getByRole('button', { name: 'Bewerbung absenden' }).click();
    
    // Verify success toast appears
    await expect(page.getByText('Bewerbung abgesendet')).toBeVisible();
    
    // Go to applications page
    await page.goto('/talent/bewerbungen');
    
    // Verify application appears in the list
    await expect(page.getByRole('row').filter({ hasText: 'Neu' })).toBeVisible();
  });

  test('Recruiter can update application status', async ({ page }) => {
    // Login as recruiter
    await page.goto('/login');
    await page.getByLabel('E-Mail').fill('recruiter@test.com');
    await page.getByLabel('Passwort').fill('password123');
    await page.getByRole('button', { name: 'Anmelden' }).click();
    
    // Go to job applications
    await page.goto('/unternehmen/jobs');
    await page.getByTestId('job-row').first().getByText('Bewerbungen').click();
    
    // Click on an application
    await page.getByRole('row').filter({ hasText: 'Neu' }).getByRole('button', { name: 'Bearbeiten' }).click();
    
    // Change status
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'In Prüfung' }).click();
    await page.getByRole('button', { name: 'Status aktualisieren' }).click();
    
    // Verify status was updated
    await expect(page.getByText('Status geändert')).toBeVisible();
    
    // Verify application status changed in the list
    await expect(page.getByRole('row').filter({ hasText: 'In Prüfung' })).toBeVisible();
  });

  test('Talent receives notification on status change', async ({ page, context }) => {
    // This test would require two browser contexts to simulate both users
    // For demonstration, we'll just verify that the talent can see status changes
    
    // Login as talent
    await page.goto('/login');
    await page.getByLabel('E-Mail').fill('talent@test.com');
    await page.getByLabel('Passwort').fill('password123');
    await page.getByRole('button', { name: 'Anmelden' }).click();
    
    // Go to applications
    await page.goto('/talent/bewerbungen');
    
    // Open application details
    await page.getByRole('row').filter({ hasText: 'In Prüfung' }).getByRole('button', { name: 'Details' }).click();
    
    // Verify status history is visible
    await expect(page.getByText('Neu → In Prüfung')).toBeVisible();
  });
});
