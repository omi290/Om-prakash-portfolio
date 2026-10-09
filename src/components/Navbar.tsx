export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        {/* Logo / name mark */}
        <span className="text-sm font-semibold tracking-[0.15em] text-white/80 pointer-events-auto">
          OPB
        </span>

        {/* Availability indicator — tucked into nav, subtle */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
          </div>
          <span className="text-[11px] tracking-[0.15em] font-mono text-white/40 uppercase hidden sm:inline">
            Available for opportunities
          </span>
        </div>
      </div>
    </nav>
  );
};
