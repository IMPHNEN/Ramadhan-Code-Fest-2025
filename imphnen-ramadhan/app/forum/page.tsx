'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  lastActivity: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  threadCount: number;
}

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '', category: '' });

  const categories: Category[] = [
    {
      id: 'all',
      name: 'Semua Diskusi',
      description: 'Lihat semua thread diskusi',
      threadCount: 150
    },
    {
      id: 'ai-tools',
      name: 'AI & Tools',
      description: 'Diskusi tentang tools AI dan automasi',
      threadCount: 45
    },
    {
      id: 'no-code',
      name: 'No-Code',
      description: 'Platform dan tips development tanpa coding',
      threadCount: 38
    },
    {
      id: 'help',
      name: 'Bantuan',
      description: 'Tanya jawab dan troubleshooting',
      threadCount: 67
    }
  ];

  const threads: Thread[] = [
    {
      id: '1',
      title: 'Tips pake ChatGPT buat ngoding',
      author: 'lazydev123',
      category: 'ai-tools',
      replies: 23,
      lastActivity: '5 menit lalu'
    },
    {
      id: '2',
      title: 'Review: Platform no-code terbaik 2024',
      author: 'nocodepro',
      category: 'no-code',
      replies: 15,
      lastActivity: '1 jam lalu'
    },
    {
      id: '3',
      title: 'Help! Gimana cara deploy ke cloud?',
      author: 'newbie007',
      category: 'help',
      replies: 8,
      lastActivity: '2 jam lalu'
    }
  ];

  const filteredThreads = activeCategory === 'all' 
    ? threads 
    : threads.filter(thread => thread.category === activeCategory);

  const handleNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('New thread:', newThread);
    setShowNewThreadForm(false);
    setNewThread({ title: '', content: '', category: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Forum Diskusi</h1>
            <p className="text-foreground/70">Diskusi santai seputar programming tanpa ribet</p>
          </div>
          <button
            onClick={() => setShowNewThreadForm(true)}
            className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Buat Thread Baru
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-4 h-fit">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${activeCategory === category.id ? 'bg-foreground text-background shadow-lg scale-[1.02]' : 'border border-foreground/10 hover:border-foreground/20 hover:scale-[1.02]'}`}
              >
                <h3 className="font-semibold">{category.name}</h3>
                <p className={`text-sm mt-1 ${activeCategory === category.id ? 'text-background/70' : 'text-foreground/70'}`}>
                  {category.description}
                </p>
                <div className={`text-xs mt-2 inline-block px-3 py-1 rounded-full ${activeCategory === category.id ? 'bg-background/20' : 'bg-foreground/5'}`}>
                  {category.threadCount} threads
                </div>
              </button>
            ))}
          </div>

          {/* Thread List */}
          <div className="lg:col-span-3 space-y-6">
            {filteredThreads.map(thread => (
              <div
                key={thread.id}
                className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 hover:shadow-lg transition-all hover:scale-[1.01] cursor-pointer"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-xl font-semibold hover:text-foreground/80">
                    {thread.title}
                  </h3>
                  <span className="text-sm text-foreground/60 whitespace-nowrap">{thread.lastActivity}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-2 text-foreground/60">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {thread.author}
                  </span>
                  <span className="text-foreground/40">•</span>
                  <span className="flex items-center gap-2 text-foreground/60">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {thread.replies} balasan
                  </span>
                  <span className="text-foreground/40">•</span>
                  <span className="inline-block px-3 py-1 rounded-full bg-foreground/5 text-foreground/60">
                    {categories.find(c => c.id === thread.category)?.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Thread Modal */}
        {showNewThreadForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-background border border-foreground/10 rounded-xl p-8 max-w-2xl w-full shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Buat Thread Baru</h2>
                <button
                  onClick={() => setShowNewThreadForm(false)}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleNewThread} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Judul Thread</label>
                  <input
                    type="text"
                    value={newThread.title}
                    onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                    className="w-full p-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:ring-0 transition-colors"
                    placeholder="Tulis judul yang menarik..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <select
                    value={newThread.category}
                    onChange={(e) => setNewThread({...newThread, category: e.target.value})}
                    className="w-full p-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:ring-0 transition-colors"
                    required
                  >
                    <option value="">Pilih kategori yang sesuai</option>
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Konten Thread</label>
                  <textarea
                    value={newThread.content}
                    onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                    className="w-full p-3 rounded-lg bg-foreground/5 border border-foreground/10 focus:border-foreground/20 focus:ring-0 h-40 resize-none transition-colors"
                    placeholder="Jelaskan lebih detail tentang threadmu..."
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowNewThreadForm(false)}
                    className="px-6 py-3 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-all hover:scale-[1.02]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02]"
                  >
                    Posting Thread
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}