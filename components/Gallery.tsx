'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGym } from '@/lib/GymContext';
import { GalleryItem } from '@/lib/types';
import { Camera, Eye, X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery } = useGym();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePreviewImage, setActivePreviewImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Gym Interior' },
    { id: 'equipment', label: 'Equipment & Racks' },
    { id: 'training', label: 'Weight Training' },
    { id: 'cardio', label: 'Cardio Suite' },
  ];

  const filteredItems = activeCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Facility Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            GYM <span className="text-yellow-400">GALLERY</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Explore our spacious workout arena, premium imported machinery, and dynamic training environment.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              onClick={() => setActivePreviewImage(item)}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer shadow-lg hover:border-yellow-400/60 transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-90 group-hover:brightness-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-yellow-400 tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-white uppercase">{item.title}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0">
                    <ZoomIn className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-neutral-500 text-sm">
            No gallery images found in this category.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePreviewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950">
              <div>
                <span className="text-xs uppercase font-bold text-yellow-400 tracking-wider">
                  {activePreviewImage.category}
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase text-white">
                  {activePreviewImage.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePreviewImage(null)}
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="relative h-[55vh] sm:h-[65vh] w-full bg-black">
              <Image
                src={activePreviewImage.image}
                alt={activePreviewImage.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
