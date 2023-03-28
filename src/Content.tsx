import React from "react";
import ReactDOMClient from "react-dom/client";
import ContextMenu from "./ContextMenu";
import Modal from "./Modal";

import {
  ANSWER_CONTAINER,
  BUTTON_CONTAINER,
  CONTENT_CONTAINER,
  MAIN_CONTAINER,
  MODAL_CONTAINER,
  MENU_CONTAINER,
  CHAT_CONTAINER,
} from "./utils/constants";

import downloadImage from "./icons/download.png";
import { downloadPDF } from "./utils/helpers";

const addModalContainer = () => {
  const modalRoot = document.getElementById(MODAL_CONTAINER);
  const checkIfModalExists = Boolean(modalRoot);

  if (!checkIfModalExists) {
    const modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", MODAL_CONTAINER);
    document.querySelector("body")?.appendChild(modalDiv);
  }
};

const handleExportClick = (event: MouseEvent) => {
  const target = event?.target as HTMLElement;
  const content = target
    ?.closest(ANSWER_CONTAINER)
    ?.querySelector(CONTENT_CONTAINER);

  // const contentContainerElement = content?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
  const modalContainer = document.getElementById(MODAL_CONTAINER);

  // Ignore this element on pdf download
  modalContainer?.setAttribute('data-html2canvas-ignore', 'true');

  if (content && modalContainer) {
    const root = ReactDOMClient.createRoot(modalContainer);
    root.render(
      <Modal content={content.outerHTML} closeModal={() => root.unmount()} />
    );
  }
};

const handleExportContextMenuClick = (event: MouseEvent) => {
  event.preventDefault();
  const target = event?.target as HTMLElement;

  // Need to add some kind of recursion here, this is ugly af
  const menuContainer = target.parentElement?.parentElement?.querySelector(
    `#${MENU_CONTAINER}` ??
      target.parentElement?.querySelector(`#${MENU_CONTAINER}`) ??
      target.parentElement?.parentElement?.parentElement?.querySelector(
        `#${MENU_CONTAINER}`
      )
  );

  // Ignore this element on pdf download
  menuContainer?.setAttribute('data-html2canvas-ignore', 'true');

  const content = target
    ?.closest(ANSWER_CONTAINER)
    ?.querySelector(CONTENT_CONTAINER);

  // console.log("menuContainer", target, menuContainer);

  // Answer group container
  const contentElement = content?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement

  if (content && menuContainer) {
    const root = ReactDOMClient.createRoot(menuContainer);
    root.render(
      <ContextMenu
        content={content.outerHTML}
        element={contentElement}
        closeModal={() => root.unmount()}
      />
    );
  }
};

const loadModal = (answer: Element) => {
  const button_container = answer.querySelector(BUTTON_CONTAINER);
  // Check if the export button already exists for this container
  if (
    button_container &&
    !button_container.querySelector('button[data-export="true"]') &&
    !button_container.querySelector(`#${MENU_CONTAINER}`)
  ) {
    const imageElement = document.createElement('img');
    imageElement.src = downloadImage;
    imageElement.style.width = '20px';

    const exportButton = document.createElement("button");
    exportButton.dataset.export = "true";
    exportButton.appendChild(imageElement);

    button_container.appendChild(exportButton);

    const menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", MENU_CONTAINER);
    button_container.appendChild(menuDiv);

    // Add a click event listener to the export button
    exportButton.addEventListener("click", handleExportClick);
    exportButton.addEventListener("contextmenu", handleExportContextMenuClick);
  }
};

const addButtonToExport = () => {
  const answers = document.querySelectorAll(ANSWER_CONTAINER);
  // For each button, add an export button after the existing thumbs up/down buttons
  answers.forEach(loadModal);
};

// Load the export buttons
addButtonToExport();

// Load the modal container
addModalContainer();

// Create a new instance of MutationObserver and specify a callback function
const observer = new MutationObserver(() => {
  // Call loadButtonToExport to add export buttons to newly added containers
  addButtonToExport();
});

// Select the node that will be observed for changes
const targetNode = document.querySelector(MAIN_CONTAINER);

// Configure the observer to watch for changes to the target node and its subtree
const config = { attributes: true, childList: true, subtree: true };

if (targetNode) {
  // Start observing the target node for changes
  observer.observe(targetNode, config);
}

const ping = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Select the chat container
    const chatNode = document.querySelector(CHAT_CONTAINER);
    if (request.message === "get_page_content") {
      if (chrome.runtime.lastError) {
        setTimeout(ping, 1000);
      } else {
        sendResponse({ content: chatNode?.innerHTML });
      }
    }else if (request.message === "download_full_page") {
      if (chrome.runtime.lastError) {
        setTimeout(ping, 1000);
      } else {
        downloadPDF(document.querySelector('main'));
      }
    }

  });
};

ping();
