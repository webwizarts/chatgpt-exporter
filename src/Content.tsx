import React from "react";
import ReactDOMClient from "react-dom/client";
import ContextMenu from "./ContextMenu";
import Modal from "./Modal";

import {
  ANSWER_CONTAINER,
  BUTTON_CONTAINER,
  CONTENT_CONTAINER,
  DOWNLOAD_SVG,
  MAIN_CONTAINER,
  MODAL_CONTAINER,
  MENU_CONTAINER,
  CHAT_CONTAINER,
} from "./utils/constants";

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

  const modalContainer = document.getElementById(MODAL_CONTAINER);
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

  const content = target
    ?.closest(ANSWER_CONTAINER)
    ?.querySelector(CONTENT_CONTAINER);

  console.log("menuContainer", target, menuContainer);

  if (content && menuContainer) {
    const root = ReactDOMClient.createRoot(menuContainer);
    root.render(
      <ContextMenu
        content={content.outerHTML}
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
    const exportButton = document.createElement("button");
    exportButton.innerHTML = DOWNLOAD_SVG;
    exportButton.dataset.export = "true";

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
    }
  });
};

ping();
