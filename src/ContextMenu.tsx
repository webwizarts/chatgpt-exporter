import React, { useCallback, useRef, useEffect } from "react";
import { ContextMenuContainer } from "./Content.styles";
import {
  downloadMD,
  downloadPDF,
  downloadRTF,
  downloadTXT,
} from "./utils/helpers";

interface ContextMenuProps {
  content: string;
  closeModal: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ closeModal, content }) => {
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
    downloadPDF(content);
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

  return (
    <ContextMenuContainer ref={contextMenuRef}>
      <button onClick={handleDownloadPDF}>Download PDF</button>
      <button onClick={handleDownloadMD}>Download MD</button>
      <button onClick={handleDownloadRTF}>Download RTF</button>
      <button onClick={handleDownloadTXT}>Download TXT</button>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
