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