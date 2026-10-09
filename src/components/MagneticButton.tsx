import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
  href?: string;
  download?: boolean | string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '',
  onClick,
  primary = false,
  href,
  download
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 1,
        ease: 'power3.out',
      });
      
      if (textRef.current) {
        gsap.to(textRef.current, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 1,
          ease: 'power3.out',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
      
      if (textRef.current) {
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    button.addEventListener('mousemove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mousemove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const baseClasses = "magnetic-element relative px-8 py-4 rounded-full font-sans font-semibold tracking-wide text-sm overflow-hidden transition-colors duration-300 flex items-center justify-center cursor-none";
  const primaryClasses = primary 
    ? "bg-white text-black hover:bg-gray-200" 
    : "bg-transparent text-white border border-white/20 hover:bg-white/5";

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        download={download}
        className={`${baseClasses} ${primaryClasses} ${className}`}
        onClick={onClick}
      >
        <div ref={textRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
          {children}
        </div>
      </a>
    );
  }

  return (
    <button 
      ref={buttonRef} 
      className={`${baseClasses} ${primaryClasses} ${className}`}
      onClick={onClick}
    >
      <div ref={textRef} className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </div>
    </button>
  );
};
