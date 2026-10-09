import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { experienceData } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
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
          start: 'top 75%',
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
        { scaleY: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      if (cardsRef.current && cardsRef.current.children) {
        tl.fromTo(
          cardsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative w-full py-24 lg:py-32 bg-brand-dark flex flex-col justify-center overflow-hidden z-10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Eyebrow & Line */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:pr-8">
            <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-6">
              <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand-accent uppercase opacity-90 m-0">
                Experience
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
                Professional Journey.
              </h3>
            </div>

            {/* Experience Cards */}
            <div ref={cardsRef} className="flex flex-col gap-8">
              {experienceData.map((job, index) => (
                <div 
                  key={index} 
                  className="opacity-0 relative pl-6 sm:pl-8 border-l border-brand-gray/20"
                >
                  {/* Timeline dot */}
                  <div className="absolute top-1.5 -left-[5px] w-[9px] h-[9px] rounded-full bg-brand-accent/80 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 mb-4">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-off">
                        {job.role}
                      </h4>
                      <div className="text-brand-accent text-lg font-medium mt-1">
                        {job.company}
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end text-brand-gray/80 font-mono text-sm">
                      <span>{job.duration}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 text-brand-gray text-base sm:text-lg font-light leading-relaxed">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="relative pl-5">
                        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-brand-gray/40 rounded-full" />
                        {resp}
                      </li>
                    ))}
                  </ul>

                  {job.repositoryUrl && (
                    <a 
                      href={job.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-mono text-brand-off/90 hover:text-brand-accent transition-colors duration-200 border border-brand-gray/20 rounded-full px-4 py-2 hover:border-brand-accent/50 bg-white/[0.02]"
                    >
                      View Repository
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
