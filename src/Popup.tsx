import React, { useCallback } from "react";
import ReactDOM from "react-dom";

import {
  copyToClipboard,
  downloadMD,
  downloadPDF,
  downloadRTF,
  downloadTXT,
  isValidUrl,
} from "./utils/helpers";

const Popout = () => {
  const downloadPageContent = useCallback(
    (type: "COPY" | "PDF" | "MD" | "TXT" | "RTF") => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        if (activeTab.id) {
          chrome.tabs.sendMessage(
            activeTab.id,
            { message: "get_page_content" },
            (response) => {
              console.log("response received", response);
              if (response && response.content) {
                switch (type) {
                  case "COPY":
                    copyToClipboard(response.content);
                    break;
                  case "MD":
                    downloadMD(response.content);
                    break;
                  case "PDF":
                    downloadPDF(response.content);
                    break;
                  case "TXT":
                    downloadTXT(response.content);
                    break;
                  case "RTF":
                    downloadRTF(response.content);
                    break;
                }
              }
            }
          );
        }
      });
    },
    []
  );

  const handleDownloadPDF = useCallback(() => {
    downloadPageContent("PDF");
  }, []);

  const handleDownloadMD = useCallback(() => {
    downloadPageContent("MD");
  }, []);

  const handleDownloadRTF = useCallback(() => {
    downloadPageContent("RTF");
  }, []);

  const handleDownloadTXT = useCallback(() => {
    downloadPageContent("TXT");
  }, []);

  const handleCopy = useCallback(async () => {
    await downloadPageContent("COPY");
  }, []);

  return (
    <div>
      <button onClick={handleCopy}>Copy To Clipboard</button>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <button onClick={handleDownloadMD}>Download MD</button>
      <button onClick={handleDownloadRTF}>Download RTF</button>
      <button onClick={handleDownloadTXT}>Download TXT</button>
    </div>
  );
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;

  if (currentUrl && isValidUrl(currentUrl)) {
    ReactDOM.render(<Popout />, document.getElementById("popout"));
  }
});
