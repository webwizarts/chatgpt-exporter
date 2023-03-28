import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CloseButton,
  EditorContainer,
  EditorHeader,
  EditorHeaderButton,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
} from "./Content.styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  copyToClipboard,
  downloadMD,
  downloadPDF,
  downloadRTF,
  downloadTXT,
} from "./utils/helpers";

import pdfImg from "./icons/pdf.png";
import txtImg from "./icons/txt.png";
import mdImg from "./icons/md.png";
import rtfImg from "./icons/rtf.png";
import copyImg from "./icons/copy.png";

interface ModalProps {
  content: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, closeModal }) => {
  const [value, setValue] = useState(content);
  const editorRef = useRef<any>(null);

  const handleDownloadPDF = useCallback(() => {
    downloadPDF(editorRef.current?.editingArea);
  }, [value]);

  const handleDownloadMD = useCallback(() => {
    downloadMD(value);
  }, [value]);

  const handleDownloadRTF = useCallback(() => {
    downloadRTF(value);
  }, [value]);

  const handleDownloadTXT = useCallback(() => {
    downloadTXT(value);
  }, [value]);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(value);
  }, [value]);

  useEffect(() => {
    editorRef.current.editingArea.style.color = "black";
  }, []);

  return (
    <ModalWrapper onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>ChatGPT Exporter</ModalTitle>
          <CloseButton onClick={closeModal}>&#10005;</CloseButton>
        </ModalHeader>
        <EditorContainer>
          <EditorHeader>
            <EditorHeaderButton
              onClick={handleCopy}
              tooltip="Copy to Clipboard"
              tooltipOnClick="Copied"
            >
              <img src={copyImg} alt="copy" width={20} />
            </EditorHeaderButton>
            <EditorHeaderButton
              onClick={handleDownloadTXT}
              tooltip="Download as TXT Format"
              tooltipOnClick="Downloaded"
            >
              <img src={txtImg} alt="txt" width={20} />
            </EditorHeaderButton>
            <EditorHeaderButton
              onClick={handleDownloadPDF}
              tooltip="Download as PDF"
              tooltipOnClick="Downloaded"
            >
              <img src={pdfImg} alt="pdf" width={20} />
            </EditorHeaderButton>
            <EditorHeaderButton
              onClick={handleDownloadRTF}
              tooltip="Download as Rich Text Format"
              tooltipOnClick="Downloaded"
            >
              <img src={rtfImg} alt="rtf" width={20} />
            </EditorHeaderButton>
            <EditorHeaderButton
              onClick={handleDownloadMD}
              tooltip="Download as Markdown"
              tooltipOnClick="Downloaded"
            >
              <img src={mdImg} alt="md" width={20} />
            </EditorHeaderButton>
          </EditorHeader>
          <ReactQuill
            ref={editorRef}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </EditorContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
