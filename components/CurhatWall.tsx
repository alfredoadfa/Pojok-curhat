import React, { useState } from 'react';
import { Story } from '../types';
import { StickyNote } from './StickyNote';
import { analyzeStory } from '../services/geminiService';
import { Send, Plus, Loader2 } from 'lucide-react';

// Initial seed data - Top 5 Curhatan Terpilih
const SEED_STORIES: Story[] = [
  { 
    id: '1', 
    content: "Jujur sedih banget kalau lagi jalan di Gerlam, udara pagi Nangor yang harusnya sejuk malah kecampur asap rokok kating yang jalan di depan. Mau negur sungkan, tapi dada sesak banget.", 
    timestamp: new Date(), 
    color: 'bg-blue-100', 
    rotation: -2, 
    sentiment: 'sad', 
    aiResponse: 'Udara pagi adalah hakmu. Semoga kelak ada kesadaran bersama ya.' 
  },
  { 
    id: '2', 
    content: "Tolong dong buat temen-temen yang ngerokok di kantin, asepnya lari ke piring makan kita nih. Kita juga pengen makan dengan tenang tanpa harus 'lauk' asap rokok.", 
    timestamp: new Date(), 
    color: 'bg-red-100', 
    rotation: 3, 
    sentiment: 'angry', 
    aiResponse: 'Makan tenang itu kebutuhan dasar. Suaramu sangat mewakili banyak orang.' 
  },
  { 
    id: '3', 
    content: "Di angkot gratis (angbiri) kadang ada yang ngerokok pas nunggu ngetem, padahal sempit & pengap. Pusing banget sampai mual pas turun di rektorat. Plis hargai penumpang lain.", 
    timestamp: new Date(), 
    color: 'bg-yellow-100', 
    rotation: 1, 
    sentiment: 'angry', 
    aiResponse: 'Fasilitas umum milik bersama, kenyamananmu juga penting. Stay strong!' 
  },
  { 
    id: '4', 
    content: "Aku punya riwayat asma. Tiap lewat selasar fakultas yang banyak orang ngerokok, aku harus cari jalan muter jauh biar gak kambuh. Padahal itu jalan utama ke kelas.", 
    timestamp: new Date(), 
    color: 'bg-purple-100', 
    rotation: -3, 
    sentiment: 'sad', 
    aiResponse: 'Semangat ya! Perjuanganmu mencari jalan aman sangat kami hargai.' 
  },
  { 
    id: '5', 
    content: "Sebenarnya gak melarang total, tapi please look around. Kalau ada orang lain di sekitar yang keganggu, tolong minggir dikit. Kita sama-sama bayar UKT buat fasilitas yang nyaman kan?", 
    timestamp: new Date(), 
    color: 'bg-green-100', 
    rotation: 2, 
    sentiment: 'hopeful', 
    aiResponse: 'Betul sekali, saling menghargai adalah kunci kenyamanan kampus kita.' 
  },
];

const COLORS = ['bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-pink-100', 'bg-purple-100'];

export const CurhatWall: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(SEED_STORIES);
  const [newCurhat, setNewCurhat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCurhat.trim()) return;

    setIsSubmitting(true);

    // Analyze sentiment using Gemini
    const analysis = await analyzeStory(newCurhat);

    const newStory: Story = {
      id: Date.now().toString(),
      content: newCurhat,
      timestamp: new Date(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3 deg
      sentiment: analysis.sentiment,
      aiResponse: analysis.response
    };

    setStories([newStory, ...stories]);
    setNewCurhat('');
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <div className="w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed py-12 border-t border-green-100">
      
      {/* Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl transform transition-all scale-100">
                <h3 className="text-2xl font-bold text-green-900 mb-2">Suarakan Hatimu</h3>
                <p className="text-gray-500 mb-6 text-sm">Identitasmu dirahasiakan. Ceritakan pengalamanmu terganggu asap rokok.</p>
                
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newCurhat}
                        onChange={(e) => setNewCurhat(e.target.value)}
                        className="w-full h-40 p-4 border-2 border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none handwritten text-xl bg-yellow-50 placeholder-gray-400"
                        placeholder="Tulis di sini... (Contoh: Aku batuk-batuk pas lewat kantin karena asap rokok...)"
                        maxLength={250}
                    ></textarea>
                    <div className="flex justify-end items-center gap-3 mt-4">
                        <span className="text-xs text-gray-400">{newCurhat.length}/250</span>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || !newCurhat.trim()}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                            {isSubmitting ? 'Menempel...' : 'Tempel Cerita'}
                        </button>
                    </div>
                </form>
                
                <div className="mt-4 text-center">
                   <button onClick={() => setShowForm(false)} className="text-gray-400 text-sm hover:text-gray-600 underline">Batal</button>
                </div>
            </div>
        </div>
      )}

      {/* The Wall Header & Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
            <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">Pohon Harapan Digital</h2>
                <p className="text-green-700 opacity-80 max-w-xl">Setiap cerita adalah daun yang memperjuangkan udara bersih. Bagikan ceritamu untuk membangun empati.</p>
            </div>
            
            <button 
                onClick={() => setShowForm(true)} 
                className="shrink-0 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 flex items-center gap-2 transition-all transform hover:scale-105 font-bold"
            >
                <Plus size={20} /> Tulis Curhat
            </button>
        </div>

        {stories.length === 0 ? (
            <div className="text-center text-gray-400 py-20 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                <p>Belum ada cerita. Jadilah yang pertama menanam harapan!</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
            {stories.map((story) => (
                <StickyNote key={story.id} story={story} />
            ))}
            </div>
        )}
      </div>
    </div>
  );
};