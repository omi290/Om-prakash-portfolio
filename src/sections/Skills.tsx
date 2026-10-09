import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      });

      if (prefersReducedMotion) {
        gsap.set([headingRef.current, lineRef.current], { opacity: 1 });
        if (gridRef.current && gridRef.current.children) {
          gsap.set(gridRef.current.children, { opacity: 1 });
        }
        return;
      }

      tl.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 0.4, ease: 'power3.out' }
      )
      .fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.6'
      );

      if (gridRef.current && gridRef.current.children) {
        tl.fromTo(
          gridRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="skills" 
      className="relative w-full py-24 lg:py-32 bg-transparent flex flex-col justify-center overflow-hidden z-10"
    >
      {/* Background connecting elements */}
      
      
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Eyebrow & Line */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:pr-8">
            <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-6">
              <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand-accent uppercase opacity-90 m-0">
                Technical Skills
              </h2>
              <div className="relative">
                <div className="w-12 h-[1px] lg:w-[1px] lg:h-32 bg-brand-gray/20" />
                <div ref={lineRef} className="absolute top-0 left-0 w-12 h-[1px] lg:w-[1px] lg:h-32 bg-brand-accent/60 scale-0" />
              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-9">
            <div ref={headingRef} className="opacity-0 mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-6 text-brand-off">
                A robust toolkit for building scalable systems.
              </h3>
              <p className="text-brand-gray text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                My technical foundation spans across low-level programming, full-stack web development, and data-intensive machine learning ecosystems.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {skillsData.map((category, index) => (
                <div 
                  key={index} 
                  className="opacity-0 p-6 sm:p-8 rounded-xl border border-brand-gray/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm"
                >
                  <h4 className="text-lg font-semibold text-brand-off mb-6 tracking-wide flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/70" />
                    {category.category}
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 text-sm font-mono text-brand-off/80 border border-brand-gray/15 rounded-md bg-transparent/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
