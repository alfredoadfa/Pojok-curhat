import React from 'react';
import { BANNER_DATA } from '../types';
import { Info, Heart, Target, Users, Leaf, ArrowDown } from 'lucide-react';

interface XBannerProps {
  onStart: () => void;
}

export const XBanner: React.FC<XBannerProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-12 animate-in fade-in duration-700">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
        
        {/* Header Banner */}
        <div className="bg-green-600 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent scale-150"></div>
          <p className="text-sm font-medium opacity-80 relative z-10 tracking-wider mb-2">{BANNER_DATA.subgroupName}</p>
          <h2 className="text-3xl md:text-5xl font-bold relative z-10 mb-4 leading-tight">
            {BANNER_DATA.title}
          </h2>
          <p className="max-w-2xl mx-auto text-green-50 text-lg italic relative z-10">
            "Karena paru-paru kita berhak atas udara yang merdeka."
          </p>
        </div>

        <div className="p-6 md:p-10 grid gap-10">
          
          {/* Pendahuluan */}
          <section className="flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-red-100 rounded-2xl text-red-600 shrink-0">
              <Info size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                Latar Belakang
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {BANNER_DATA.intro}
              </p>
            </div>
          </section>

          <div className="h-px bg-green-100 w-full"></div>

          {/* Tujuan */}
          <section className="flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 shrink-0">
              <Target size={28} />
            </div>
            <div className="w-full">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Tujuan & Manfaat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BANNER_DATA.goals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                    <Leaf size={18} className="text-green-500 mt-1 shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="h-px bg-green-100 w-full"></div>

          {/* Ringkasan Kegiatan */}
          <section className="flex flex-col md:flex-row gap-6 items-start">
            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 shrink-0">
              <Users size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Kegiatan Kami
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {BANNER_DATA.summary}
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-8 text-center">
             <button 
               onClick={onStart}
               className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-green-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
             >
               <Heart className="mr-2 animate-pulse" fill="currentColor" />
               Lihat & Tulis Cerita
               <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" size={20} />
             </button>
             <p className="mt-3 text-sm text-gray-400">100% Anonim</p>
          </div>

        </div>
      </div>
    </div>
  );
};