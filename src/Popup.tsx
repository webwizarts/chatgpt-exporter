import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { MenuButton, PopupContainer, PopupTitle } from "./Content.styles";

import {
  copyToClipboard,
  downloadMD,
  downloadPDF,
  downloadRTF,
  downloadTXT,
  isValidUrl,
} from "./utils/helpers";

import pdfImg from "./icons/pdf.png"
import txtImg from "./icons/txt.png"
import mdImg from "./icons/md.png"
import rtfImg from "./icons/rtf.png"
import copyImg from "./icons/copy.png"


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
    <PopupContainer>
      <PopupTitle>Download Full Conversation</PopupTitle> 
      <MenuButton onClick={handleCopy}><img src={copyImg} width={20} alt="copy" />Copy To Clipboard</MenuButton>
      <MenuButton onClick={handleDownloadTXT}><img src={txtImg} alt="txt" width={20} />Download TXT</MenuButton>
      <MenuButton onClick={handleDownloadPDF}><img src={pdfImg} alt="pdf" width={20} />Download PDF</MenuButton>
      <MenuButton onClick={handleDownloadRTF}><img src={rtfImg} alt="rtf" width={20} />Download RTF</MenuButton>
      <MenuButton onClick={handleDownloadMD}><img src={mdImg} alt="md" width={20}  />Download MD</MenuButton>
    </PopupContainer>
  );
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;

  if (currentUrl && isValidUrl(currentUrl)) {
    ReactDOM.render(<Popout />, document.getElementById("popout"));
  }
});
