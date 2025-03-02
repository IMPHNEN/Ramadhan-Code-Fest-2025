'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function IntroPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'Pengenalan Programming',
      url: 'https://www.youtube.com/embed/zOjov-2OZ0E',
      description: 'Video pengenalan dasar programming untuk pemula yang malas ngoding.'
    },
    article: {
      title: 'Konsep Dasar Programming',
      content: `
        <h2>Apa itu Programming?</h2>
        <p>Programming adalah cara memberi instruksi ke komputer untuk menyelesaikan tugas. Bayangkan seperti memberi resep masak ke koki - kamu cuma perlu kasih tau langkah-langkahnya, si koki yang kerja!</p>

        <h2>Kenapa Belajar Programming?</h2>
        <p>Di era digital, programming adalah superpower. Kamu bisa bikin aplikasi, automasi tugas membosankan, atau bahkan bikin AI yang ngoding buat kamu!</p>

        <h2>Konsep Penting untuk Programmer Malas</h2>
        <ul>
          <li><strong>Automasi:</strong> Biar komputer yang kerja keras, kamu tinggal santai</li>
          <li><strong>Code Reuse:</strong> Copas code yang udah ada, ngapain bikin dari awal?</li>
          <li><strong>AI & Tools:</strong> Manfaatin AI dan tools buat coding otomatis</li>
        </ul>

        <h2>Tips Jadi Programmer Efisien</h2>
        <ol>
          <li>Cari solusi yang udah ada sebelum mulai coding</li>
          <li>Pake framework dan library yang mempermudah kerja</li>
          <li>Manfaatin AI code generator</li>
          <li>Join komunitas buat dapet bantuan</li>
        </ol>
      `
    },
    quiz: {
      title: 'Quiz Pengenalan Programming',
      questions: [
        {
          id: 'q1',
          question: 'Apa cara paling efisien untuk menyelesaikan tugas programming?',
          options: [
            'Menulis semua kode dari awal',
            'Copy paste dari Stack Overflow',
            'Menggunakan AI dan tools otomatis',
            'Menyerah dan tidur'
          ],
          correct: 2
        },
        {
          id: 'q2',
          question: 'Kenapa programmer perlu belajar konsep dasar?',
          options: [
            'Untuk lulus ujian',
            'Agar bisa memahami error dan debug lebih cepat',
            'Karena diwajibkan',
            'Untuk pamer ke teman'
          ],
          correct: 1
        },
        {
          id: 'q3',
          question: 'Tool mana yang paling membantu programmer malas?',
          options: [
            'Notepad',
            'AI Code Generator',
            'Kalkulator',
            'Kalender'
          ],
          correct: 1
        }
      ]
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    content.quiz.questions.forEach(q => {
      if (parseInt(quizAnswers[q.id]) === q.correct) score++;
    });
    return (score / content.quiz.questions.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Pengenalan Programming</h1>
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
                    {getScore() === 100 ? 'Sempurna! Kamu sudah siap jadi programmer malas yang efisien!' :
                     getScore() >= 70 ? 'Bagus! Tinggal sedikit lagi jadi programmer malas profesional!' :
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