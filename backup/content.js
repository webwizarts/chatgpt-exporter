const loadButtonToExport = () => {
  // Find all the buttons on the page with the specified class name
  const answerContainerClassName =
    ".group.w-full.text-gray-800.dark\\:text-gray-100.border-b.border-black\\/10.dark\\:border-gray-900\\/50.bg-gray-50.dark\\:bg-\\[\\#444654\\]";
  const buttonContainerClassName =
    ".text-gray-400.flex.self-end.lg\\:self-center.justify-center.mt-2.gap-3.md\\:gap-4.lg\\:gap-1.lg\\:absolute.lg\\:top-0.lg\\:translate-x-full.lg\\:right-0.lg\\:mt-0.lg\\:pl-2.visible";

  const answers = document.querySelectorAll(answerContainerClassName);

  console.log("fetching answers again:", answers);

  // For each button, add an export button after the existing thumbs up/down buttons
  answers.forEach((answer) => {
    console.log(":bar");
    button_container = answer.querySelector(buttonContainerClassName);

    // Check if the export button already exists for this container
    if (
      button_container &&
      !button_container.querySelector('button[data-export="true"]')
    ) {
      const exportButton = document.createElement("button");
      exportButton.innerHTML = `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8899a4" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path></svg>`;
      exportButton.dataset.export = true;

      button_container.appendChild(exportButton);

      // Add a click event listener to the export button
      exportButton.addEventListener("click", (event) => {
        const content = event.target
          .closest(answerContainerClassName)
          .querySelector(".w-full.break-words.dark\\:prose-invert");

        console.log("content", content);
        // Send a message to the background script with the associated content
        chrome.runtime.sendMessage({
          action: "export-content",
          content: content.outerHTML,
        });
      });
    }
  });
};

loadButtonToExport();

// Select the node that will be observed for changes
const targetNode = document.querySelector("#__next");

// Create a new instance of MutationObserver and specify a callback function
const observer = new MutationObserver((mutationsList) => {
  // Log a message when a mutation occurs
  console.log("DOM changed:", mutationsList);

  // Call loadButtonToExport to add export buttons to newly added containers
  loadButtonToExport();
});

// Configure the observer to watch for changes to the target node and its subtree
const config = { attributes: true, childList: true, subtree: true };

// Start observing the target node for changes
observer.observe(targetNode, config);
