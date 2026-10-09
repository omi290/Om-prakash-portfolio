import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { secondaryProjects } from '../data/projects';

export const ProjectsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.children ? Array.from(containerRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="absolute top-0 left-1/2 w-[80%] h-[40%] rounded-full opacity-[0.03] blur-[100px] pointer-events-none -translate-x-1/2" 
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} 
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        <div className="mb-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-off transition-colors duration-200 mb-8 font-mono text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-brand-off mb-4">
            All Projects.
          </h1>
          <p className="text-brand-gray text-lg sm:text-xl font-light max-w-2xl">
            A comprehensive collection of my software engineering, machine learning, and data projects.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {secondaryProjects.map((project, index) => (
            <div 
              key={index}
              className="flex flex-col p-8 rounded-2xl border border-brand-gray/10 bg-white/[0.01] hover:bg-white/[0.03] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-brand-off leading-tight pr-4">
                  {project.title}
                </h2>
                {project.inProgress && (
                  <span className="shrink-0 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono rounded-full uppercase tracking-wider">
                    In Progress
                  </span>
                )}
              </div>
              
              <div className="text-brand-gray text-base font-light leading-relaxed mb-8 flex-grow">
                {project.description.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('-') ? 'pl-4 relative' : 'mb-3'}>
                    {line.startsWith('-') && <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-brand-gray/40 rounded-full" />}
                    {line.startsWith('-') ? line.substring(1).trim() : line}
                  </p>
                ))}
              </div>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-mono text-brand-off/80 border border-brand-gray/15 rounded-md bg-transparent/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-brand-off/90 hover:text-brand-accent transition-colors duration-200 border border-brand-gray/20 rounded-full px-5 py-2 hover:border-brand-accent/50 bg-white/[0.02]"
                >
                  View Repository
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};
