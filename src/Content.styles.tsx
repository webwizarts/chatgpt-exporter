import styled, { ThemedStyledProps } from "styled-components";

interface EditorHeaderButtonProps {
  tooltip?: string;
  tooltipOnClick?: string;
}

const border = "3px solid rgb(181, 200, 214)";
const titleColor = "#393939";

export const MenuButton = styled.button`
  background-color: transparent;
  color: #000000;
  line-height: 30px;
  padding-inline: 10px;
  padding-right: 25px;
  min-width: max-content;
  border: none;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #ececec;
    border-radius: 2px;
  }
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: rgb(225 74 74);
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
  border-radius: 100%;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalContent = styled.div`
  padding-inline: 20px;
  padding-top: 10px;
  border: ${border};
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  height: 90%;
  background-color: rgb(239, 243, 246);
  box-shadow: -2px 10px 19px 0px rgba(0, 0, 0, 0.32);
`;

export const ModalTitle = styled.h2`
  color: ${titleColor};
  font-size: 12px;
`;

export const EditorContainer = styled.div`
  color: black;
  background-color: #ffffff;
  border-radius: 15px;
  border: ${border};

  & .ql-toolbar.ql-snow {
    border: none;
    border-bottom: ${border};
  }

  & .ql-container.ql-snow {
    border: none;
    color: #000000 !important;
  }

  & .ql-editor {
    height: 545px;
    color: #000000 !important;
  }
`;

export const EditorHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  border-bottom: ${border};
  padding: 5px;
  background-color: rgb(246, 248, 252);
  border-radius: 15px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;

export const EditorHeaderButton = styled.button<
  ThemedStyledProps<EditorHeaderButtonProps, any>
>`
  background-color: #ffffff;
  border-radius: 100%;
  border: ${border};
  padding: 5px;
  cursor: pointer;
  position: relative;
  user-select: none;

  &::before {
    content: "${(props) => props.tooltip}";
    white-space: nowrap;
    position: absolute;
    background: #ffffff;
    padding: 5px;
    border-radius: 3px;
    bottom: 130%;
    left: -50%;
    display: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 20%;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ffffff;
    transform: rotate(180deg);
    display: none;
  }

  &:hover::before {
    display: inline-block;
  }

  &:hover::after {
    display: inline-block;
  }

  &:active::before {
    content: "${(props) => props.tooltipOnClick}";
  }
`;

export const PopupTitle = styled.p`
  font-size: 14px;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  text-align: center;
  display: block;
  font-weight: 500;
  color: #e8f4fa;
  padding-top: 8px;
  padding-bottom: 18px;
`;

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  margin-top: 0;
  padding: 10px;
  padding-top: 2px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.25);

  & > button {
    font-size: 14px;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    color: #fff;
    line-height: 1.5;
    border: none;
    padding-block: 10px;
  }

  & > button:hover {
    background-color: transparent !important;
  }
`;

export const PopupFooter = styled.p`
  font-size: 11px;
  color: #f5f5f5;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 8px;
  font-family: Roboto, sans-serif;
`;

export const ContextMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  width: 100%;
  min-width: max-content;
  height: auto;
  border-radius: 15px;
  position: absolute;
  top: 150%;
  right: -100%;
  padding-block: 10px;
  box-shadow: -2px 10px 19px 0px rgba(0, 0, 0, 0.32);

  &::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 45%;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 10px solid #ffffff;
  }
`;
