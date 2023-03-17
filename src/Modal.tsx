import React, { useCallback, useState } from "react";
import { ModalContent, ModalFooter, ModalWrapper } from "./Content.styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  copyToClipboard,
  downloadMD,
  downloadPDF,
  downloadRTF,
  downloadTXT,
} from "./utils/helpers";

interface ModalProps {
  content: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, closeModal }) => {
  const [value, setValue] = useState(content);

  const handleDownloadPDF = useCallback(() => {
    downloadPDF(value);
  }, []);

  const handleDownloadMD = useCallback(() => {
    downloadMD(value);
  }, []);

  const handleDownloadRTF = useCallback(() => {
    downloadRTF(value);
  }, []);

  const handleDownloadTXT = useCallback(() => {
    downloadTXT(value);
  }, []);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(value);
  }, []);

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <ModalFooter>
          <button onClick={handleCopy}>Copy To Clipboard</button>
          <button onClick={handleDownloadPDF}>Download PDF</button>
          <button onClick={handleDownloadMD}>Download MD</button>
          <button onClick={handleDownloadRTF}>Download RTF</button>
          <button onClick={handleDownloadTXT}>Download TXT</button>
          <button onClick={closeModal}>Close</button>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
