import { test } from "@playwright/test";
import * as Constants from "../../pageobjects/Constants";
import { LoginPage } from "../../pageobjects/LoginPage.pageobject";
import { InventoryPage } from "../../pageobjects/InventoryPage.pageobject";
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

    await loginPage.load();
    // getByPlaceholder, getByRole are inclusive of this function
    await loginPage.login(Constants.USERS["standard user"], Constants.PASSWORD);

    // reset app state
    await loginPage.icoHamburger.click();
    await loginPage.hlResetAppState.click();
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

test.skip("basic test", async function ({ page }) {
  // getByText usage
  await page.getByText("Sauce Labs Backpack").click();
  await inventoryPage.btnBackToProducts.click();
  // getByAltText usage: should be used when the image tag has the alt attribute
  await page.getByAltText("Sauce Labs Bike Light").click();
  await inventoryPage.btnBackToProducts.click();
  // using xpath
  await page
    .locator(
      "xpath=.//div[contains(@class,'inventory_item_name') and contains(text(),'Sauce Labs Bolt T-Shirt')]"
    )
    .click();
  await inventoryPage.btnBackToProducts.click();

  // filtering elements: clicking product using title of product
  await (await inventoryPage.btnAddToCart("Sauce Labs Onesie")).click();
  let productPrice = await (
    await inventoryPage.fetchProductPrice("Sauce Labs Onesie")
  ).textContent();
  await console.log(`Sauce Labs Onesie price is ${productPrice}`);

  // PEDNING items
  /**
   * getByTitle: should be used only when the element has the title attribute
   * getByLabel: should be used to locate the input field using the label element
   * getByTestId: should be used only when the attribute is present in the element
   *              to be used less as this is not user facing locator
   */
});
