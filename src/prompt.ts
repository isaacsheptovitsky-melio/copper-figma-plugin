import styleGuide from '../assets/style-guide.md';

export interface QA {
  question: string;
  answer: string;
}

export function assemblePrompt(selectedText: string, context: QA[]): string {
  const contextBlock = context
    .map(({ question, answer }) => `- ${question}: ${answer}`)
    .join('\n');

  return `You are a Senior Content Designer. Rewrite the [Selected Text] using the [Style Guide].

User Context:
${contextBlock}

Rules:
- Output exactly 3 variations, prefixed with 1., 2., 3. — one per line.
- Do not exceed the original character count by more than 20%.
- Output copy only. No explanations.

Style Guide:
${styleGuide}

Selected Text:
${selectedText}`;
}
