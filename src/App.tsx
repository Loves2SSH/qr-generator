import { useRef, useState } from "react";
import { TOKEN_AMOUNTS, type TokenAmount } from "./types";
import { isValidGmId, buildLabel, buildUrl, generateQrCode } from "./qr";
import { composeFinalImage } from "./canvas";
import { downloadCanvasAsPng } from "./download";
import "./App.css";

function App() {
  const [tokenAmount, setTokenAmount] = useState<TokenAmount>("100");
  const [gmId, setGmId] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);

  const gmIdIsValid = isValidGmId(gmId);

  async function handleGenerate() {
    if (!qrCanvasRef.current || !outputCanvasRef.current || !gmIdIsValid)
      return;

    const url = buildUrl(gmId, tokenAmount);
    const label = buildLabel(gmId, tokenAmount);

    await generateQrCode(qrCanvasRef.current, url);
    composeFinalImage(outputCanvasRef.current, qrCanvasRef.current, label);

    setHasGenerated(true);
  }

  function handleDownload() {
    if (!outputCanvasRef.current) return;
    downloadCanvasAsPng(outputCanvasRef.current, buildLabel(gmId, tokenAmount));
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>

      <label>
        Token Amount
        <select
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value as TokenAmount)}
        >
          {TOKEN_AMOUNTS.map((amount) => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </select>
      </label>

      <label>
        GM ID
        <input
          type="text"
          value={gmId}
          onChange={(e) => setGmId(e.target.value)}
          placeholder="0001"
          maxLength={4}
        />
      </label>

      {!gmIdIsValid && gmId.length > 0 && (
        <p className="error">GM ID must be exactly 4 digits.</p>
      )}

      <button onClick={handleGenerate} disabled={!gmIdIsValid}>
        Generate
      </button>

      {/* Hidden working canvas — just holds the raw QR before compositing */}
      <canvas ref={qrCanvasRef} style={{ display: "none" }} />

      {/* Visible final output — this is what gets downloaded */}
      <canvas ref={outputCanvasRef} className="qr-canvas" />

      {hasGenerated && <button onClick={handleDownload}>Download PNG</button>}
    </div>
  );
}

export default App;
