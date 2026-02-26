import React, { useEffect, useState } from 'react';

type Sentiment = 'calm' | 'stressed' | 'confused' | 'frustrated' | '';
type Destructiveness = 'permanent' | 'reversible' | 'neutral' | '';
type FinancialStakes = 'moves' | 'held' | 'none' | '';

export default function App() {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [sentiment, setSentiment] = useState<Sentiment>('');
  const [destructiveness, setDestructiveness] = useState<Destructiveness>('');
  const [financialStakes, setFinancialStakes] = useState<FinancialStakes>('');
  const [variations, setVariations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const canGenerate = !!selectedText && !!sentiment && !!destructiveness && !!financialStakes;

  useEffect(() => {
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (!msg) return;

      if (msg.type === 'selection') {
        setSelectedText(msg.text);
        setVariations([]);
      } else if (msg.type === 'no-selection') {
        setSelectedText(null);
        setVariations([]);
      }
    };
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setVariations([]);
    // TODO: call Claude API via prompt.ts
    setLoading(false);
  };

  const handleApply = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'apply-text', text } }, '*');
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '16px', fontSize: '13px' }}>
      <h2 style={{ margin: '0 0 16px' }}>StyleGuide AI</h2>

      {/* Selected text preview */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 600 }}>Selected Text</label>
        <div style={{
          marginTop: '6px',
          padding: '8px',
          background: '#F5F5F5',
          borderRadius: '6px',
          color: selectedText ? '#000' : '#999',
          minHeight: '36px',
        }}>
          {selectedText ?? 'Select a text layer in Figma…'}
        </div>
      </div>

      {/* Q1 */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontWeight: 600 }}>How is the user feeling?</label>
        <select value={sentiment} onChange={(e) => setSentiment(e.target.value as Sentiment)}
          style={{ display: 'block', width: '100%', marginTop: '6px', padding: '6px', borderRadius: '6px', border: '1px solid #CCC' }}>
          <option value="">— Select —</option>
          <option value="calm">Calm / Routine</option>
          <option value="stressed">Stressed / Urgent</option>
          <option value="confused">Confused / Uncertain</option>
          <option value="frustrated">Frustrated</option>
        </select>
      </div>

      {/* Q2 */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontWeight: 600 }}>Is this action destructive?</label>
        <select value={destructiveness} onChange={(e) => setDestructiveness(e.target.value as Destructiveness)}
          style={{ display: 'block', width: '100%', marginTop: '6px', padding: '6px', borderRadius: '6px', border: '1px solid #CCC' }}>
          <option value="">— Select —</option>
          <option value="permanent">Yes — Permanent</option>
          <option value="reversible">Yes — Reversible</option>
          <option value="neutral">No — Neutral</option>
        </select>
      </div>

      {/* Q3 */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 600 }}>Is money involved?</label>
        <select value={financialStakes} onChange={(e) => setFinancialStakes(e.target.value as FinancialStakes)}
          style={{ display: 'block', width: '100%', marginTop: '6px', padding: '6px', borderRadius: '6px', border: '1px solid #CCC' }}>
          <option value="">— Select —</option>
          <option value="moves">Yes — Money moves</option>
          <option value="held">Yes — Held / Paused</option>
          <option value="none">No — Data / Settings</option>
        </select>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate || loading}
        style={{
          width: '100%',
          padding: '10px',
          background: canGenerate ? '#18A0FB' : '#CCC',
          color: '#FFF',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          cursor: canGenerate ? 'pointer' : 'not-allowed',
        }}
      >
        {loading ? 'Generating…' : 'Generate'}
      </button>

      {/* Variation bubbles */}
      {variations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontWeight: 600 }}>Suggestions — click to apply</label>
          {variations.map((v, i) => (
            <div key={i} onClick={() => handleApply(v)} style={{
              marginTop: '8px',
              padding: '10px 12px',
              background: '#EBF5FF',
              border: '1px solid #18A0FB',
              borderRadius: '8px',
              cursor: 'pointer',
              lineHeight: '1.5',
            }}>
              {v}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
