import { test, expect } from "@playwright/test";

test("should navigate to the Dashboard page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  // Find an element with the text 'Dashboard' and click on it
  await page.click("text=Dashboard");
  // The new URL should be "/dashboard"
  await expect(page).toHaveURL("/dashboard");
});
