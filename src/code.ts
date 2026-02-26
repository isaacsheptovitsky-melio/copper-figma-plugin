/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { width: 380, height: 560 });

figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection;
  const node = selection[0];

  if (node && node.type === 'TEXT') {
    figma.ui.postMessage({
      type: 'selection',
      text: node.characters,
    });
  } else {
    figma.ui.postMessage({ type: 'no-selection' });
  }
});

figma.ui.onmessage = async (msg: { type: string; text?: string }) => {
  if (msg.type === 'apply-text') {
    const selection = figma.currentPage.selection;
    const node = selection[0];

    if (node && node.type === 'TEXT' && msg.text !== undefined) {
      await figma.loadFontAsync(node.fontName as FontName);
      node.characters = msg.text;
    }
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
