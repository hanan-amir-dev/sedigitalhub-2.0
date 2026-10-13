import { useEffect, useRef } from "react";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;

/**
 * Calls `onTimeout` after `minutes` of user inactivity. Any mouse/keyboard/
 * scroll/touch activity resets the countdown. Mount this only on the surface
 * you want protected (e.g. the admin dashboard) so other areas are unaffected.
 */
export function useIdleLogout(onTimeout: () => void, minutes = 30) {
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ms = minutes * 60 * 1000;
    let timer: ReturnType<typeof setTimeout>;
    let lastReset = 0;

    const start = () => {
      clearTimeout(timer);
      timer = setTimeout(() => onTimeoutRef.current(), ms);
    };

    // Throttle resets to at most once/second to avoid churn on mousemove/scroll.
    const onActivity = () => {
      const now = Date.now();
      if (now - lastReset < 1000) return;
      lastReset = now;
      start();
    };

    start();
    for (const evt of ACTIVITY_EVENTS) {
      window.addEventListener(evt, onActivity, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      for (const evt of ACTIVITY_EVENTS) {
        window.removeEventListener(evt, onActivity);
      }
    };
  }, [minutes]);
}
