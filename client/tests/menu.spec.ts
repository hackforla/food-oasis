import { expect } from "@playwright/test";
import test from "./helpers/test";
import mockRequests from "./helpers/mocks";

test.describe("Menu", () => {
  test("returns focus to the menu button when the drawer closes", async ({
    page,
  }) => {
    await mockRequests(page);
    await page.goto("/about");

    const menuButton = page.getByTestId("menu-button");
    await menuButton.click();
    await expect(
      page.getByRole("link", { name: "Volunteer Login" })
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menuButton).toBeFocused();
  });
});
