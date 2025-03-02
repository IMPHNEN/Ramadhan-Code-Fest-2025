import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Belajar Pemrograman
            <span className="block text-foreground/80">Tanpa Ribet Ngoding</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Platform belajar programming untuk yang malas ngoding. Belajar konsep tanpa menulis kode,
            gunakan AI dan tools untuk coding otomatis.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/learn" className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors">
              Mulai Belajar
            </a>
            <a href="/instant-code" className="border border-foreground/10 px-6 py-3 rounded-lg hover:bg-foreground/5 transition-colors">
              Coba Generator Kode
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Feature Card 1 */}
          <div className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Belajar Tanpa Ngoding</h3>
            <p className="text-foreground/70">Pahami konsep programming melalui artikel interaktif dan video tutorial.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Kode Instan</h3>
            <p className="text-foreground/70">Generator kode otomatis dan template siap pakai untuk projectmu.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Forum Diskusi</h3>
            <p className="text-foreground/70">Tanya jawab dan diskusi santai dengan sesama programmer malas.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
