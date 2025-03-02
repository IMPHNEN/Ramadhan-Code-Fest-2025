'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function HtmlCssPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'HTML & CSS Dasar',
      url: 'https://www.youtube.com/embed/qz0aGYrrlhU',
      description: 'Belajar HTML & CSS dasar dengan cara yang simpel dan praktis.'
    },
    article: {
      title: 'Memahami HTML & CSS',
      content: `
        <h2>Apa itu HTML & CSS?</h2>
        <p>HTML adalah kerangka website, sedangkan CSS adalah gayanya. Gampangnya, HTML itu seperti tulang manusia, CSS itu seperti baju dan makeupnya!</p>

        <h2>Konsep Dasar HTML</h2>
        <ul>
          <li><strong>Tag:</strong> Pembungkus konten, contoh: &lt;p&gt;, &lt;div&gt;, &lt;h1&gt;</li>
          <li><strong>Atribut:</strong> Informasi tambahan dalam tag, contoh: class, id, style</li>
          <li><strong>Element:</strong> Kombinasi tag pembuka, konten, dan tag penutup</li>
        </ul>

        <h2>Struktur HTML Dasar</h2>
        <pre><code>
        &lt;!DOCTYPE html&gt;
        &lt;html&gt;
          &lt;head&gt;
            &lt;title&gt;Website Keren&lt;/title&gt;
          &lt;/head&gt;
          &lt;body&gt;
            &lt;h1&gt;Halo Dunia!&lt;/h1&gt;
            &lt;p&gt;Ini website pertamaku&lt;/p&gt;
          &lt;/body&gt;
        &lt;/html&gt;
        </code></pre>

        <h2>Dasar-dasar CSS</h2>
        <ul>
          <li><strong>Selector:</strong> Memilih element yang mau di-style</li>
          <li><strong>Property:</strong> Apa yang mau diubah (warna, ukuran, dll)</li>
          <li><strong>Value:</strong> Nilai dari property yang diubah</li>
        </ul>

        <h2>Contoh CSS Sederhana</h2>
        <pre><code>
        /* Style untuk heading */
        h1 {
          color: blue;
          font-size: 24px;
        }

        /* Style untuk paragraf */
        p {
          color: gray;
          line-height: 1.6;
        }
        </code></pre>

        <h2>Tips Membuat Website Keren</h2>
        <ol>
          <li>Gunakan template yang sudah ada</li>
          <li>Manfaatkan framework CSS seperti Tailwind</li>
          <li>Copy paste style dari website yang kamu suka</li>
          <li>Pakai AI untuk generate kode CSS</li>
        </ol>
      `
    },
    quiz: {
      title: 'Quiz HTML & CSS Dasar',
      questions: [
        {
          id: 'q1',
          question: 'Apa fungsi utama HTML?',
          options: [
            'Membuat website jadi cantik',
            'Mengatur struktur dan konten website',
            'Membuat animasi website',
            'Mengatur database website'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'Manakah yang merupakan tag HTML yang valid?',
          options: [
            '(p)Hello(/p)',
            '<p>Hello</p>',
            '{p}Hello{/p}',
            '[p]Hello[/p]'
          ],
          correct: 1
        },
        {
          id: 'q3',
          question: 'Apa kegunaan CSS?',
          options: [
            'Menyimpan data website',
            'Membuat website interaktif',
            'Mengatur tampilan dan gaya website',
            'Menjalankan kode JavaScript'
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
          <h1 className="text-3xl font-bold text-foreground mb-4">HTML & CSS Dasar</h1>
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
                    {getScore() === 100 ? 'Sempurna! Kamu sudah menguasai HTML & CSS!' :
                     getScore() >= 70 ? 'Bagus! Tinggal sedikit lagi menguasai materi!' :
                     'Masih perlu belajar lagi, tapi santai aja!'}
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