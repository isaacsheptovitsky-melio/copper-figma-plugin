import React, { useEffect, useState } from "react";
import QuestionMultipleChoice from "./components/QuestionMultipleChoice";
import { assemblePrompt } from "./prompt";

const QUESTIONS: { label: string; options: string[] }[] = [
  {
    label: "How is the user feeling?",
    options: [
      "Calm / Routine",
      "Stressed / Urgent",
      "Confused / Uncertain",
      "Frustrated",
    ],
  },
  {
    label: "Is this action destructive?",
    options: ["Yes — Permanent", "Yes — Reversible", "No — Neutral"],
  },
  {
    label: "Is money involved?",
    options: [
      "Yes — Money moves",
      "Yes — Held / Paused",
      "No — Data / Settings",
    ],
  },
];

export default function App() {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [variations, setVariations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const canGenerate = !!selectedText && QUESTIONS.every((_, i) => !!answers[i]);

  useEffect(() => {
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;

      if (msg.type === "selection") {
        setSelectedText(msg.text);
        setVariations([]);
      } else if (msg.type === "no-selection") {
        setSelectedText(null);
        setVariations([]);
      }
    };
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setVariations([]);
    console.log("API key defined:", !!process.env.ANTHROPIC_API_KEY, "| length:", process.env.ANTHROPIC_API_KEY?.length ?? 0);

    const context = QUESTIONS.map((q, i) => ({ question: q.label, answer: answers[i] }));
    const prompt = assemblePrompt(selectedText!, context);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Anthropic API error:", JSON.stringify(data));
        return;
      }

      const text: string = data.content[0].text;

      const parsed = text
        .split("\n")
        .filter((line) => /^\d+\./.test(line))
        .map((line) => line.replace(/^\d+\.\s*/, "").trim());

      setVariations(parsed);
    } catch (err) {
      console.error("Claude API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (text: string) => {
    parent.postMessage({ pluginMessage: { type: "apply-text", text } }, "*");
  };

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        padding: "16px",
        fontSize: "13px",
      }}
    >
      <h2 style={{ margin: "0 0 16px" }}>💂 Copper</h2>

      {/* Selected text preview */}
      <div style={{ marginBottom: "16px" }}>
        <label style={{ fontWeight: 600 }}>Selected Text</label>
        <div
          style={{
            marginTop: "6px",
            padding: "8px",
            background: "#F5F5F5",
            borderRadius: "6px",
            color: selectedText ? "#000" : "#999",
            minHeight: "36px",
          }}
        >
          {selectedText ?? "Select a text layer in Figma…"}
        </div>
      </div>

      {/* Questions */}
      {QUESTIONS.map((q, i) => (
        <QuestionMultipleChoice
          key={i}
          label={q.label}
          options={q.options}
          value={answers[i] ?? ""}
          onChange={(val) => setAnswers((prev) => ({ ...prev, [i]: val }))}
        />
      ))}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate || loading}
        style={{
          width: "100%",
          padding: "10px",
          background: canGenerate ? "#18A0FB" : "#CCC",
          color: "#FFF",
          border: "none",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: canGenerate ? "pointer" : "not-allowed",
        }}
      >
        {loading ? "Generating…" : "Generate"}
      </button>

      {/* Variation bubbles */}
      {variations.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label style={{ fontWeight: 600 }}>
            Suggestions — click to apply
          </label>
          {variations.map((v, i) => (
            <div
              key={i}
              onClick={() => handleApply(v)}
              style={{
                marginTop: "8px",
                padding: "10px 12px",
                background: "#EBF5FF",
                border: "1px solid #18A0FB",
                borderRadius: "8px",
                cursor: "pointer",
                lineHeight: "1.5",
              }}
            >
              {v}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
