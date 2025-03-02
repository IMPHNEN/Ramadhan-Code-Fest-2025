'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  progress: number;
}

export default function LearnPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const courses: Course[] = [
    {
      id: 'basics',
      title: 'Dasar Pemrograman',
      description: 'Pelajari konsep dasar pemrograman tanpa perlu menulis kode.',
      level: 'Beginner',
      duration: '2 jam',
      progress: 0,
    },
    {
      id: 'web-dev',
      title: 'Pengembangan Web',
      description: 'Buat website keren dengan bantuan AI dan template.',
      level: 'Intermediate',
      duration: '4 jam',
      progress: 0,
    },
    {
      id: 'mobile-dev',
      title: 'Aplikasi Mobile',
      description: 'Buat aplikasi mobile tanpa coding menggunakan no-code tools.',
      level: 'Advanced',
      duration: '6 jam',
      progress: 0,
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Pelajari AI dan ML dengan tools visual dan template.',
      level: 'Advanced',
      duration: '8 jam',
      progress: 0,
    },
    {
      id: 'database',
      title: 'Database & Backend',
      description: 'Kelola data tanpa SQL menggunakan tools visual.',
      level: 'Intermediate',
      duration: '3 jam',
      progress: 0,
    },
    {
      id: 'automation',
      title: 'Otomasi & Scripting',
      description: 'Buat script otomatis tanpa coding manual.',
      level: 'Beginner',
      duration: '2 jam',
      progress: 0,
    },
  ];

  const filteredCourses = selectedLevel === 'all'
    ? courses
    : courses.filter(course => course.level === selectedLevel);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Belajar Programming Tanpa Ngoding
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Pilih materi sesuai level kamu dan mulai belajar konsep programming tanpa perlu menulis kode.
          </p>
        </div>

        {/* Level Filter */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'all' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
          >
            Semua Level
          </button>
          <button
            onClick={() => setSelectedLevel('Beginner')}
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'Beginner' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
          >
            Pemula
          </button>
          <button
            onClick={() => setSelectedLevel('Intermediate')}
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'Intermediate' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
          >
            Menengah
          </button>
          <button
            onClick={() => setSelectedLevel('Advanced')}
            className={`px-4 py-2 rounded-lg ${selectedLevel === 'Advanced' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
          >
            Lanjutan
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{course.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{course.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {course.level}
                </span>
              </div>

              <div className="mb-4">
                <div className="w-full bg-foreground/5 rounded-full h-2">
                  <div
                    className="bg-foreground h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-foreground/60 mt-1">{course.progress}% selesai</p>
              </div>

              <Link
                href={`/learn/${course.id}`}
                className="block w-full text-center bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Mulai Belajar
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}