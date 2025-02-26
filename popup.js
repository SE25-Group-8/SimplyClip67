/*
MIT License
Copyright (c) 2021 lalit10
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const checkbox = document.getElementById('dark_mode')
checkbox.addEventListener('click',checkMode)


let _clipboardList = document.querySelector("#clipboard_list");
let addButton = document.getElementById('add-btn');

function doDjangoCall(type, url, data, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                var response = xmlhttp.responseText;
                // Assuming backend returns plain text
                if (callback) callback(response);
            } else {
                console.error('Error in AJAX request:', xmlhttp.statusText);
                showSnackbar('Error in AJAX request.');
            }
        }
    };

    xmlhttp.open(type, url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    if (type === 'POST') {
        const encodedData = Object.keys(data).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        xmlhttp.send(encodedData);
    } else {
        xmlhttp.send();
    }
}

addButton.addEventListener('click', (event) => {
        let textitem = ''
        let emptyDiv = document.getElementById('empty-div');
        let downloadDiv1 = document.getElementById('download-btn1');
        let downloadDiv2 = document.getElementById('download-btn2');
        let searchInput = document.getElementById('searchText');


        emptyDiv.classList.add('hide-div');
        downloadDiv1.style.display = 'block';
        downloadDiv2.style.display = 'block';
        document.getElementsByClassName('doc')[0].addEventListener('click', (event) => {
            downloadClipboardTextAsDoc()
        })
        document.getElementsByClassName('csv')[0].addEventListener('click', (event) => {
            downloadClipboardTextAsCsv()
        })
        searchInput.style.display = 'block';
        searchInput.addEventListener('keyup', () => {
            searchClipboardText();
        })
        chrome.storage.sync.get(['list','listcolor'], text => {
            let list = text.list;
            let listcolor = text.listcolor;
            list == undefined && (list = []);
            list.unshift("");
            listcolor.unshift("black");
            chrome.storage.sync.set({ 'list': list, 'listcolor': listcolor  })
        })
        chrome.storage.sync.get(['listURL'], url => {
            let urlList = url.listURL;
            urlList == undefined && (urlList = []);
            urlList.unshift("");
            chrome.storage.sync.set({ 'listURL': urlList })
        })
        chrome.storage.sync.get(['originalList'], original => {
            let originalList = original.originalList;
            originalList == undefined && (originalList = []);
            originalList.unshift("");
            chrome.storage.sync.set({ 'originalList': originalList })
        })
        addClipboardListItem(textitem)
    }
)



/**
 * Create, Switch, and Delete Lists
 */

document.addEventListener("DOMContentLoaded", function () {
    const listDropdown = document.getElementById("listDropdown");
    const createListButton = document.getElementById("createList");
    const deleteListButton = document.getElementById("deleteList");

    // Load lists and active list
    chrome.storage.sync.get(["lists", "activeList"], function (data) {
        let lists = data.lists || { "Default": [] };
        let activeList = data.activeList || "Default";

        updateDropdown(lists, activeList);
    });

    // Function to update dropdown
    function updateDropdown(lists, activeList) {
        listDropdown.innerHTML = "";
        Object.keys(lists).forEach(list => {
            let option = document.createElement("option");
            option.value = list;
            option.textContent = list;
            if (list === activeList) {
                option.selected = true;
            }
            listDropdown.appendChild(option);
        });
    }

    // Switch active list
    listDropdown.addEventListener("change", function () {
        chrome.storage.sync.set({ "activeList": listDropdown.value });
    });

    // Create new list using a prompt
    createListButton.addEventListener("click", function () {
        let newList = prompt("Enter a name for the new list:");
        if (newList && newList.trim() && newList !== "Default") {
            newList = newList.trim();
            chrome.storage.sync.get("lists", function (data) {
                let lists = data.lists || { "Default": [] };
                if (!lists[newList]) {
                    lists[newList] = [];
                    chrome.storage.sync.set({ "lists": lists, "activeList": newList }, function () {
                        updateDropdown(lists, newList);
                    });
                }
            });
        }
    });

    // Delete a list (except Default)
    deleteListButton.addEventListener("click", function () {
        let selectedList = listDropdown.value;
        if (selectedList !== "Default") {
            chrome.storage.sync.get("lists", function (data) {
                let lists = data.lists || { "Default": [] };
                delete lists[selectedList];

                chrome.storage.sync.set({ "lists": lists, "activeList": "Default" }, function () {
                    updateDropdown(lists, "Default");
                });
            });
        }
    });
});



/**
 * Gets the copied text from storage and calls addClipboardListItem function to populate list in the pop-up
 * @example
 *  getClipboardText()
 */


