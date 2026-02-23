'use client';

import React, { useState } from 'react';
import {
  TopNav, Button, Badge, Footer, OrderModal, Input
} from '@/components/ui-library';
import { cn } from '@/lib/utils';
import {
  MapPin, Search, Filter, Store, Phone, Globe,
  Clock, ChevronRight, Star, ExternalLink, X, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

const vendors = [
  {
    id: 1,
    name: "Blue Bay Mussels",
    category: "Seafood",
    location: "Rustico, PEI",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 128,
    isFeatured: true,
    coords: { x: 45, y: 35 }
  },
  {
    id: 2,
    name: "Red Dirt Farms",
    category: "Produce",
    location: "Albany, PEI",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 95,
    isFeatured: false,
    coords: { x: 30, y: 60 }
  },
  {
    id: 3,
    name: "Island Artisan Cheese",
    category: "Dairy",
    location: "New Glasgow, PEI",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    rating: 5.0,
    reviews: 64,
    isFeatured: true,
    coords: { x: 55, y: 45 }
  },
  {
    id: 4,
    name: "Coastal Honey Co.",
    category: "Pantry",
    location: "Souris, PEI",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 42,
    isFeatured: false,
    coords: { x: 85, y: 25 }
  }
];

export default function VendorsPage() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<typeof vendors[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-24 h-[calc(100vh-0px)] flex flex-col">
        {/* HEADER / FILTERS */}
        <div className="bg-white border-b border-pc-navy/5 p-4 lg:p-6">
          <div className="pc-container flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif">Island Vendor Directory</h1>
              <p className="text-xs text-pc-muted">Find the freshest ingredients from 85+ local producers.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-grow lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pc-muted" size={16} />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="w-full pl-10 pr-4 py-2 bg-pc-bg border border-pc-gray-300 rounded-xl text-sm focus:border-pc-navy pc-focus-ring"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>Filters</Button>
              <Button variant="primary" size="sm">Add Your Business</Button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT: SPLIT VIEW */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          {/* LIST PANEL */}
          <div className="w-full lg:w-[450px] bg-white border-r border-pc-navy/5 overflow-y-auto p-4 lg:p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-pc-muted uppercase tracking-widest">{vendors.length} Results Found</span>
              <div className="flex gap-1">
                <Badge variant="seaglass">Open Now</Badge>
                <Badge variant="outline">Featured</Badge>
              </div>
            </div>

            {vendors.map(vendor => (
              <motion.div
                key={vendor.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedVendor(vendor)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer group",
                  selectedVendor?.id === vendor.id
                    ? "bg-pc-navy text-white border-pc-navy shadow-lg"
                    : "bg-white border-pc-navy/5 hover:border-pc-terracotta/30"
                )}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                    <Image src={vendor.image} alt={vendor.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className={cn("font-serif font-bold", selectedVendor?.id === vendor.id ? "text-white" : "text-pc-navy")}>
                        {vendor.name}
                      </h3>
                      {vendor.isFeatured && <Badge variant="gold" className="scale-75 origin-right">Featured</Badge>}
                    </div>
                    <p className={cn("text-xs mb-2", selectedVendor?.id === vendor.id ? "text-white/60" : "text-pc-muted")}>
                      {vendor.category} • {vendor.location}
                    </p>
                    <div className="flex items-center gap-1">
                      <div className="flex text-pc-gold">
                        <Star size={10} fill="currentColor" />
                      </div>
                      <span className="text-[10px] font-bold">{vendor.rating}</span>
                      <span className={cn("text-[10px]", selectedVendor?.id === vendor.id ? "text-white/40" : "text-pc-muted")}>
                        ({vendor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MAP PANEL */}
          <div className="flex-grow relative bg-pc-gray-300/30 overflow-hidden">
            {/* MOCK MAP SVG */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 1000 600" className="w-full h-full text-pc-seaglass/20 fill-current">
                <path d="M150,100 Q300,50 500,150 T850,100 L900,400 Q700,550 400,500 T100,450 Z" />
                <circle cx="500" cy="300" r="200" className="opacity-10" />
              </svg>
            </div>

            {/* PINS */}
            {vendors.map(vendor => (
              <motion.button
                key={vendor.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                onClick={() => setSelectedVendor(vendor)}
                style={{ left: `${vendor.coords.x}%`, top: `${vendor.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
              >
                <div className={cn(
                  "relative p-2 rounded-full shadow-lg transition-all duration-300",
                  selectedVendor?.id === vendor.id ? "bg-pc-terracotta text-white scale-125" : "bg-pc-navy text-white hover:bg-pc-terracotta"
                )}>
                  <Store size={20} />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-[10px] font-bold text-pc-navy whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {vendor.name}
                </div>
              </motion.button>
            ))}

            {/* VENDOR OVERLAY (ON CLICK) */}
            <AnimatePresence>
              {selectedVendor && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-pc-navy/5"
                >
                  <div className="relative h-40">
                    <Image src={selectedVendor.image} alt={selectedVendor.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    <button
                      onClick={() => setSelectedVendor(null)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-pc-navy hover:text-pc-terracotta shadow-sm"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-serif">{selectedVendor.name}</h2>
                      <Badge variant="seaglass">Open Now</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-pc-muted mb-4">
                      <MapPin size={14} />
                      <span>{selectedVendor.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 bg-pc-bg rounded-xl">
                        <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest mb-1">Hours</p>
                        <p className="text-xs font-bold">8am - 4pm</p>
                      </div>
                      <div className="p-3 bg-pc-bg rounded-xl">
                        <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest mb-1">Ships?</p>
                        <p className="text-xs font-bold">Yes, Island-wide</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="primary" className="flex-grow" size="sm" leftIcon={<Globe size={14} />}>Visit Website</Button>
                      <Button variant="outline" size="sm" leftIcon={<Phone size={14} />} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MAP CONTROLS */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-pc-navy hover:bg-pc-bg transition-colors">+</button>
              <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-pc-navy hover:bg-pc-bg transition-colors">-</button>
              <button className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-pc-navy hover:bg-pc-bg transition-colors">
                <MapPin size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
