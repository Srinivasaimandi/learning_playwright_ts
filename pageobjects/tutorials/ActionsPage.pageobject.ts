import { Locator, Page } from "@playwright/test";
import * as path from "path";

export class ActionsPage {
  private page: Page;
  baseUrl: string;
  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "https://the-internet.herokuapp.com/";
  }

  async load() {
    await this.page.goto(this.baseUrl);
  }

  async getButton(buttonText: string): Promise<Locator> {
    return await this.page.getByRole("button", { name: `${buttonText}` });
  }

  async navigateToScreen(pageName) {
    let menuOption; // = await this.page.getByText(pageName);
    menuOption = await this.page.locator(`xpath=.//a[text()='${pageName}']`);
    await menuOption.scrollIntoViewIfNeeded();
    await menuOption.click();
  }

  async uploadFile(filePath, fileName) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.page.locator("#file-upload").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(process.cwd(), filePath, fileName));
    await this.page.locator("#file-submit").click();
  }
}

export let MenuOptions = {
  inputs: "Inputs",
  add_remove_elements: "Add/Remove Elements",
  basic_auth: "Basic Auth",
  checkboxes: "Checkboxes",
  context_menu: "Context Menu",
  dropdown: "Dropdown",
  dynamic_content: "Dynamic Content",
  dynamic_controls: "Dynamic Controls",
  entry_ad: "Entry Ad",
  exit_intent: "Exit Intent",
  file_download: "File Download",
  file_upload: "File Upload",
  floating_menu: "Floating Menu",
  forgot_password: "Forgot Password",
};

export let UploadDownloadFiles = {
  text: "pw_upload_textFile.txt",
  png: "pw_upload_pngImage.png",
  xlsx: "pw_upload_excelFile.xlsx",
};
