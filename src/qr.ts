import QRCode from "qrcode";
import type { TokenAmount } from "./types";
import { QR_SIZE } from "./layout";

export function isValidGmId(gmId: string): boolean {
  return /^\d{4}$/.test(gmId);
}

export function buildLabel(gmId: string, tokenAmount: TokenAmount): string {
  return `GM${gmId}T${tokenAmount}`;
}

export function buildUrl(gmId: string, tokenAmount: TokenAmount): string {
  const base = "https://yourapp.example/redeem";
  const params = new URLSearchParams({ gm: gmId, tokens: tokenAmount });
  return `${base}?${params.toString()}`;
}

export async function generateQrCode(
  canvas: HTMLCanvasElement,
  url: string,
): Promise<void> {
  await QRCode.toCanvas(canvas, url, {
    margin: 1,
    width: QR_SIZE,
    color: {
      dark: "#000000ff",
      light: "#ffffff00",
    },
  });
}
