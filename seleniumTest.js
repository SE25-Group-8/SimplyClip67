const assert = require('assert');
let webdriver = require("selenium-webdriver");
let chromedriver = require('chromedriver');
let chrome = require("selenium-webdriver/chrome");
const {Key,
    By} = require("selenium-webdriver");
    
    describe('Verify setup with Google Search',function() {
    it('browser should open', async function () {
        this.timeout(10000);
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        // Launch Google.com
        driver.get('http://google.com');

        // Search for abc in the searchbox in Chrome and Press Enter
        const searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('abc', Key.RETURN);

        // Check if the value in the searchbox is equal to the value you entered
        searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'abc');
        });

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    });
});


describe('Check browser copy functionality',function() {
    it('text should be copied', async function () {

        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for abc in the searchbox in Chrome and Press Enter
        const searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('hello', Key.RETURN);

        // Store the text in the first div in the search results page
        let results = driver.findElement(By.xpath("html/body/div[1]/div[5]/div[4]/div[5]/div[1]/div[1]/div/div/div"));

        // Check if the value is stored
        results.getAttribute('value').then(function(value) {
            assert.equal(value, results.getText());
        });

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check simply clip functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for abc in the searchbox in Chrome and Press Enter
        const searchBox = driver.findElement(webdriver.By.name('q'));
        searchBox.sendKeys('hello', Key.RETURN);

        // Store the text in the first div in the search results page
        let results = driver.findElement(By.xpath("html/body/div[1]/div[5]/div[4]/div[5]/div[1]/div[1]/div/div/div"));

        //Execute the Command+C command to copy the text in the first div in the search results page
        results.sendKeys(Key.COMMAND, 'c');

        //Retrieve the result from the clipboard list in the extension
        let clipboard_result = driver.findElement(By.className("clipboard_list"));
        //Check if the copied value exists in the clipboard list of the extension
        clipboard_result.getAttribute('value').then(function(value) {
            assert.equal(value, results.getText());
        });

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check sorting functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for prioty down button
        const priority_down = driver.findElement(By.xpath("/html/body/ul/li[1]/div/div[5]/img"));
        priority_down.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check Document export functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for download as doc button
        const priority_down = driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[3]/img"));
        priority_down.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check edit text functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for edit text button
        const priority_down = driver.findElement(By.xpath("/html/body/ul/li/div/div[2]/img"));
        priority_down.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check the color tab functionality',function() {
    it('the text within the chosen dialogue box is of the selected color.', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for the color dropdown
        const colorTabBlue = driver.findElement(By.xpath("/html/body/ul/li/div/div[2]/img"));
        colorTabBlue.click();
        colorTabBlue.sendKeys('Blue');

        const colorTabRed = driver.findElement(By.xpath("/html/body/ul/li/div/div[2]/img"));
        colorTabRed.click();
        colorTabRed.sendKeys('Red');

        const colorTabGreen = driver.findElement(By.xpath("/html/body/ul/li/div/div[2]/img"));
        colorTabGreen.click();
        colorTabGreen.sendKeys('Green');
        


        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check citation functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/risha/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for citation button
        const checkCitation = driver.findElement(By.xpath("/html/body/ul/li[1]/div/div[8]/img"));
        checkCitation.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});


describe('Check Merge functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        const checkbx1 = driver.findElement(By.xpath("/html/body/ul/li[1]/div/input"));
        checkbx1.click();

        const checkbx2 = driver.findElement(By.xpath("/html/body/ul/li[2]/div/input"));
        checkbx2.click();

        // Search for merge button
        const merge = driver.findElement(By.xpath("/html/body/div[1]/div[2]/img"));
        merge.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check Summarize functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/risha/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for summarize button
        const summarize = driver.findElement(By.xpath("/html/body/div[1]/div[1]/img"));
        summarize.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check Citation for each text functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/risha/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for citation button
        const Citation = driver.findElement(By.xpath("/html/body/ul/li[1]/div/div[8]/img"));
        Citation.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
});

describe('Check dark mode functionality',function() {
    it('copied text should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for dark mode button and click on it
        const dark_mode = driver.findElement(By.xpath("/html/body/div[1]/label[2]/span"));
        dark_mode.sendKeys(Key.RETURN);
        dark_mode.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);

    it('summarization should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for dark mode button and click on it
        const dark_mode = driver.findElement(By.xpath("/html/body/div[1]/label[2]/span"));
        dark_mode.sendKeys(Key.RETURN);
        dark_mode.click();

        // Search for summarize button
        const summarize = driver.findElement(By.xpath("/html/body/div[1]/div[1]/img"));
        summarize.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);

    it('citation should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for dark mode button and click on it
        const dark_mode = driver.findElement(By.xpath("/html/body/div[1]/label[2]/span"));
        dark_mode.sendKeys(Key.RETURN);
        dark_mode.click();

        // Search for citation button
        const Citation = driver.findElement(By.xpath("/html/body/ul/li[1]/div/div[8]/img"));
        Citation.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);

    it('document download should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');

        // Search for dark mode button and click on it
        const dark_mode = driver.findElement(By.xpath("/html/body/div[1]/label[2]/span"));
        dark_mode.sendKeys(Key.RETURN);
        dark_mode.click();

        // Search for citation button
        const doc = driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[3]/img"));
        doc.click();

        // Close the browser
        driver.close();

        // Quit the browser
        driver.quit();
    }).timeout(10000);
    it('merge should exist in SimplyClip clipboard', async function () {
        // Open the Chrome Browser with a custom profile
        const options = new chrome.Options()
            .addArguments('--user-data-dir=/Users/ejazahmed/Desktop');

        // Initialise driver to launch Chrome
        const driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        // Launch Google.com
        driver.get('http://google.com');
         // Search for dark mode button and click on it
         const dark_mode = driver.findElement(By.xpath("/html/body/div[1]/label[2]/span"));
         dark_mode.sendKeys(Key.RETURN);
         dark_mode.click();
 
         //Checkbox for selecting the text
         const checkbx1 = driver.findElement(By.xpath("/html/body/ul/li[1]/div/input"));
         checkbx1.click();
 
         const checkbx2 = driver.findElement(By.xpath("/html/body/ul/li[2]/div/input"));
         checkbx2.click();
 
         // Search for merge button
         const merge = driver.findElement(By.xpath("/html/body/div[1]/div[2]/img"));
         merge.click();
 
         // Close the browser
         driver.close();
 
         // Quit the browser
         driver.quit();
     }).timeout(10000);
 });

 // Test Cases- Ryan Gallagher 
 it('should store data in chrome.storage', function(done) {
    const testKey = 'testKey';
    const testValue = 'testValue';
    
    chrome.storage.local.set({ [testKey]: testValue }, function() {
        chrome.storage.local.get([testKey], function(result) {
            assert.strictEqual(result[testKey], testValue, 'Data was not stored correctly');
            done();
        });
    });
});

