import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Reporter to use.
   * See https://playwright.dev/docs/test-reporters
   * or
   * See https://playwright.dev/docs/next/test-reporters
   */
  reporter: [
    ["list"],
    //  ['line']
    // ['json', {outputFile: 'my-report/test-results.json'}],
    //  ['dot'],
    ["html", { outputFolder: "my-report" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. 
       other urls which can be to be automated
        - https://todolist.james.am/#/
    */
    colorScheme: "dark",
    locale: "en-IN",
    timezoneId: "Asia/Calcutta",
    screenshot: "only-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "tutorial",
      testDir: "./tests/ui-test/tutorials/",
      use: { ...devices["firefox"] },
    },

    /**
     * global setup for sauce demo
     */
    {
      name: "sauce_demo_setup",
      testMatch: /sauce_demo_global.setup.ts/,
      use: {
        baseURL: "https://www.saucedemo.com",
      },
    },
    {
      name: "sauce_demo",
      testDir: "./tests/ui-test/",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "https://www.saucedemo.com",
      },
      dependencies: ["sauce_demo_setup"],
      testIgnore: [
        "/tests/ui-test/tutorials/*.spec.ts",
        "/tests/ui-test/tests-examples/*.spec.ts",
        "./tests/ui-test/readinfFilesTest.spec.ts",
      ],
    },
    {
      name: "api_demo",
      testDir: "./tests/api-test/",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "https://api.thecatapi.com/v1",
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'docker start the-internet',
  //   url: 'http://localhost:7070',
  //   timeout: 120 * 1000,
  // reuseExistingServer: !process.env.CI,
  // },
});
