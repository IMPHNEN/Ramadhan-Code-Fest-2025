'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface SimulationExample {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  hints: string[];
}

export default function SimulationPage() {
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  const examples: SimulationExample[] = [
    {
      id: 'fetch-data',
      title: 'Ambil Data API',
      description: 'Simulasi cara mengambil data dari API tanpa ribet.',
      initialCode: `// Cara ribet:
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
`,
      solution: `// Cara simpel pake async/await:
const getData = async () => {
  const data = await fetch('https://api.example.com/data').then(r => r.json());
  console.log(data);
};
`,
      hints: [
        'Gunakan async/await untuk kode yang lebih rapi',
        'Simpan fungsi fetch dalam variabel',
        'Jangan lupa error handling'
      ]
    },
    {
      id: 'array-manipulation',
      title: 'Manipulasi Array',
      description: 'Cara gampang ngolah data array tanpa pusing.',
      initialCode: `// Cara ribet:
const numbers = [1, 2, 3, 4, 5];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
`,
      solution: `// Cara simpel pake array method:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
`,
      hints: [
        'Gunakan array method map()',
        'Arrow function bikin kode lebih pendek',
        'Hindari loop manual kalo bisa'
      ]
    },
    {
      id: 'state-management',
      title: 'State Management',
      description: 'Kelola state React dengan cara paling simpel.',
      initialCode: `// Cara ribet:
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
}
`,
      solution: `// Cara simpel pake hooks:
const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
`,
      hints: [
        'Pake React Hooks untuk state management',
        'useState hook lebih simpel dari class component',
        'Arrow function component lebih ringkas'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Simulasi Coding
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Belajar coding dengan contoh simpel dan solusi instan. Khusus buat programmer yang males mikir ribet!
          </p>
        </div>

        <div className="grid gap-6">
          {examples.map((example) => (
            <div
              key={example.id}
              className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                  <p className="text-foreground/70">{example.description}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveExample(activeExample === example.id ? null : example.id);
                    setShowSolution(false);
                    setCurrentHint(0);
                  }}
                  className="px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  {activeExample === example.id ? 'Tutup' : 'Coba'}
                </button>
              </div>

              {activeExample === example.id && (
                <div className="mt-4 space-y-4">
                  <div className="bg-black/50 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{example.initialCode}</code>
                    </pre>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-4 py-2 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors"
                    >
                      {showSolution ? 'Sembunyikan Solusi' : 'Lihat Solusi'}
                    </button>
                    <button
                      onClick={() => setCurrentHint((currentHint + 1) % example.hints.length)}
                      className="px-4 py-2 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors"
                    >
                      Hint Berikutnya
                    </button>
                  </div>

                  {showSolution && (
                    <div className="bg-black/50 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
                        <code>{example.solution}</code>
                      </pre>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                    <p className="text-foreground/70">
                      <span className="font-semibold">Hint {currentHint + 1}:</span>{' '}
                      {example.hints[currentHint]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}