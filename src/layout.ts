// Output image dimensions, matching print spec: 2000x2100px @ 300 DPI
// (2000/300 = 6.67in wide, 2100/300 = 7in tall)
export const CANVAS_WIDTH = 2000;
export const CANVAS_HEIGHT = 2100;
export const PRINT_DPI = 300;

// QR code: always drawn at equal width/height, so it can never be
// stretched off a 1:1 ratio. Sized to fill most of the canvas width,
// with margin left for a print-safe quiet zone around the edges.
export const QR_SIZE = 1800;
export const QR_MARGIN_X = (CANVAS_WIDTH - QR_SIZE) / 2;
export const QR_MARGIN_TOP = 80;

// Remaining vertical space below the QR is reserved for the label
export const LABEL_FONT_SIZE = 100;
