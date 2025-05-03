import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pageobjects/LoginPage.pageobject";
import { InventoryPage } from "../../../pageobjects/InventoryPage.pageobject";
import * as Constants from "../../../pageobjects/Constants";

/**
 * @author: srinivasaimandi
 */

let loginPage;
let inventoryPage;

// beforeEach
test.beforeEach(
  "setting up browser context & launch sauce demo site",
  async function ({ page }) {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    loginPage.load();
  }
);

// afterEach
test.afterEach("sleep for default timeout", async function ({ page }) {
  // reset app state
  await loginPage.icoHamburger.click();
  await loginPage.hlResetAppState.click();
  await loginPage.hlLogout.click();
  await page.waitForTimeout(Constants.TIMEOUT);
});

// assertion tutorial
test.skip(
  "assertion test",
  {
    tag: "@assertion_tutorial @reg",
    annotation: {
      type: "tutorial",
      description: "it covers all the ways in which assertions can be used",
    },
  },
  async function ({ page }) {
    /*
        page hook based assertions
    */
    // validate url
    await expect(page).toHaveURL(Constants.BASE_URL);
    // validate title
    await expect(page).toHaveTitle(Constants.TITLE.loginPage);
    let title = await page.title();
    await expect(title).toEqual(Constants.TITLE.loginPage);

    /*
        locator based assertions
    */
    // toHaveClass: validates class attribute
    await expect(loginPage.iptUsername).toHaveClass("input_error form_input");
    await expect(loginPage.iptPassword).toHaveClass("input_error form_input");
    await expect(loginPage.btnSubmit).toHaveClass("submit-button btn_action");
    // toBeAttached: validates if the element is present in the DOM or shadow DOM
    await expect(loginPage.iptUsername).toBeAttached();
    // toBeEditable: validate if the element is editable
    await expect(loginPage.iptUsername).toBeEditable();
    // toBeDisabled: validates if the element is disabled
    await expect(loginPage.btnSubmit).not.toBeDisabled();
    // toBeEmpty: validates if the field is empty
    await expect(loginPage.iptUsername).toBeEmpty();
    loginPage.iptUsername.fill(Constants.USERS["standard user"]);
    await expect(loginPage.iptUsername).not.toBeEmpty();
    // toBeEnabled: validates if the element is enabled
    await expect(loginPage.iptUsername).toBeEnabled();
    // toBeFocused: validates if the element is in focus
    await expect(loginPage.iptUsername).toBeFocused();
    // toBeVisible: validates if the element is visible
    await expect(loginPage.iptUsername).toBeVisible();

    await loginPage.login(Constants.USERS["standard user"], Constants.PASSWORD);
    await inventoryPage.validateHeading(Constants.USERS["standard user"]);
    // toEqual: validates for complete string in the element
    let heading = await inventoryPage.heading.textContent();
    await expect(heading).toEqual(Constants.HEADING.products);
    // toHaveText: validates for complete string in the element
    await expect(inventoryPage.heading).toHaveText(Constants.HEADING.products);
    // toContainText: validates for part of the string in the element
    await expect(inventoryPage.heading).toContainText(
      Constants.HEADING.products.substring(1, 4)
    );

    /**
     * yet to find an element to fit this usage
     */
    // toBeChecked: validates if the element is checked or not
    // toBeHidden: validates if the element is hidden or not

    /**
     * understand these better
     */
    // toBeInViewport
  }
);
