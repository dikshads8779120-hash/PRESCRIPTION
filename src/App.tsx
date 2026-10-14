import { useState, useEffect } from 'react';
import { Header, type PageId } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ExplainerPage } from '@/pages/ExplainerPage';
import { AboutPage } from '@/pages/AboutPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update document title
  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'PrescripExplain — Understand Your Prescription',
      explainer: 'Explainer — PrescripExplain',
      about: 'About — PrescripExplain',
      'how-it-works': 'How It Works — PrescripExplain',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'explainer' && <ExplainerPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'how-it-works' && <HowItWorksPage onNavigate={handleNavigate} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
