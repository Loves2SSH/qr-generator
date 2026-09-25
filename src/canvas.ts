import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  QR_SIZE,
  QR_MARGIN_X,
  QR_MARGIN_TOP,
  LABEL_FONT_SIZE,
} from "./layout";

export function composeFinalImage(
  outputCanvas: HTMLCanvasElement,
  qrCanvas: HTMLCanvasElement,
  label: string,
): void {
  outputCanvas.width = CANVAS_WIDTH;
  outputCanvas.height = CANVAS_HEIGHT;

  const ctx = outputCanvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.drawImage(qrCanvas, QR_MARGIN_X, QR_MARGIN_TOP, QR_SIZE, QR_SIZE);

  const labelAreaTop = QR_MARGIN_TOP + QR_SIZE;
  const labelAreaHeight = CANVAS_HEIGHT - labelAreaTop;

  ctx.fillStyle = "#000000";
  ctx.font = `bold ${LABEL_FONT_SIZE}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, CANVAS_WIDTH / 2, labelAreaTop + labelAreaHeight / 2);
}
