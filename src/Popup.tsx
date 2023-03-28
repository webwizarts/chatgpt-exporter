import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import {
  MenuButton,
  PopupContainer,
  PopupFooter,
  PopupTitle,
} from "./Content.styles";

import {
  copyToClipboard,
  downloadMD,
  downloadRTF,
  downloadTXT,
  isValidUrl,
} from "./utils/helpers";

import pdfImg from "./icons/pdf-white.png";
import txtImg from "./icons/txt-white.png";
import mdImg from "./icons/md-white.png";
import rtfImg from "./icons/rtf-white.png";
import copyImg from "./icons/copy-white.png";

const Popout = () => {
  const downloadPageContent = useCallback(
    (type: "COPY" | "PDF" | "MD" | "TXT" | "RTF") => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        if (activeTab.id) {
          if (type === "PDF") {
            chrome.tabs.sendMessage(activeTab.id, {
              message: "download_full_page",
            });
          } else {
            chrome.tabs.sendMessage(
              activeTab.id,
              { message: "get_page_content" },
              (response) => {
                // console.log("response received", response);
                if (response && response.content) {
                  switch (type) {
                    case "COPY":
                      copyToClipboard(response.content);
                      break;
                    case "MD":
                      downloadMD(response.content);
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
    <>
      <PopupTitle>Download Full Conversation</PopupTitle>
      <PopupContainer>
        <MenuButton onClick={handleCopy}>
          <img src={copyImg} width={20} alt="copy" />
          Copy To Clipboard
        </MenuButton>
        <MenuButton onClick={handleDownloadTXT}>
          <img src={txtImg} alt="txt" width={20} />
          Download as TXT
        </MenuButton>
        <MenuButton onClick={handleDownloadPDF}>
          <img src={pdfImg} alt="pdf" width={20} />
          Download as PDF
        </MenuButton>
        <MenuButton onClick={handleDownloadRTF}>
          <img src={rtfImg} alt="rtf" width={20} />
          Download as RTF
        </MenuButton>
        <MenuButton onClick={handleDownloadMD}>
          <img src={mdImg} alt="md" width={20} />
          Download as MD
        </MenuButton>
      </PopupContainer>
      <PopupFooter>ChatGPT Exporter</PopupFooter>
    </>
  );
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;

  if (currentUrl && isValidUrl(currentUrl)) {
    ReactDOM.render(<Popout />, document.getElementById("popout"));
  }
});
