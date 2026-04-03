import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { Toast, useToast } from './components/ui/Toast';
import { AuthModal } from './components/modals/AuthModal';
import { FeatureModal } from './components/modals/FeatureModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection';
import { AIDemoSection } from './components/sections/AIDemoSection';
import { RoadmapSection } from './components/sections/RoadmapSection';
import { DevelopersSection } from './components/sections/DevelopersSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { FAQSection } from './components/sections/FAQSection';
import { DownloadAppSection } from './components/sections/DownloadAppSection';
import { Profile } from './pages/Profile';
import { PrivacyPolicy, TermsAndConditions, CookiePolicy } from './pages/LegalPage';
import MindBot from './components/MindBot';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const { toast, showToast, setToast } = useToast();

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: data.name || firebaseUser.displayName,
              mobile: data.mobile || '',
              bio: data.bio || '',
              photoURL: data.photoURL || firebaseUser.photoURL || '',
            });
          } else {
            setUser({
               uid: firebaseUser.uid,
               email: firebaseUser.email,
               name: firebaseUser.displayName || 'User',
               photoURL: firebaseUser.photoURL || ''
            });
          }
        } catch (e) {
          console.error("Error fetching user data:", e);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleAuth = (userData: any) => {
    showToast('Logging in...', 'loading');
    setTimeout(() => {
      setUser(userData);
      setIsAuthModalOpen(false);
      setIsOnboardingOpen(false);
      showToast(`Welcome back, ${userData.name}!`, 'success');
      setCurrentPage('dashboard');
    }, 1500);
  };

  const handleInteraction = (action: () => void) => {
    if (user) {
      action();
    } else {
      setIsOnboardingOpen(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    showToast('Logged out successfully', 'info');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-blue-500/30">
      <Navbar 
        onLoginClick={() => setIsAuthModalOpen(true)} 
        user={user} 
        onLogoutClick={handleLogout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <HeroSection 
              onDownloadClick={() => handleInteraction(() => showToast("Download started!", "success"))} 
              onExploreClick={() => handleInteraction(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }))}
            />
            <FeaturesSection onFeatureClick={(f: any) => setSelectedFeature(f)} />
            <HowItWorksSection />
            <AIDemoSection />
            <RoadmapSection />
            <WhyChooseUsSection />
            <DevelopersSection />
            <ReviewsSection />
            <FAQSection />
            <DownloadAppSection />
          </>
        )}
        {currentPage === 'dashboard' && <Profile user={user} setUser={setUser} onNavigate={setCurrentPage} onLogout={handleLogout} />}
        {currentPage === 'privacy' && <PrivacyPolicy onNavigate={setCurrentPage} />}
        {currentPage === 'terms' && <TermsAndConditions onNavigate={setCurrentPage} />}
        {currentPage === 'cookies' && <CookiePolicy onNavigate={setCurrentPage} />}
      </main>

      <Footer onNavigate={setCurrentPage} />
      
      <ScrollToTop />
      <MindBot onMascotClick={() => showToast("You found me! 🎉", "success")} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuth={handleAuth} 
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => handleAuth({ name: 'New User', email: 'user@example.com' })}
      />
      
      <FeatureModal 
        feature={selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
      />
      
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        progress={toast.progress} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
    </div>
  );
};

export default App;
