import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if the element is available
    if (!sectionRef.current) return;
    
    // Check for reduced motion
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
        gsap.set([headingRef.current, text1Ref.current, text2Ref.current, lineRef.current], { opacity: 1 });
        if (skillsRef.current && skillsRef.current.children) {
          gsap.set(skillsRef.current.children, { opacity: 1 });
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
        '-=0.4'
      )
      .fromTo(
        text1Ref.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        text2Ref.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      );

      if (skillsRef.current && skillsRef.current.children) {
        tl.fromTo(
          skillsRef.current.children,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative w-full min-h-screen py-24 lg:py-32 bg-transparent flex flex-col justify-center overflow-hidden z-10"
    >
      {/* Background connecting elements from Hero */}
      
      
      {/* Restrained icy-blue subtle ambient glow */}
      <div 
        className="absolute top-1/2 right-0 w-[50%] h-[60%] rounded-full opacity-[0.025] blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/2" 
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }} 
      />

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Line & Eyebrow */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:pr-8">
            <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-6">
              <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand-accent uppercase opacity-90 m-0">
                About Me
              </h2>
              {/* Vertical line for desktop, horizontal for mobile */}
              <div className="relative">
                <div className="w-12 h-[1px] lg:w-[1px] lg:h-32 bg-brand-gray/20" />
                <div ref={lineRef} className="absolute top-0 left-0 w-12 h-[1px] lg:w-[1px] lg:h-32 bg-brand-accent/60 scale-0" />
              </div>
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-8 xl:col-span-7">
            <h3 ref={headingRef} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] mb-8 text-brand-off opacity-0">
              Engineering practical software, intelligent applications, and data-driven systems.
            </h3>
            
            <div className="space-y-6 text-brand-gray text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
              <p ref={text1Ref} className="opacity-0">
                I am a B.Tech Computer Engineering student specializing in Artificial Intelligence and Data Science at Graphic Era Hill University. I focus on building robust software solutions that solve real problems, bridging the gap between theoretical knowledge and applied engineering.
              </p>
              
              <p ref={text2Ref} className="opacity-0">
                My approach combines strong fundamentals in languages like C++, Java, and Python with hands-on experience across the modern technology stack. Whether I'm developing web applications with React and Flask, processing data with Apache Spark and Hadoop, or integrating IoT sensors via MQTT, I enjoy creating systems that are both intelligent and scalable.
              </p>
            </div>

            {/* Technical Keywords */}
            <div ref={skillsRef} className="mt-12 sm:mt-16 flex flex-wrap gap-3 max-w-3xl">
              {['Software Engineering', 'Machine Learning', 'Data Engineering', 'IoT Systems', 'Full-Stack Web'].map((skill) => (
                <span key={skill} className="px-4 py-2 text-xs sm:text-sm font-mono text-brand-off/80 border border-brand-gray/20 rounded-full bg-white/[0.02] backdrop-blur-sm opacity-0">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
