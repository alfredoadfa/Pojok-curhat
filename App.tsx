import React, { useRef } from 'react';
import { Header } from './components/Header';
import { XBanner } from './components/XBanner';
import { CurhatWall } from './components/CurhatWall';

const App: React.FC = () => {
  const wallRef = useRef<HTMLDivElement>(null);

  const scrollToWall = () => {
    wallRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const members = [
    { name: "Kevin Ghifari Irwandi", npm: "180910250111" },
    { name: "Ruben Tua Alfredo Dongoran", npm: "280104250061" },
    { name: "Keyza Naurah Hakim", npm: "230210250084" },
    { name: "Manik Pujangga Nashrullah", npm: "210410250137" },
    { name: "Sultan Alkareem Widianto", npm: "150510250239" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0fdf4]">
      <Header />
      
      <main className="flex-grow relative">
        <XBanner onStart={scrollToWall} />
        
        <div ref={wallRef} id="curhat-wall-section">
          <CurhatWall />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-10 text-center border-t border-green-800 relative z-20">
        <div className="max-w-4xl mx-auto px-4">
           <div className="mb-8">
             <h3 className="text-lg font-bold text-green-300 mb-4 uppercase tracking-wider border-b border-green-700 pb-2 inline-block">Anggota Kelompok 5</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-left max-w-2xl mx-auto">
               {members.map((member, idx) => (
                 <div key={idx} className="flex justify-between items-center border-b border-green-800/50 pb-1 last:border-0">
                   <span className="font-medium text-green-50 text-sm">{member.name}</span>
                   <span className="font-mono text-green-400 text-xs bg-green-950/50 px-2 py-0.5 rounded">{member.npm}</span>
                 </div>
               ))}
             </div>
           </div>

           <p className="text-sm font-medium mb-1">© 2025 Kelompok 5 TPB Unpad.</p>
           <p className="text-xs opacity-60">
             Mendukung Sustainable Development Goals (SDGs) No. 3: Good Health and Well-being.
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;