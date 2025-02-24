/*
 *MIT License
 *Copyright (c) 2021 lalit10
 *Permission is hereby granted, free of charge, to any person obtaining a copy
 *of this software and associated documentation files (the "Software"), to deal
 *in the Software without restriction, including without limitation the rights
 *to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *copies of the Software, and to permit persons to whom the Software is
 *furnished to do so, subject to the following conditions:
 *The above copyright notice and this permission notice shall be included in all
 *copies or substantial portions of the Software.
 *THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *SOFTWARE.
 */

 let _previousData = "";
 let _maxListSize = 100;
 let time_interval_set = undefined;
 
 chrome.storage.sync.get("selectedList", function (data) {
  if (!data.selectedList) {
    chrome.storage.sync.set({ selectedList: "Default" });
  }
});

 const readClipboardData = () => {
  chrome.storage.local.get('enabled', data => {
    if (data.enabled == true) {
      navigator.clipboard.read().then(clipboardItems => {
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            if (type === 'text/plain') {
              clipboardItem.getType('text/plain').then(blob => {
                blob.text().then(text => {
                  if (text.length > 0 && text !== _previousData) {
                    chrome.storage.sync.get("selectedList", function (listData) {
                      let currentList = listData.selectedList || "Default";
                      console.log(`Saving text to list: ${currentList}`);
                      setClipboardText(text);
                      _previousData = text;
                    });
                  }
                });
              });
            }
          }
        }
      }).catch(err => console.log(err));
    }
  });
};
 
const setClipboardImage = async (imageBlob) => {
  chrome.storage.sync.get(["lists", "selectedList"], function (data) {
    let lists = data.lists || { "Default": [] };
    let currentList = data.selectedList || "Default";

    if (!lists[currentList]) lists[currentList] = [];

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      if (!lists[currentList].includes(imageDataUrl)) {
        if (lists[currentList].length === _maxListSize) {
          lists[currentList].pop();
        }
        lists[currentList].unshift(imageDataUrl);
        chrome.storage.sync.set({ lists }, () => {
          console.log(`Image saved to list: ${currentList}`);
        });
      }
    };
    reader.readAsDataURL(imageBlob);
  });
};


 const setClipboardText = async (clipText) => {
  chrome.storage.sync.get(["lists", "selectedList"], function (data) {
      let lists = data.lists || { "Default": [] };
      let currentList = data.selectedList || "Default";

      if (!lists[currentList]) {
          lists[currentList] = [];
      }

      if (!lists[currentList].includes(clipText)) {
          if (lists[currentList].length === _maxListSize) {
              lists[currentList].pop();
          }
          lists[currentList].unshift(clipText);
          chrome.storage.sync.set({ lists }, () => {
              console.log(`Clipboard text saved to list: ${currentList}`);
          });
      }
  });
};

window.addEventListener('mouseout',function(){
    if(time_interval_set===undefined)
        time_interval_set = setInterval(readClipboardData,200)
})
window.addEventListener('mouseover',function(){
    clearInterval(time_interval_set);
    time_interval_set=undefined;
})
window.addEventListener('copy',function(){
    readClipboardData();
})
document.addEventListener('visibilitychange',function(){
    if(document.hidden){
        clearInterval(time_interval_set);
        time_interval_set=undefined;
    }else{
        if(time_interval_set==undefined)
            time_interval_set = setInterval(readClipboardData,200);
    }
})