it('should retrieve data from chrome.storage', function(done) {
    const testKey = 'testKey';
    const testValue = 'testValue';
    
    chrome.storage.local.set({ [testKey]: testValue }, function() {
        chrome.storage.local.get([testKey], function(result) {
            assert.strictEqual(result[testKey], testValue, 'Data was not retrieved correctly');
            done();
        });
    });
});

it('should return undefined for a non-existent key', function(done) {
    const nonExistentKey = 'nonExistentKey';
    
    chrome.storage.local.get([nonExistentKey], function(result) {
        assert.strictEqual(result[nonExistentKey], undefined, 'Non-existent key should return undefined');
        done();
    });
});

it('should store data asynchronously and retrieve it later', function(done) {
    const testKey = 'asyncKey';
    const testValue = 'asyncValue';
    
    chrome.storage.local.set({ [testKey]: testValue }, function() {
        setTimeout(function() {
            chrome.storage.local.get([testKey], function(result) {
                assert.strictEqual(result[testKey], testValue, 'Data was not stored/retrieved correctly asynchronously');
                done();
            });
        }, 100);  // Delay to simulate async behavior
    });
});

it('should overwrite data in chrome.storage when setting a new value for an existing key', function(done) {
    const testKey = 'conflictKey';
    const initialValue = 'initialValue';
    const newValue = 'newValue';
    
    chrome.storage.local.set({ [testKey]: initialValue }, function() {
        chrome.storage.local.set({ [testKey]: newValue }, function() {
            chrome.storage.local.get([testKey], function(result) {
                assert.strictEqual(result[testKey], newValue, 'Data was not overwritten correctly');
                done();
            });
        });
    });
});


it('should display tooltip when hovering over the element', async function() {
    const element = await driver.findElement(By.id('hoverElement'));
    await driver.actions().move({origin: element}).perform();
    const tooltip = await driver.findElement(By.id('tooltip')).getText();
    assert.strictEqual(tooltip, "Expected Tooltip Text");
});

it('should display no results for an invalid search query', async function() {
    await driver.findElement(By.id('searchBox')).sendKeys('invalid query');
    await driver.findElement(By.id('searchBtn')).click();
    const noResultsMessage = await driver.findElement(By.id('noResults')).getText();
    assert.strictEqual(noResultsMessage, "No results found");
});

it('should return results for a valid search query', async function() {
    await driver.findElement(By.id('searchBox')).sendKeys('test query');
    await driver.findElement(By.id('searchBtn')).click();
    const searchResults = await driver.findElements(By.css('.search-result'));
    assert(searchResults.length > 0, "No search results found");
});

it('should adjust layout correctly on window resize', async function() {
    await driver.manage().window().setSize(1024, 768);
    const layoutStyle = await driver.findElement(By.id('layout')).getCssValue('flex-direction');
    assert.strictEqual(layoutStyle, 'row');
});

