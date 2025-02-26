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
 
 const readClipboardData = () => {
   chrome.storage.local.get('enabled', data => {
     if (data.enabled == true) {
       navigator.clipboard.read().then(clipboardItems => {
         for (const clipboardItem of clipboardItems) {
           for (const type of clipboardItem.types) {
             if (type.startsWith('image/') || type === 'image/tiff') {
               clipboardItem.getType(type).then(blob => {
                 if (_previousData !== blob) {
                   setClipboardImage(blob);
                   _previousData = blob;
                 }
               });
             } else if (type === 'text/plain') {
               clipboardItem.getType('text/plain').then(blob => {
                 blob.text().then(text => {
                   if (text.length > 0 && text !== _previousData) {
                     setClipboardText(text);
                     _previousData = text;
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
   chrome.storage.local.get(['imageList'], function (result) {
     let imageList = result.imageList || [];
     if (imageList.length === _maxListSize) {
       imageList.pop();
     }
     const reader = new FileReader();
     reader.onload = function (e) {
       const imageDataUrl = e.target.result;
       if (!imageList.includes(imageDataUrl)) {
         imageList.unshift(imageDataUrl);
         chrome.storage.local.set({ 'imageList': imageList }, () => {
           console.log("Debug: Image pushed to imageList");
         });
       }
     };
     reader.readAsDataURL(imageBlob);
   });
 };


 const setClipboardText = async (clipText) => {
  chrome.storage.sync.get(["lists", "activeList"], function (data) {
    let lists = data.lists || { "Default": [] };
    let activeList = data.activeList || "Default";

      if (!lists[activeList]) {
          lists[activeList] = [];
      }

      // Limit list size
      if (lists[activeList].length >= _maxListSize) {
          lists[activeList].pop(); // Remove the oldest entry if the list is full
      }

      // Prevent duplicate entries
      if (!lists[activeList].includes(clipText)) {
          lists[activeList].unshift(clipText);
          chrome.storage.sync.set({ "lists": lists }, function () {
              console.log(`Text saved under '${activeList}' list.`);
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
