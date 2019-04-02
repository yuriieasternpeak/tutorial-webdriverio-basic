"use strict";

const chromedriver = require("chromedriver");
const webdriverio = require("webdriverio");
const {
    By,
    Eyes,
    Target
} = require("@applitools/eyes.webdriverio");
const {
    BrowserType,
    SeleniumConfiguration,
    DeviceName,
    ScreenOrientation
} = require("@applitools/eyes-selenium");

(async () => {
    chromedriver.start();

    // Open a Chrome browser.
    const chrome = {
        desiredCapabilities: {
            browserName: "chrome"
        }
    };
    let driver = webdriverio.remote(chrome);
    await driver.init();

    // Initialize the eyes SDK 
    const eyes = new Eyes();

    try {
        const configuration = new SeleniumConfiguration();
        configuration.appName = "Demo app";
        configuration.testName = "WebdriverIO Visual Grid test!";


        // Set your private API key here or in the "APPLITOOLS_API_KEY" environment variable
        configuration.apiKey = process.env.APPLITOOLS_API_KEY;
        eyes.configuration = configuration;

        driver = await eyes.open(driver);

        // Navigate the browser to the "hello world!" web-site.
        await driver.url("https://demo.applitools.com");

        //⭐️To see visual bugs, change the above URL to:
        //  https://demo.applitools.com/index_v2.html and run the test again

        // Visual checkpoint #1.
        await eyes.check("Login Page", Target.window());

        // Click the "Log in" button.
        await driver.click(By.id("log-in"));

        // Visual checkpoint #2.
        await eyes.check("App page", Target.window());


        // End the test.
        const results = await eyes.close();
        console.log(results);
    } catch (e) {
        console.log(e);
    } finally {
        // Close the browser.
        await driver.end();

        // If the test was aborted before eyes.close was called ends the test as aborted.
        await eyes.abortIfNotClosed();

        chromedriver.stop();
    }
})();