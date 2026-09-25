// PNG files don't carry a "print DPI" by default — canvas.toBlob() only
// stores pixel dimensions. To make a PNG register as e.g. 300 DPI in
// print/design tools, we inject a pHYs metadata chunk into the file
// bytes ourselves after generating it.

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let bit = 0; bit < 8; bit++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildPhysChunk(dpi: number): Uint8Array {
  const pixelsPerMeter = Math.round(dpi / 0.0254);

  const type = new TextEncoder().encode('pHYs');
  const data = new Uint8Array(9);
  const dataView = new DataView(data.buffer);
  dataView.setUint32(0, pixelsPerMeter);
  dataView.setUint32(4, pixelsPerMeter);
  data[8] = 1;

  const crcInput = new Uint8Array(type.length + data.length);
  crcInput.set(type, 0);
  crcInput.set(data, type.length);
  const crc = crc32(crcInput);

  const chunk = new Uint8Array(4 + type.length + data.length + 4);
  const chunkView = new DataView(chunk.buffer);
  chunkView.setUint32(0, data.length);
  chunk.set(type, 4);
  chunk.set(data, 8);
  chunkView.setUint32(8 + data.length, crc);

  return chunk;
}

export async function setPngDpi(pngBlob: Blob, dpi: number): Promise<Blob> {
  const buffer = await pngBlob.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  const ihdrEnd = 8 + 25;
  const physChunk = buildPhysChunk(dpi);

  const result = new Uint8Array(bytes.length + physChunk.length);
  result.set(bytes.slice(0, ihdrEnd), 0);
  result.set(physChunk, ihdrEnd);
  result.set(bytes.slice(ihdrEnd), ihdrEnd + physChunk.length);

  return new Blob([result], { type: 'image/png' });
}
