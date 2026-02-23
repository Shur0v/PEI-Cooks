'use client';

import React, { useState } from 'react';
import { 
  TopNav, Button, Badge, Footer, OrderModal, Input 
} from '@/components/ui-library';
import { cn } from '@/lib/utils';
import { 
  Palette, Type, Layout, Component, Layers, 
  CheckCircle2, Info, AlertCircle, Copy, ExternalLink,
  ChevronRight, Smartphone, Tablet, Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StyleGuidePage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colors = [
    { name: 'PC Bg', var: '--pc-bg', hex: '#F6EDE6', text: 'text-pc-navy' },
    { name: 'PC Navy', var: '--pc-navy', hex: '#153E63', text: 'text-white' },
    { name: 'PC Terracotta', var: '--pc-terracotta', hex: '#C2462C', text: 'text-white' },
    { name: 'PC Seaglass', var: '--pc-seaglass', hex: '#7FB7A4', text: 'text-pc-navy' },
    { name: 'PC Gold', var: '--pc-gold', hex: '#D9A24A', text: 'text-pc-navy' },
    { name: 'PC Gray 700', var: '--pc-gray-700', hex: '#333333', text: 'text-white' },
    { name: 'PC Gray 300', var: '--pc-gray-300', hex: '#E6E2DE', text: 'text-pc-navy' },
  ];

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-32 pb-20">
        <div className="pc-container">
          <header className="mb-16">
            <Badge variant="gold" className="mb-4">Design System v1.0</Badge>
            <h1 className="text-5xl font-serif mb-4">PEI Cooks Style Guide</h1>
            <p className="text-lg text-pc-muted max-w-2xl">
              A comprehensive guide to the visual language, design tokens, and components of the PEI Cooks platform.
            </p>
          </header>

          <div className="space-y-24">
            {/* COLORS */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Palette className="text-pc-terracotta" size={24} />
                <h2 className="text-3xl font-serif">Color Palette</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {colors.map(color => (
                  <div key={color.var} className="space-y-3">
                    <div 
                      style={{ backgroundColor: color.hex }}
                      className={cn(
                        "aspect-square rounded-2xl shadow-sm flex items-end p-4 cursor-pointer group relative overflow-hidden",
                        color.text
                      )}
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                      <div className="relative z-10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Hex</p>
                        <p className="font-bold">{color.hex}</p>
                      </div>
                      <Copy className="absolute top-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity" size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-pc-navy">{color.name}</p>
                      <p className="text-[10px] font-mono text-pc-muted">{color.var}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TYPOGRAPHY */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Type className="text-pc-terracotta" size={24} />
                <h2 className="text-3xl font-serif">Typography</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8 bg-white p-10 rounded-3xl border border-pc-navy/5">
                  <div>
                    <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest mb-4">Headings: Playfair Display</p>
                    <h1 className="text-5xl font-serif mb-2">Heading 1</h1>
                    <h2 className="text-4xl font-serif mb-2">Heading 2</h2>
                    <h3 className="text-3xl font-serif mb-2">Heading 3</h3>
                    <h4 className="text-2xl font-serif">Heading 4</h4>
                  </div>
                  <div className="pt-8 border-t border-pc-navy/5">
                    <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest mb-4">Body: Poppins</p>
                    <p className="text-lg mb-4">Body Large: The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-base mb-4">Body Default: The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-sm text-pc-muted">Body Small: The quick brown fox jumps over the lazy dog.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-pc-navy text-white rounded-2xl">
                    <h4 className="font-serif text-xl mb-2">Usage Notes</h4>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Use <strong>Playfair Display</strong> for all primary headings and editorial content to evoke a warm, traditional cookbook feel. Use <strong>Poppins</strong> for UI elements, body text, and labels for maximum readability.
                    </p>
                  </div>
                  <div className="p-6 bg-pc-gold/10 border border-pc-gold/20 rounded-2xl">
                    <h4 className="font-serif text-lg text-pc-gold-700 mb-2">Accessibility</h4>
                    <p className="text-sm text-pc-gold-700/80 leading-relaxed">
                      Maintain a minimum contrast ratio of 4.5:1 for body text. Headings should maintain 3:1. All body text is set to 16px minimum on mobile.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* COMPONENTS PREVIEW */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Component className="text-pc-terracotta" size={24} />
                <h2 className="text-3xl font-serif">Core Components</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* BUTTONS */}
                <div className="bg-white p-8 rounded-3xl border border-pc-navy/5 space-y-6">
                  <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Buttons</p>
                  <div className="space-y-3">
                    <Button className="w-full">Primary Button</Button>
                    <Button variant="secondary" className="w-full">Secondary Button</Button>
                    <Button variant="accent" className="w-full">Accent Button</Button>
                    <Button variant="outline" className="w-full">Outline Button</Button>
                    <Button variant="ghost" className="w-full">Ghost Button</Button>
                  </div>
                </div>

                {/* FORMS */}
                <div className="bg-white p-8 rounded-3xl border border-pc-navy/5 space-y-6">
                  <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Form Inputs</p>
                  <div className="space-y-4">
                    <Input label="Default Input" placeholder="Placeholder text" />
                    <Input label="With Error" placeholder="Invalid input" error="This field is required" />
                    <Input label="With Helper" placeholder="Helper text" helperText="Enter your primary email" />
                  </div>
                </div>

                {/* BADGES */}
                <div className="bg-white p-8 rounded-3xl border border-pc-navy/5 space-y-6">
                  <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Badges & Tags</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="seaglass">Seaglass</Badge>
                    <Badge variant="gold">Gold</Badge>
                    <Badge variant="terracotta">Terracotta</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* RESPONSIVE BREAKPOINTS */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Layers className="text-pc-terracotta" size={24} />
                <h2 className="text-3xl font-serif">Responsive Grid</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-pc-navy/5 flex items-center gap-4">
                  <Smartphone className="text-pc-muted" size={32} />
                  <div>
                    <p className="font-bold">Mobile</p>
                    <p className="text-xs text-pc-muted">320px - 767px</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-pc-navy/5 flex items-center gap-4">
                  <Tablet className="text-pc-muted" size={32} />
                  <div>
                    <p className="font-bold">Tablet</p>
                    <p className="text-xs text-pc-muted">768px - 1023px</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-pc-navy/5 flex items-center gap-4">
                  <Monitor className="text-pc-muted" size={32} />
                  <div>
                    <p className="font-bold">Desktop</p>
                    <p className="text-xs text-pc-muted">1024px+</p>
                  </div>
                </div>
              </div>
            </section>

            {/* HANDOFF NOTES */}
            <section className="bg-pc-navy text-white p-12 rounded-[3rem] relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl font-serif mb-8">Developer Handoff</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-xl font-serif text-pc-seaglass">CSS Variables</h4>
                    <div className="bg-black/20 p-6 rounded-2xl font-mono text-xs text-white/80 leading-relaxed">
                      <pre>
{`:root {
  --pc-bg: #F6EDE6;
  --pc-navy: #153E63;
  --pc-terracotta: #C2462C;
  --pc-seaglass: #7FB7A4;
  --pc-gold: #D9A24A;
  --pc-gray-700: #333333;
  --pc-gray-300: #E6E2DE;
}`}
                      </pre>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xl font-serif text-pc-seaglass">Asset Guidelines</h4>
                    <ul className="space-y-4 text-sm text-white/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-pc-seaglass shrink-0" size={18} />
                        <span>Export all icons as SVGs with 2px stroke weight.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-pc-seaglass shrink-0" size={18} />
                        <span>Use WebP for all photography (1200px width max).</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="text-pc-seaglass shrink-0" size={18} />
                        <span>Enforce 3:2 aspect ratio for recipe thumbnails.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pc-seaglass/10 rounded-full blur-3xl" />
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {/* COPIED TOAST */}
      <AnimatePresence>
        {copiedToken && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-pc-navy text-white px-6 py-3 rounded-full shadow-2xl z-[200] flex items-center gap-2"
          >
            <CheckCircle2 size={18} className="text-pc-seaglass" />
            <span className="text-sm font-bold">Copied: {copiedToken}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


