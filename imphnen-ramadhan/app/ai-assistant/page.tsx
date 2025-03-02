'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  codeLanguage?: string;
  isTyping?: boolean;
}

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '👋 Hai! Saya AI Assistant yang siap bantu kamu ngoding tanpa ribet. Mau tanya apa nih?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const simulateTyping = async (message: Message) => {
    setIsAiTyping(true);
    const words = message.content.split(' ');
    let currentContent = '';
    
    for (const word of words) {
      currentContent += word + ' ';
      setMessages(prev => prev.map(msg =>
        msg.id === message.id ? { ...msg, content: currentContent.trim() } : msg
      ));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setIsAiTyping(false);
  };

  const generateAiResponse = (userInput: string): Message => {
    const responses = [
      '🤔 Hmm, menarik sekali! ',
      '💡 Oke, saya mengerti. ',
      '✨ Wah, pertanyaan bagus! ',
      '🚀 Siap, saya bantu! '
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    let aiContent = randomResponse;
    let code = undefined;
    let codeLanguage = undefined;

    if (userInput.toLowerCase().includes('code') || userInput.toLowerCase().includes('kode')) {
      aiContent += 'Ini contoh kode yang mungkin bisa membantu:';
      code = `// Example code
function greet(name: string) {
  console.log("Hello, " + name + "! 👋");
  return "Welcome to coding!";
}`;
      codeLanguage = 'typescript';
    } else {
      aiContent += 'Saya siap membantu kamu dengan pertanyaan programming apapun. Bisa lebih spesifik lagi?';
    }

    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiContent,
      code,
      codeLanguage
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAiTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const aiResponse = generateAiResponse(input);
    setMessages(prev => [...prev, { ...aiResponse, content: '' }]);
    await simulateTyping(aiResponse);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Assistant
          </h1>
          <p className="text-lg text-foreground/70">
            Chat dengan AI yang ngerti banget soal programming. Tanya apa aja, dijamin dapat jawaban tanpa ribet!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-foreground/5 rounded-xl border border-foreground/10 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${message.role === 'user' ? 'bg-foreground text-background' : 'bg-foreground/10'}`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.code && (
                    <div className="mt-2 overflow-hidden rounded-lg">
                      <SyntaxHighlighter
                        language={message.codeLanguage || 'javascript'}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          background: 'rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        {message.code}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAiTyping && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 rounded-xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-foreground/10">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya tentang coding, minta contoh kode, atau minta bantuan debug..."
                className="flex-1 bg-black text-white border border-foreground/10 rounded-lg px-4 py-3 focus:border-foreground/20 focus:ring-0 placeholder-gray-400"
                disabled={isAiTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isAiTyping}
                className="bg-foreground text-background px-6 py-3 rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Kirim
              </button>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Generate Kode</h3>
            <p className="text-foreground/70">Minta AI bikin kode sesuai kebutuhan kamu, langsung jadi!</p>
          </div>

          <div className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Debug Kode</h3>
            <p className="text-foreground/70">Ada error? Tanya AI, dia bakal bantu cari solusinya!</p>
          </div>

          <div className="p-6 rounded-xl border border-foreground/10 hover:border-foreground/20 transition-colors">
            <div className="w-12 h-12 bg-foreground/5 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Belajar Coding</h3>
            <p className="text-foreground/70">Mau belajar konsep baru? AI jelasin dengan bahasa simpel!</p>
          </div>
        </div>
      </main>
    </div>
  );
}