function getClipboardText() {

    chrome.storage.sync.get(['list','listcolor'], clipboard => {
      let list=clipboard.list;
      let listcolor=clipboard.listcolor;


        // Fallbacks for undefined lists
        
       
       
        let emptyDiv = document.getElementById('empty-div');
        let downloadDiv1 = document.getElementById('download-btn1');
        let downloadDiv2 = document.getElementById('download-btn2');
        let searchInput = document.getElementById('searchText');
        let highlightInput = document.getElementById('highlight-search');
        let deleteAll = document.getElementById('delete-btn');
        if (list === undefined || list.length === 0) {
            emptyDiv.classList.remove('hide-div');
            downloadDiv1.style.display = 'none';
            downloadDiv2.style.display = 'none';
            searchInput.style.display = 'none';
            highlightInput.style.display = 'none';
            deleteAll.style.display = 'none';
        }
        else {
            emptyDiv.classList.add('hide-div');
            downloadDiv1.style.display = 'block';
            downloadDiv2.style.display = 'block';
            deleteAll.style.display = 'block';
            document.getElementsByClassName('doc')[0].addEventListener('click', (event) => {
                downloadClipboardTextAsDoc()
            })
            document.getElementsByClassName('csv')[0].addEventListener('click', (event) => {
                downloadClipboardTextAsCsv()
            })
            searchInput.style.display = 'block';
            searchInput.addEventListener('keyup', () => {
                searchClipboardText();
            })
            deleteAll.addEventListener('click',() => {
                deleteAllText();
            })
            if (typeof list !== undefined)
                list.forEach(item => {
                    indexOfItem = list.indexOf(item);
                    if (typeof listcolor !== 'undefined' && typeof listcolor[indexOfItem] !== 'undefined') {
                        color = listcolor[indexOfItem];
                      } else {
                        color = 'black';
                      }
                    addClipboardListItem(item,color);
                });

               
        }
    });
    getClipboardImages();
}

function getClipboardImages() {
    chrome.storage.local.get(['imageList'], result => {
      let imageList = result.imageList || [];
      if (imageList.length === 0) {
        // Handle empty image list if necessary
      } else {
        imageList.forEach(imageDataUrl => {
          addClipboardImageItem(imageDataUrl);
        });
      }
    });
}
  
function addClipboardImageItem(imageDataUrl) {
    let listItem = document.createElement("li"),
      listDiv = document.createElement("div"),
      deleteDiv = document.createElement("div"),
      upArrowDiv = document.createElement("div"),
      downArrowDiv = document.createElement("div"),
      contentDiv = document.createElement("div"),
      imageElement = document.createElement("img"),
      deleteImage = document.createElement("img"),
      upArrowImage = document.createElement("img"),
      downArrowImage = document.createElement("img");
  
    imageElement.src = imageDataUrl;
    imageElement.style.maxWidth = "100%";
    imageElement.style.maxHeight = "100px";
    imageElement.addEventListener("click", () => {
      copyImageToClipboard(imageDataUrl);
      showSnackbar("Image copied!");
    });
  
    listDiv.appendChild(imageElement);
    listDiv.classList.add("list-div");
  
    deleteImage.src = "./images/delete-note.png";
    deleteImage.classList.add("delete");
    deleteImage.setAttribute("data-toggle", "tooltip");
    deleteImage.setAttribute("title", "Click to delete the image entry!");
  
    upArrowImage.src = "./images/upArrow.png";
    upArrowImage.classList.add("upArrow");
    upArrowImage.setAttribute("data-toggle", "tooltip");
    upArrowImage.setAttribute("title", "Click to move up the image entry!");
  
    downArrowImage.src = "./images/downArrow.png";
    downArrowImage.classList.add("downArrow");
    downArrowImage.setAttribute("data-toggle", "tooltip");
    downArrowImage.setAttribute("title", "Click to move down the image entry!");
  
    deleteDiv.appendChild(deleteImage);
    upArrowDiv.appendChild(upArrowImage);
    downArrowDiv.appendChild(downArrowImage);
  
    contentDiv.appendChild(listDiv);
    contentDiv.appendChild(deleteDiv);
    contentDiv.appendChild(upArrowDiv);
    contentDiv.appendChild(downArrowDiv);
    contentDiv.classList.add("content");
    listItem.appendChild(contentDiv);
    _clipboardList.appendChild(listItem);
  
    deleteImage.addEventListener("click", () => {
      deleteImageItem(imageDataUrl);
    });
  
    upArrowImage.addEventListener("click", () => {
      moveImageItemUp(imageDataUrl);
    });
  
    downArrowImage.addEventListener("click", () => {
      moveImageItemDown(imageDataUrl);
    });
  }
  
  function deleteImageItem(imageDataUrl) {
    chrome.storage.local.get(["imageList"], function (result) {
      let imageList = result.imageList || [];
      let index = imageList.indexOf(imageDataUrl);
      if (index !== -1) {
        imageList.splice(index, 1);
        chrome.storage.local.set({ imageList: imageList }, () => {
          _clipboardList.innerHTML = "";
          getClipboardText();
        });
      }
    });
  }
  
  function moveImageItemUp(imageDataUrl) {
    chrome.storage.local.get(["imageList"], function (result) {
      let imageList = result.imageList || [];
      let index = imageList.indexOf(imageDataUrl);
      if (index > 0) {
        [imageList[index - 1], imageList[index]] = [imageList[index], imageList[index - 1]];
        chrome.storage.local.set({ imageList: imageList }, () => {
          _clipboardList.innerHTML = "";
          getClipboardText();
        });
      }
    });
  }
  
  function moveImageItemDown(imageDataUrl) {
    chrome.storage.local.get(["imageList"], function (result) {
      let imageList = result.imageList || [];
      let index = imageList.indexOf(imageDataUrl);
      if (index < imageList.length - 1) {
        [imageList[index], imageList[index + 1]] = [imageList[index + 1], imageList[index]];
        chrome.storage.local.set({ imageList: imageList }, () => {
          _clipboardList.innerHTML = "";
          getClipboardText();
        });
      }
    });
  }
  
  
