export function drawLabel(
  canvas: HTMLCanvasElement,
  label: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Could not get 2D context"));
      return;
    }

    // Snapshot the QR that's currently on the canvas, because
    // resizing the canvas below will erase it.
    const qrSnapshot = canvas.toDataURL("image/png");
    const img = new Image();

    img.onload = () => {
      const labelHeight = 40;
      const qrHeight = canvas.height;

      // Changing width/height on a canvas clears its contents —

      canvas.height = qrHeight + labelHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, canvas.width / 2, qrHeight + labelHeight / 2);

      resolve();
    };

    img.onerror = () => reject(new Error("Failed to reload QR snapshot"));
    img.src = qrSnapshot;
  });
}
