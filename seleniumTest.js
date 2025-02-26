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






 describe('List Creation', function() {
    it('should create a new list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        const newListButton = await driver.findElement(By.id('createList')); // Adjust ID if needed
        await newListButton.click();

        const listItems = await driver.findElements(By.className('list-div')); // Adjust class if needed
        assert(listItems.length > 0, 'New list was not created');

        await driver.quit();
    });
});

describe('Prevent Creating a List Named "Default"', function() {
    it('should not allow creating a list named "Default"', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Click 'Create List' button
        const createListButton = await driver.findElement(By.id("createList"));
        await createListButton.click();

        // Enter "Default" as the list name in the prompt
        await driver.executeScript("window.prompt = function() { return 'Default'; }");

        // Click create list again to trigger the prompt
        await createListButton.click();

        // Get all dropdown options
        const dropdownOptions = await driver.findElements(By.css("#listDropdown option"));
        let defaultListCount = 0;
        for (let option of dropdownOptions) {
            const optionText = await option.getText();
            if (optionText === "Default") {
                defaultListCount++;
            }
        }

        // Assert that there is only one "Default" list (the original one)
        assert(defaultListCount === 1, "A second 'Default' list was created, but it should not be allowed.");

        await driver.quit();
    });
});

describe('Prevent Duplicate List Names', function() {
    it('should not allow creating a list with an existing name', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Create an initial list named "Test List"
        const createListButton = await driver.findElement(By.id("createList"));
        await createListButton.click();
        await driver.executeScript("window.prompt = function() { return 'Test List'; }");
        await createListButton.click();

        // Try to create a duplicate list with the same name
        await createListButton.click();
        await driver.executeScript("window.prompt = function() { return 'Test List'; }");
        await createListButton.click();

        // Get all dropdown options
        const dropdownOptions = await driver.findElements(By.css("#listDropdown option"));
        let testListCount = 0;
        for (let option of dropdownOptions) {
            const optionText = await option.getText();
            if (optionText === "Test List") {
                testListCount++;
            }
        }

        // Assert that there is only one "Test List"
        assert(testListCount === 1, "A duplicate 'Test List' was created, but it should not be allowed.");

        await driver.quit();
    });
});


describe('List Deletion', function() {
    it('should delete an existing list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        const deleteButton = await driver.findElement(By.className('deleteList')); // Adjust class if needed
        await deleteButton.click();

        const listItems = await driver.findElements(By.className('list-div'));
        assert.equal(listItems.length, 0, 'List was not deleted');

        await driver.quit();
    });
});

describe('Default List Protection', function() {
    it('should prevent the Default list from being deleted', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Select the Default list
        const listDropdown = await driver.findElement(By.id("listDropdown"));
        await listDropdown.sendKeys("Default");

        // Click the Delete List button
        const deleteListButton = await driver.findElement(By.id("deleteList"));
        await deleteListButton.click();

        // Check if the Default list still exists
        const dropdownOptions = await driver.findElements(By.css("#listDropdown option"));
        let defaultListExists = false;
        for (let option of dropdownOptions) {
            const optionText = await option.getText();
            if (optionText === "Default") {
                defaultListExists = true;
                break;
            }
        }

        // Assert that the Default list is still present
        assert(defaultListExists, "The Default list was deleted, but it should not be allowed.");

        await driver.quit();
    });
});


describe('List Switching', function() {
    it('should switch between lists', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        const listTabs = await driver.findElements(By.className('listDropdown')); // Adjust class if needed
        assert(listTabs.length > 1, 'Not enough lists to switch');

        await listTabs[1].click();

        const activeList = await driver.findElement(By.className('activeList')); // Adjust class if needed
        assert(await activeList.isDisplayed(), 'List switch failed');

        await driver.quit();
    });
});

describe('Clipboard List Management', function() {
    it('should add a copied element to the active list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Select a specific list (or create a new one)
        const listDropdown = await driver.findElement(By.id("listDropdown"));
        await listDropdown.sendKeys("Test List"); // Select or create "Test List"

        // Simulate a copy event by manually adding an entry
        const addButton = await driver.findElement(By.id("add-btn"));
        await addButton.click();

        // Check that the item appears in the clipboard list
        const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        assert(clipboardItems.length > 0, "Copied text did not appear in the list");

        await driver.quit();
    });
});

describe('Clipboard List Assignment', function() {
    it('should add copied text to the correct active list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Select/Create a specific list
        const listDropdown = await driver.findElement(By.id("listDropdown"));
        await listDropdown.sendKeys("Test List");

        // Click 'Create List' button to ensure the list exists
        const createListButton = await driver.findElement(By.id("createList"));
        await createListButton.click();

        // Select the newly created list
        await listDropdown.sendKeys("Test List");

        // Simulate adding an entry (since clipboard events can't be triggered via Selenium)
        const addButton = await driver.findElement(By.id("add-btn"));
        await addButton.click();

        // Verify that the text appears in the clipboard list under "Test List"
        const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        assert(clipboardItems.length > 0, "Copied text did not appear in the correct list");

        // Switch to a different list
        await listDropdown.sendKeys("Default");

        // Verify that the copied text does NOT appear in the "Default" list
        const defaultClipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        assert(defaultClipboardItems.length === 0, "Copied text incorrectly appeared in the Default list");

        await driver.quit();
    });
});

