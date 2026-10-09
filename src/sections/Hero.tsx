import { ArrowUpRight, Download } from 'lucide-react';
import { TypewriterRole } from '../components/TypewriterRole';
import { MagneticButton } from '../components/MagneticButton';
import { HeroScene } from '../three/HeroScene';

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-brand-dark"
    >
      {/* 3D Background — behind everything */}
      <HeroScene />

      {/* ===== Content layer ===== */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">

            {/* ---- Left column: Typography + CTAs ---- */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center order-2 lg:order-1">

              {/* Greeting */}
              <p className="text-xl md:text-2xl lg:text-[28px] font-light tracking-wide text-brand-off mb-3">
                Hi, I'm
              </p>

              {/* Name */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tight leading-[0.95] mb-5 hero-text-shadow">
                <span className="block">OM PRAKASH</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
                  BARMOLA
                </span>
              </h1>

              {/* Role typewriter */}
              <div className="mb-10 md:mb-12">
                <TypewriterRole />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <MagneticButton primary>
                  EXPLORE MY WORK
                  <ArrowUpRight size={18} className="ml-1" />
                </MagneticButton>

                <MagneticButton
                  href="/resume/Om-Prakash-Barmola-Resume.pdf"
                  download="Om-Prakash-Barmola-Resume.pdf"
                >
                  DOWNLOAD RESUME
                  <Download size={18} className="ml-1" />
                </MagneticButton>
              </div>
            </div>

            {/* ---- Right column: Portrait ---- */}
            <div className="lg:col-span-5 xl:col-span-6 relative order-1 lg:order-2 flex justify-center lg:justify-end items-end pointer-events-none select-none h-[35vh] sm:h-[40vh] lg:h-[80vh]">
              {/* Outer container — positions the portrait */}
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[480px] xl:max-w-[520px] h-full">

                {/* Radial mask to dissolve edges into darkness */}
                <div className="absolute inset-0 portrait-mask">
                  <img
                    src="/images/img.jpeg"
                    alt="Om Prakash Barmola"
                    className="w-full h-full object-cover object-top portrait-cinematic"
                    loading="eager"
                  />
                </div>

                {/* Extra bottom fade for seamless blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />

                {/* Subtle side fades */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60" />

                {/* Very subtle blue atmospheric glow behind head area */}
                <div
                  className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full opacity-[0.06] blur-3xl"
                  style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-40 hidden md:flex z-10">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] rotate-90 mb-6 text-white/60">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};
