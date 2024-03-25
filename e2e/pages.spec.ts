import { test, expect } from "@playwright/test";

test("should navigate to the login page", async ({ page }) => {
  // Start from the index page
  await page.goto("/home");
  // Find an element with the text 'Login Page' and click on it
  await page.getByText("Login").click();
  // The new url should be "/login"
  await expect(page).toHaveURL("/login");
  // The new page should contain an h1 with "About Page"
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Welcome back",
  );
});
