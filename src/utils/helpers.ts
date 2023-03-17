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

// TODO: Make filename timestamp.filetype
export const downloadPDF = (content: string) => {
  html2pdf(content, {
    margin: 0,
    filename: "prompt.pdf",
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  });
};

export const downloadMD = (content: string) => {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(content);
  generateDownload("prompt.md", markdown, "text/markdown");
};

export const downloadRTF = (content: string) => {
  const htmlToRtf = new HtmlToRtfBrowser();
  const rtf = htmlToRtf.convertHtmlToRtf(content);
  generateDownload("prompt.rtf", rtf, "application/rtf;charset=utf-8");
};

export const downloadTXT = (content: string) => {
  const text = htmlToText(content, { wordwrap: 130 });
  generateDownload("prompt.txt", text, "text/plain");
};