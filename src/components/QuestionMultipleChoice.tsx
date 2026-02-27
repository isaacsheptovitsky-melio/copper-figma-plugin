import React from 'react';

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionMultipleChoice({ label, options, value, onChange }: Props) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ fontWeight: 600 }}>{label}</label>
      <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {options.map((opt) => (
          <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal' }}>
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
