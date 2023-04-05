import html2pdf from "html2pdf.js";
import TurndownService from "turndown";
import HtmlToRtfBrowser from "html-to-rtf-browser";
import { htmlToText } from "html-to-text";

export const generateDownload = (
  filename: string,
  content: BlobPart,
  mimeType: string
) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const filename = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `${year}${month}${day}${hour}${minute}${second}`;
  return timestamp;
};

export const downloadPDF = (content: any) => {
  const name = filename();
  html2pdf(content, {
    margin: 0,
    filename: `${name}.pdf`,
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pageBreak: {
      mode: ["legacy", "avoid-all", "css"],
    },
    enableLinks: true,
  });
};

export const downloadMD = (content: string) => {
  const name = filename();
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(content);
  generateDownload(`${name}.md`, markdown, "text/markdown");
  window.close()
};

export const downloadRTF = (content: string) => {
  const name = filename();
  const htmlToRtf = new HtmlToRtfBrowser();
  const rtf = htmlToRtf.convertHtmlToRtf(content);
  generateDownload(`${name}.rtf`, rtf, "application/rtf;charset=utf-8");
};

export const downloadTXT = (content: string) => {
  const name = filename();
  const text = htmlToText(content, { wordwrap: 130 });
  generateDownload(`${name}.txt`, text, "text/plain");
  window.close()
};

export const isValidUrl = (url: string) => {
  // Use RegExp to match the specific URL pattern
  const urlPattern = /^https:\/\/chat\.openai\.com\/chat.*/;
  return urlPattern.test(url);
};

export const copyToClipboard = async (content: string) => {
  try {
    const text = htmlToText(content, { wordwrap: 130 });
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
    // close popup after copying
    window.close()
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export const findNearestElementById = (
  element: Element | null | undefined,
  targetId: string
): Element | null => {
  if (!element) {
    return null;
  }

  // Search for siblings with the target ID
  const sibling = element?.parentElement?.querySelector(`#${targetId}`);
  if (sibling) {
    return sibling;
  }

  // Continue searching up the DOM tree
  return findNearestElementById(element.parentElement, targetId);
};
