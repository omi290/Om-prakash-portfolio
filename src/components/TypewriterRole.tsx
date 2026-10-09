import { useEffect, useState, useRef } from 'react';

const roles = [
  "SOFTWARE DEVELOPER",
  "AI & DATA ENGINEER",
  "FULL STACK DEVELOPER",
  "FREELANCER",
  "VIDEO EDITOR"
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 1500;

export const TypewriterRole = () => {
  const [displayedText, setDisplayedText] = useState('');
  
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const currentRole = roles[roleIndexRef.current];

      if (isDeletingRef.current) {
        // Deleting
        charIndexRef.current -= 1;
        setDisplayedText(currentRole.substring(0, charIndexRef.current));
        
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
          timeoutRef.current = window.setTimeout(tick, 500); // small pause before typing next
        } else {
          timeoutRef.current = window.setTimeout(tick, DELETING_SPEED);
        }
      } else {
        // Typing
        charIndexRef.current += 1;
        setDisplayedText(currentRole.substring(0, charIndexRef.current));
        
        if (charIndexRef.current === currentRole.length) {
          isDeletingRef.current = true;
          timeoutRef.current = window.setTimeout(tick, PAUSE_DURATION);
        } else {
          timeoutRef.current = window.setTimeout(tick, TYPING_SPEED);
        }
      }
    };

    timeoutRef.current = window.setTimeout(tick, TYPING_SPEED);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="font-mono text-brand-accent tracking-wider text-sm md:text-base uppercase flex items-center min-h-[1.5rem]">
      <span>{displayedText}</span>
      <span className="inline-block w-2 h-4 bg-brand-accent ml-1 animate-pulse" />
    </div>
  );
};
