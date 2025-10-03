(function () {
  function addNotesButton() {
    if (document.getElementById("yt-notes-btn")) return;

    const btn = document.createElement("button");
    btn.id = "yt-notes-btn";
    btn.innerText = "📝 Notes";
    btn.style.position = "absolute";
    btn.style.top = "80px";
    btn.style.right = "20px";
    btn.style.zIndex = "10000";
    btn.style.padding = "8px 12px";
    btn.style.background = "#ffcc00";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      togglePanel();
    });

    document.body.appendChild(btn);
  }

  function togglePanel() {
    let iframe = document.getElementById("yt-notes-panel");

    if (iframe) {
      iframe.remove();
    } else {
      iframe = document.createElement("iframe");
      iframe.id = "yt-notes-panel";
      iframe.src = chrome.runtime.getURL("panel/browser/index.html");
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.right = "0";
      iframe.style.width = "400px";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      iframe.style.zIndex = "10001";
      iframe.style.background = "white";

      document.body.appendChild(iframe);
    }
  }

  // ✅ هنا نخلي content.js يسمع للرسائل من Angular
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getTime") {
      const video = document.querySelector("video");
      if (video) {
        sendResponse({ time: Math.floor(video.currentTime) });
      } else {
        sendResponse({ time: 0 });
      }
    }
    return true; // مهم عشان sendResponse يشتغل async
  });

  window.addEventListener("load", addNotesButton);
})();
