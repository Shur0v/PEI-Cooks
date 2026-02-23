'use client';

import React, { useState } from 'react';
import { 
  TopNav, Button, Badge, Footer, OrderModal, RecipeCard 
} from '@/components/ui-library';
import { cn } from '@/lib/utils';
import { 
  Calendar, MapPin, Users, Filter, Search, 
  ChevronRight, ArrowRight, Clock, Share2, Star
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    title: "Harvest Table Dinner",
    date: "Sept 12, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Victoria-by-the-Sea",
    price: "$85.00",
    image: "https://picsum.photos/seed/ev1/800/600",
    tags: ["Dinner", "Featured"],
    description: "An intimate five-course dinner featuring ingredients harvested that morning from local farms."
  },
  {
    id: 2,
    title: "Mussel Cooking Workshop",
    date: "Oct 05, 2026",
    time: "10:00 AM - 1:00 PM",
    location: "Souris Harbour",
    price: "Free",
    image: "https://picsum.photos/seed/ev2/800/600",
    tags: ["Workshop", "Free"],
    description: "Learn the secrets of cleaning, prepping, and steaming the perfect PEI mussels with Captain Jim."
  },
  {
    id: 3,
    title: "Island Pie Competition",
    date: "Oct 22, 2026",
    time: "1:00 PM - 4:00 PM",
    location: "Charlottetown Market",
    price: "$10.00",
    image: "https://picsum.photos/seed/ev3/800/600",
    tags: ["Competition", "Family"],
    description: "Our annual strawberry rhubarb pie bake-off. Come taste the entries and vote for your favorite!"
  }
];

export default function EventsPage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="pc-container">
          {/* HERO SECTION */}
          <section className="py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="gold" className="mb-4">Community Gatherings</Badge>
                <h1 className="text-5xl lg:text-6xl font-serif mb-6">Events at the <span className="text-pc-terracotta italic">Island</span> Table</h1>
                <p className="text-lg text-pc-muted max-w-lg mb-8">
                  From hands-on workshops to grand harvest dinners, join us as we celebrate PEI&apos;s food culture together.
                </p>
                <div className="flex gap-4">
                  <Button size="lg">View Calendar</Button>
                  <Button variant="outline" size="lg">Host an Event</Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image src="https://picsum.photos/seed/evhero/1200/800" alt="Events" fill className="object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-pc-navy/20" />
              </div>
            </div>
          </section>

          {/* FILTERS */}
          <div className="bg-white p-6 rounded-3xl border border-pc-navy/5 shadow-sm mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {['All Events', 'Workshops', 'Dinners', 'Competitions', 'Markets'].map((cat, i) => (
                <button 
                  key={cat} 
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all",
                    i === 0 ? "bg-pc-navy text-white shadow-md" : "text-pc-muted hover:bg-pc-bg"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pc-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="w-full pl-10 pr-4 py-2 bg-pc-bg border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring"
                />
              </div>
              <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>Sort</Button>
            </div>
          </div>

          {/* EVENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -8 }}
                className="pc-card bg-white group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant={tag === 'Featured' ? 'gold' : 'seaglass'}>{tag}</Badge>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-pc-navy font-bold text-sm shadow-sm">
                    {event.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-pc-terracotta uppercase tracking-[0.2em] mb-2">
                    <Calendar size={12} />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-3 group-hover:text-pc-terracotta transition-colors">{event.title}</h3>
                  <p className="text-sm text-pc-muted mb-6 line-clamp-2">{event.description}</p>
                  <div className="space-y-3 pt-6 border-t border-pc-navy/5">
                    <div className="flex items-center gap-2 text-xs text-pc-gray-700">
                      <Clock size={14} className="text-pc-muted" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-pc-gray-700">
                      <MapPin size={14} className="text-pc-muted" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full mt-6" rightIcon={<ArrowRight size={16} />}>Register Now</Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* NEWSLETTER CTA */}
          <section className="mt-24 bg-pc-navy text-white p-12 lg:p-20 rounded-[3rem] relative overflow-hidden text-center">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-serif mb-6">Never miss a <span className="text-pc-seaglass italic">harvest</span>.</h2>
              <p className="text-lg text-white/70 mb-10">
                Join our mailing list to get early access to workshop tickets and seasonal event announcements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-pc-seaglass/50"
                />
                <Button variant="accent" size="lg">Subscribe</Button>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-pc-seaglass/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pc-terracotta/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}


