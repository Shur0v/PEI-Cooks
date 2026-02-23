'use client';

import React, { useState } from 'react';
import { 
  TopNav, Button, Badge, Footer, OrderModal 
} from '@/components/ui-library';
import { 
  BookOpen, Star, CheckCircle2, ShoppingCart, 
  ArrowRight, Users, Utensils, Award, ChevronRight,
  Heart, Share2, Printer
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function CookbookDetailPage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="pc-container">
          {/* HERO SECTION */}
          <section className="py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="relative aspect-[3/4] w-full max-w-md mx-auto shadow-2xl rounded-[2rem] overflow-hidden border-8 border-white">
                  <Image 
                    src="https://picsum.photos/seed/cookbook-detail/800/1066" 
                    alt="Cookbook Cover" 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pc-navy/40 to-transparent" />
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-pc-navy/5 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pc-seaglass/10 rounded-2xl flex items-center justify-center text-pc-seaglass">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pc-navy">240</p>
                      <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest">Pages</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-pc-gold text-white p-6 rounded-3xl shadow-xl rotate-12 hidden md:block">
                  <p className="text-2xl font-bold">$35</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Limited Edition</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <Badge variant="gold" className="mb-4">Community Edition</Badge>
                  <h1 className="text-5xl lg:text-6xl font-serif mb-6 leading-tight">PEI Cooks: <span className="text-pc-terracotta italic">Volume 2</span></h1>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex text-pc-gold">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                    </div>
                    <span className="text-sm font-bold text-pc-navy">4.9 / 5.0</span>
                    <span className="text-sm text-pc-muted">(128 Reviews)</span>
                  </div>
                  <p className="text-lg text-pc-gray-700 leading-relaxed">
                    A collection of 150+ authentic recipes from the kitchens of Prince Edward Island. From traditional Acadian meat pies to modern coastal fusion, this book celebrates the diverse culinary heritage of our island.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-pc-navy/5">
                    <Utensils className="text-pc-terracotta mb-2" size={20} />
                    <p className="text-sm font-bold">150+ Recipes</p>
                    <p className="text-[10px] text-pc-muted">Tested in home kitchens</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-pc-navy/5">
                    <Users className="text-pc-seaglass mb-2" size={20} />
                    <p className="text-sm font-bold">85 Contributors</p>
                    <p className="text-[10px] text-pc-muted">Local island cooks</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="flex-grow md:flex-none" onClick={() => setIsOrderModalOpen(true)} leftIcon={<ShoppingCart size={20} />}>
                    Order Now — $35.00
                  </Button>
                  <Button variant="outline" size="lg" className="flex-grow md:flex-none">Download Sample PDF</Button>
                </div>

                <div className="flex items-center gap-3 text-xs text-pc-muted">
                  <CheckCircle2 size={16} className="text-pc-seaglass" />
                  <span>Proceeds support local food security initiatives.</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* WHAT&apos;S INSIDE */}
          <section className="py-24 border-t border-pc-navy/5">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-serif mb-4">What&apos;s Inside</h2>
              <p className="text-pc-muted">More than just recipes, this book is a journey through the seasons and landscapes of PEI.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'The Spring Thaw', desc: 'Early greens, maple syrup traditions, and the first catch of the season.', icon: Award },
                { title: 'Summer Harvest', desc: 'Berries, beach cookouts, and the abundance of our red dirt farms.', icon: Utensils },
                { title: 'Autumn Bounty', desc: 'Preserves, root vegetables, and hearty comfort food for the cooling days.', icon: BookOpen },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-pc-navy/5 shadow-sm hover:border-pc-terracotta/30 transition-colors">
                  <div className="w-12 h-12 bg-pc-bg rounded-2xl flex items-center justify-center text-pc-navy mb-6">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                  <p className="text-sm text-pc-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CONTRIBUTORS CAROUSEL MOCKUP */}
          <section className="py-24 bg-pc-navy text-white rounded-[3rem] overflow-hidden">
            <div className="pc-container">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                  <Badge variant="seaglass" className="mb-4">The Contributors</Badge>
                  <h2 className="text-4xl font-serif">Meet the <span className="text-pc-seaglass italic">Cooks</span></h2>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ChevronRight size={20} className="rotate-180" />
                  </button>
                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-4 group cursor-pointer">
                    <div className="aspect-square rounded-2xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image src={`https://picsum.photos/seed/cook-c${i}/400/400`} alt="Cook" fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl">Annie Gallant</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest">Rustico, PEI</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="py-24">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-3xl font-serif">Community Reviews</h2>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-pc-navy">4.9</span>
                  <div>
                    <div className="flex text-pc-gold">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-xs text-pc-muted font-bold uppercase tracking-widest mt-1">Based on 128 reviews</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs font-bold w-4">{star}</span>
                      <div className="flex-grow h-2 bg-pc-gray-300 rounded-full overflow-hidden">
                        <div className="h-full bg-pc-gold" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '2%' }} />
                      </div>
                      <span className="text-xs text-pc-muted w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '2%'}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">Write a Review</Button>
              </div>

              <div className="lg:col-span-2 space-y-8">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-pc-navy/5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <Image src={`https://picsum.photos/seed/rev${i}/100/100`} alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Heather MacDonald</p>
                          <p className="text-[10px] text-pc-muted uppercase tracking-widest">Verified Buyer</p>
                        </div>
                      </div>
                      <div className="flex text-pc-gold">
                        {[1, 2, 3, 4, 5].map(j => <Star key={j} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-sm text-pc-gray-700 leading-relaxed italic">
                      &quot;I bought this for my daughter who just moved away for university. She says it feels like having a piece of home in her kitchen. The photography is stunning!&quot;
                    </p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full" rightIcon={<ChevronRight size={16} />}>Read More Reviews</Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