/**
 * Gets the source URL and the image url for the copied image/text
 * @param {*} textContent
 * @returns
 */
function getThumbnail(textContent) {
    let ind = textContent.indexOf('https://www.youtube.com/');
    if (ind === 0) {
        let videoId = "";
        let idIndex = textContent.indexOf('watch?v=');
        let endIndex = textContent.indexOf('&');
        if (endIndex !== -1)
            videoId = textContent.substring(idIndex + 8, endIndex);
        else
            videoId = textContent.substring(idIndex + 8, textContent.length);
        let url = `https://img.youtube.com/vi/${videoId}/1.jpg`;
        return {
            sourceUrl: textContent,
            imageUrl: url,
            isVideo: true,
        };
    }
    else if (textContent.startsWith('http://') || textContent.startsWith('https://')) {
        let url = new URL(textContent);
        return {
            sourceUrl: textContent,
            imageUrl: "https://favicons.githubusercontent.com/" + url.hostname,
            isVideo: false,
            type: 'url'
        };
    }
    return {
        sourceUrl: "",
        imageUrl: "",
        isVideo: false,
        type: 'text'
    }
        ;
} 
/**
 * Creates an HTML li element and adds the input text, icon to edit, icon to delete
 * Contains click event listeners for edit and delete icon
 * @param {*} text
 * @example
 * addClipboardListItem("123")
 */
// Function to enable highlighting mode
function enableHighlightMode(element) {
    let selectedText = "";

    // Listen for selection
    element.addEventListener("mouseup", function onMouseUp() {
        const selection = window.getSelection();
        selectedText = selection.toString();
        
        if (selectedText) {
            const range = selection.getRangeAt(0);
            const highlightSpan = document.createElement("span");
            highlightSpan.classList.add("highlighted-text");
            highlightSpan.style.backgroundColor = "yellow";
            highlightSpan.textContent = selectedText;
            
            range.deleteContents();
            range.insertNode(highlightSpan);
            
            saveHighlight(element.getAttribute("data-text"), element.innerHTML);
            
            // Remove selection after highlighting
            window.getSelection().removeAllRanges();
            element.removeEventListener("mouseup", onMouseUp);  // Remove listener after highlight
        }
    });
}

// Save highlighted text to Chrome storage
function saveHighlight(originalText, highlightedHTML) {
    chrome.storage.sync.get(['highlights'], data => {
        const highlights = data.highlights || {};
        highlights[originalText] = highlightedHTML;  // Store highlighted HTML by original text
        chrome.storage.sync.set({ highlights });
    });
}

// Apply saved highlights when loading clipboard items
function applySavedHighlights(element, originalText) {
    chrome.storage.sync.get(['highlights'], data => {
        const highlights = data.highlights || {};
        if (highlights[originalText]) {
            element.innerHTML = highlights[originalText];  // Set highlighted HTML
        }
    });
}


