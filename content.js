(function () {
  function addNotesButton() {
    if (document.getElementById("yt-notes-btn")) return;

    const btn = document.createElement("button");
    btn.id = "yt-notes-btn";
    btn.innerText = "📝 Notes";
    Object.assign(btn.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "10000",
      padding: "10px 14px",
      background: "#ff7043",
      border: "none",
      borderRadius: "999px",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      transition: "all 0.25s ease"
    });

    btn.addEventListener("mouseenter", () => (btn.style.background = "#ff5722"));
    btn.addEventListener("mouseleave", () => (btn.style.background = "#ff7043"));
    btn.addEventListener("click", togglePanel);

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
      Object.assign(iframe.style, {
        position: "fixed",
        top: "0",
        right: "0",
        width: "380px",
        height: "100%",
        border: "none",
        zIndex: "9999",
        background: "white",
        boxShadow: "-8px 0 18px rgba(0,0,0,0.25)",
        transition: "transform 0.3s ease-in-out"
      });

      document.body.appendChild(iframe);

      // ✅ تمرير الوضع الليلي الحالي للإطار
      const dark = document.documentElement.getAttribute("dark") || document.body.classList.contains("dark");
      iframe.contentWindow?.postMessage({ action: "setDarkMode", dark }, "*");
    }
  }

  // ✅ استماع لإغلاق الإطار
  window.addEventListener("message", (event) => {
    if (event.data?.action === "closeYtNotes") {
      const iframe = document.getElementById("yt-notes-panel");
      if (iframe) iframe.remove();
    }
  });

  // ✅ توفير الوقت الحالي للفيديو
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getTime") {
      const video = document.querySelector("video");
      sendResponse({ time: video ? Math.floor(video.currentTime) : 0 });
    }
    return true;
  });

  // ✅ عند تحميل الصفحة
  window.addEventListener("load", addNotesButton);
})();
