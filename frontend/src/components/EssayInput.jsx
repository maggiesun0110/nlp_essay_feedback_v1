import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";

function EssayInput({ setResult }) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeEssay = async () => {
    const essay = text.trim();
    if (!essay) {
      setError("Paste some writing before running the analysis.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: essay }),
      });

      if (!response.ok) {
        throw new Error("The analysis service returned an error.");
      }

      setResult(await response.json());
    } catch (requestError) {
      setError(`${requestError.message} Check that the backend is running.`);
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <section className="input-panel" aria-labelledby="essay-input-title">
      <label id="essay-input-title" htmlFor="essay-text">Essay text</label>
      <textarea
        id="essay-text"
        rows="12"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste an essay or paragraph here…"
      />
      <div className="input-actions">
        <span>{wordCount} words</span>
        <button type="button" onClick={analyzeEssay} disabled={isLoading}>
          {isLoading ? "Analyzing…" : "Analyze essay"}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
    </section>
  );
}

export default EssayInput;