function addClipboardListItem(text,item_color) {

    // 1] Creating elements

    let { sourceUrl, imageUrl, isVideo, type } = getThumbnail(text);
    console.log("Thumbnail details:", { sourceUrl, imageUrl, isVideo, type });
    let listItem = document.createElement("li");
    let iconImage = document.createElement("img");

    if (type === 'youtube') {
        iconImage.src = './images/youtube_icon.png';
    } else if (type === 'url') {
        iconImage.src = './images/url_icon.png';
    } else {
        iconImage.src = './images/default_icon.png';  // Default icon for text or unknown types
    }

    listItem.classList.add("listitem");
    if (type === 'youtube') listItem.classList.add("youtube-link");
    else if (type === 'url') listItem.classList.add("general-link");
    else listItem.classList.add("text-entry");
    
    let contentDiv = document.createElement("div"),
    listDiv = document.createElement("div"),
    toolsDiv = document.createElement("div"),
    
    selectDiv = document.createElement("div")
    editDiv = document.createElement("div"),
    deleteDiv = document.createElement("div"),
    colorTabsDiv = document.createElement("div"),
    upArrowDiv = document.createElement("div"),
    downArrowDiv = document.createElement("div"),
    citDiv = document.createElement("div"),
    
    editImage = document.createElement("img"),
    deleteImage = document.createElement("img"),
    citImage = document.createElement("img"),
    upArrowImage = document.createElement("img"),
    downArrowImage = document.createElement("img");

    //highlightButton = document.createElement("button"),
    // summDiv = document.createElement("div")

        // Set up highlight button
    //highlightButton.textContent = "Highlight";
    //highlightButton.classList.add("highlight-button");
    //highlightButton.setAttribute("title", "Select text to highlight");
    //highlightButton.addEventListener('click', () => enableHighlightMode(listPara));

    // Apply existing highlights from storage if any
    //applySavedHighlights(listPara, text);

    // 2] Adding para and tools 

    let listPara = document.createElement("p");
    listPara.style.color = item_color;
    listPara.style.height = 'auto';
    listPara.style.whiteSpace = 'pre-wrap'; // Enables text wrapping
    listPara.classList.add("data");
    let popupLink = document.createElement('a');
    let imagePopup = document.createElement('img');
    prevText = text;
    let listText = document.createTextNode(text);
    listPara.appendChild(listText)
    listDiv.appendChild(listPara);
    listDiv.classList.add("list-div");
    contentDiv.appendChild(listDiv);

    // Tools div will contain tools such as edit,delete, up/down arrows and so on
    toolsDiv.classList.add("tools");

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    editImage.src = './images/flaticons/edit-icon.png';
    deleteImage.src = './images/flaticons/delete-icon.png';
    citImage.src = './images/flaticons/cite-icon.png';
    upArrowImage.src = './images/flaticons/double-up-arrow.png';
    downArrowImage.src = '/images/flaticons/double-down-arrow.png';
    // summImage.src = './images/summarizer.png';
    // summImage.classList.add("summarize");

    selectDiv.appendChild(checkbox);
    editDiv.appendChild(editImage);
    deleteDiv.appendChild(deleteImage);
    var listOfTabColors = document.createElement('select');
    listOfTabColors.classList.add('dropdown');
    listOfTabColors.setAttribute("name", "color");
    listOfTabColors.setAttribute("id", "color");
    listOfTabColors.classList.add("color");
    listOfTabColors.classList.add("dropdown");
    listOfTabColors.style.width = "20px";
    listOfTabColors.style.height = "22px";
    colorTabsDiv.appendChild(listOfTabColors);
    citDiv.appendChild(citImage);
    upArrowDiv.appendChild(upArrowImage);
    downArrowDiv.appendChild(downArrowImage);

    selectDiv.classList.add("tool-wrapper");
    editDiv.classList.add("tool-wrapper");
    deleteDiv.classList.add("tool-wrapper");
    colorTabsDiv.classList.add("tool-wrapper");
    citDiv.classList.add("tool-wrapper");
    upArrowDiv.classList.add("tool-wrapper");
    downArrowDiv.classList.add("tool-wrapper");
    toolsDiv.appendChild(selectDiv);
    toolsDiv.appendChild(editDiv);
    toolsDiv.appendChild(deleteDiv);
    toolsDiv.appendChild(colorTabsDiv);
    toolsDiv.appendChild(citDiv);    
    toolsDiv.appendChild(upArrowDiv);
    toolsDiv.appendChild(downArrowDiv);
    contentDiv.appendChild(toolsDiv);

    // 3] Adding tooltips 

    listPara.setAttribute("data-toggle", "tooltip");
    listPara.setAttribute("data-placement", "bottom");
    listPara.setAttribute("title", "Click to copy the below text:\n" + text + "\n" + "Word count:\n"+text.split(' ').length);

    selectDiv.setAttribute("data-toggle", "tooltip");
    selectDiv.setAttribute("data-placement", "bottom");
    selectDiv.setAttribute("title", "Select Entry");
    
    editDiv.setAttribute("data-toggle", "tooltip");
    editDiv.setAttribute("data-placement", "bottom");
    editDiv.setAttribute("title", "Edit entry");

    deleteDiv.setAttribute("data-toggle", "tooltip");
    deleteDiv.setAttribute("data-placement", "bottom");
    deleteDiv.setAttribute("title", "Delete Entry");

    colorTabsDiv.setAttribute("data-toggle", "tooltip");
    colorTabsDiv.setAttribute("data-placement", "bottom");
    colorTabsDiv.setAttribute("title", "Change color");

    citDiv.setAttribute("data-toggle", "tooltip");
    citDiv.setAttribute("data-placement", "bottom");
    citDiv.setAttribute("title", "Generate Citations");

    upArrowDiv.setAttribute("data-toggle", "tooltip");
    upArrowDiv.setAttribute("data-placement", "bottom");
    upArrowDiv.setAttribute("title", "Move Up");

    downArrowDiv.setAttribute("data-toggle", "tooltip");
    downArrowDiv.setAttribute("data-placement", "bottom");
    downArrowDiv.setAttribute("title", "Move Down");

    // summImage = document.createElement("img");
    // summImage.setAttribute("data-toggle", "tooltip");
    // summImage.setAttribute("data-placement", "bottom");
    // summImage.setAttribute("title", "Click to summarize the text entry!");

    // 4] Event Listeners

    listPara.addEventListener('focusout', (event) => {
        event.target.setAttribute("contenteditable", "false");
        listPara.style.height = '4em';
        listPara.style.whiteSpace = 'inherit'
        newText = event.target.textContent;
        chrome.storage.sync.get(['list'], clipboard => {
            let list = clipboard.list;
            let index = list.indexOf(prevText);
            list[index] = newText;
            _clipboardList.innerHTML = "";
            chrome.storage.sync.set({ 'list': list }, (parameter) => {
                getClipboardText();
                console.log("hello");
            });
        })
    })

    editDiv.addEventListener('click', (event) => {
        console.log("Edit button clicked");
        prevText = listPara.textContent;
        console.log(prevText);
        listPara.setAttribute("contenteditable", "true");

        listPara.style.height = 'auto';
        listPara.style.whiteSpace = 'break-spaces';
        listPara.focus();
        // listDiv.style.borderColor = "red";
        // listPara.style.backgroundColor = "grey"
        // listPara.style.height = "100px"
        //listPara.focus();
    })

    deleteDiv.addEventListener('click', (event) => {
        console.log("Delete clicked");
        deleteElem(text);
    })

    // Create choices
    let colorchoices = [];
    colorchoices = ["Black", "Blue", "Red", "Green"];
    console.log(colorchoices);
    colorchoices.forEach((value, key) => {
        var option = document.createElement("option");
        option.value = value.toLowerCase();
        option.text = value;
        if (option.value === item_color) {
            option.selected = true;
        }
        listOfTabColors.appendChild(option);
    })

    // Add event listener to listOfTabColors

    listOfTabColors.addEventListener('change', (event) => {
        console.log("Color changed");

        console.log(event.target.value);
        selected_color = event.target.value;

        console.log(event);
        //Change text color based on selected option
        listPara.style.color = selected_color;

        listPara.style.height = 'auto';
        listPara.style.whiteSpace = 'break-spaces';
        listPara.focus();
        chrome.storage.sync.get(['list'], clipboard => {
            let list = clipboard.list;
            let index = list.indexOf(listPara.textContent);
            chrome.storage.sync.get(['listcolor'], colors => {
                let listcolor = colors.listcolor;
                if(listcolor === undefined){
                    listcolor = [];
                }
                listcolor[index] = selected_color;
                 chrome.storage.sync.set({ 'listcolor': listcolor });
             })
            chrome.storage.sync.set({ 'list': list });
        })
    });


    //summDiv.appendChild(summImage);
    //contentDiv.appendChild(summDiv);


    function doDjangoCall(type, url, data, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
              var data = xmlhttp.responseText;
              if (callback) callback(data);
            } else {
              console.error('Error in AJAX request:', xmlhttp.statusText);
              showSnackbar('Error in AJAX request.');
            }
          }
        };
      
        xmlhttp.open(type, url, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
        if (type === 'POST') {
          const encodedData = Object.keys(data).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
          }).join('&');
          xmlhttp.send(encodedData);
        } else {
          xmlhttp.send();
        }
      }


    citDiv.addEventListener('click', (event) => {
        console.log("Citation button clicked");
        let inputText = listPara.textContent.trim();
        
        doDjangoCall(
            "POST",
            "http://127.0.0.1:8000/text/getcitation",
            { 'citation_input': inputText },
            function (data) {
            const citationText = data;
        
            if (citationText) {
                // Copy the citation to the clipboard
                navigator.clipboard.writeText(citationText).then(function() {
                console.log('Citation copied to clipboard');
                showSnackbar('Citation copied to clipboard!');
                }, function(err) {
                console.error('Could not copy citation: ', err);
                showSnackbar('Failed to copy citation to clipboard.');
                });
            } else {
                console.error('Citation generation failed:', data);
                showSnackbar('Citation generation failed.');
            }
            }
        );
        });



    upArrowDiv.addEventListener('click', (event) => {
    console.log("Up arrow clicked");
    chrome.storage.sync.get(['list','listcolor'], clipboard => {
        let list = clipboard.list;
        let listcolor = clipboard.listcolor;
        let index = list.indexOf(text);
        if(index != 0){
            let temp=list[index];
            prevcolor=listcolor[index];
            list[index]=list[index-1];
            list[index-1]=temp;
            listcolor[index]=listcolor[index-1];
            listcolor[index-1]=prevcolor;
            _clipboardList.innerHTML = "";
        }

        chrome.storage.sync.get(['listURL'], url => {
            let urlList = url.listURL;
            if(index != 0){
                let temp=urlList[index];
                urlList[index]=urlList[index-1];
                urlList[index-1]=temp;
                chrome.storage.sync.set({ 'listURL': urlList });
            }
        })

        chrome.storage.sync.get(['originalList'], original => {
            let originalList = original.originalList;
            if(index != 0){
                let temp=originalList[index];
                originalList[index]=originalList[index-1];
                originalList[index-1]=temp;
                chrome.storage.sync.set({ 'originalList': originalList });
            }
        })

        if(index!=0)
            chrome.storage.sync.set({ 'list': list, 'listcolor': listcolor }, () => getClipboardText());});
    })

    downArrowDiv.addEventListener('click', (event) => {
        console.log("Down arrow clicked");
        chrome.storage.sync.get(['list','listcolor'], clipboard => {
            let list = clipboard.list;
            let colordata = clipboard.listcolor;
            let index = list.indexOf(text);
            if(index != list.length-1){
                let temp=list[index];
                let previouscolor=colordata[index];
                list[index]=list[index+1];
                list[index+1]=temp;
                colordata[index]=colordata[index+1];
                colordata[index+1]=previouscolor;
                _clipboardList.innerHTML = "";
            }

            chrome.storage.sync.get(['listURL'], url => {
                let urlList = url.listURL;
                if(index != urlList.length-1){
                    let temp=urlList[index];
                    urlList[index]=urlList[index+1];
                    urlList[index+1]=temp;
                    chrome.storage.sync.set({ 'listURL': urlList });
                }
            })

            chrome.storage.sync.get(['originalList'], original => {
                let originalList = original.originalList;
                if(index != originalList.length-1){
                    let temp=originalList[index];
                    originalList[index]=originalList[index+1];
                    originalList[index+1]=temp;
                    chrome.storage.sync.set({ 'originalList': originalList });
                }
            })
            if(index != list.length-1)
                chrome.storage.sync.set({ 'list': list, 'listcolor': colordata }, (parameter) => {getClipboardText()});
        })
    });

    listDiv.addEventListener('click', (event) => {
        let { textContent } = event.target;
        navigator.clipboard.writeText(textContent)
            .then(() => {
                console.log(`Text saved to clipboard`);
                chrome.storage.sync.get(['list','listcolor'], clipboard => {
                    let list = clipboard.list;
                    let colordata = clipboard.listcolor;
                    let index = list.indexOf(textContent);
                    if(list == undefined)
                        list=[];
                    if (index !== -1)
                        list.splice(index, 1);
                    if(colordata == undefined)
                        colordata=[];
                    colordata.splice(index, 1);
                    list.unshift(textContent);
                    colordata.unshift("black");
                    _clipboardList.innerHTML = "";
                    chrome.storage.sync.set({ 'list': list, 'listcolor': colordata}, () => getClipboardText());
                });
            });
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 300);
    });

    // 5] Other

    if (imageUrl.length > 0) {
        console.log("IMage Url found")
        if(imageUrl.includes("youtube.com"))
        {
            imagePopup.src = './images/youtube_icon.png';
            imagePopup.style['margin-left'] = '10%';
            imagePopup.style['margin-top'] = '50%';
        }
        else
        {
            imagePopup.src = './images/url_icon.png';
            imagePopup.style['margin-left'] = '10%';
            imagePopup.style['margin-top'] = '50%';
        }
        if (!isVideo) {
            imagePopup.style.width = '32px'
            imagePopup.style.height = '32px';

        }
        else {
            listPara.style['max-width'] = '12rem';
            imagePopup.style.width = '32px';
            imagePopup.style.height = '32px';

        }
        popupLink.href = sourceUrl;
        popupLink.target = '_blank';
        popupLink.appendChild(imagePopup);
        listDiv.appendChild(popupLink);

    }

    contentDiv.classList.add("content");
    listItem.appendChild(contentDiv);
    _clipboardList.appendChild(listItem);
}

