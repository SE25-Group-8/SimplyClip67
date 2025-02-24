chrome.contextMenus.create({
  title: "Save Image to SimplyClip",
  contexts: ["image"],
  id: "save-image-to-simplyclip",
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "save-image-to-simplyclip") {
    const imageUrl = info.srcUrl;
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imageDataUrl = e.target.result;
          chrome.storage.sync.get(["lists", "selectedList"], function (result) {
            let lists = result.lists || { "Default": [] };
            let currentList = result.selectedList || "Default";
            if (!lists[currentList]) lists[currentList] = [];

            if (!lists[currentList].includes(imageDataUrl)) {
              lists[currentList].unshift(imageDataUrl);
              chrome.storage.sync.set({ lists }, () => {
                console.log("Image saved to", currentList);
              });
            }
          });
        };
        reader.readAsDataURL(blob);
      });
  }
});