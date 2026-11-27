/** What a key press means for the lens (Lens.astro). Pure, so the rules are testable without a DOM. */
export const EDITABLE = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';

interface Field {
  value?: string;
  textContent?: string | null;
}

/** The editable field a key event came from, or null. */
export function editableTarget(target: unknown): Field | null {
  const element = target as { closest?: (selector: string) => Field | null } | null;
  return element?.closest?.(EDITABLE) ?? null;
}

export interface LensKey {
  key: string;
  target: unknown;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  repeat: boolean;
  isComposing: boolean;
}

export interface LensKeyState {
  inside: boolean;
  dragging: boolean;
  shortcutDisabled: boolean;
}

export type LensKeyAction = 'cancel-drag' | 'leave-inside' | 'blur-field' | 'toggle' | 'none';

export function lensKeyAction(event: LensKey, state: LensKeyState): LensKeyAction {
  // Chrome's autofill and some extensions dispatch keydown events without a key.
  if (typeof event.key !== 'string') return 'none';
  const field = editableTarget(event.target);
  if (event.key === 'Escape') {
    if (state.dragging) return 'cancel-drag';
    if (event.isComposing) return 'none';
    // Typing never triggers a page shortcut; an empty field just lets go of the focus.
    if (field) return (field.value ?? field.textContent ?? '') === '' ? 'blur-field' : 'none';
    return state.inside ? 'leave-inside' : 'none';
  }
  const isShortcut = event.key.toLowerCase() === 'i' && !event.ctrlKey && !event.metaKey && !event.altKey;
  if (!isShortcut || event.repeat || event.isComposing || state.shortcutDisabled || state.dragging || field) return 'none';
  return 'toggle';
}
