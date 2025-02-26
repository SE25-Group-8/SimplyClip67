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






 
 beforeEach(async function() {
    driver = new webdriver.Builder().forBrowser('chrome').build();
    await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');
});

afterEach(async function() {
    await driver.quit();
});

it('should create a new list', async function() {
    const newListButton = await driver.findElement(By.id('createList'));
    await driver.executeScript("window.prompt = function() { return 'New List'; }");
    await newListButton.click();
    const listOptions = await driver.findElements(By.css("#listDropdown option"));
    let found = false;
    for (let option of listOptions) {
        if ((await option.getText()) === "New List") {
            found = true;
            break;
        }
    }
    assert(found, "New list creation failed");
});

it('should not allow creating a list named Default', async function() {
    const newListButton = await driver.findElement(By.id('createList'));
    await driver.executeScript("window.prompt = function() { return 'Default'; }");
    await newListButton.click();
    const listOptions = await driver.findElements(By.css("#listDropdown option"));
    let defaultCount = listOptions.filter(async option => (await option.getText()) === "Default").length;
    assert.strictEqual(defaultCount, 1, "Duplicate 'Default' list was created");
});

it('should not allow creating a duplicate list', async function() {
    const newListButton = await driver.findElement(By.id('createList'));
    await driver.executeScript("window.prompt = function() { return 'Duplicate List'; }");
    await newListButton.click();
    await newListButton.click();
    const listOptions = await driver.findElements(By.css("#listDropdown option"));
    let duplicateCount = listOptions.filter(async option => (await option.getText()) === "Duplicate List").length;
    assert.strictEqual(duplicateCount, 1, "Duplicate list was created");
});

it('should add copied text to the active list', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert(clipboardItems.length > 0, "Copied text not added to the active list");
});

it('should add a new row to the active list', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert(clipboardItems.length > 0, "New row was not added to the active list");
});

it('should retain added row after switching lists', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    const listDropdown = await driver.findElement(By.id("listDropdown"));
    await listDropdown.sendKeys("Default");
    await listDropdown.sendKeys("Test List");
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert(clipboardItems.length > 0, "Added row not retained after switching lists");
});

it('should delete an element from the active list', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    const deleteButton = await driver.findElement(By.css(".delete-btn"));
    await deleteButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(clipboardItems.length, 0, "Element not deleted from list");
});

it('should edit an element without creating duplicates', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    const editButton = await driver.findElement(By.css(".tool-wrapper img[title='Edit entry']"));
    await editButton.click();
    const textElement = await driver.findElement(By.css(".list-div p"));
    await driver.executeScript("arguments[0].textContent = 'Edited Text';", textElement);
    await driver.actions().move({origin: webdriver.Origin.POINTER}).perform();
    const updatedText = await textElement.getText();
    assert.strictEqual(updatedText, "Edited Text", "Edit function failed");
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(clipboardItems.length, 1, "Edit added duplicate elements");
});

it('should switch to the newly created list', async function() {
    const newListButton = await driver.findElement(By.id('createList'));
    await driver.executeScript("window.prompt = function() { return 'New Active List'; }");
    await newListButton.click();
    const activeList = await driver.findElement(By.id("listDropdown"));
    const selectedValue = await activeList.getAttribute("value");
    assert.strictEqual(selectedValue, "New Active List", "Active list did not switch to the newly created list");
});

it('should delete a list', async function() {
    const deleteListButton = await driver.findElement(By.id("deleteList"));
    await deleteListButton.click();
    const listOptions = await driver.findElements(By.css("#listDropdown option"));
    for (let option of listOptions) {
        assert.notStrictEqual(await option.getText(), "Test List", "List was not deleted");
    }
});

it('should not allow deleting the Default list', async function() {
    const deleteListButton = await driver.findElement(By.id("deleteList"));
    await deleteListButton.click();
    const listDropdown = await driver.findElement(By.id("listDropdown"));
    const selectedValue = await listDropdown.getAttribute("value");
    assert.strictEqual(selectedValue, "Default", "Default list was deleted, but it should not be allowed");
});

it('should delete all elements when a list is deleted', async function() {
    const deleteListButton = await driver.findElement(By.id("deleteList"));
    await deleteListButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(clipboardItems.length, 0, "List deletion did not remove all elements");
});

it('should switch to Default list after deleting a list', async function() {
    const deleteListButton = await driver.findElement(By.id("deleteList"));
    await deleteListButton.click();
    const activeList = await driver.findElement(By.id("listDropdown"));
    const selectedValue = await activeList.getAttribute("value");
    assert.strictEqual(selectedValue, "Default", "Active list did not switch to Default after deletion");
});

