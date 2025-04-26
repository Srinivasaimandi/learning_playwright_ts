// login credentials
export const USERS: Record<string, string> = {
  "standard user": "standard_user",
  "locked out user": "locked_out_user",
  "problem user": "problem_user",
  "performance glitch user": "performance_glitch_user",
  "error user": "error_user",
  "visual user": "visual_user",
};

export const PASSWORD: string = "secret_sauce";
export const TIMEOUT: number = 5000;

export const BASE_URL: string = "https://www.saucedemo.com";

// headings of all pages
export const HEADING: Record<string, string> = {
  products: "Products",
  checkoutInformationPage: "Checkout: Your Information",
  checkoutOverviewPage: "Checkout: Overview",
};

// titles of all pages
export const TITLE: Record<string, string> = {
  loginPage: "Swag Labs",
};

// labels of hamburger items
export const NAV_ITEMS: Record<string, string> = {
  allItems: "All Items",
  about: "About",
  logout: "Logout",
  resetAppState: "Reset App State",
};
