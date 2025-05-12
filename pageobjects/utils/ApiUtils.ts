import { Page } from "@playwright/test";
import { BasePage } from "../BasePage.pageobject";

export class ApiUtils extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}