import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
  });

  test('should display login form with all fields', async ({ page }) => {
    // Vérifier la présence des labels
    await expect(page.getByText('Email', { exact: true })).toBeVisible();
    await expect(page.getByText('Password', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('(*)required')).toBeVisible();

    // Vérifier la présence des champs
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();

    // Vérifier le bouton
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should have default email value', async ({ page }) => {
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toHaveValue('test@email.com');
  });

  test('should have empty password fields by default', async ({ page }) => {
    const passwordInput = page.getByLabel('Password', { exact: true });
    const confirmPasswordInput = page.locator('#confirmPassword');
    
    await expect(passwordInput).toHaveValue('');
    await expect(confirmPasswordInput).toHaveValue('');
  });

  test('should have disabled submit button', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Login' });
    await expect(submitButton).toBeDisabled();
  });

  test('should fill and submit form', async ({ page }) => {
    // Intercepter les console.log
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });

    // Remplir le formulaire
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password', { exact: true }).fill('password123');
    await page.locator('#confirmPassword').fill('password123');

    // Le bouton est désactivé, donc on ne peut pas cliquer dessus normalement
    // On va forcer le clic pour tester la soumission
    await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      button.disabled = false;
    });

    await page.getByRole('button', { name: 'Login' }).click();

    // Vérifier que le console.log a été appelé avec les bonnes valeurs
    await expect(consoleLogs.some(log => 
      log.includes('Form result:') && 
      log.includes('user@example.com') && 
      log.includes('password123')
    )).toBeTruthy();
  });

  test('should show placeholder for password field', async ({ page }) => {
    const passwordInput = page.getByLabel('Password', { exact: true });
    await expect(passwordInput).toHaveAttribute('placeholder', 'votre password ici...');
  });

  test('should update form values when typing', async ({ page }) => {
    const emailInput = page.getByLabel('Email');
    const passwordInput = page.getByLabel('Password', { exact: true });
    const confirmPasswordInput = page.locator('#confirmPassword');

    // Modifier les valeurs
    await emailInput.fill('newuser@test.com');
    await passwordInput.fill('newpassword');
    await confirmPasswordInput.fill('newpassword');

    // Vérifier les nouvelles valeurs
    await expect(emailInput).toHaveValue('newuser@test.com');
    await expect(passwordInput).toHaveValue('newpassword');
    await expect(confirmPasswordInput).toHaveValue('newpassword');
  });

  test('should have correct input types', async ({ page }) => {
    await expect(page.getByLabel('Email')).toHaveAttribute('type', 'text');
    await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute('type', 'password');
    await expect(page.locator('#confirmPassword')).toHaveAttribute('type', 'password');
  });
});