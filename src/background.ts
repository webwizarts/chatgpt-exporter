

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Bg worker", sender);
    if (message.action === "export-content") {
        const base64String = btoa(message.content);
        const url = `data:application/octet-stream;base64,${base64String}`;

        // Download the file
        chrome.downloads.download({
            url,
            filename: "content.txt",
        });
    }

    if (message.action === "export-content-pdf" && sender.tab?.id) {

        chrome.scripting.executeScript({
            target: { tabId: sender.tab?.id },
            func: () => {
                const iframe = document.createElement('iframe');
                iframe.srcdoc = "TextFpp";
                document.body.appendChild(iframe);
                iframe?.contentWindow?.print();
                iframe.remove();
            }
        });
    }
});