it('should delete all elements in the list when delete all is clicked', async function() {
    const deleteAllButton = await driver.findElement(By.id("delete-btn"));
    await deleteAllButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(clipboardItems.length, 0, "Delete all did not remove all elements");
});

it('should move copied text up', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    await addButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    const firstItemText = await clipboardItems[0].getText();
    const moveUpButton = await clipboardItems[1].findElement(By.css(".tool-wrapper img[title='Move Up']"));
    await moveUpButton.click();
    const updatedClipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(await updatedClipboardItems[0].getText(), firstItemText, "Move Up failed");
});

it('should move copied text down', async function() {
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    await addButton.click();
    const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    const firstItemText = await clipboardItems[0].getText();
    const moveDownButton = await clipboardItems[0].findElement(By.css(".tool-wrapper img[title='Move Down']"));
    await moveDownButton.click();
    const updatedClipboardItems = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(await updatedClipboardItems[1].getText(), firstItemText, "Move Down failed");
});

it('should merge selected items', async function() {
    const checkboxes = await driver.findElements(By.css(".checkbox"));
    if (checkboxes.length < 2) return;
    await checkboxes[0].click();
    await checkboxes[1].click();
    const mergeButton = await driver.findElement(By.id("merge-btn"));
    await mergeButton.click();
    const clipboardList = await driver.findElement(By.id("clipboard_list"));
    assert((await clipboardList.getText()).includes(" "), "Merge failed");
});

it('should summarize text within the active list', async function() {
    const summarizeButton = await driver.findElement(By.id('summarize-btn'));
    await summarizeButton.click();
    const clipboardList = await driver.findElement(By.id('clipboard_list'));
    const summaryText = await clipboardList.getText();
    assert(summaryText.includes("Summary:"), "Summarization failed");
});

it('should have Default as the first active list', async function() {
    const activeList = await driver.findElement(By.id("listDropdown"));
    const selectedValue = await activeList.getAttribute("value");
    assert.strictEqual(selectedValue, "Default", "First active list is not Default");
});

it('should only show search results from the active list', async function() {
    const listDropdown = await driver.findElement(By.id("listDropdown"));
    await listDropdown.sendKeys("Test List");
    
    const addButton = await driver.findElement(By.id("add-btn"));
    await addButton.click();
    
    const searchInput = await driver.findElement(By.id("search-box"));
    await searchInput.sendKeys("test");
    
    const searchResults = await driver.findElements(By.css("#clipboard_list li"));
    assert(searchResults.length > 0, "Search did not return expected results from active list");
    
    await listDropdown.sendKeys("Default");
    
    const searchResultsAfterSwitch = await driver.findElements(By.css("#clipboard_list li"));
    assert.strictEqual(searchResultsAfterSwitch.length, 0, "Search results include items from a different list");
});


// TESTS FOR BG COLOR
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

let driver;

beforeEach(async function() {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');
});

afterEach(async function() {
    await driver.quit();
});

it('should change background color to red', async function() {
    const colorButton = await driver.findElement(By.id('color-red'));
    await colorButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(255, 0, 0, 1)', "Background color didn't change to red");
});

it('should change background color to blue', async function() {
    const colorButton = await driver.findElement(By.id('color-blue'));
    await colorButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(0, 0, 255, 1)', "Background color didn't change to blue");
});

it('should change background color to white', async function() {
    const colorButton = await driver.findElement(By.id('color-white'));
    await colorButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(255, 255, 255, 1)', "Background color didn't change to white");
});

it('should change background color using color picker', async function() {
    const colorPicker = await driver.findElement(By.id('color-picker'));
    await colorPicker.sendKeys('#00ff00'); // Green
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(0, 255, 0, 1)', "Background color didn't change via color picker");
});

it('should persist background color after refresh', async function() {
    const colorButton = await driver.findElement(By.id('color-yellow'));
    await colorButton.click();
    await driver.navigate().refresh();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(255, 255, 0, 1)', "Background color didn't persist after refresh");
});

it('should not change color when invalid value is entered in color picker', async function() {
    const colorPicker = await driver.findElement(By.id('color-picker'));
    await colorPicker.sendKeys('invalidColor');
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.notStrictEqual(bgColor, 'invalidColor', "Invalid color was applied");
});

it('should reset background color to default', async function() {
    const resetButton = await driver.findElement(By.id('reset-color'));
    await resetButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(255, 255, 255, 1)', "Background color reset failed");
});

