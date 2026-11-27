/**
 * Lets one transition run at a time. Starting a second view transition while the first one's
 * pseudo-element animation is still running crashes Chromium (HI-01), so requests made while
 * busy are refused, never queued.
 */
export function createTransitionGuard() {
  let busy = false;
  const release = () => { busy = false; };
  return {
    get busy() { return busy; },
    /** Runs `start` unless a transition is running; says whether it ran. */
    run(start: () => Promise<unknown>): boolean {
      if (busy) return false;
      busy = true;
      try {
        start().then(release, release);
      } catch (error) {
        release();
        throw error;
      }
      return true;
    },
  };
}