// Add event listener for the new summarization button
document.getElementById('summarize-btn').addEventListener('click', () => {
    console.log("Global Summarize button clicked");

    // Fetch all copied texts
    chrome.storage.sync.get(['originalList'], data => {
        let texts = data.originalList || [];

        if (texts.length === 0) {
            showSnackbar("No texts to summarize.");
            return;
        }

        // Optional: Show a loading indicator
        showSnackbar("Generating summary...");

        // Send texts to backend for summarization
        doDjangoCall(
            "POST",
            "http://127.0.0.1:8000/text/summarize_all",
            { 'texts': JSON.stringify(texts) },
            function (data) {
                const summaryText = data;

                if (summaryText) {
                    // Generate and download Word document
                    downloadSummaryAsDoc(summaryText);
                    showSnackbar("Summary downloaded as Word document!");
                } else {
                    console.error('Summarization failed:', data);
                    showSnackbar('Summarization failed.');
                }
            }
        );
    });
});

// Function to download summary as a Word document
function downloadSummaryAsDoc(summary) {
    const blob = new Blob(['\ufeff', summary], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SimplyClip_Summary.doc';
    document.body.appendChild(link);
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, 'SimplyClip_Summary.doc');
    } else {
        link.click();
    }
    document.body.removeChild(link);
}

