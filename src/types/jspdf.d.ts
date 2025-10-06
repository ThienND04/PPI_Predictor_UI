declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: { orientation?: 'p' | 'portrait' | 'l' | 'landscape'; unit?: string; format?: string | number[] });
    setFontSize(size: number): void;
    text(text: string, x: number, y: number): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    setLineWidth(width: number): void;
    addPage(format?: string | number[], orientation?: 'p' | 'portrait' | 'l' | 'landscape'): void;
    save(filename: string): void;
    internal: { pageSize: { getWidth(): number; getHeight(): number } };
  }
}


