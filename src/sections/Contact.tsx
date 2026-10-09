import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Honeypot check (handled implicitly if field is filled, but we also let formspree handle its own honeypot)
    const formDataToSend = new FormData(e.currentTarget);
    
    // Fallback to empty string if VITE_FORMSPREE_ENDPOINT is missing
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || '';

    if (!endpoint) {
      setSubmitStatus('error');
      setErrorMessage('Form endpoint is not configured.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        const data = await response.json();
        setSubmitStatus('error');
        setErrorMessage(data.errors?.[0]?.message || 'Oops! There was a problem submitting your form.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        gsap.set([leftColRef.current, rightColRef.current], { opacity: 1, y: 0 });
        return;
      }

      tl.fromTo(
        leftColRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
      .fromTo(
        rightColRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative w-full py-24 lg:py-32 bg-transparent flex flex-col justify-center overflow-hidden z-10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Contact Info */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col opacity-0">
            <h2 className="text-xs md:text-sm font-mono tracking-[0.2em] text-brand-accent uppercase opacity-90 mb-6">
              Get In Touch
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-brand-off mb-8">
              Let's build something together.
            </h3>
            <p className="text-brand-gray text-lg font-light leading-relaxed mb-12 max-w-md">
              Whether you have a question about my work, are interested in collaborating, or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-col gap-6">
              <a 
                href="mailto:barmolaomprakash1@gmail.com" 
                className="flex items-center gap-4 text-brand-off hover:text-brand-accent transition-colors duration-300 group w-fit"
              >
                <div className="p-4 rounded-full border border-brand-gray/20 bg-white/[0.02] group-hover:border-brand-accent/50 transition-colors duration-300">
                  <Mail size={24} className="opacity-80" />
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-gray/80 uppercase tracking-widest mb-1">Email</div>
                  <div className="text-lg">barmolaomprakash1@gmail.com</div>
                </div>
              </a>

              <a 
                href="https://github.com/omi290" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-brand-off hover:text-brand-accent transition-colors duration-300 group w-fit"
              >
                <div className="p-4 rounded-full border border-brand-gray/20 bg-white/[0.02] group-hover:border-brand-accent/50 transition-colors duration-300">
                  <span className="text-xl font-bold" aria-hidden="true">GH</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-gray/80 uppercase tracking-widest mb-1">GitHub</div>
                  <div className="text-lg">github.com/omi290</div>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/om-prakash-barmola/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-brand-off hover:text-brand-accent transition-colors duration-300 group w-fit"
              >
                <div className="p-4 rounded-full border border-brand-gray/20 bg-white/[0.02] group-hover:border-brand-accent/50 transition-colors duration-300">
                  <span className="text-xl font-bold" aria-hidden="true">in</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-gray/80 uppercase tracking-widest mb-1">LinkedIn</div>
                  <div className="text-lg">om-prakash-barmola</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div ref={rightColRef} className="lg:col-span-7 lg:pl-12 opacity-0">
            <div className="p-8 sm:p-10 rounded-2xl border border-brand-gray/10 bg-white/[0.01] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-mono text-brand-gray/80 uppercase tracking-wider">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="bg-transparent/50 border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent/50 transition-colors duration-300 disabled:opacity-50"
                      placeholder="Om prakash"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-mono text-brand-gray/80 uppercase tracking-wider">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="bg-transparent/50 border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent/50 transition-colors duration-300 disabled:opacity-50"
                      placeholder="om@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-mono text-brand-gray/80 uppercase tracking-wider">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="bg-transparent/50 border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent/50 transition-colors duration-300 disabled:opacity-50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-mono text-brand-gray/80 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="bg-transparent/50 border border-brand-gray/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:border-brand-accent/50 transition-colors duration-300 resize-none disabled:opacity-50"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                    <CheckCircle2 size={20} className="shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                    <AlertCircle size={20} className="shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="mt-2 inline-flex items-center justify-center gap-3 bg-white text-brand-dark hover:bg-brand-off px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group w-full sm:w-auto self-start"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 size={18} className="animate-spin" />
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      Sent
                      <CheckCircle2 size={18} />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
