import React from 'react';
import { Story } from '../types';
import { MessageCircle } from 'lucide-react';

interface StickyNoteProps {
  story: Story;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ story }) => {
  const rotationStyle = { transform: `rotate(${story.rotation}deg)` };
  
  // Determine style based on sentiment
  const sentimentBadgeColor = {
    sad: 'bg-blue-100 text-blue-700',
    angry: 'bg-red-100 text-red-700',
    hopeful: 'bg-yellow-100 text-yellow-700',
    neutral: 'bg-gray-100 text-gray-600'
  }[story.sentiment || 'neutral'];

  return (
    <div 
      style={rotationStyle}
      className={`${story.color} w-full p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:z-10 relative flex flex-col justify-between min-h-[200px] handwritten rounded-bl-[40px] rounded-tr-lg`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-12 bg-yellow-200/50 blur-sm opacity-50 rotate-3"></div>
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500/20 rounded-full blur-sm"></div>
      
      <div>
        <p className="text-gray-800 text-xl leading-snug mb-4 break-words">
          "{story.content}"
        </p>
      </div>

      <div className="space-y-3">
        {story.aiResponse && (
            <div className="bg-white/60 p-2 rounded-lg text-sm text-green-800 font-sans italic border-l-2 border-green-500">
              <span className="flex items-center gap-1 font-bold text-[10px] uppercase text-green-600 not-italic mb-1">
                <MessageCircle size={10} /> Respon Pohon
              </span>
              "{story.aiResponse}"
            </div>
        )}
        
        <div className="flex justify-between items-center border-t border-black/10 pt-2">
          <span className="text-xs font-sans text-gray-500 opacity-75">
            {story.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
          {story.sentiment && (
             <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${sentimentBadgeColor}`}>
               {story.sentiment}
             </span>
          )}
        </div>
      </div>
    </div>
  );
};