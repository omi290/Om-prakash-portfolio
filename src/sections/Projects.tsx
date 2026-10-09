import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
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
      id="projects" 
      className="relative w-full py-24 lg:py-32 bg-brand-dark flex flex-col justify-center overflow-hidden z-10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Eyebrow & Line */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:pr-8">
            <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-6">
              <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand-accent uppercase opacity-90 m-0">
                Selected Works
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
                Featured Projects.
              </h3>
            </div>

            {/* Projects Container */}
            <div ref={cardsRef} className="flex flex-col gap-10">
              {featuredProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="opacity-0 group relative p-6 sm:p-8 lg:p-10 rounded-2xl border border-brand-gray/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm"
                >
                  <div className="relative z-10">
                    <h4 className="text-2xl sm:text-3xl font-bold text-brand-off mb-4 tracking-wide">
                      {project.title}
                    </h4>
                    
                    <p className="text-brand-gray text-base sm:text-lg font-light leading-relaxed mb-8 max-w-4xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 text-xs sm:text-sm font-mono text-brand-off/80 border border-brand-gray/15 rounded-md bg-brand-dark/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-mono text-brand-off/90 hover:text-brand-accent transition-colors duration-200 border border-brand-gray/20 rounded-full px-5 py-2.5 hover:border-brand-accent/50 bg-white/[0.02]"
                    >
                      View Repository
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
              
              <div className="opacity-0 pt-6">
                <Link 
                  to="/projects"
                  className="inline-flex items-center gap-3 text-base sm:text-lg font-mono text-brand-off hover:text-brand-accent transition-colors duration-300 group"
                >
                  View More Projects
                  <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
