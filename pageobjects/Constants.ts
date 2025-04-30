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

export const api_credentials = {
  /**
   * Use it as the 'x-api-key' header when making any request to the API, 
   * or by adding as a query string parameter 
   * e.g. 'api_key=live_RZPyVEv0nGUdmKYxu3WAOzz9bnymqeGukgS8hUqTx4ArYH6tdugzOgdoGGbBPdR8'
   */
  "api_key": "live_RZPyVEv0nGUdmKYxu3WAOzz9bnymqeGukgS8hUqTx4ArYH6tdugzOgdoGGbBPdR8"

  // official api_key for testing purposes only
  //live_RR2tPPa0CVF27GUBloAFI2oAZJNuHif9tPEDdMZP1bi6ovAFWGyJb3GtuAq8rVPk
}

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
