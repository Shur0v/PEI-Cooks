'use client';

import React, { useState } from 'react';
import { 
  TopNav, Button, Badge, Footer, OrderModal, Input 
} from '@/components/ui-library';
import { 
  Clock, Users, Utensils, Heart, Share2, Printer, 
  ChevronRight, Check, ArrowLeft, Camera, MessageSquare, ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeDetailPage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCookedModalOpen, setIsCookedModalOpen] = useState(false);
  const [hasCooked, setHasCooked] = useState(false);

  const ingredients = [
    "1.5 lbs fresh PEI Lobster meat, chopped",
    "1/4 cup high-quality mayonnaise",
    "1 tbsp fresh lemon juice",
    "2 tbsp finely diced celery",
    "1 tbsp chopped fresh chives",
    "Salt and black pepper to taste",
    "4 top-split brioche buns",
    "2 tbsp unsalted butter, softened",
    "Bibb lettuce leaves"
  ];

  const steps = [
    "In a medium bowl, gently toss the lobster meat with mayonnaise, lemon juice, celery, and chives. Season with salt and pepper to taste. Chill for at least 30 minutes.",
    "Spread butter on the outer sides of the brioche buns.",
    "Heat a skillet over medium heat. Toast the buns on both sides until golden brown and crispy.",
    "Place a lettuce leaf in each bun, then generously fill with the chilled lobster mixture.",
    "Garnish with extra chives and serve immediately with island potato chips."
  ];

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="pc-container">
          {/* BREADCRUMBS */}
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-pc-muted mb-8">
            <Link href="/" className="hover:text-pc-navy transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/recipes" className="hover:text-pc-navy transition-colors">Recipes</Link>
            <ChevronRight size={12} />
            <span className="text-pc-navy">Island Lobster Roll</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN: CONTENT */}
            <div className="lg:col-span-8 space-y-12">
              {/* HERO IMAGE */}
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
                <Image 
                  src="https://picsum.photos/seed/lobster-detail/1200/800" 
                  alt="Lobster Roll" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 flex gap-3">
                  <button className="p-3 bg-white/90 backdrop-blur rounded-full text-pc-navy hover:text-pc-terracotta transition-colors shadow-lg">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 bg-white/90 backdrop-blur rounded-full text-pc-navy hover:text-pc-terracotta transition-colors shadow-lg">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* TITLE & META */}
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-pc-navy/5">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="seaglass">Seafood</Badge>
                  <Badge variant="gold">Summer</Badge>
                  <Badge variant="outline">Easy</Badge>
                </div>
                <h1 className="text-4xl lg:text-5xl font-serif mb-6">Classic Island Lobster Roll</h1>
                <div className="flex flex-wrap items-center gap-8 py-6 border-y border-pc-navy/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                      <Image src="https://picsum.photos/seed/mary/100/100" alt="Mary" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Recipe by</p>
                      <p className="font-serif font-bold text-pc-navy">Mary MacDonald</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pc-bg rounded-xl flex items-center justify-center text-pc-navy">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Prep Time</p>
                      <p className="font-bold text-pc-navy">20 Mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pc-bg rounded-xl flex items-center justify-center text-pc-navy">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Servings</p>
                      <p className="font-bold text-pc-navy">4 People</p>
                    </div>
                  </div>
                </div>
                
                <p className="mt-8 text-lg text-pc-gray-700 leading-relaxed">
                  &quot;This is the quintessential taste of a PEI summer. The key is using fresh, cold-water lobster and not over-complicating the dressing. Let the lobster be the star!&quot;
                </p>
              </div>

              {/* INGREDIENTS & METHOD */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-pc-navy/5">
                  <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
                    <Utensils size={24} className="text-pc-terracotta" />
                    Ingredients
                  </h3>
                  <ul className="space-y-4">
                    {ingredients.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 group cursor-pointer">
                        <div className="mt-1 w-5 h-5 rounded border border-pc-gray-300 flex items-center justify-center group-hover:border-pc-seaglass transition-colors">
                          <Check size={12} className="text-pc-seaglass opacity-0 group-hover:opacity-100" />
                        </div>
                        <span className="text-sm text-pc-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-pc-navy/5">
                  <h3 className="text-2xl font-serif mb-6">Instructions</h3>
                  <div className="space-y-8">
                    {steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="shrink-0 w-8 h-8 bg-pc-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </span>
                        <p className="text-sm text-pc-gray-700 leading-relaxed pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COOKED IT UPLOAD */}
              <div className="bg-pc-navy text-white p-10 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 max-w-md">
                  <h3 className="text-3xl font-serif mb-4">Cooked this recipe?</h3>
                  <p className="text-white/70 mb-8">Share your creation with the community! Upload a photo and let Mary know how it turned out.</p>
                  <Button 
                    variant="accent" 
                    size="lg" 
                    leftIcon={<Camera size={20} />}
                    onClick={() => setIsCookedModalOpen(true)}
                  >
                    Upload Your Photo
                  </Button>
                </div>
                <Utensils size={120} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12" />
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className="lg:col-span-4 space-y-8">
              {/* ACTIONS */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-pc-navy/5 space-y-3">
                <Button variant="primary" className="w-full" size="lg" leftIcon={<Printer size={18} />}>Print Recipe</Button>
                <Button variant="outline" className="w-full" size="lg" leftIcon={<ShoppingCart size={18} />}>Add to Grocery List</Button>
              </div>

              {/* COOKBOOK PROMO */}
              <div className="pc-card p-6 bg-pc-gold/10 border-pc-gold/20">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-md">
                  <Image src="https://picsum.photos/seed/book/400/533" alt="Cookbook" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-serif text-lg mb-2">Love this recipe?</h4>
                <p className="text-xs text-pc-muted mb-4">Find 150+ more island classics in our community cookbook.</p>
                <Button variant="primary" className="w-full" size="sm" onClick={() => setIsOrderModalOpen(true)}>Get the Book</Button>
              </div>

              {/* RELATED RECIPES */}
              <div>
                <h4 className="font-serif text-xl mb-6">You might also like</h4>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 p-3 bg-white rounded-2xl border border-pc-navy/5 hover:border-pc-terracotta/30 transition-colors cursor-pointer group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                        <Image src={`https://picsum.photos/seed/rel${i}/200/200`} alt="Related" fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="font-serif font-bold text-pc-navy group-hover:text-pc-terracotta transition-colors">Island Mussel Bake</h5>
                        <p className="text-[10px] text-pc-muted uppercase tracking-widest mt-1">15 Mins • Seafood</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* COOKED IT MODAL */}
      <AnimatePresence>
        {isCookedModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-pc-navy/40 backdrop-blur-sm"
              onClick={() => setIsCookedModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-pc-bg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-pc-navy/5 flex items-center justify-between bg-white">
                <h2 className="text-xl font-serif">Share Your Creation</h2>
                <button onClick={() => setIsCookedModalOpen(false)} className="p-2 hover:bg-pc-gray-300 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                {!hasCooked ? (
                  <>
                    <div className="w-full aspect-square border-2 border-dashed border-pc-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-pc-muted hover:border-pc-navy hover:text-pc-navy transition-colors cursor-pointer bg-white">
                      <Camera size={40} />
                      <p className="text-sm font-semibold">Click to upload photo</p>
                      <p className="text-[10px]">JPG, PNG or WebP (Max 5MB)</p>
                    </div>
                    <div className="space-y-4">
                      <Input label="Your Name" placeholder="Jane Doe" />
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-pc-navy uppercase tracking-wider">Your Notes</label>
                        <textarea 
                          className="w-full px-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring min-h-[100px]"
                          placeholder="How did it turn out? Any substitutions?"
                        />
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={() => setHasCooked(true)}>Submit for Review</Button>
                  </>
                ) : (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-20 h-20 bg-pc-seaglass/20 text-pc-seaglass rounded-full flex items-center justify-center mx-auto">
                      <Check size={40} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-2">Submission Pending</h3>
                      <p className="text-sm text-pc-muted">
                        Thanks for sharing! Your photo is now in the moderation queue. Once approved, it will appear on this recipe page.
                      </p>
                    </div>
                    <Button variant="primary" className="w-full" onClick={() => setIsCookedModalOpen(false)}>Close</Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
