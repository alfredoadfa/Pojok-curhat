import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-b from-white to-green-50 border-b border-green-100 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-center gap-6 mb-4 flex-wrap px-4">
        {/* Logo Placeholders using Text/Shapes for clean design */}
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white">
            UNPAD
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg border-2 border-white">
            TPB
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
             <div className="h-12 w-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-lg border-2 border-white leading-tight text-center p-1">
              SDGs<br/>No. 3
             </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 text-center px-4">
        Pojok Curhat
      </h1>
      <p className="text-green-600 font-medium tracking-widest text-sm uppercase mt-1">
        Suara Hati Non-Perokok
      </p>
    </div>
  );
};