import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy } from 'lucide-react';
import { achievementsData } from '../data/achievements';

gsap.registerPlugin(ScrollTrigger);

export const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
        if (cardsRef.current && cardsRef.current.children) {
          gsap.set(cardsRef.current.children, { opacity: 1 });
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

      if (cardsRef.current && cardsRef.current.children) {
        tl.fromTo(
          cardsRef.current.children,
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
      id="achievements" 
      className="relative w-full py-24 lg:py-32 bg-transparent flex flex-col justify-center overflow-hidden z-10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Eyebrow & Line */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:pr-8">
            <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-6">
              <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand-accent uppercase opacity-90 m-0">
                Recognitions
              </h2>
              <div className="relative">
                <div className="w-12 h-[1px] lg:w-[1px] lg:h-32 bg-brand-gray/20" />
                <div ref={lineRef} className="absolute top-0 left-0 w-12 h-[1px] lg:w-[1px] lg:h-32 bg-brand-accent/60 scale-0" />
              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-9">
            <div ref={headingRef} className="opacity-0 mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-brand-off">
                Achievements.
              </h3>
            </div>

            {/* Achievements Grid */}
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {achievementsData.map((item, index) => (
                <div 
                  key={index} 
                  className="opacity-0 relative p-8 rounded-2xl border border-brand-gray/10 bg-white/[0.01] hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm group"
                >
                  <div className="absolute top-6 right-6 text-brand-accent/30 group-hover:text-brand-accent/60 transition-colors duration-300">
                    <Trophy size={32} strokeWidth={1} />
                  </div>
                  
                  <div className="text-brand-accent font-mono text-xs tracking-widest uppercase mb-3 pr-12">
                    {item.event}
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-bold text-brand-off mb-4 pr-8">
                    {item.title}
                  </h4>
                  
                  <p className="text-brand-gray text-base font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