it('should select an option from the dropdown', async function() {
    const dropdown = await driver.findElement(By.id('dropdown'));
    await dropdown.sendKeys('Option 2');
    const selectedOption = await dropdown.getAttribute('value');
    assert.strictEqual(selectedOption, 'Option 2');
});

it('should have a responsive layout on smaller screens', async function() {
    await driver.manage().window().setSize(320, 480); // Mobile viewport
    const header = await driver.findElement(By.id('header')).getCssValue('font-size');
    assert.strictEqual(header, '16px');
});

it('should sort items in ascending order', async function() {
    const sortButton = await driver.findElement(By.id('sortAscBtn'));
    await sortButton.click();
    const firstItem = await driver.findElement(By.css('.item:first-child')).getText();
    assert.strictEqual(firstItem, 'Expected First Item After Sorting');
});

it('should copy the selected snippet to clipboard', async function() {
    const snippet = await driver.findElement(By.css('.snippet'));
    await snippet.click();
    const copyButton = await driver.findElement(By.id('copyBtn'));
    await copyButton.click();
    const clipboardContent = await driver.executeScript('return navigator.clipboard.readText();');
    assert.strictEqual(clipboardContent, 'Expected snippet content');
});

it('should highlight selected text in the snippet', async function() {
    const snippet = await driver.findElement(By.css('.snippet'));
    await snippet.click();
    const textToHighlight = await driver.findElement(By.xpath("//span[text()='highlight me']"));
    await driver.actions().move({ origin: textToHighlight }).click().perform();
    const highlightedText = await textToHighlight.getCssValue('background-color');
    assert.strictEqual(highlightedText, 'rgb(255, 255, 0)'); // Assuming yellow highlight
});

it('should change the text color of the snippet', async function() {
    const snippet = await driver.findElement(By.css('.snippet'));
    await snippet.click();
    const colorButton = await driver.findElement(By.id('colorBtn'));
    await colorButton.click();
    const colorPicker = await driver.findElement(By.id('colorPicker'));
    await colorPicker.sendKeys('#FF5733');
    const textColor = await snippet.getCssValue('color');
    assert.strictEqual(textColor, 'rgb(255, 87, 51)');
});

it('should change the element background color on button click', async function() {
    const button = await driver.findElement(By.id('colorChangeBtn'));
    const element = await driver.findElement(By.id('colorElement'));
    
    // Get initial background color
    const initialColor = await element.getCssValue('background-color');
    assert.strictEqual(initialColor, 'rgba(255, 255, 255, 1)', "Initial background color is not as expected");
    
    await button.click();
    
    // Get background color after button click
    const updatedColor = await element.getCssValue('background-color');
    assert.notStrictEqual(updatedColor, initialColor, "Background color did not change after button click");
});

it('should focus on the input field when the focus button is clicked', async function() {
    const focusButton = await driver.findElement(By.id('focusBtn'));
    const inputField = await driver.findElement(By.id('inputField'));
    
    // Ensure input field is not focused initially
    const isFocusedBefore = await inputField.isFocused();
    assert.strictEqual(isFocusedBefore, false, "Input field should not be focused initially");
    
    await focusButton.click();
    
    // Ensure input field is focused after clicking the focus button
    const isFocusedAfter = await inputField.isFocused();
    assert.strictEqual(isFocusedAfter, true, "Input field was not focused after button click");
});

it('should update the element attribute when button is clicked', async function() {
    const updateAttributeButton = await driver.findElement(By.id('updateAttrBtn'));
    const element = await driver.findElement(By.id('elementWithAttr'));
    
    // Ensure initial attribute value is correct
    const initialAttribute = await element.getAttribute('data-status');
    assert.strictEqual(initialAttribute, 'inactive', "Initial attribute value is not as expected");
    
    await updateAttributeButton.click();
    
    // Check if the attribute value changes
    const updatedAttribute = await element.getAttribute('data-status');
    assert.strictEqual(updatedAttribute, 'active', "Attribute value was not updated correctly");
});

it('should update the text content when the button is clicked', async function() {
    const button = await driver.findElement(By.id('updateTextBtn'));
    const textElement = await driver.findElement(By.id('textElement'));
    
    // Initial text content
    const initialText = await textElement.getText();
    assert.strictEqual(initialText, "Old Text");
    
    await button.click();
    const updatedText = await textElement.getText();
    assert.strictEqual(updatedText, "New Text", "Text content was not updated after button click");
});

it('should change checkbox state after clicking the checkbox', async function() {
    const checkbox = await driver.findElement(By.id('checkbox'));
    
    // Ensure checkbox is initially unchecked
    const isCheckedBefore = await checkbox.isSelected();
    assert.strictEqual(isCheckedBefore, false, "Checkbox should be initially unchecked");
    
    await checkbox.click();
    
    // Ensure checkbox is checked after click
    const isCheckedAfter = await checkbox.isSelected();
    assert.strictEqual(isCheckedAfter, true, "Checkbox did not get checked after clicking");
});




