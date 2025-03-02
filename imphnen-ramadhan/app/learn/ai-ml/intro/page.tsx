'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AiMlIntroPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'Pengenalan AI & Machine Learning',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Video pengenalan dasar AI dan Machine Learning untuk pemula tanpa coding.'
    },
    article: {
      title: 'Panduan AI & ML Tanpa Coding',
      content: `
        <h2>Apa itu AI & Machine Learning?</h2>
        <p>AI (Artificial Intelligence) dan Machine Learning adalah teknologi yang membuat komputer bisa "belajar" dan membuat keputusan sendiri. Tenang, kamu nggak perlu jago matematika atau coding untuk mulai pakai AI!</p>

        <h2>Tools AI No-Code Populer</h2>
        <ul>
          <li><strong>RunwayML:</strong> Bikin video dan gambar AI dengan mudah</li>
          <li><strong>Obviously AI:</strong> Analisis data dan prediksi tanpa coding</li>
          <li><strong>Teachable Machine:</strong> Latih model AI dengan klik-klik doang</li>
          <li><strong>Lobe:</strong> Bikin model AI dengan interface visual</li>
        </ul>

        <h2>Keuntungan Pakai AI No-Code</h2>
        <ul>
          <li>Nggak perlu belajar coding yang ribet</li>
          <li>Hasil instan, langsung bisa dipake</li>
          <li>Lebih murah daripada hire data scientist</li>
          <li>Bisa fokus ke solusi, bukan teknis</li>
        </ul>

        <h2>Tips Mulai Pakai AI No-Code</h2>
        <ol>
          <li>Tentukan masalah yang mau diselesaikan</li>
          <li>Pilih tool yang sesuai kebutuhan</li>
          <li>Siapkan data yang berkualitas</li>
          <li>Uji coba dan iterasi sampai hasil bagus</li>
          <li>Deploy dan monitor hasilnya</li>
        </ol>
      `
    },
    quiz: {
      title: 'Quiz AI & Machine Learning',
      questions: [
        {
          id: 'q1',
          question: 'Tool mana yang cocok untuk membuat model AI visual?',
          options: [
            'Microsoft Word',
            'Teachable Machine',
            'Notepad',
            'Calculator'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'Apa keuntungan utama menggunakan AI no-code?',
          options: [
            'Lebih lambat',
            'Lebih mahal',
            'Tidak perlu coding',
            'Lebih rumit'
          ],
          correct: 2
        },
        {
          id: 'q3',
          question: 'Langkah pertama sebelum menggunakan AI adalah...',
          options: [
            'Belajar coding',
            'Beli komputer mahal',
            'Tentukan masalah',
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Pengenalan AI & Machine Learning</h1>
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
                    {getScore() === 100 ? 'Sempurna! Kamu sudah siap jadi AI Engineer tanpa ngoding!' :
                     getScore() >= 70 ? 'Bagus! Tinggal sedikit lagi jadi master AI no-code!' :
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