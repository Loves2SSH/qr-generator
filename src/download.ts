import { setPngDpi } from "./pngMetadata";
import { PRINT_DPI } from "./layout";

export function downloadCanvasAsPng(
  canvas: HTMLCanvasElement,
  filename: string,
): void {
  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const finalBlob = await setPngDpi(blob, PRINT_DPI);

    const url = URL.createObjectURL(finalBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