it('should store selected color in local storage', async function() {
    const colorButton = await driver.findElement(By.id('color-purple'));
    await colorButton.click();
    const storedColor = await driver.executeScript("return localStorage.getItem('bgColor');");
    assert.strictEqual(storedColor, 'rgba(128, 0, 128, 1)', "Background color not stored in local storage");
});

it('should retrieve color from local storage on page load', async function() {
    await driver.executeScript("localStorage.setItem('bgColor', 'rgba(0, 128, 128, 1)');");
    await driver.navigate().refresh();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(0, 128, 128, 1)', "Stored background color was not applied");
});

it('should allow entering a custom hex color code', async function() {
    const colorInput = await driver.findElement(By.id('color-input'));
    await colorInput.sendKeys('#123456');
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.strictEqual(bgColor, 'rgba(18, 52, 86, 1)', "Hex color code input did not change the background");
});

it('should display an error message for invalid hex code', async function() {
    const colorInput = await driver.findElement(By.id('color-input'));
    await colorInput.sendKeys('#ZZZZZZ');
    const errorMsg = await driver.findElement(By.id('color-error')).getText();
    assert.strictEqual(errorMsg, 'Invalid color code', "Error message not displayed for invalid hex");
});

it('should not allow background color change when disabled', async function() {
    await driver.executeScript("document.getElementById('color-red').disabled = true;");
    const colorButton = await driver.findElement(By.id('color-red'));
    await colorButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.notStrictEqual(bgColor, 'rgba(255, 0, 0, 1)', "Background color changed despite being disabled");
});

it('should update the background preview when color is selected', async function() {
    const colorPicker = await driver.findElement(By.id('color-picker'));
    await colorPicker.sendKeys('#ff9900'); // Orange
    const preview = await driver.findElement(By.id('color-preview'));
    const previewColor = await preview.getCssValue('background-color');
    assert.strictEqual(previewColor, 'rgba(255, 153, 0, 1)', "Preview did not update correctly");
});

it('should support dark mode switch without affecting background color setting', async function() {
    const darkModeButton = await driver.findElement(By.id('dark-mode-toggle'));
    await darkModeButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.notStrictEqual(bgColor, 'rgba(0, 0, 0, 1)', "Background color changed unexpectedly with dark mode");
});

it('should allow color selection from predefined color palette', async function() {
    const colorPalette = await driver.findElement(By.id('color-palette'));
    const colorOptions = await colorPalette.findElements(By.css('.color-option'));
    await colorOptions[3].click(); // Select a color
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.notStrictEqual(bgColor, 'rgba(255, 255, 255, 1)', "Color palette selection failed");
});

// TESTS for general functionality

it('should save settings to local storage', async function() {
    const saveButton = await driver.findElement(By.id('save-settings'));
    await saveButton.click();
    const savedSettings = await driver.executeScript("return localStorage.getItem('userSettings');");
    assert(savedSettings, "Settings were not saved");
});

it('should load saved settings on refresh', async function() {
    await driver.executeScript("localStorage.setItem('userSettings', JSON.stringify({ theme: 'dark' }));");
    await driver.navigate().refresh();
    const themeSetting = await driver.executeScript("return JSON.parse(localStorage.getItem('userSettings')).theme;");
    assert.strictEqual(themeSetting, 'dark', "Settings did not persist after refresh");
});

it('should display an alert when reset settings is clicked', async function() {
    await driver.executeScript("window.alert = function(msg) { return msg; };");
    const resetButton = await driver.findElement(By.id('reset-settings'));
    await resetButton.click();
    const alertMessage = await driver.executeScript("return window.alert.arguments[0];");
    assert.strictEqual(alertMessage, "Settings reset successfully", "Reset alert did not appear");
});

it('should display a confirmation message when background color is changed', async function() {
    const colorButton = await driver.findElement(By.id('color-green'));
    await colorButton.click();
    const confirmationMessage = await driver.findElement(By.id('color-change-confirmation')).getText();
    assert.strictEqual(confirmationMessage, 'Background color changed to green', "Confirmation message didn't appear after color change");
});

it('should disable background color selection when "lock" option is enabled', async function() {
    const lockButton = await driver.findElement(By.id('lock-color'));
    await lockButton.click();
    const colorButton = await driver.findElement(By.id('color-blue'));
    await colorButton.click();
    const body = await driver.findElement(By.tagName('body'));
    const bgColor = await body.getCssValue('background-color');
    assert.notStrictEqual(bgColor, 'rgba(0, 0, 255, 1)', "Background color changed despite being locked");
});
