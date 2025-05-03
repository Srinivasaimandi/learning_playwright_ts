import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  ActionsPage,
  UploadDownloadFiles,
  MenuOptions,
} from "../../../pageobjects/tutorials/ActionsPage.pageobject";
// import { MenuOptions } from "../../pageobjects/tutorials/ActionsPage.pageobject";
/**
 * @author: srinivasaimandi
 */

let actionsPage: ActionsPage;

test.beforeEach("loads the internet heroku app", async function ({ page }) {
  actionsPage = new ActionsPage(page);
  actionsPage.load();
});

test.afterEach("clean up", async function ({ page }) {
  await page.waitForTimeout(5000);
});

test("text elements", { tag: "@actions" }, async function ({ page }) {
  await page.getByText(MenuOptions.inputs).click();
  await page.locator("div.example input").fill(faker.number.int().toString());
});

test("add delete buttons", { tag: "@actions" }, async function ({ page }) {
  await page.getByText(MenuOptions.add_remove_elements).click();
  await (await actionsPage.getButton("Add Element")).click();
  await (await actionsPage.getButton("Delete")).click();
});

test("checkboxes", { tag: "@actions" }, async function ({ page }) {
  await page.getByText(MenuOptions.checkboxes).click();
  await page.waitForTimeout(2000);
  await page.locator("css=#checkboxes > input:nth-child(1)").check();
  await page.locator("css=#checkboxes > input:nth-child(3)").uncheck();
});

test(
  "context menu and dialog handling",
  { tag: "@actions" },
  async function ({ page }) {
    await page.getByText(MenuOptions.context_menu).click();
    page.on("dialog", (dialog) => dialog.accept());
    await page.locator("#hot-spot").click({ button: "right" });
  }
);

test("dropdown", { tag: "@actions" }, async function ({ page }) {
  await page.getByText(MenuOptions.dropdown).click();
  let drpdwnItem = await page.locator("#dropdown");
  await drpdwnItem.selectOption("Option 1");
  await expect(drpdwnItem).toHaveValue("1");
  await expect(
    await drpdwnItem
      .locator("option")
      .filter({ hasText: "Option 1" })
      .getAttribute("selected")
  ).toEqual("selected");
});

test.skip(
  "dynamic content validation",
  { tag: "@actions" },
  async function ({ page }) {
    await page.getByText(MenuOptions.dynamic_content).click();
    for (let item of await page
      .locator("div#content>div > div.large-10")
      .all()) {
      console.log(await item.innerText());
    }
  }
);

test("dynamic controls", { tag: "@actions" }, async function ({ page }) {
  await page.getByText(MenuOptions.dynamic_controls).click();
  await page.locator("form#checkbox-example > div > input").check();
  await page.getByRole("button", { name: "Remove" }).click();
  await page.waitForTimeout(4000);
  await page.getByRole("button", { name: "Add" }).click();
  await page.locator("#checkbox").isEnabled();

  await expect(page.locator("form#input-example > input")).toBeDisabled();
  await page.getByRole("button", { name: "Enable" }).click();
  await expect(page.locator("form#input-example > input")).toBeEnabled();
  await page.locator("form#input-example > input").fill(faker.company.name());
  await page.getByRole("button", { name: "Disable" }).click();
});

test("entry ad", { tag: "@actions" }, async function ({ page }) {
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByText(MenuOptions.entry_ad).click();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#restart-ad").click();
});

test("exit intent", { tag: "@actions" }, async function ({ page }) {
  await page.getByText(MenuOptions.exit_intent).click();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("html").dispatchEvent("mouseleave");
});

test("file upload test", { tag: "@actions" }, async function ({ page }) {
  let fileName = UploadDownloadFiles.text;
  let filePath = "resources/test_files";

  await actionsPage.navigateToScreen(MenuOptions.file_upload);
  await actionsPage.uploadFile(filePath, fileName);
  await expect(await page.locator("h3")).toContainText("File Uploaded!");
  await expect(await page.locator("#uploaded-files")).toContainText(fileName);
});

test.skip("file download test", { tag: "@actions" }, async function ({ page }) {
  await actionsPage.navigateToScreen(MenuOptions.file_download);
  await page
    .locator(".example > a")
    .filter({ hasText: UploadDownloadFiles.text })
    .click();
});

/**
 * seems to be an issue with the application
 */
test.skip("floating menu test", { tag: "@actions" }, async function ({ page }) {
  await actionsPage.navigateToScreen(MenuOptions.floating_menu);
  let floatingMenuOptions = ["Home", "News", "Contact", "About"];
  await floatingMenuOptions.forEach(async (item, index) => {
    await console.log(`${index + 1}. ${item}`);
    let locatorString = `#menu > ul > li:nth-child(${index + 1}) > a`;
    await page.locator(locatorString).click();
    await console.log(await page.url());
    await expect(page).toHaveURL(
      actionsPage.baseUrl + "floating_menu#" + item.toLowerCase()
    );
    await page.waitForTimeout(2500);
  });
});

test.skip(
  "retrieve password test",
  { tag: "@actions" },
  async function ({ page }) {
    await actionsPage.navigateToScreen(MenuOptions.forgot_password);
    let email = faker.person.firstName() + "@gmail.com";
    await console.log(`email: ${email}`);
    await page.locator("#email").fill(email);
    await page.locator("#form_submit").click();
  }
);

test.skip("fetch all menu items text", {tag: "@actions"}, async function ({ page }) {
  page.waitForTimeout(4000);
  let items = await page.locator("li > a").all();
  for (const item of items) {
    console.log(item.textContent());
  }
});

test("multiple windows", { tag: "@actions" }, async function ({ page }) { 
  await actionsPage.navigateToScreen(MenuOptions.multiple_windows);
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("div.example > a").click(),
  ]);
  await newPage.waitForTimeout(2000);
  await expect(newPage).toHaveURL(actionsPage.baseUrl+'/windows/new');
  await newPage.close();
});
