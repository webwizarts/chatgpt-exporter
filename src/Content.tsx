import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";

import {
  ANSWER_CONTAINER,
  BUTTON_CONTAINER,
  CONTENT_CONTAINER,
  DOWNLOAD_SVG,
  MAIN_CONTAINER,
  MODAL_CONTAINER,
} from "./utils/constants";

const loadModalContainer = () => {
  const modalRoot = document.getElementById(MODAL_CONTAINER);
  const checkIfModalExists = Boolean(modalRoot);

  if (!checkIfModalExists) {
    const modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", MODAL_CONTAINER);
    document.querySelector("body")?.appendChild(modalDiv);
  }
};

const closeModal = () => {
  const modalRoot = document.getElementById(MODAL_CONTAINER);
  if (modalRoot) {
    ReactDOM.unmountComponentAtNode(modalRoot);
  }
};

const loadButtonToExport = () => {
  const answers = document.querySelectorAll(ANSWER_CONTAINER);

  // For each button, add an export button after the existing thumbs up/down buttons
  answers.forEach((answer) => {
    console.log(":bar");
    const button_container = answer.querySelector(BUTTON_CONTAINER);

    // Check if the export button already exists for this container
    if (
      button_container &&
      !button_container.querySelector('button[data-export="true"]')
    ) {
      const exportButton = document.createElement("button");
      exportButton.innerHTML = DOWNLOAD_SVG;
      exportButton.dataset.export = "true";

      button_container.appendChild(exportButton);

      // Add a click event listener to the export button
      exportButton.addEventListener("click", (event: MouseEvent) => {
        const target = event?.target as HTMLElement;
        const content = target
          ?.closest(ANSWER_CONTAINER)
          ?.querySelector(CONTENT_CONTAINER);

        console.log("content", content);
        if (content) {
          ReactDOM.render(
            <Modal content={content.outerHTML} />,
            document.getElementById(MODAL_CONTAINER)
          );
        }
      });
    }
  });
};

loadButtonToExport();
loadModalContainer();

// Select the node that will be observed for changes
const targetNode = document.querySelector(MAIN_CONTAINER);

// Create a new instance of MutationObserver and specify a callback function
const observer = new MutationObserver((mutationsList) => {
  // Log a message when a mutation occurs
  console.log("DOM changed:", mutationsList);
  const answers = document.querySelectorAll(ANSWER_CONTAINER);
  console.log("answers", answers);
  // Call loadButtonToExport to add export buttons to newly added containers
  loadButtonToExport();
});

// Configure the observer to watch for changes to the target node and its subtree
const config = { attributes: true, childList: true, subtree: true };

if (targetNode) {
  // Start observing the target node for changes
  observer.observe(targetNode, config);
}
