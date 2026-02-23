'use client';

import React, { useState } from 'react';
import { 
  TopNav, Button, Badge, Footer, OrderModal, Input 
} from '@/components/ui-library';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, MessageSquare, Trophy, Users, 
  Check, X, AlertCircle, Eye, Trash2, Filter, 
  MoreVertical, Search, ArrowUpRight, Clock, ChevronRight, BookOpen, Store as StoreIcon, Calendar as CalendarIcon, Utensils as UtensilsIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

const queueItems = [
  {
    id: 1,
    type: 'Testimonial',
    author: 'Heather M.',
    content: 'The lobster roll recipe is exactly how my grandmother used to make it. This book is a treasure.',
    date: '2 hours ago',
    status: 'Pending',
    avatar: 'https://picsum.photos/seed/t1/100/100'
  },
  {
    id: 2,
    type: 'Recipe Photo',
    author: 'David G.',
    content: 'Uploaded a photo for "Blueberry Grunt"',
    date: '5 hours ago',
    status: 'Pending',
    image: 'https://picsum.photos/seed/bg1/200/200',
    avatar: 'https://picsum.photos/seed/t2/100/100'
  },
  {
    id: 3,
    type: 'Competition Entry',
    author: 'Sarah S.',
    content: 'Strawberry Rhubarb Pie Entry',
    date: '1 day ago',
    status: 'Pending',
    image: 'https://picsum.photos/seed/pie1/200/200',
    avatar: 'https://picsum.photos/seed/t3/100/100'
  }
];

export default function AdminDashboard() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Queue');

  return (
    <div className="min-h-screen bg-pc-bg">
      <TopNav onOrderClick={() => setIsOrderModalOpen(true)} />
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <main className="pt-24 pb-20">
        <div className="pc-container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR */}
            <aside className="lg:w-64 space-y-2">
              <div className="p-4 mb-4">
                <h1 className="text-xl font-serif">Admin Portal</h1>
                <p className="text-[10px] text-pc-muted uppercase tracking-widest font-bold">PEI Cooks Management</p>
              </div>
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Queue', icon: AlertCircle, count: 12 },
                { name: 'Recipes', icon: UtensilsIcon },
                { name: 'Vendors', icon: StoreIcon },
                { name: 'Events', icon: CalendarIcon },
                { name: 'Cooks', icon: Users },
                { name: 'Competitions', icon: Trophy },
              ].map(item => (
                <button 
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    activeTab === item.name ? "bg-pc-navy text-white shadow-md" : "text-pc-muted hover:bg-pc-gray-300 hover:text-pc-navy"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {item.count && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold",
                      activeTab === item.name ? "bg-white text-pc-navy" : "bg-pc-terracotta text-white"
                    )}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-grow space-y-8">
              {/* STATS GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders', value: '1,284', trend: '+12%', color: 'pc-navy' },
                  { label: 'Active Recipes', value: '452', trend: '+5', color: 'pc-seaglass' },
                  { label: 'New Members', value: '84', trend: '+18%', color: 'pc-gold' },
                  { label: 'Pending Items', value: '12', trend: '-2', color: 'pc-terracotta' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white p-6 rounded-3xl border border-pc-navy/5 shadow-sm">
                    <p className="text-[10px] font-bold text-pc-muted uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-2xl font-serif">{stat.value}</h3>
                      <span className="text-[10px] font-bold text-pc-seaglass">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* MODERATION QUEUE */}
              <div className="bg-white rounded-3xl border border-pc-navy/5 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-pc-navy/5 flex items-center justify-between">
                  <h2 className="text-xl font-serif">Moderation Queue</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>Filter</Button>
                    <Button variant="ghost" size="sm">View History</Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-pc-bg/50 text-[10px] font-bold text-pc-muted uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Author</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Content</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pc-navy/5">
                      {queueItems.map(item => (
                        <tr key={item.id} className="hover:bg-pc-bg/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden relative">
                                <Image src={item.avatar} alt={item.author} fill className="object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <span className="text-sm font-semibold text-pc-navy">{item.author}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={item.type === 'Testimonial' ? 'seaglass' : 'gold'}>{item.type}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3 max-w-xs">
                              {item.image && (
                                <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                                  <Image src={item.image} alt="Content" fill className="object-cover" referrerPolicy="no-referrer" />
                                </div>
                              )}
                              <p className="text-xs text-pc-gray-700 line-clamp-1">{item.content}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-[10px] text-pc-muted font-bold uppercase">
                              <Clock size={12} />
                              {item.date}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-pc-seaglass hover:bg-pc-seaglass/10 rounded-lg transition-colors" title="Approve">
                                <Check size={18} />
                              </button>
                              <button className="p-2 text-pc-terracotta hover:bg-pc-terracotta/10 rounded-lg transition-colors" title="Reject">
                                <X size={18} />
                              </button>
                              <button className="p-2 text-pc-muted hover:bg-pc-gray-300 rounded-lg transition-colors">
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-pc-bg/30 text-center">
                  <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={14} />}>View All Pending Items</Button>
                </div>
              </div>

              {/* RECENT ACTIVITY MOCKUP */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-pc-navy/5 shadow-sm">
                  <h3 className="text-lg font-serif mb-6">Recent Orders</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-pc-bg rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pc-navy/10 rounded-xl flex items-center justify-center text-pc-navy">
                            <BookOpen size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Order #PEI-823{i}</p>
                            <p className="text-[10px] text-pc-muted uppercase font-bold">Charlottetown Pickup</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-pc-navy">$35.00</p>
                          <Badge variant="seaglass" className="scale-75 origin-right">Paid</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-pc-navy/5 shadow-sm">
                  <h3 className="text-lg font-serif mb-6">System Health</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                        <span>Storage Usage</span>
                        <span className="text-pc-muted">64%</span>
                      </div>
                      <div className="h-2 bg-pc-bg rounded-full overflow-hidden">
                        <div className="h-full bg-pc-navy w-[64%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                        <span>Moderation Speed</span>
                        <span className="text-pc-muted">Fast</span>
                      </div>
                      <div className="h-2 bg-pc-bg rounded-full overflow-hidden">
                        <div className="h-full bg-pc-seaglass w-[85%]" />
                      </div>
                    </div>
                    <div className="pt-4 flex gap-4">
                      <div className="flex-grow p-4 bg-pc-bg rounded-2xl text-center">
                        <p className="text-xl font-bold text-pc-navy">99.9%</p>
                        <p className="text-[10px] text-pc-muted uppercase font-bold">Uptime</p>
                      </div>
                      <div className="flex-grow p-4 bg-pc-bg rounded-2xl text-center">
                        <p className="text-xl font-bold text-pc-navy">1.2s</p>
                        <p className="text-[10px] text-pc-muted uppercase font-bold">Avg Load</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Utensils = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
  </svg>
);

const Store = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
    <path d="M2 7h20"></path>
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 10V7"></path>
  </svg>
);

const Calendar = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
