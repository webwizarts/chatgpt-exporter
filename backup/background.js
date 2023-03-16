// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Bg worker", sender);
  if (message.action === "export-content") {
    console.log("message:", message);
    // // Create a blob object from the content text
    // const blob = new Blob([message.content], { type: "text/plain" });

    // // Create a URL for the blob object
    // const url = URL.createObjectURL(blob);

    const base64String = btoa(message.content);
    const url = `data:application/octet-stream;base64,${base64String}`;

    // Download the file
    chrome.downloads.download({
      url,
      filename: "content.txt",
    });
  }
});
