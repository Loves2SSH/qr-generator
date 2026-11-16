# QR Code Generator

 **Live Demo:** [https://qr-generator-cock5.vercel.app/](https://qr-generator-cock5.vercel.app/)

A React + TypeScript app built for a client rewards system. It generates custom QR codes for event attendees and staff, overlays them onto a template, and exports the final image ready for print or digital use.

##  What it does

I built this to solve a specific problem for an event rewards system: we needed a fast way to generate and track QR codes tied to specific Game Master IDs and token amounts. 

Instead of just generating a raw QR code, the app takes the QR data, renders it onto an HTML5 Canvas, overlays it onto a custom template, applies the correct sizing, and embeds PNG metadata into the final file before download.

## 🛠️ Tech Stack
- **React 19** + **TypeScript** (Vite)
- `qrcode` (for the core generation)
- HTML5 Canvas (for image compositing and export)

##  How it's built (and why)

- **It all happens in the browser.** I used the HTML5 Canvas API to handle all the image generation and compositing client-side. There's no backend needed for image processing, which keeps it fast and means no server costs.
- **Split logic out of the UI.** `App.tsx` just handles the UI state. The actual work is separated into dedicated files: `qr.ts` (validation and URL building), `canvas.ts` (the rendering logic), and `layout.ts` (sizing). It kept the components clean and made the canvas math much easier to debug.
- **Validation matters.** The system requires a strict 4-digit GM ID. The app validates this before generating the code so we don't end up with broken or malformed QR codes in production.

##  Running it locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Loves2SSH/qr-generator.git