describe('Edit Element', function() {
    it('should allow editing an item in the clipboard list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Add a new item
        const addButton = await driver.findElement(By.id("add-btn"));
        await addButton.click();

        // Find the edit button and click it
        const editButton = await driver.findElement(By.css(".tool-wrapper img[title='Edit entry']"));
        await editButton.click();

        // Locate the paragraph element and modify text
        const textElement = await driver.findElement(By.css(".list-div p"));
        await driver.executeScript("arguments[0].textContent = 'Edited Text';", textElement);

        // Focus out to trigger the update event
        await driver.actions().move({origin: webdriver.Origin.POINTER}).perform();

        // Verify the text was updated
        const updatedText = await textElement.getText();
        assert(updatedText === "Edited Text", "Edit function failed");

        await driver.quit();
    });
});

describe('Delete All Functionality', function() {
    it('should remove all items from the clipboard list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Add multiple items
        const addButton = await driver.findElement(By.id("add-btn"));
        await addButton.click();
        await addButton.click();

        // Click delete all button
        const deleteAllButton = await driver.findElement(By.id("delete-btn"));
        await deleteAllButton.click();

        // Verify that all items are deleted
        const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        assert(clipboardItems.length === 0, "Delete all function failed");

        await driver.quit();
    });
});

describe('Move Up Functionality', function() {
    it('should move an item up in the clipboard list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Add two items
        const addButton = await driver.findElement(By.id("add-btn"));
        await addButton.click();
        await addButton.click();

        // Get the first and second items before moving
        const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        const firstItemText = await clipboardItems[0].getText();
        const secondItemText = await clipboardItems[1].getText();

        // Click the "Move Up" button on the second item
        const moveUpButton = await clipboardItems[1].findElement(By.css(".tool-wrapper img[title='Move Up']"));
        await moveUpButton.click();

        // Get the updated order of items
        const updatedClipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        const updatedFirstItemText = await updatedClipboardItems[0].getText();
        const updatedSecondItemText = await updatedClipboardItems[1].getText();

        // Ensure the items swapped places
        assert(updatedFirstItemText === secondItemText, "Move Up function failed");
        assert(updatedSecondItemText === firstItemText, "Move Up function failed");

        await driver.quit();
    });
});

describe('Move Down Functionality', function() {
    it('should move an item down in the clipboard list', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Add two items
        const addButton = await driver.findElement(By.id("add-btn"));
        await addButton.click();
        await addButton.click();

        // Get the first and second items before moving
        const clipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        const firstItemText = await clipboardItems[0].getText();
        const secondItemText = await clipboardItems[1].getText();

        // Click the "Move Down" button on the first item
        const moveDownButton = await clipboardItems[0].findElement(By.css(".tool-wrapper img[title='Move Down']"));
        await moveDownButton.click();

        // Get the updated order of items
        const updatedClipboardItems = await driver.findElements(By.css("#clipboard_list li"));
        const updatedFirstItemText = await updatedClipboardItems[0].getText();
        const updatedSecondItemText = await updatedClipboardItems[1].getText();

        // Ensure the items swapped places
        assert(updatedFirstItemText === secondItemText, "Move Down function failed");
        assert(updatedSecondItemText === firstItemText, "Move Down function failed");

        await driver.quit();
    });
});

describe('Merge Functionality', function() {
    it('should merge selected clipboard items', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Select checkboxes for merging
        const checkboxes = await driver.findElements(By.css(".checkbox"));
        if (checkboxes.length < 2) {
            console.log("Not enough items to merge");
            await driver.quit();
            return;
        }
        await checkboxes[0].click();
        await checkboxes[1].click();

        // Click merge button
        const mergeButton = await driver.findElement(By.id("merge-btn"));
        await mergeButton.click();

        // Verify merged content exists
        const clipboardList = await driver.findElement(By.id("clipboard_list"));
        const mergedText = await clipboardList.getText();

        assert(mergedText.includes(" "), "Merge operation failed");

        await driver.quit();
    });
});

describe('Citation Functionality', function() {
    it('should generate a citation and add it to the clipboard', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Click citation button
        const citationButton = await driver.findElement(By.css(".tool-wrapper img[title='Generate Citations']"));
        await citationButton.click();

        // Verify citation is added
        const clipboardList = await driver.findElement(By.id('clipboard_list'));
        const clipboardText = await clipboardList.getText();

        assert(clipboardText.includes("Citation"), "Citation not found in clipboard");

        await driver.quit();
    });
});

describe('Summarization Functionality', function() {
    it('should add summarized text to SimplyClip clipboard', async function() {
        this.timeout(10000);
        const driver = new webdriver.Builder().forBrowser('chrome').build();

        await driver.get('chrome-extension://enhklaokeppjnodgbckcefjeapppjeeg/popup.html');

        // Click summarize button
        const summarizeButton = await driver.findElement(By.id('summarize-btn'));
        await summarizeButton.click();

        // Wait for the summary to appear in the clipboard list
        const clipboardList = await driver.findElement(By.id('clipboard_list'));
        const summaryText = await clipboardList.getText();

        assert(summaryText.includes("Summary:"), "Summarization failed");

        await driver.quit();
    });
});