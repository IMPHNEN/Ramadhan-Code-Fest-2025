'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function VariablesPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'Variabel dan Tipe Data',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Belajar tentang variabel dan tipe data dengan cara yang santai.'
    },
    article: {
      title: 'Memahami Variabel dan Tipe Data',
      content: `
        <h2>🎯 Apa itu Variabel? Penjelasan Simpel!</h2>
        <p>Variabel itu seperti kotak penyimpanan ajaib dalam programming. Gampangnya, variabel itu tempat nyimpen data yang bisa dipakai kapan aja. Misalnya:</p>
        <ul>
          <li>Mau nyimpen nama user? Pake variabel!</li>
          <li>Mau nyimpen skor game? Pake variabel!</li>
          <li>Mau nyimpen list belanjaan? Pake variabel juga!</li>
        </ul>

        <h2>Tipe Data: Jenis-Jenis Kotak Penyimpanan 📦</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">String 📝</h3>
            <p>Buat nyimpen text apapun:</p>
            <pre><code>let nama = "Budi";
let email = "budi@mail.com";
let pesan = "Halo Dunia!";</code></pre>
          </div>
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">Number 🔢</h3>
            <p>Buat angka (bulat atau desimal):</p>
            <pre><code>let umur = 20;
let tinggi = 170.5;
let skor = 1000;</code></pre>
          </div>
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">Boolean 🎯</h3>
            <p>Cuma ada true/false:</p>
            <pre><code>let sudahMakan = true;
let lagi_ngoding = false;
let isPro = true;</code></pre>
          </div>
          <div class="p-4 border border-foreground/10 rounded-lg">
            <h3 class="font-bold mb-2">Array 📋</h3>
            <p>Kumpulan data dalam satu tempat:</p>
            <pre><code>let hobi = ["Tidur", "Makan", "Ngoding"];
let nilai = [85, 90, 95];
let mix = ["Budi", 20, true];</code></pre>
          </div>
        </div>

        <h2>Object: Data yang Lebih Kompleks 🗃️</h2>
        <p>Object itu kayak kartu identitas yang isinya banyak info sekaligus:</p>
        <pre><code>let user = {
  nama: "Budi",
  umur: 20,
  hobi: ["Tidur", "Ngoding"],
  alamat: {
    kota: "Jakarta",
    kodePos: "12345"
  }
};</code></pre>

        <h2>Tips Pro buat Programmer Malas 🎯</h2>
        <div class="bg-foreground/5 p-4 rounded-lg mb-6">
          <ol class="list-decimal list-inside space-y-2">
            <li><strong>Nama yang Jelas:</strong> Kasih nama yang jelas biar gak bingung - <code>userAge</code> lebih baik dari <code>x</code></li>
            <li><strong>Konsisten:</strong> Kalo udah pake camelCase, pake terus - jangan campur-campur sama snake_case</li>
            <li><strong>Tipe yang Tepat:</strong> Jangan simpen angka di string atau sebaliknya - bikin ribet sendiri</li>
            <li><strong>Manfaatin Tools:</strong> Pake fitur auto-complete di IDE biar coding lebih cepet</li>
            <li><strong>Dokumentasi:</strong> Kasih komentar dikit buat kode yang kompleks - biar besok gak lupa</li>
          </ol>
        </div>

        <h2>Contoh Real-World 🌍</h2>
        <pre><code>// Data user di aplikasi social media
let socialMediaUser = {
  username: "budi_cool",
  followers: 1000,
  isVerified: true,
  posts: [
    {
      id: 1,
      content: "Lagi belajar coding nih!",
      likes: 150
    },
    {
      id: 2,
      content: "Coffee + Coding = ❤️",
      likes: 200
    }
  ]
};</code></pre>

        <div class="bg-foreground/5 p-4 rounded-lg mt-6">
          <h3 class="font-bold mb-2">🚀 Fun Fact:</h3>
          <p>Tau gak? Programmer profesional juga sering lupa tipe data yang mereka pake. Makanya mereka pake TypeScript atau tools lain yang bisa ngasih tau error sebelum kode dijalanin!</p>
        </div>
      `
    },
    quiz: {
      title: 'Quiz Variabel dan Tipe Data',
      questions: [
        {
          id: 'q1',
          question: 'Manakah yang merupakan tipe data dasar dalam programming?',
          options: [
            'PDF, DOC, TXT',
            'String, Number, Boolean',
            'WhatsApp, Email, SMS',
            'Windows, Mac, Linux'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'Apa kegunaan variabel dalam programming?',
          options: [
            'Untuk mewarnai kode',
            'Untuk menyimpan dan menggunakan data',
            'Untuk menghias website',
            'Untuk menghapus virus'
          ],
          correct: 1
        },
        {
          id: 'q3',
          question: 'Mana contoh penamaan variabel yang baik?',
          options: [
            'a, b, c, d',
            'x1, x2, x3, x4',
            'userAge, userName, userEmail',
            'asdf, qwer, zxcv'
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Variabel dan Tipe Data</h1>
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
                    {getScore() === 100 ? 'Sempurna! Kamu sudah menguasai variabel dan tipe data!' :
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