function showSnackbar(message) {
    let x = document.getElementById('snackbar');
    x.textContent = message;
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 300);
  }

  
document.getElementById('searchInputForHighlight').addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    highlightMatches(searchTerm);
});

function highlightMatches(searchTerm) {
    const listItems = document.querySelectorAll('#clipboard_list li p');
    listItems.forEach(item => {
        const text = item.textContent;
        if (searchTerm && text.toLowerCase().includes(searchTerm)) {
            // Highlight matching text
            const highlightedText = text.replace(new RegExp(searchTerm, 'gi'), match => {
                return `<span class="highlight">${match}</span>`;
            });
            item.innerHTML = highlightedText; // Set highlighted HTML
            //scroll item into view
            const highlightSpan = item.querySelector(".highlight");
            if (highlightSpan) {
                highlightSpan.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        } else {
            // Remove highlight if searchTerm is empty or no match
            item.innerHTML = text;
        }
    });
}


function deleteElem(text){
    chrome.storage.sync.get(['list','listcolor'], clipboard => {
        
        let list = clipboard.list;
        let colordata = clipboard.listcolor;
        let highlights = clipboard.highlights;
        let index = list.indexOf(text);
        list.splice(index, 1);
        colordata.splice(index, 1);
        //delete highlights[text]; 
        _clipboardList.innerHTML = "";
        chrome.storage.sync.get(['listURL'], url => {
            let urlList = url.listURL;
            urlList.splice(index, 1);
            chrome.storage.sync.set({ 'listURL': urlList })
        })
        chrome.storage.sync.get(['originalList'], original => {
            let originalList = original.originalList;
            originalList.splice(index, 1);
            chrome.storage.sync.set({ 'originalList': originalList })
        })
        chrome.storage.sync.get(['citationList'], citList=> {
            let citationList = citList.citationList;
            citationList == undefined && (citationList = []);
            citationList.splice(indexes[i], 1);
            chrome.storage.sync.set({ 'citationList': citationList})
        })
        chrome.storage.sync.set({ 'list': list , 'listcolor': colordata}, () => getClipboardText());
    })
}
let merging = document.getElementById("merge-btn");
merging.addEventListener('click', () => {
    merged_data = "";
    const checkboxes = document.getElementsByClassName('checkbox');
    const data = document.getElementsByClassName('data');
    const list1 = document.getElementsByClassName('listitem');
    const del = document.getElementsByClassName('delete');
    const indexes = []
    for (var i=0; i<checkboxes.length; i++){
        if (checkboxes[i].checked){
            merged_data += " " + (data[i].innerText);
            indexes.push(i)
        }
    }

    for(var i = indexes.length-1; i>=0; i--){
        chrome.storage.sync.get(['list'], clipboard => {
            let list = clipboard.list;
            list.splice(indexes[i], 1);
            console.log(list)
            chrome.storage.sync.get(['listURL'], url => {
                let urlList = url.listURL;
                urlList.splice(indexes[i],1);
                chrome.storage.sync.set({ 'listURL': urlList })
            })
            chrome.storage.sync.get(['originalList'], original => {
                let originalList = original.originalList;
                originalList == undefined && (originalList = []);
                originalList.splice(indexes[i], 1);
                chrome.storage.sync.set({ 'originalList': originalList })
            })
            chrome.storage.sync.get(['summarizedList'], summList => {
                let summarizedList = summList.summarizedList;
                summarizedList == undefined && (summarizedList = []);
                summarizedList.splice(indexes[i], 1);
                chrome.storage.sync.set({ 'summarizedList': summarizedList })
            })
            chrome.storage.sync.set({ 'list': list });
        })
        list1[indexes[i]].remove();

    }
    console.log(merged_data)
    addClipboardListItem(merged_data)
    chrome.storage.sync.get(['list'], clipboard => {
        let list = clipboard.list;
        list == undefined && (list = []);
        list.unshift(merged_data);
        _clipboardList.innerHTML = "";
        chrome.storage.sync.get(['listURL'], url => {
            let urlList = url.listURL;
            urlList == undefined && (urlList = []);
            urlList.unshift("Merged");
            chrome.storage.sync.set({ 'listURL': urlList })
        })
        chrome.storage.sync.get(['originalList'], original => {
            let originalList = original.originalList;
            originalList == undefined && (originalList = []);
            originalList.unshift(merged_data);
            chrome.storage.sync.set({ 'originalList': originalList })
        })
        chrome.storage.sync.set({ 'list': list }, () => getClipboardText());
    })
    // getClipboardText(list)
})

/**
 * Retrives the copied text from the storage ,
 * generates a doc file and
 * downloads the file
 * @example
 * downloadClipboardTextAsDoc()
 */
function downloadClipboardTextAsDoc(){
    chrome.storage.sync.get(['list'], clipboard => {
        chrome.storage.sync.get(['citationList'], citclipboard => {
            chrome.storage.sync.get(['summarizedList'], summclipboard => {
            let list = clipboard.list;
            let summList = summclipboard.summarizedList;
            let citList = citclipboard.citationList;
            let emptyDiv = document.getElementById('empty-div');
            if (list === undefined || list.length === 0) {
                emptyDiv.classList.remove('hide-div');
                console.log("Nothing to download")
            }
            else {
                var list_of_items = []
                //var list_of_summ_items = []
                emptyDiv.classList.add('hide-div');
                if (typeof list !== undefined){
                    list.forEach(item => {
                        list_of_items = list_of_items + item + "\n\n"
                    });
                if (typeof summList !== undefined){
                    summList.forEach(item => {
                        console.log(item);
                        list_of_items = list_of_items + item + "\n\n"
                    });
                if (typeof citList !== undefined){
                    citList.forEach(item => {
                        console.log(item);
                        list_of_items = list_of_items + item + "\n\n"
                    });

                var link, blob, url;
                blob = new Blob(['\ufeff', list_of_items], {
                    type: 'application/msword'
                });

                    url = URL.createObjectURL(blob);
                    link = document.createElement('A');
                    link.href = url;
                    link.download = 'SimplyClip';
                    document.body.appendChild(link);
                    if (navigator.msSaveOrOpenBlob )
                        navigator.msSaveOrOpenBlob( blob, 'SimplyClip.doc');
                    else link.click();  // other browsers
                    document.body.removeChild(link);
                }
                }
                }
            }
        });
    });
   });
}



/**
 * Filters the
 * displayed copied text list that matches search text in the search box
 * @example
 * searchClipboardText()
 */
function searchClipboardText() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchText");
    filter = input.value.toUpperCase();
    ul = document.getElementById("clipboard_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        divElement = li[i].getElementsByClassName("list-div")[0];
        let elementText = divElement.getElementsByTagName('p')[0]
        txtValue = elementText.textContent || elementText.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


var enabled = true;
var myButton = document.getElementById('toggle-button');

chrome.storage.local.get('enabled', data => {
    //var myButton = document.getElementById('toggle-button');
    //REMOVED AS REDUNDANT CODE
    enabled = !!data.enabled;
    //forces this into a boolean value
    switchButton = document.getElementsByClassName('switch')[0]
    //finds first element with className 'switch' and assigns to var switchButton
    //'switch' class is used for tooltips
    if(enabled==true){
        myButton.checked = enabled
        switchButton.title="Disable - Copied text no will no longer be saved"
    }
    else{
        myButton.checked = enabled
        switchButton.title="Enable - Save copied text"
    }
});

myButton.onchange = () => {
    enabled = !enabled;
    switchButton = document.getElementsByClassName('switch')[0]
    if(enabled==true){
        myButton.checked = enabled
        switchButton.title="Disable - Copied text no will no longer be saved"
    }
    else{
        myButton.checked = enabled
        switchButton.title="Enable - Save your copied text!!"
    }
    chrome.storage.local.set({enabled:enabled});
};


getClipboardText();

/**
 * Retrives the copied text, original copied text and URL of copied text from the storage ,
 * generates a CSV file and
 * downloads the file
 * @example
 * downloadClipboardTextAsCsv()
 */
function downloadClipboardTextAsCsv() {
    let data = [];
    chrome.storage.sync.get(['list'], clipboard => {
        clipboardData = clipboard.list
        chrome.storage.sync.get(['listURL'], url => {
            urlData = url.listURL
            chrome.storage.sync.get(['originalList'], original => {
                originalData = original.originalList
                clipboardData.forEach((d, index) => {
                    let rowData = [];
                    rowData.push(d)
                    rowData.push(originalData[index])
                    rowData.push(urlData[index])
                    data.push(rowData)
                })

                var csv = 'Edited Text,OriginalText,URL\n';
                data.forEach(function (row) {
                    for (let i in row) {
                        row[i] = row[i].replace(/"/g, '""');
                    }

                    csv += '"' + row.join('","') + '"';
                    csv += "\n";
                });

                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'simplyClip.csv';
                hiddenElement.click();
            })
        })
    })




}
/**
 * Deletes all the text copied in the simplyclip clipboard
 * @example
 * deleteAllText()
 */
function deleteAllText() {
    chrome.storage.sync.set({ 'list': [] }, () => {});
    chrome.storage.sync.set({ 'originalList': [] }, () => {});
    chrome.storage.sync.set({ 'listURL': [] }, () => {});
    getClipboardText();
    var ul = document.getElementById("clipboard_list");
    ul.innerHTML = "";
}

/*
 * Switching to Dark Mode or ligth mode
 */

function checkMode(){
    if (checkbox.checked){
        darkmodeOn()
    }
    else{
        darkmodeOFF()
    }
}

function darkmodeOn(){
    document.body.classList.add('dark_mode')
    let listItems = document.querySelectorAll("#clipboard_list li");
    listItems.forEach(item => item.classList.add('dark_mode'));
}

function darkmodeOFF(){
    document.body.classList.remove('dark_mode')
    let listItems = document.querySelectorAll("#clipboard_list li");
    listItems.forEach(item => item.classList.remove('dark_mode'));
}

var darkmode = false;
var myButton2 = document.getElementById('dark_mode');

// function to categorize list based on content

function getThumbnail(textContent) {
    // Detect if it's a YouTube link
    if (textContent.startsWith('https://www.youtube.com/') || textContent.includes('youtube.com/watch?v=')) {
        let videoId = new URLSearchParams(new URL(textContent).search).get('v');
        let url = `https://img.youtube.com/vi/${videoId}/1.jpg`;
        return {
            sourceUrl: textContent,
            imageUrl: url,
            isVideo: true,
            type: 'youtube'
        };
    } else if (textContent.startsWith('http://') || textContent.startsWith('https://')) {
        // General URL detection
        let url = new URL(textContent);
        let iconUrl = `https://favicons.githubusercontent.com/${url.hostname}`;
        return {
            sourceUrl: textContent,
            imageUrl: iconUrl,
            isVideo: false,
            type: 'url'
        };
    } else {
        // Not a URL
        return {
            sourceUrl: "",
            imageUrl: "",
            isVideo: false,
            type: 'text'
        };
    }
}


chrome.storage.local.get('darkmode', data => {
    var myButton2 = document.getElementById('dark_mode');
    darkmode = !!data.darkmode;
    switchButton = document.getElementsByClassName('switch')[1]
    if(darkmode==true){
        myButton2.checked = darkmode
        darkmodeOn()
        switchButton.title="Disable dark mode"
    }
    else{
        myButton2.checked = darkmode
        switchButton.title="Enable dark mode"
    }
});

myButton2.onchange = () => {
    darkmode = !darkmode;
    switchButton = document.getElementsByClassName('switch')[1]
    if(darkmode==true){
        myButton2.checked = darkmode
        darkmodeOn()
        switchButton.title="Disable dark mode"
    }
    else{
        myButton2.checked = darkmode
        switchButton.title="Enable dark mode"
    }
    chrome.storage.local.set({darkmode:darkmode});
};

/**
 * Text Area height chnage based on input size
 */

let textArea = document.querySelector("#searchText");
textArea.oninput = () => {
    textArea.style.height = (textArea.scrollHeight)+"px";
}
