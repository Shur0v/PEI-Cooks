'use client';

import React, { useState, useEffect } from 'react';
import {
  Menu, X, ShoppingCart, Heart, Search, MapPin, Calendar,
  ChevronRight, ArrowRight, Star, Share2, Printer,
  CheckCircle2, AlertCircle, Clock, Users, UtensilsCrossed,
  Filter, Grid, List, LayoutDashboard, BookOpen, UserCircle,
  Store, MessageSquare, Trophy, Plus, Trash2, Check, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency, generateRefCode } from '@/lib/utils';
import Image from 'next/image';

// --- ATOMS ---

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  }
>(({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
  const variants = {
    primary: 'bg-pc-navy text-white hover:bg-pc-navy-700 shadow-sm',
    secondary: 'bg-transparent border-2 border-pc-navy text-pc-navy hover:bg-pc-navy/5',
    accent: 'bg-pc-terracotta text-white hover:bg-pc-terracotta-700 shadow-sm',
    ghost: 'bg-transparent text-pc-navy hover:bg-pc-navy/5',
    outline: 'bg-transparent border border-pc-gray-300 text-pc-gray-700 hover:border-pc-navy hover:text-pc-navy',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium rounded-lg',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-xl',
    lg: 'px-8 py-4 text-base font-bold rounded-2xl',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none pc-focus-ring',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
});
Button.displayName = 'Button';

export const Badge = ({ children, variant = 'default', className }: {
  children: React.ReactNode;
  variant?: 'default' | 'seaglass' | 'gold' | 'terracotta' | 'outline';
  className?: string;
}) => {
  const variants = {
    default: 'bg-pc-gray-300 text-pc-gray-700',
    seaglass: 'bg-pc-seaglass/20 text-pc-seaglass border border-pc-seaglass/30',
    gold: 'bg-pc-gold/20 text-pc-gold border border-pc-gold/30',
    terracotta: 'bg-pc-terracotta/20 text-pc-terracotta border border-pc-terracotta/30',
    outline: 'bg-transparent border border-pc-gray-300 text-pc-muted',
  };

  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
};

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; helperText?: string }
>(({ label, error, helperText, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-xs font-semibold text-pc-navy uppercase tracking-wider">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'w-full px-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm transition-all focus:border-pc-navy pc-focus-ring placeholder:text-pc-muted',
          error && 'border-pc-terracotta focus:ring-pc-terracotta/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-pc-terracotta font-medium">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-pc-muted">{helperText}</p>}
    </div>
  );
});
Input.displayName = 'Input';

// --- MOLECULES ---

export const RecipeCard = ({
  title, cook, time, image, tags, variant = 'grid'
}: {
  title: string; cook: string; time: string; image: string; tags: string[]; variant?: 'grid' | 'large' | 'compact'
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={cn(
        "pc-card group cursor-pointer",
        variant === 'large' ? 'flex flex-col md:flex-row' : 'flex flex-col'
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        variant === 'large' ? 'w-full md:w-1/2 aspect-[4/3]' : 'w-full aspect-[4/3]'
      )}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/90 backdrop-blur rounded-full text-pc-navy hover:text-pc-terracotta transition-colors shadow-sm">
            <Heart size={16} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-1">
          {tags.map(tag => <Badge key={tag} variant="seaglass">{tag}</Badge>)}
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-serif mb-1 group-hover:text-pc-terracotta transition-colors">{title}</h3>
          <p className="text-sm text-pc-muted mb-4">by {cook}</p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-pc-navy/5">
          <div className="flex items-center gap-1.5 text-xs text-pc-muted">
            <Clock size={14} />
            <span>{time}</span>
          </div>
          <button className="text-pc-navy hover:text-pc-terracotta transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const CookCard = ({ name, location, image, bio }: { name: string; location: string; image: string; bio: string }) => {
  return (
    <div className="pc-card p-6 flex flex-col items-center text-center group">
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image src={image} alt={name} fill className="object-cover" referrerPolicy="no-referrer" />
      </div>
      <h3 className="text-lg font-serif mb-1">{name}</h3>
      <div className="flex items-center gap-1 text-xs text-pc-muted mb-3">
        <MapPin size={12} />
        <span>{location}</span>
      </div>
      <p className="text-xs text-pc-gray-700 line-clamp-2 mb-4">{bio}</p>
      <Button variant="outline" size="sm" className="w-full">View Recipes</Button>
    </div>
  );
};

// --- ORGANISMS ---

export const TopNav = ({ onOrderClick }: { onOrderClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cookbook', href: '/cookbook' },
    { name: 'Recipes', href: '/recipes' },
    { name: 'Cooks', href: '/cooks' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      )}>
        <div className="pc-container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image
                src="https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=peicooksfinal.png"
                alt="PEI Cooks Logo"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-serif font-bold text-pc-navy hidden sm:block">PEI Cooks</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-pc-navy hover:text-pc-terracotta transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={onOrderClick} leftIcon={<ShoppingCart size={16} />}>Order Book</Button>
            <button
              className="lg:hidden p-2 text-pc-navy"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-bottom border-pc-gray-300">
              <span className="text-xl font-serif font-bold text-pc-navy">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6 flex-grow">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pc-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search recipes, cooks..."
                  className="w-full pl-12 pr-4 py-4 bg-pc-gray-300/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pc-navy/10"
                />
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <a key={link.name} href={link.href} className="text-2xl font-serif font-bold text-pc-navy hover:text-pc-terracotta transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-pc-gray-300 flex gap-4">
              <Button variant="primary" className="flex-grow" size="lg">Order Cookbook</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const OrderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [refCode] = useState(generateRefCode());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-pc-navy/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-pc-bg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-pc-navy/5 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-serif">Order Your Cookbook</h2>
            <p className="text-xs text-pc-muted">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-pc-gray-300 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-serif mb-4">Contact Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Jane" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email Address" type="email" placeholder="jane@example.com" />
              <Input label="Phone Number" type="tel" placeholder="(902) 555-0123" />
              <Button className="w-full mt-4" onClick={() => setStep(2)}>Next: Pickup Details</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-serif mb-4">Pickup & Quantity</h3>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-pc-navy uppercase tracking-wider">Pickup Location</label>
                <select className="w-full px-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring">
                  <option>Charlottetown Farmers Market</option>
                  <option>Summerside Library</option>
                  <option>Montague Waterfront</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-pc-navy/5">
                <div>
                  <p className="font-bold text-pc-navy">PEI Cooks Cookbook</p>
                  <p className="text-xs text-pc-muted">$35.00 per copy</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full border border-pc-gray-300 hover:border-pc-navy">-</button>
                  <span className="font-bold">1</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full border border-pc-gray-300 hover:border-pc-navy">+</button>
                </div>
              </div>
              <div className="pt-4 border-t border-pc-navy/5 flex justify-between items-center">
                <span className="text-sm font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-pc-navy">$35.00</span>
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" className="flex-grow" onClick={() => setStep(1)}>Back</Button>
                <Button variant="primary" className="flex-grow" onClick={() => setStep(3)}>Next: Payment</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-pc-gold/10 border border-pc-gold/20 rounded-2xl flex gap-3">
                <AlertCircle className="text-pc-gold shrink-0" size={20} />
                <p className="text-xs text-pc-gold-700 leading-relaxed">
                  We currently only accept <strong>e-Transfers</strong> for cookbook orders. Please follow the instructions below carefully.
                </p>
              </div>
              <div className="space-y-3 p-6 bg-white rounded-2xl border border-pc-navy/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-pc-muted">Send to:</span>
                  <span className="font-bold">orders@peicooks.com</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-pc-muted">Reference Code:</span>
                  <span className="font-mono font-bold text-pc-terracotta tracking-wider">{refCode}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-pc-muted">Amount:</span>
                  <span className="font-bold">$35.00</span>
                </div>
              </div>
              <p className="text-[10px] text-pc-muted text-center italic">
                * Please include the Reference Code in your e-Transfer message field.
              </p>
              <Button className="w-full mt-4" onClick={() => setStep(4)}>I&apos;ve Sent the e-Transfer</Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>Back</Button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-pc-seaglass/20 text-pc-seaglass rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-2">Order Received!</h3>
                <p className="text-sm text-pc-muted max-w-xs mx-auto">
                  Thank you for supporting PEI Cooks. We&apos;ll verify your e-transfer and email you once your book is ready for pickup.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-pc-navy/5 text-left">
                <p className="text-[10px] font-bold text-pc-navy uppercase tracking-widest mb-2">Order Summary</p>
                <div className="flex justify-between text-xs mb-1">
                  <span>Order Reference:</span>
                  <span className="font-mono font-bold">{refCode}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Pickup Location:</span>
                  <span className="font-bold">Charlottetown Farmers Market</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-grow" leftIcon={<Printer size={16} />}>Print Receipt</Button>
                <Button variant="primary" className="flex-grow" onClick={onClose}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- ACCORDION ---
export const Accordion = ({ items }: { items: { title: string; content: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-2xl border border-pc-navy/5 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-pc-bg transition-colors"
          >
            <span className="font-serif font-bold text-pc-navy">{item.title}</span>
            <ChevronRight
              className={cn("transition-transform duration-300 text-pc-terracotta", openIndex === index && "rotate-90")}
              size={20}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 text-sm text-pc-gray-700 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// --- FLIP CARD ---
export const FlipCard = ({ front, back }: { front: React.ReactNode; back: React.ReactNode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-64 [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </motion.div>
    </div>
  );
};

// --- PROGRESS BAR ---
export const ProgressBar = ({ progress, label }: { progress: number; label: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-90">
      <span>{label}</span>
      <span>{progress}%</span>
    </div>
    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-pc-terracotta"
      />
    </div>
  </div>
);

// --- LOGOS STRIP ---
export const LogosStrip = () => {
  const logos = [
    "https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=trans%20bg%20logo.png",
    "https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=logo.png",
    "https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=where%20islanders%20eat.jpg",
    "https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=peicooksfinal.png",
    "https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=peicooks%20logo1.png"
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 py-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
      {logos.map((logo, i) => (
        <div key={i} className="relative h-36 w-36 flex-shrink-0">
          <Image
            src={logo}
            alt={`Partner Logo ${i + 1}`}
            fill
            className={`object-contain${i === 1 ? ' scale-150' : i === 4 ? ' scale-120' : ''}`}
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-pc-navy text-white pt-20 pb-10">
      <div className="pc-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pc-navy font-serif text-xl font-bold">P</div>
              <span className="text-xl font-serif font-bold text-white">PEI Cooks</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Celebrating the flavors and stories of Prince Edward Island. A community-driven initiative to preserve our culinary heritage.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Twitter'].map(social => (
                <a key={social} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pc-terracotta transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/80 rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">The Cookbook</a></li>
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Recipes Archive</a></li>
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Meet the Cooks</a></li>
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Island Vendors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Upcoming Events</a></li>
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Competitions</a></li>
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Submit Testimonial</a></li>
              <li><a href="#" className="hover:text-pc-seaglass transition-colors">Volunteer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4">Get island recipes and event updates in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-pc-seaglass/50"
              />
              <Button variant="accent" size="sm">Join</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/40 uppercase tracking-widest">
          <p>© 2026 PEI Cooks. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
