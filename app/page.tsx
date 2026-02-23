'use client';

import React, { useState } from 'react';
import {
  TopNav, Button, Badge, Footer, OrderModal, RecipeCard, CookCard, LogosStrip, FlipCard, ProgressBar, Accordion, Input
} from '@/components/ui-library';
import { cn } from '@/lib/utils';
import {
  ArrowRight, BookOpen, MapPin, Calendar, Star,
  ChevronRight, ChevronLeft, UtensilsCrossed, Users, Store, Heart, Trophy, Check, Clock, Share2, Facebook, Instagram, Download, MessageSquare, Plus, Award, Search, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function HomePage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [particles, setParticles] = useState<{ left: string; top: string; delay: number; duration: number; x: number }[]>([]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [eventIdx, setEventIdx] = useState(0);

  React.useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      x: Math.random() * 100 - 50
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [-20, -100],
                x: p.x
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay
              }}
              className="absolute w-1 h-1 bg-pc-terracotta rounded-full"
              style={{
                left: p.left,
                top: p.top
              }}
            />
          ))}
        </div>

        <div className="pc-container relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LogosStrip />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="terracotta" className="mb-6">Community Driven</Badge>
              <h1 className="text-5xl lg:text-7xl font-serif mb-6 leading-[1.1] text-pc-navy">
                Welcome to <span className="text-pc-terracotta italic">PEI Cooks</span>
              </h1>
              <p className="text-xl text-pc-gray-700 mb-10 max-w-xl leading-relaxed">
                Bringing Islanders and the Local Food Industry and Producers Together To Help Build a Better Food Future for Prince Edward Island.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: "200 Pages", icon: <BookOpen size={20} /> },
                  { label: "157 Recipes", icon: <UtensilsCrossed size={20} /> },
                  { label: "77 Home Cooks", icon: <Users size={20} /> },
                  { label: "4 Island Chefs", icon: <Trophy size={20} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-pc-navy font-bold">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-pc-navy/5 text-pc-terracotta">
                      {item.icon}
                    </div>
                    <span className="text-sm uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                variant="accent"
                onClick={() => setIsOrderModalOpen(true)}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">Order Here</span>
                <motion.div
                  className="absolute bottom-2 left-8 right-8 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[5/7] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src="https://www.freelancer.com/fs/download-api.php?type=contest&id=2704687&filename=Copy%20of%20Colorful%20Homemade%20Recipes%20Cookbook%20eBook%20Cover%20%285%20x%207%20in%29.png"
                  alt="PEI Cooks Cookbook Cover"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pc-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-pc-gold rounded-full flex flex-col items-center justify-center text-pc-navy text-center p-4 shadow-xl border-4 border-white rotate-12"
              >
                <p className="text-[10px] font-bold uppercase tracking-tighter leading-none">Best Seller</p>
                <p className="font-serif font-bold text-xl">Volume 2</p>
                <p className="text-[10px] font-bold uppercase tracking-tighter leading-none">Out Now</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE COOKBOOK SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="pc-container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Badge variant="gold" className="mb-4">The Collection</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">PEI Cooks at Home</h2>
            <p className="text-pc-gray-700 leading-relaxed">
              A community-driven initiative celebrating the culinary heritage of Prince Edward Island. Every recipe tells a story of our land, our sea, and our people.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { count: 77, label: "Contributors", desc: "Passionate home cooks from across the island." },
              { count: 157, label: "Local Recipes", desc: "Authentic island flavors passed down through generations." },
              { count: 200, label: "Full-Color Pages", desc: "Stunning photography of island landscapes and dishes." },
              { count: 100, label: "Community Driven", desc: "Supports local food initiatives and producers.", isPercent: true },
            ].map((stat, i) => (
              <FlipCard
                key={i}
                front={
                  <div className="w-full h-full bg-pc-bg rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-pc-navy/5 shadow-sm">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-5xl font-serif font-bold text-pc-terracotta mb-2"
                    >
                      {stat.count}{stat.isPercent ? '%' : ''}
                    </motion.span>
                    <p className="font-bold text-pc-navy uppercase tracking-widest text-xs">{stat.label}</p>
                  </div>
                }
                back={
                  <div className="w-full h-full bg-pc-navy rounded-3xl p-8 flex flex-col items-center justify-center text-center text-white shadow-xl">
                    <p className="text-sm leading-relaxed">{stat.desc}</p>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. MEET THE HOME COOKS SECTION */}
      <section className="py-24 bg-pc-bg">
        <div className="pc-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Badge variant="seaglass" className="mb-4">Our Community</Badge>
              <h2 className="text-4xl lg:text-5xl font-serif mb-4">Meet the Home Cooks</h2>
              <p className="text-pc-gray-700">The heart and soul of PEI Cooks. These are the people who keep our traditions alive.</p>
            </div>
            <Button variant="outline" rightIcon={<ArrowRight size={18} />}>View All Cooks</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Annie Gallant", location: "Abram-Village", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", bio: "Annie has been perfecting her Acadian meat pie for over 40 years." },
              { name: "Mary MacDonald", location: "Souris", image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=400&fit=crop", bio: "A third-generation lobster fisher with a passion for coastal cooking." },
              { name: "John Peters", location: "Borden-Carleton", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop", bio: "John specializes in traditional island preserves and root vegetables." },
              { name: "Sarah Jenkins", location: "Charlottetown", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop", bio: "Bringing a modern twist to classic island seafood dishes." },
            ].map((cook, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <CookCard {...cook} />
                <motion.div
                  className="absolute top-4 right-4 text-pc-terracotta opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.2 }}
                >
                  <Heart size={24} fill="currentColor" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WEEKLY FEATURED RECIPE SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pc-navy/5 -skew-y-3 origin-top-left" />
        <div className="pc-container relative z-10">
          <div className="text-center mb-16">
            <Badge variant="terracotta" className="mb-4">Weekly Feature</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif">Island Flavors</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              whileHover={{ y: -10 }}
              className="pc-card overflow-hidden bg-white shadow-2xl"
            >
              <div className="relative aspect-video">
                <Image
                  src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop"
                  alt="Featured Recipe"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif mb-4">Classic Island Lobster Roll</h3>
                <p className="text-pc-gray-700 mb-6">The quintessential taste of a PEI summer. Fresh, cold-water lobster tossed in a light, creamy dressing on a toasted brioche bun.</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">View Full Recipe</Button>
                  <Button variant="outline" leftIcon={<Facebook size={18} />}>Join PEIGoodEats FB Group</Button>
                </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <h3 className="text-2xl font-serif">Past Features</h3>
              <div className="space-y-4">
                {[
                  { title: "Acadian Meat Pie", date: "Last Week", image: "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=200&h=200&fit=crop" },
                  { title: "Wild Blueberry Grunt", date: "2 Weeks Ago", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop" },
                  { title: "Island Potato Salad", date: "3 Weeks Ago", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop" },
                ].map((recipe, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-pc-bg rounded-2xl border border-pc-navy/5 cursor-pointer"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={recipe.image} alt={recipe.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-bold text-pc-navy">{recipe.title}</p>
                      <p className="text-xs text-pc-muted">{recipe.date}</p>
                    </div>
                    <ChevronRight className="ml-auto text-pc-muted" size={18} />
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" className="w-full" rightIcon={<ArrowRight size={18} />}>See More Recipes</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL SECTION */}
      <section className="py-24 bg-pc-navy text-white overflow-hidden">
        <div className="pc-container">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Testimonials</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif">What the Community Says</h2>
          </div>

          {(() => {
            const testimonials = [
              { name: "Heather MacDonald", text: "The lobster roll recipe is exactly how my grandmother used to make it. This book is a treasure for anyone who loves the island.", role: "Cookbook Owner" },
              { name: "David G.", text: "I've tried five recipes so far and each one has been a hit. The photography is stunning and the stories are so moving.", role: "Home Chef" },
              { name: "Sarah S.", text: "Finally, a cookbook that truly captures the essence of PEI. It's more than recipes, it's our history.", role: "Local Producer" },
              { name: "James L.", text: "The Acadian meat pie recipe is worth the price of the book alone. Highly recommended!", role: "Food Enthusiast" },
            ];
            const visibleCount = 3;
            const maxIdx = testimonials.length - visibleCount;
            const visible = testimonials.slice(testimonialIdx, testimonialIdx + visibleCount);
            return (
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AnimatePresence mode="wait">
                    {visible.map((testimonial, i) => (
                      <motion.div
                        key={testimonialIdx + i}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, delay: i * 0.07 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                        whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.1)" }}
                      >
                        <div className="flex gap-1 text-pc-gold mb-4">
                          {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                        </div>
                        <p className="italic mb-6 text-white/80">&quot;{testimonial.text}&quot;</p>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-pc-terracotta flex items-center justify-center font-bold">
                            {testimonial.name[0]}
                          </div>
                          <div>
                            <p className="font-bold">{testimonial.name}</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/40">{testimonial.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => setTestimonialIdx(i => Math.max(0, i - 1))}
                    disabled={testimonialIdx === 0}
                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all ${testimonialIdx === i ? 'bg-pc-gold w-6' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setTestimonialIdx(i => Math.min(maxIdx, i + 1))}
                    disabled={testimonialIdx === maxIdx}
                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 6. SHAREABLE PROMO SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="pc-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="terracotta">Show Your Love</Badge>
              <h2 className="text-4xl lg:text-5xl font-serif">I Love PEI Good Eats at Home</h2>
              <p className="text-pc-gray-700 leading-relaxed">
                Support our local food community by sharing your love for island cooking. Download our official profile frame and share your kitchen creations with us!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" leftIcon={<Share2 size={18} />}>Share Now</Button>
                <Button variant="outline" leftIcon={<Download size={18} />}>Download Frame</Button>
              </div>
            </div>

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              >
                <Image
                  src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=600&fit=crop"
                  alt="Profile Frame Preview"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Frame Overlay Mockup */}
                <div className="absolute inset-0 border-[20px] border-pc-terracotta/30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 bg-pc-terracotta p-4 text-center text-white font-serif font-bold">
                  I Love PEI Good Eats
                </div>
              </motion.div>

              {/* Instagram Mockup Decor */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pc-gold rounded-2xl -z-10 rotate-12" />
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-pc-seaglass rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. INITIATIVES & PROGRAMS SECTION */}
      <section className="py-24 bg-pc-bg">
        <div className="pc-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="seaglass" className="mb-4">Our Impact</Badge>
            <h2 className="text-4xl lg:text-5xl font-serif">Initiatives & Programs</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <Accordion
              items={[
                { title: "Food Future-Proofing", content: "We work with local producers to ensure sustainable food systems for Prince Edward Island, focusing on regenerative agriculture and coastal preservation." },
                { title: "Supporting Local", content: "Every cookbook sale directly supports island home cooks and small-scale food producers through our community grant program." },
                { title: "PEI-made Products", content: "We promote island-made kitchenware, preserves, and ingredients to help grow our local culinary economy." },
                { title: "Being Part of the Solution", content: "Join our advocacy group to help shape food policy and education on the island." },
              ]}
            />

            <div className="bg-white p-10 rounded-3xl shadow-xl border border-pc-navy/5">
              <h3 className="text-2xl font-serif mb-6">Have an Idea?</h3>
              <p className="text-sm text-pc-muted mb-8">We&apos;re always looking for new ways to support our food community. Share your thoughts with us.</p>
              <form className="space-y-4">
                <div className="relative">
                  <Input label="Full Name" placeholder="Jane Doe" />
                </div>
                <div className="relative">
                  <Input label="Email Address" type="email" placeholder="jane@example.com" />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold text-pc-navy uppercase tracking-wider mb-1.5">Your Idea</label>
                  <textarea
                    className="w-full px-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm transition-all focus:border-pc-navy pc-focus-ring min-h-[120px]"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <Button className="w-full" variant="accent">Submit Idea</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ORDER SECTION */}
      <section id="order" className="py-24 bg-white">
        <div className="pc-container">
          <div className="max-w-4xl mx-auto bg-pc-navy rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 text-white flex flex-col justify-center">
              <Badge variant="gold" className="mb-6 w-fit">Limited Edition</Badge>
              <h2 className="text-4xl lg:text-5xl font-serif mb-6">Order Your Copy</h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Bring the flavors of Prince Edward Island into your kitchen. Volume 2 features 157 authentic recipes and the stories of 77 island home cooks.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pc-gold/20 rounded-full flex items-center justify-center text-pc-gold">
                    <Check size={14} />
                  </div>
                  <span className="text-sm font-bold text-white">E-transfer Only</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-pc-gold/20 rounded-full flex items-center justify-center text-pc-gold">
                    <Check size={14} />
                  </div>
                  <span className="text-sm font-bold text-white">Local Pickup Available</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white p-12">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={cn("w-8 h-1 rounded-full", i === 1 ? "bg-pc-terracotta" : "bg-pc-gray-300")} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pc-muted">Step 1 of 3</span>
                </div>
                <Input label="Quantity" type="number" defaultValue={1} min={1} />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-pc-navy uppercase tracking-wider">Pickup Location</label>
                  <select className="w-full px-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring">
                    <option>Charlottetown Farmers Market</option>
                    <option>Summerside Library</option>
                    <option>Montague Waterfront</option>
                  </select>
                </div>
                <div className="p-4 bg-pc-bg rounded-2xl border border-pc-navy/5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-pc-muted">Cookbook x 1</span>
                    <span className="font-bold">$35.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-pc-navy pt-2 border-t border-pc-navy/5">
                    <span>Total</span>
                    <span>$35.00</span>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={() => setIsOrderModalOpen(true)}>Continue to Payment</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VENDOR SUPPORT SECTION */}
      <section className="py-24 bg-pc-bg">
        <div className="pc-container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Badge variant="terracotta" className="mb-4">Shop Local</Badge>
              <h2 className="text-4xl lg:text-5xl font-serif mb-4">Vendor Support</h2>
              <p className="text-pc-gray-700">Find our cookbook and other island-made products at these fine local establishments.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pc-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="pl-12 pr-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring w-64"
                />
              </div>
              <Button variant="outline" leftIcon={<Filter size={18} />}>Filter</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { name: "Charlottetown Farmers Market", area: "Charlottetown", type: "Pickup Only", image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop" },
                { name: "The Root Cellar", area: "Summerside", type: "Ships & Pickup", image: "https://images.unsplash.com/photo-1542223616-740d5dff7f56?w=400&h=300&fit=crop" },
                { name: "Island Artisans", area: "Montague", type: "Pickup Only", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop" },
                { name: "Coastal Pantry", area: "Souris", type: "Ships & Pickup", image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop" },
              ].map((vendor, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-3xl border border-pc-navy/5 shadow-sm group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                    <Image src={vendor.image} alt={vendor.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-serif text-lg mb-2 group-hover:text-pc-terracotta transition-colors">{vendor.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-pc-muted">
                      <MapPin size={12} />
                      <span>{vendor.area}</span>
                    </div>
                    <Badge variant="outline">{vendor.type}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-8">
              <div className="aspect-square bg-pc-gray-300 rounded-3xl relative overflow-hidden shadow-inner border-4 border-white">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-pc-muted p-8 text-center">
                  <MapPin size={48} className="mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">Interactive Map</p>
                  <p className="text-[10px] mt-2">Explore vendors across Prince Edward Island</p>
                </div>
                {/* Mock Pins */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/3 left-1/2 w-4 h-4 bg-pc-terracotta rounded-full border-2 border-white shadow-lg"
                />
                <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-pc-navy rounded-full border-2 border-white shadow-lg" />
                <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-pc-seaglass rounded-full border-2 border-white shadow-lg" />
              </div>
              <div className="bg-pc-navy p-8 rounded-3xl text-white text-center">
                <h4 className="font-serif text-xl mb-4">Support Our Mission</h4>
                <p className="text-sm text-white/70 mb-6">Are you a local business owner? Join our network of vendor supporters.</p>
                <Button variant="accent" className="w-full">Become a Vendor Supporter</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EVENTS & WORKSHOPS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="pc-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Badge variant="gold" className="mb-4">Gatherings</Badge>
              <h2 className="text-4xl lg:text-5xl font-serif mb-4">Events & Workshops</h2>
              <p className="text-pc-gray-700">Join us for community dinners, cooking classes, and island food celebrations.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-pc-muted">Next Event In</p>
                <p className="font-serif font-bold text-pc-navy">12 Days : 04 Hours</p>
              </div>
              <Button variant="outline" size="sm">View Calendar</Button>
            </div>
          </div>

          {(() => {
            const events = [
              { title: "Summer Harvest Dinner", date: "Aug 15, 2024", location: "Orwell Corner", price: "$65", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
              { title: "Seafood Chowder Workshop", date: "Aug 22, 2024", location: "Charlottetown", price: "$45", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop" },
              { title: "Preserving the Island", date: "Sept 05, 2024", location: "Summerside", price: "$30", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop" },
              { title: "Acadian Kitchen Party", date: "Sept 12, 2024", location: "Abram-Village", price: "$25", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" },
            ];
            const visibleCount = 3;
            const maxIdx = events.length - visibleCount;
            const visible = events.slice(eventIdx, eventIdx + visibleCount);
            return (
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <AnimatePresence mode="wait">
                    {visible.map((event, i) => (
                      <motion.div
                        key={eventIdx + i}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, delay: i * 0.07 }}
                        className="group cursor-pointer"
                        whileHover={{ y: -10 }}
                      >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg">
                          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-pc-navy uppercase tracking-widest">
                            {event.price}
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="absolute bottom-4 right-4 bg-pc-terracotta text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Star size={20} fill="currentColor" />
                          </motion.button>
                        </div>
                        <h4 className="font-serif text-xl mb-2 group-hover:text-pc-terracotta transition-colors">{event.title}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-pc-muted">
                            <Calendar size={14} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-pc-muted">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                          <Button variant="primary" size="sm" className="flex-grow">Register</Button>
                          <Button variant="outline" size="sm" className="px-3"><Share2 size={16} /></Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => setEventIdx(i => Math.max(0, i - 1))}
                    disabled={eventIdx === 0}
                    className="w-12 h-12 rounded-full bg-pc-navy border border-pc-navy/20 flex items-center justify-center text-white hover:bg-pc-terracotta transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setEventIdx(i)}
                        className={`h-2 rounded-full transition-all ${eventIdx === i ? 'bg-pc-terracotta w-6' : 'bg-pc-gray-300 w-2'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setEventIdx(i => Math.min(maxIdx, i + 1))}
                    disabled={eventIdx === maxIdx}
                    className="w-12 h-12 rounded-full bg-pc-navy border border-pc-navy/20 flex items-center justify-center text-white hover:bg-pc-terracotta transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 11. COMPETITIONS SECTION */}
      <section className="py-24 bg-pc-navy text-white overflow-hidden">
        <div className="pc-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="gold" className="mb-6">Get Involved</Badge>
              <h2 className="text-4xl lg:text-5xl font-serif mb-8">Island Competitions</h2>
              <p className="text-white/70 mb-12 leading-relaxed">
                Showcase your culinary skills and celebrate island flavors. Enter our seasonal competitions for a chance to be featured in our next volume.
              </p>

              <div className="space-y-8">
                <div className="bg-white/15 border border-white/20 p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pc-gold/20 rounded-xl flex items-center justify-center text-pc-gold">
                        <Trophy size={20} />
                      </div>
                      <h4 className="font-serif text-xl text-white">Collect the Cooks</h4>
                    </div>
                    <Badge variant="gold">Active</Badge>
                  </div>
                  <ProgressBar progress={65} label="Book Signing Tracker" />
                  <p className="text-xs text-white/70 mt-4 italic">Get your cookbook signed by 10 featured cooks to unlock a special island gift.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Cooking My Way Through", icon: <UtensilsCrossed size={18} />, progress: 40 },
                    { title: "Next Cookbook Entry", icon: <Plus size={18} />, progress: 10 },
                  ].map((comp, i) => (
                    <div key={i} className="bg-white/15 border border-white/20 p-6 rounded-2xl">
                      <div className="flex items-center gap-2 mb-4 text-pc-gold">
                        {comp.icon}
                        <span className="font-bold text-xs uppercase tracking-widest text-white">{comp.title}</span>
                      </div>
                      <ProgressBar progress={comp.progress} label="Progress" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] text-pc-navy shadow-2xl">
              <h3 className="text-2xl font-serif mb-6 text-center">Nominate Your Favorite</h3>
              <p className="text-sm text-pc-muted text-center mb-10">Know an amazing island home cook? Nominate them for our next volume.</p>

              <div className="space-y-6">
                <div className="aspect-video bg-pc-bg rounded-2xl border-2 border-dashed border-pc-gray-300 flex flex-col items-center justify-center text-pc-muted group cursor-pointer hover:border-pc-terracotta transition-colors">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Plus size={32} className="mb-2 opacity-40" />
                  </motion.div>
                  <p className="text-xs font-bold uppercase tracking-widest">Upload Photo</p>
                  <p className="text-[10px] mt-1">Drag and drop or click to browse</p>
                </div>
                <Input label="Cook's Name" placeholder="Enter name..." />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-pc-navy uppercase tracking-wider">Why are they amazing?</label>
                  <textarea className="w-full px-4 py-3 bg-white border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring min-h-[100px]" placeholder="Tell us their story..." />
                </div>
                <Button variant="accent" className="w-full" size="lg">Submit Nomination</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. PEI COOKS WITH PARRY SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="pc-container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative z-10 aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&h=533&fit=crop"
                  alt="Parry Milton"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pc-navy/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-serif mb-2">Parry Milton</h3>
                  <p className="text-sm text-white/70 uppercase tracking-widest font-bold">Island Food Historian</p>
                </div>
              </motion.div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-pc-terracotta/10 rounded-full -z-10" />
            </div>

            <div className="lg:col-span-7 space-y-12">
              <div>
                <Badge variant="terracotta" className="mb-6">Featured Column</Badge>
                <h2 className="text-4xl lg:text-5xl font-serif mb-6">PEI Cooks with Parry</h2>
                <p className="text-pc-gray-700 leading-relaxed text-lg">
                  Explore the rich history of island cuisine through Parry Milton&apos;s weekly column. From forgotten traditions to the future of our food systems.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-pc-navy uppercase tracking-widest text-xs">Latest Columns</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "The History of Red Soil Potatoes", date: "Aug 10", link: "peicanada.com" },
                    { title: "Coastal Foraging Traditions", date: "Aug 03", link: "peicanada.com" },
                  ].map((column, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-6 bg-pc-bg rounded-2xl border border-pc-navy/5 hover:border-pc-terracotta transition-all group"
                    >
                      <p className="text-[10px] font-bold text-pc-terracotta uppercase tracking-widest mb-2">{column.date}</p>
                      <h5 className="font-serif text-lg mb-4 group-hover:text-pc-terracotta transition-colors">{column.title}</h5>
                      <div className="flex items-center gap-2 text-xs text-pc-muted">
                        <MessageSquare size={14} />
                        <span>Read on {column.link}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-pc-bg p-8 rounded-3xl border border-pc-navy/5">
                <h4 className="font-serif text-xl mb-4">Book Parry for your Event</h4>
                <p className="text-sm text-pc-muted mb-6">Interested in an island food history talk or workshop? Get in touch.</p>
                <form className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Email Address" />
                  <Button variant="accent" className="sm:col-span-2">Send Inquiry</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. ABOUT PEI FOOD STRONG, INC. */}
      <section className="py-24 bg-pc-navy text-white relative overflow-hidden">
        <div className="pc-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="gold">The Foundation</Badge>
              <h2 className="text-4xl lg:text-6xl font-serif text-white">PEI Food Strong, Inc.</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Our mission is to build a resilient, sustainable, and inclusive food future for Prince Edward Island. We believe that by connecting producers, cooks, and consumers, we can create a stronger community.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8">
                {[
                  { count: 12, label: "Active Programs", icon: <Award size={24} /> },
                  { count: 500, label: "Members", icon: <Users size={24} />, suffix: "+" },
                  { count: 25, label: "Local Partners", icon: <Store size={24} /> },
                  { count: 100, label: "Island Impact", icon: <Heart size={24} />, suffix: "%" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="text-pc-gold mb-2">{stat.icon}</div>
                    <p className="text-3xl font-serif font-bold text-white">{stat.count}{stat.suffix}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-[40px] overflow-hidden relative z-10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&h=600&fit=crop"
                  alt="Community Impact"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-pc-navy/20 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white text-pc-navy rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <ArrowRight size={32} />
                  </motion.button>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pc-terracotta/20 rounded-full -z-0 blur-3xl" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-pc-gold/20 rounded-full -z-0 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
