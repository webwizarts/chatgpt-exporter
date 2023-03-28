import React, { useCallback, useRef, useEffect } from "react";
import { ContextMenuContainer, MenuButton } from "./Content.styles";
import {
  downloadMD,
  downloadPDF,
  downloadRTF,
  downloadTXT,
  copyToClipboard,
} from "./utils/helpers";

import pdfImg from "./icons/pdf.png";
import txtImg from "./icons/txt.png";
import mdImg from "./icons/md.png";
import rtfImg from "./icons/rtf.png";
import copyImg from "./icons/copy.png";

interface ContextMenuProps {
  content: string;
  element: any;
  closeModal: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  closeModal,
  content,
  element,
}) => {
  const contextMenuRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClickOutside = useCallback((event: MouseEvent) => {
    console.log(contextMenuRef.current, event.target);
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as HTMLElement)
    ) {
      closeModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenuRef]);

  const handleDownloadPDF = useCallback(() => {
    downloadPDF(element);
  }, []);

  const handleDownloadMD = useCallback(() => {
    downloadMD(content);
  }, []);

  const handleDownloadRTF = useCallback(() => {
    downloadRTF(content);
  }, []);

  const handleDownloadTXT = useCallback(() => {
    downloadTXT(content);
  }, []);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(content);
  }, []);

  return (
    <ContextMenuContainer ref={contextMenuRef}>
      <MenuButton onClick={handleCopy}>
        <img src={copyImg} width={20} alt="copy" />
        Copy To Clipboard
      </MenuButton>
      <MenuButton onClick={handleDownloadTXT}>
        <img src={txtImg} alt="txt" width={20} />
        Download TXT
      </MenuButton>
      <MenuButton onClick={handleDownloadPDF}>
        <img src={pdfImg} alt="pdf" width={20} />
        Download PDF
      </MenuButton>
      <MenuButton onClick={handleDownloadRTF}>
        <img src={rtfImg} alt="rtf" width={20} />
        Download RTF
      </MenuButton>
      <MenuButton onClick={handleDownloadMD} style={{ borderBottom: "none" }}>
        <img src={mdImg} alt="md" width={20} />
        Download MD
      </MenuButton>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
