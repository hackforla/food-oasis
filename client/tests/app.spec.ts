import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('renders without crashing', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText("Locate free food in Los Angeles")).toBeVisible();
    await expect(page.getByText("Due to the LA Fires (Jan 2025), some information may be out-of-date.")).toBeVisible();
    await expect(page.getByText("Learn about this site")).toBeVisible();
    await expect(page.getByText("Learn about this site")).toHaveAttribute('href', '/about');
    page.getByLabel("Search by address or zip code").fill("90001");
    await page.getByText("Los Angeles, California 90001, United States").click();
    await expect(page.url()).toBe("http://localhost:3000/organizations");
    await expect(page.getByText("5 Locations")).toBeVisible();
  });
});