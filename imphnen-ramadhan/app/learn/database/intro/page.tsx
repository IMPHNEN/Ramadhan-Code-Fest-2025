'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function DatabaseIntroPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'Pengenalan Database & Backend Tanpa Coding',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Video pengenalan cara mengelola database dan backend tanpa perlu menulis SQL atau kode.'
    },
    article: {
      title: 'Panduan Database & Backend No-Code',
      content: `
        <h2>Apa itu Database & Backend?</h2>
        <p>Database adalah tempat menyimpan data aplikasi, sedangkan backend adalah sistem yang mengatur data tersebut. Sekarang kamu bisa mengelola keduanya tanpa perlu menulis kode SQL atau backend rumit!</p>

        <h2>Tools Visual Database Populer</h2>
        <ul>
          <li><strong>Airtable:</strong> Spreadsheet pintar dengan kemampuan database</li>
          <li><strong>Notion Database:</strong> Database visual yang mudah digunakan</li>
          <li><strong>NocoDB:</strong> Alternatif open source untuk Airtable</li>
          <li><strong>Baserow:</strong> Database visual dengan antarmuka intuitif</li>
        </ul>

        <h2>Platform Backend No-Code</h2>
        <ul>
          <li><strong>Supabase:</strong> Backend instant dengan antarmuka visual</li>
          <li><strong>Firebase:</strong> Platform backend lengkap dari Google</li>
          <li><strong>Xano:</strong> Backend builder dengan antarmuka drag-and-drop</li>
          <li><strong>Bubble:</strong> Platform no-code dengan backend terintegrasi</li>
        </ul>

        <h2>Keuntungan Menggunakan Tools Visual</h2>
        <ul>
          <li>Tidak perlu belajar SQL atau bahasa backend</li>
          <li>Setup cepat, langsung bisa dipakai</li>
          <li>Interface visual yang mudah dipahami</li>
          <li>Terintegrasi dengan banyak layanan lain</li>
        </ul>

        <h2>Tips Memilih Tools Database & Backend</h2>
        <ol>
          <li>Sesuaikan dengan kebutuhan proyek</li>
          <li>Perhatikan limit free tier</li>
          <li>Cek kemudahan integrasi dengan tools lain</li>
          <li>Pastikan ada fitur backup dan export data</li>
          <li>Pertimbangkan skalabilitas ke depan</li>
        </ol>
      `
    },
    quiz: {
      title: 'Quiz Database & Backend No-Code',
      questions: [
        {
          id: 'q1',
          question: 'Tool mana yang cocok untuk membuat database visual?',
          options: [
            'Microsoft Word',
            'Airtable',
            'Notepad',
            'Calculator'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'Apa keuntungan utama menggunakan backend no-code?',
          options: [
            'Lebih lambat',
            'Lebih mahal',
            'Setup cepat tanpa coding',
            'Lebih rumit'
          ],
          correct: 2
        },
        {
          id: 'q3',
          question: 'Yang perlu diperhatikan saat memilih tools database adalah...',
          options: [
            'Warna logo',
            'Lokasi kantor',
            'Limit free tier',
            'Jumlah karyawan'
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Pengenalan Database & Backend Tanpa Coding</h1>
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
                    {getScore() === 100 ? 'Sempurna! Kamu sudah siap jadi database engineer tanpa ngoding!' :
                     getScore() >= 70 ? 'Bagus! Tinggal sedikit lagi jadi master database no-code!' :
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