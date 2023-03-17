import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 800px;
  width: 100%;
  height: 90%;
  color: #000000;
  overflow: scroll;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 10px;
`;

export const ContextMenuContainer = styled.div`
  background: #ffffff;
  width: 100%;
  min-width: 140px;
  height: auto;
  position: absolute;
  top: 0px;
  padding: 10px;
`;
