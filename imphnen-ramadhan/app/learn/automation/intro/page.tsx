'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AutomationIntroPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'Pengenalan Otomasi & Scripting',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Video pengenalan cara membuat otomasi tanpa perlu menulis kode.'
    },
    article: {
      title: 'Panduan Otomasi No-Code',
      content: `
        <h2>Apa itu Otomasi & Scripting?</h2>
        <p>Otomasi adalah cara membuat komputer mengerjakan tugas berulang secara otomatis. Dengan tools modern, kamu bisa buat otomasi tanpa perlu jago coding!</p>

        <h2>Tools Otomasi Populer</h2>
        <ul>
          <li><strong>Zapier:</strong> Hubungkan dan otomatiskan berbagai aplikasi</li>
          <li><strong>Make (Integromat):</strong> Visual workflow builder yang powerful</li>
          <li><strong>IFTTT:</strong> Otomasi simpel untuk personal use</li>
          <li><strong>Power Automate:</strong> Otomasi untuk ekosistem Microsoft</li>
        </ul>

        <h2>Keuntungan Pakai No-Code Automation</h2>
        <ul>
          <li>Hemat waktu dan tenaga</li>
          <li>Tidak perlu belajar bahasa pemrograman</li>
          <li>Banyak template siap pakai</li>
          <li>Mudah diubah dan dimaintain</li>
        </ul>

        <h2>Tips Membuat Otomasi</h2>
        <ol>
          <li>Identifikasi proses yang berulang</li>
          <li>Pilih tools yang sesuai kebutuhan</li>
          <li>Mulai dari workflow sederhana</li>
          <li>Test sebelum dipakai production</li>
          <li>Monitor dan optimalkan performa</li>
        </ol>
      `
    },
    quiz: {
      title: 'Quiz Otomasi & Scripting',
      questions: [
        {
          id: 'q1',
          question: 'Tool mana yang cocok untuk menghubungkan berbagai aplikasi?',
          options: [
            'Microsoft Word',
            'Zapier',
            'Notepad',
            'Calculator'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'Apa keuntungan utama menggunakan no-code automation?',
          options: [
            'Lebih lambat',
            'Lebih mahal',
            'Hemat waktu',
            'Lebih rumit'
          ],
          correct: 2
        },
        {
          id: 'q3',
          question: 'Langkah pertama sebelum membuat otomasi adalah...',
          options: [
            'Belajar coding',
            'Beli komputer mahal',
            'Identifikasi proses berulang',
            'Hire programmer'
          ],
          correct: 2
        }
      ]
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    content.quiz.questions.forEach((q) => {
      if (parseInt(quizAnswers[q.id]) === q.correct) score++;
    });
    return (score / content.quiz.questions.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Pengenalan Otomasi & Scripting</h1>
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'video' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
            >
              Video
            </button>
            <button
              onClick={() => setActiveTab('article')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'article' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
            >
              Artikel
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'quiz' ? 'bg-foreground text-background' : 'border border-foreground/10 hover:bg-foreground/5'}`}
            >
              Quiz
            </button>
          </div>

          {activeTab === 'video' && (
            <div className="rounded-xl overflow-hidden bg-foreground/5 p-6">
              <div className="aspect-video mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={content.video.url}
                  title={content.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-foreground/70">{content.video.description}</p>
            </div>
          )}

          {activeTab === 'article' && (
            <div className="prose prose-invert max-w-none rounded-xl bg-foreground/5 p-6">
              <div dangerouslySetInnerHTML={{ __html: content.article.content }} />
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="rounded-xl bg-foreground/5 p-6">
              <h2 className="text-2xl font-bold mb-6">{content.quiz.title}</h2>
              {content.quiz.questions.map((q, index) => (
                <div key={q.id} className="mb-6">
                  <p className="text-lg font-medium mb-3">{index + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center space-x-3 p-3 rounded-lg border border-foreground/10 hover:border-foreground/20 cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          value={optionIndex}
                          onChange={(e) => setQuizAnswers({...quizAnswers, [q.id]: e.target.value})}
                          disabled={quizSubmitted}
                          className="form-radio"
                        />
                        <span>{option}</span>
                        {quizSubmitted && optionIndex === q.correct && (
                          <span className="text-green-500 ml-auto">✓ Benar</span>
                        )}
                        {quizSubmitted && parseInt(quizAnswers[q.id]) === optionIndex && optionIndex !== q.correct && (
                          <span className="text-red-500 ml-auto">✗ Salah</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="w-full bg-foreground text-background py-3 rounded-lg hover:bg-foreground/90 transition-colors"
                  disabled={Object.keys(quizAnswers).length !== content.quiz.questions.length}
                >
                  Submit Quiz
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-bold mb-2">Nilai Kamu: {getScore()}%</p>
                  <p className="text-foreground/70">
                    {getScore() === 100 ? 'Sempurna! Kamu sudah siap jadi automation expert!' :
                     getScore() >= 70 ? 'Bagus! Tinggal sedikit lagi jadi master otomasi!' :
                     'Masih perlu belajar lagi nih, tapi santai aja!'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}