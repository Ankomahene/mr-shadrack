// Light/dark/system theme. index.html applies the saved choice before first paint; this keeps it in
// sync afterwards. (Replaces next-themes, whose injected <script> React 19 now warns about.)
import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light' | 'system';

const KEY = 'theme';
const listeners = new Set<() => void>();
const media = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function read(): Theme {
  try {
    const t = localStorage.getItem(KEY);
    return t === 'light' || t === 'system' ? t : 'dark';
  } catch {
    return 'dark';
  }
}

let current: Theme = typeof window !== 'undefined' ? read() : 'dark';

function apply() {
  const dark = current === 'dark' || (current === 'system' && !!media?.matches);
  document.documentElement.classList.toggle('dark', dark);
}

media?.addEventListener('change', () => {
  if (current === 'system') {
    apply();
    listeners.forEach((l) => l());
  }
});

export function setTheme(theme: Theme) {
  current = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  // Switch instantly rather than animating every color transition on the page.
  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.appendChild(style);
  apply();
  requestAnimationFrame(() => style.remove());
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current, () => 'dark' as Theme);
  return { theme, setTheme };
}
