/** Temporary feedback for an action ("Copied"): show it, then restore. Repeating restarts the clock. */
export function createFlash(show: () => void, reset: () => void, duration: number): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return () => {
    clearTimeout(timer);
    show();
    timer = setTimeout(reset, duration);
  };
}
