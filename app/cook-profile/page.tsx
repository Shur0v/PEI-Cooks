'use client';

import React, { useState } from 'react';
import {
  TopNav, Button, Badge, Footer, OrderModal, RecipeCard
} from '@/components/ui-library';
import {
  MapPin, Heart, Share2, Utensils, Award,
  MessageSquare, Instagram, Facebook, Globe,
  ChevronRight, ArrowRight, Star, Clock, CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function CookProfilePage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-24 pb-20">
        {/* PROFILE HEADER */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          <div className="pc-container relative z-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-12">
              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full border-8 border-white shadow-2xl overflow-hidden shrink-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop"
                  alt="Annie Gallant"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Profile Info */}
              <div className="flex-grow text-center lg:text-left space-y-4">
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  <Badge variant="gold">Master Baker</Badge>
                  <Badge variant="seaglass">Volume 2 Contributor</Badge>
                </div>
                <h1 className="text-5xl lg:text-6xl font-serif">Annie Gallant</h1>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-pc-muted font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    <span>Rustico, PEI</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Utensils size={16} />
                    <span>12 Recipes Shared</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-pc-gold" fill="currentColor" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                  <Button variant="primary" leftIcon={<Heart size={18} />}>Follow Cook</Button>
                  <Button variant="outline" leftIcon={<MessageSquare size={18} />}>Message</Button>
                  <div className="flex gap-2 ml-2">
                    <button className="p-3 bg-white rounded-full text-pc-navy hover:text-pc-terracotta shadow-sm border border-pc-navy/5 transition-colors">
                      <Instagram size={18} />
                    </button>
                    <button className="p-3 bg-white rounded-full text-pc-navy hover:text-pc-terracotta shadow-sm border border-pc-navy/5 transition-colors">
                      <Facebook size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-pc-navy/5 -skew-x-12 translate-x-1/4 -z-10" />
        </section>

        <div className="pc-container py-12">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN: ABOUT & STATS */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-pc-navy/5 shadow-sm">
                <h3 className="text-xl font-serif mb-4">About Annie</h3>
                <p className="text-sm text-pc-gray-700 leading-relaxed mb-6">
                  &quot;I&apos;ve been baking in Rustico for over 40 years. My recipes are passed down from my mother and grandmother, who taught me that the secret to a great meat pie is patience and a very cold pastry.&quot;
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-pc-navy/5">
                    <span className="text-xs font-bold text-pc-muted uppercase tracking-widest">Specialty</span>
                    <span className="text-sm font-semibold text-pc-navy">Acadian Baking</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-pc-navy/5">
                    <span className="text-xs font-bold text-pc-muted uppercase tracking-widest">Favorite Ingredient</span>
                    <span className="text-sm font-semibold text-pc-navy">Summer Savory</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-xs font-bold text-pc-muted uppercase tracking-widest">Years Cooking</span>
                    <span className="text-sm font-semibold text-pc-navy">45+ Years</span>
                  </div>
                </div>
              </div>

              {/* AWARDS */}
              <div className="bg-pc-navy text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
                  <Award className="text-pc-gold" size={24} />
                  Achievements
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Community Pillar', desc: 'Contributed 10+ recipes' },
                    { title: 'Top Rated', desc: 'Maintained 4.8+ stars' },
                    { title: 'Event Host', desc: 'Hosted 3 workshops' },
                  ].map((award, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <CheckCircle2 size={20} className="text-pc-seaglass" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{award.title}</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">{award.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RECIPES GRID */}
            <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif">Annie&apos;s Recipes</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-pc-terracotta">Latest</Button>
                  <Button variant="ghost" size="sm">Popular</Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <RecipeCard
                  title="Traditional Acadian Meat Pie"
                  cook="Annie Gallant"
                  time="2.5 hours"
                  tags={['Main', 'Traditional']}
                  image="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=600&h=450&fit=crop"
                />
                <RecipeCard
                  title="Rustico Raspberry Jam"
                  cook="Annie Gallant"
                  time="1 hour"
                  tags={['Pantry', 'Summer']}
                  image="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=450&fit=crop"
                />
                <RecipeCard
                  title="Grandmother's Tea Biscuits"
                  cook="Annie Gallant"
                  time="30 mins"
                  tags={['Baking', 'Breakfast']}
                  image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=450&fit=crop"
                />
                <RecipeCard
                  title="Island Rhubarb Crisp"
                  cook="Annie Gallant"
                  time="45 mins"
                  tags={['Dessert', 'Seasonal']}
                  image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop"
                />
              </div>

              <div className="text-center pt-8">
                <Button variant="outline" size="lg" rightIcon={<ChevronRight size={18} />}>Load More Recipes</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
