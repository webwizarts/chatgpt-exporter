import React, { useRef, useState } from "react";
import { ModalContent, ModalFooter, ModalWrapper } from "./Content.styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactToPrint from "react-to-print";

interface ModalProps {
  content: string;
}

const Modal: React.FC<ModalProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [value, setValue] = useState(content);
  const componentRef = useRef<any>();

  const handlePrintClick = () => {
    if (componentRef.current) {
      componentRef.current.handlePrint();
    }
  };
  const handleDownload = () => {
    // Send a message to the background script with the associated content
    // chrome.runtime.sendMessage({
    //   action: "export-content-pdf",
    //   content: value,
    // });
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <ReactToPrint
              trigger={() => <button>Print</button>}
              content={() => componentRef.current}
            ></ReactToPrint>
            <div
              ref={componentRef}
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
            <ModalFooter>
              <button onClick={handleDownload}>Close</button>
            </ModalFooter>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
