import { useRef, useState } from "react";
import { TOKEN_AMOUNTS, type TokenAmount } from "./types";
import { isValidGmId, buildLabel, buildUrl, generateQrCode } from "./qr";
import { drawLabel } from "./canvas";
import { downloadCanvasAsPng } from "./download";
import "./App.css";

function App() {
  const [tokenAmount, setTokenAmount] = useState<TokenAmount>("100");
  const [gmId, setGmId] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gmIdIsValid = isValidGmId(gmId);

  async function handleGenerate() {
    if (!canvasRef.current || !gmIdIsValid) return;

    const url = buildUrl(gmId, tokenAmount);
    const label = buildLabel(gmId, tokenAmount);

    await generateQrCode(canvasRef.current, url);
    await drawLabel(canvasRef.current, label);

    setHasGenerated(true);
  }

  function handleDownload() {
    if (!canvasRef.current) return;
    downloadCanvasAsPng(canvasRef.current, buildLabel(gmId, tokenAmount));
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

      <canvas ref={canvasRef} className="qr-canvas" />

      {hasGenerated && <button onClick={handleDownload}>Download PNG</button>}
    </div>
  );
}

export default App;
