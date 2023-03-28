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
  const title = document.title
  return title
}

export const downloadPDF = (content: any) => {
  html2pdf(content, {
    margin: 0,
    filename: filename() + '.pdf',
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    pageBreak: {
      mode: ['legacy', 'avoid-all', 'css']
    },
    enableLinks: true
  });
};

export const downloadMD = (content: string) => {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(content);
  generateDownload(filename() + ".md", markdown, "text/markdown");
};

export const downloadRTF = (content: string) => {
  const htmlToRtf = new HtmlToRtfBrowser();
  const rtf = htmlToRtf.convertHtmlToRtf(content);
  generateDownload(filename() + ".rtf", rtf, "application/rtf;charset=utf-8");
};

export const downloadTXT = (content: string) => {
  const text = htmlToText(content, { wordwrap: 130 });
  generateDownload(filename() + ".txt", text, "text/plain");
};

export const isValidUrl = (url: string) => {
  // Use RegExp to match the specific URL pattern
  const urlPattern = /^https:\/\/chat\.openai\.com\/chat.*/;
  return urlPattern.test(url);
}

export const copyToClipboard = async (content: string) => {
  try {
    const text = htmlToText(content, { wordwrap: 130 });
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};