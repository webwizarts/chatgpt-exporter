<img src="https://user-images.githubusercontent.com/84965867/229865932-b4bcb73b-7f72-4671-8b16-d80cf6ef087c.png" width="150"/>

# ChatGPT Exporter
This is a Chrome extension that allows you to export chat content in various formats such as PDF, Markdown, RTF, and plain text. The project is built using React, TypeScript, and styled-components, and leverages webpack for bundling.

Features
--------

*   Export chat content in PDF format
*   Convert HTML to Markdown
*   Convert HTML to RTF
*   Convert HTML to plain text

Scripts
-------

*   `lint`: Run ESLint to check for code quality issues in TypeScript and React files
*   `clean`: Remove the `dist` directory
*   `build`: Clean the `dist` directory and bundle the project using webpack
*   `watch`: Clean the `dist` directory, run lint, and watch for changes using webpack


Installation
------------

1.  Clone the chat-gpt-export repository:

`git clone https://github.com/webwizarts/chatgpt-exporter.git`

2.  Navigate to the extracted folder:

`cd chatgpt-exporter`

3.  Install the required dependencies:

`npm install`

4.  Build the extension:

`npm run build`

5.  Load the extension in Chrome:

*   Open Chrome and go to `chrome://extensions/`
*   Enable "Developer mode" in the top right corner
*   Click "Load unpacked" and select the `dist` folder in the `chatgpt-exporter` directory

Usage
-----

Once the chat-gpt-export extension is installed, follow these steps to use it:

1.  Go to your GPT-3 chat page.
2.  Locate the "Download" button on every chat response.

### Download Options

*   **Left click**: Opens a context menu that allows you to download the chat content in different formats, such as PDF, Markdown, RTF, or plain text.
*   **Right click**: Opens a modal window with the chat content in an editable rich text format. You can modify the content and download it in various formats using the buttons provided in the modal.

With the chat-gpt-export extension, you can easily download and manage your GPT-3 chat content in a variety of formats for further use and analysis.

Dependencies
------------

### Development Dependencies

*   Babel, TypeScript, and related presets and loaders for transpilation and bundling
*   ESLint and related plugins for linting
*   Webpack and related plugins for bundling and development server

### Runtime Dependencies

*   `react` and `react-dom` for building user interfaces
*   `styled-components` for styling components
*   `turndown` for converting HTML to Markdown
*   `html-to-rtf-browser` for converting HTML to RTF
*   `html-to-text` for converting HTML to plain text
*   `html2pdf.js` for converting HTML to PDF
*   `@contentful/rich-text-from-markdown` for converting Markdown to Contentful Rich Text
*   `react-quill` for rich text editing
