import { useEffect, useState } from 'react';
import Icon from './Icon';
import { ICONS } from '../constants/icons';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === 'dark' : prefersDark;
    setIsDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('theme-transition');
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
    return () => clearTimeout(timeout);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 text-xl rounded-full hover:bg-slate-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Icon path={ICONS.SUN ?? ICONS.MENU} className="w-6 h-6 text-yellow-300" />
      ) : (
        <Icon path={ICONS.MOON ?? ICONS.MENU} className="w-6 h-6 text-slate-800" />
      )}
    </button>
  );
};

export default DarkModeToggle;
