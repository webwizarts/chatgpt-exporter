declare module "html2pdf.js" {
  export default function html2pdf(
    src: Element | string,
    opt?: {
      margin?: number;
      filename?: string;
      image?: {
        type?: string;
        quality?: number;
      };
      html2canvas?: any;
      jsPDF?: any;
      pageBreak?: any;
      enableLinks?: boolean;
    }
  ): Promise<void> | html2pdf.Worker;

  export class Worker {
    constructor(opt?: any);
    from(src: Element | string): Worker;
    save(): Promise<void>;
  }
}
