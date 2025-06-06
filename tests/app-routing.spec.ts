import { test, expect } from '@playwright/test';

test.describe('Application Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should navigate to home page by default', async ({ page }) => {
    await expect(page.locator('app-home')).toBeVisible();
    await expect(page.getByText('This is HomePage 🚀')).toBeVisible();
  });

  test('should navigate to child-one component', async ({ page }) => {
    await page.getByRole('link', { name: 'ChildOne' }).click();
    await expect(page).toHaveURL('http://localhost:4200/child-1');
    await expect(page.locator('app-child-one')).toBeVisible();
    await expect(page.getByText('child-one works!')).toBeVisible();
    // Vérifier que les todos sont affichés
    await expect(page.getByText('🔥TASK: Test1')).toBeVisible();
  });

  test('should navigate to child-two component', async ({ page }) => {
    await page.getByRole('link', { name: 'ChildTwo' }).click();
    await expect(page).toHaveURL('http://localhost:4200/child-2');
    await expect(page.locator('app-child-two')).toBeVisible();
    await expect(page.getByText('child-two works!')).toBeVisible();
  });

  test('should navigate to child-three component', async ({ page }) => {
    await page.getByRole('link', { name: 'ChildThree' }).click();
    await expect(page).toHaveURL('http://localhost:4200/child-3');
    await expect(page.locator('app-child-three')).toBeVisible();
    await expect(page.getByText('child-three works!')).toBeVisible();
    // Vérifier l'affichage des todos
    await expect(page.getByText('Test1')).toBeVisible();
    await expect(page.getByText('Test2')).toBeVisible();
    await expect(page.getByText('Test3')).toBeVisible();
  });

  test('should navigate to last-child component', async ({ page }) => {
    await page.getByRole('link', { name: 'Mon super' }).click();
    await expect(page).toHaveURL('http://localhost:4200/last-child');
    await expect(page.locator('app-child-four')).toBeVisible();
    await expect(page.getByText('child-four works!')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://localhost:4200/login');
    await expect(page.locator('app-login')).toBeVisible();
  });

  test('should redirect to 404 page for unknown routes', async ({ page }) => {
    await page.goto('http://localhost:4200/unknown-route');
    await expect(page).toHaveURL('http://localhost:4200/404');
    await expect(page.locator('app-not-found')).toBeVisible();
    await expect(page.getByText('404 NOT FOUND !')).toBeVisible();
  });

  test('should navigate from home to child-two using button', async ({ page }) => {
    await expect(page.locator('app-home')).toBeVisible();
    await page.getByRole('button', { name: "Let'go !" }).click();
    await expect(page).toHaveURL('http://localhost:4200/child-2');
    await expect(page.locator('app-child-two')).toBeVisible();
  });

  test('should auto-navigate from home to child-two after 2 seconds', async ({ page }) => {
    await expect(page.locator('app-home')).toBeVisible();
    // Attendre la navigation automatique
    await page.waitForURL('http://localhost:4200/child-2', { timeout: 3000 });
    await expect(page.locator('app-child-two')).toBeVisible();
  });
});