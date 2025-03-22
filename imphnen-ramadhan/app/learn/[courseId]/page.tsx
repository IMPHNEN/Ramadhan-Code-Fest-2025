'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface Module {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  duration: string;
  completed: boolean;
}

interface CourseContent {
  id: string;
  title: string;
  description: string;
  level: string;
  modules: Module[];
}

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const courseContent: Record<string, CourseContent> = {
    'database': {
      id: 'database',
      title: 'Database & Backend',
      description: 'Kelola data tanpa SQL menggunakan tools visual.',
      level: 'Menengah',
      modules: [
        {
          id: 'intro',
          title: 'Pengenalan Database & Backend',
          type: 'video',
          duration: '30 menit',
          completed: false
        },
        {
          id: 'tools',
          title: 'Tools Visual Database',
          type: 'article',
          duration: '45 menit',
          completed: false
        },
        {
          id: 'project',
          title: 'Membuat Database Pertama',
          type: 'quiz',
          duration: '30 menit',
          completed: false
        }
      ]
    },
    'automation': {
      id: 'automation',
      title: 'Otomasi & Scripting',
      description: 'Buat script otomatis tanpa coding manual.',
      level: 'Menengah',
      modules: [
        {
          id: 'intro',
          title: 'Pengenalan Otomasi',
          type: 'video',
          duration: '25 menit',
          completed: false
        },
        {
          id: 'tools',
          title: 'Platform No-Code Automation',
          type: 'article',
          duration: '35 menit',
          completed: false
        },
        {
          id: 'project',
          title: 'Membuat Workflow Otomatis',
          type: 'quiz',
          duration: '30 menit',
          completed: false
        }
      ]
    },
    'basics': {
      id: 'basics',
      title: 'Dasar Pemrograman',
      description: 'Pelajari konsep dasar pemrograman tanpa perlu menulis kode.',
      level: 'Pemula',
      modules: [
        {
          id: 'intro',
          title: 'Pengenalan Programming',
          type: 'video',
          duration: '10 menit',
          completed: false
        },
        {
          id: 'variables',
          title: 'Variabel dan Tipe Data',
          type: 'article',
          duration: '15 menit',
          completed: false
        },
        {
          id: 'logic',
          title: 'Logika Pemrograman',
          type: 'quiz',
          duration: '20 menit',
          completed: false
        }
      ]
    },
    'web-dev': {
      id: 'web-dev',
      title: 'Pengembangan Web',
      description: 'Buat website keren dengan bantuan AI dan template.',
      level: 'Menengah',
      modules: [
        {
          id: 'html-css',
          title: 'HTML & CSS Dasar',
          type: 'video',
          duration: '30 menit',
          completed: false
        },
        {
          id: 'responsive',
          title: 'Desain Responsif',
          type: 'article',
          duration: '25 menit',
          completed: false
        },
        {
          id: 'frameworks',
          title: 'Framework Web Modern',
          type: 'quiz',
          duration: '20 menit',
          completed: false
        }
      ]
    },
    'ai-ml': {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Pelajari AI dan ML dengan tools visual dan template.',
      level: 'Lanjutan',
      modules: [
        {
          id: 'intro',
          title: 'Pengenalan AI & ML',
          type: 'video',
          duration: '25 menit',
          completed: false
        },
        {
          id: 'tools',
          title: 'Tools No-Code untuk AI',
          type: 'article',
          duration: '30 menit',
          completed: false
        },
        {
          id: 'project',
          title: 'Membuat Model AI Pertama',
          type: 'quiz',
          duration: '35 menit',
          completed: false
        }
      ]
    },
    'mobile-dev': {
      id: 'mobile-dev',
      title: 'Aplikasi Mobile',
      description: 'Buat aplikasi mobile tanpa coding menggunakan no-code tools.',
      level: 'Lanjutan',
      modules: [
        {
          id: 'intro',
          title: 'Pengenalan No-Code Mobile Development',
          type: 'video',
          duration: '20 menit',
          completed: false
        },
        {
          id: 'tools',
          title: 'Tools No-Code untuk Mobile Apps',
          type: 'article',
          duration: '25 menit',
          completed: false
        },
        {
          id: 'project',
          title: 'Membuat Mobile App Pertama',
          type: 'quiz',
          duration: '30 menit',
          completed: false
        }
      ]
    }
  };

  const course = courseContent[courseId];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Materi tidak ditemukan</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{course.title}</h1>
          <p className="text-lg text-foreground/70">{course.description}</p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-foreground/5 text-foreground/70">
            <span className="text-sm">{course.level}</span>
          </div>
        </div>

        <div className="grid gap-6">
          {course.modules.map(module => (
            <div
              key={module.id}
              className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                    {module.type === 'video' && (
                      <svg className="w-4 h-4 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {module.type === 'article' && (
                      <svg className="w-4 h-4 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}