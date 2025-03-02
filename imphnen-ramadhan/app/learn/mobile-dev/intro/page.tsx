'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function MobileDevIntroPage() {
  const [activeTab, setActiveTab] = useState('video');
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const content = {
    video: {
      title: 'Pengenalan No-Code Mobile Development',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Video tutorial cara membuat aplikasi mobile tanpa coding menggunakan tools populer.'
    },
    article: {
      title: 'Panduan No-Code Mobile Development',
      content: `
        <h2>🚀 Revolusi No-Code Development</h2>
        <p>No-code development adalah cara modern untuk membuat aplikasi tanpa perlu menulis kode! Bayangkan seperti bermain LEGO - kamu tinggal menyusun blok-blok yang sudah jadi menjadi aplikasi impianmu. Dengan interface drag & drop yang intuitif, siapapun bisa jadi developer!</p>

        <h2>💡 Contoh Sukses Aplikasi No-Code</h2>
        <ul>
          <li><strong>Airbnb Clone:</strong> Dibuat dengan Bubble dalam waktu 2 minggu</li>
          <li><strong>Delivery App:</strong> Dibangun dengan Adalo, sudah diunduh 10,000+ kali</li>
          <li><strong>Event Management:</strong> Dibuat dengan Glide, menghemat biaya development 80%</li>
        </ul>

        <h2>🛠️ Perbandingan Platform No-Code Terbaik</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Keunggulan</th>
                <th>Harga Mulai</th>
                <th>Cocok Untuk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Adalo</strong></td>
                <td>Native mobile apps, UI keren</td>
                <td>Gratis</td>
                <td>Startup, UKM</td>
              </tr>
              <tr>
                <td><strong>Bubble</strong></td>
                <td>Fleksibel, marketplace plugin</td>
                <td>$25/bln</td>
                <td>Marketplace, SaaS</td>
              </tr>
              <tr>
                <td><strong>Glide</strong></td>
                <td>Cepat, integrasi spreadsheet</td>
                <td>Gratis</td>
                <td>Internal tools</td>
              </tr>
              <tr>
                <td><strong>AppSheet</strong></td>
                <td>Integrasi Google Workspace</td>
                <td>$5/user</td>
                <td>Enterprise</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>🌟 Keuntungan No-Code Development</h2>
        <ul>
          <li><strong>Super Cepat:</strong> Launch aplikasi dalam hitungan hari, bukan bulan</li>
          <li><strong>Hemat Biaya:</strong> Tidak perlu hire tim developer mahal</li>
          <li><strong>Mudah Diupdate:</strong> Ubah fitur tanpa tunggu developer</li>
          <li><strong>Fokus Bisnis:</strong> Konsentrasi ke value proposition, bukan coding</li>
          <li><strong>Minim Risiko:</strong> Test ide bisnis dengan investasi kecil</li>
        </ul>

        <h2>🎯 Panduan Sukses Membuat Mobile App No-Code</h2>
        <ol>
          <li><strong>Riset & Plan (1-2 hari)</strong>
            <ul>
              <li>Tentukan target pengguna</li>
              <li>List fitur prioritas</li>
              <li>Pilih platform sesuai budget</li>
            </ul>
          </li>
          <li><strong>Design & Prototype (2-3 hari)</strong>
            <ul>
              <li>Cari template yang mirip</li>
              <li>Customize UI/UX</li>
              <li>Test dengan calon user</li>
            </ul>
          </li>
          <li><strong>Build & Test (3-5 hari)</strong>
            <ul>
              <li>Susun komponen utama</li>
              <li>Integrasi database</li>
              <li>Test di berbagai device</li>
            </ul>
          </li>
          <li><strong>Launch & Iterate</strong>
            <ul>
              <li>Submit ke app store</li>
              <li>Collect user feedback</li>
              <li>Iterasi berdasar metrics</li>
            </ul>
          </li>
        </ol>

        <h2>⚠️ Tips Penting</h2>
        <ul>
          <li>Mulai dari fitur MVP (Minimum Viable Product)</li>
          <li>Manfaatkan template dan plugin yang ada</li>
          <li>Join komunitas no-code untuk bantuan</li>
          <li>Backup data secara regular</li>
          <li>Monitor performa dan user feedback</li>
        </ul>
      `
    },
    quiz: {
      title: 'Quiz No-Code Mobile Development',
      questions: [
        {
          id: 'q1',
          question: 'Apa keuntungan utama no-code development?',
          options: [
            'Lebih murah',
            'Development lebih cepat',
            'Lebih aman',
            'Performa lebih baik'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'Tool mana yang bisa membuat app dari spreadsheet?',
          options: [
            'Adalo',
            'Bubble',
            'Glide',
            'Flutter'
          ],
          correct: 2
        },
        {
          id: 'q3',
          question: 'Langkah pertama dalam membuat mobile app dengan no-code adalah...',
          options: [
            'Pilih platform',
            'Buat desain UI',
            'Tentukan fitur utama',
            'Test aplikasi'
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Pengenalan No-Code Mobile Development</h1>
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
                    {getScore() === 100 ? 'Sempurna! Kamu sudah siap jadi mobile developer tanpa ngoding!' :
                     getScore() >= 70 ? 'Bagus! Tinggal sedikit lagi jadi master no-code!' :
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