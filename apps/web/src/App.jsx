import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from '@/contexts/CartContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from '@/pages/HomePage.jsx';
import CollectionsPage from '@/pages/CollectionsPage.jsx';
import PrintQualityPage from '@/pages/PrintQualityPage.jsx';
//import PdfBookPage from '@/pages/PdfBookPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ShopPage from '@/pages/ShopPage.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/print-quality" element={<PrintQualityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          {/* Catch-all for 404 */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl mb-4">404</h1>
              <p className="text-muted-foreground mb-8">This space does not exist.</p>
              <a href="/" className="text-primary hover:underline">Return to the archive</a>
            </div>
          } />
        </Routes>
        <Footer />
        <Toaster theme="dark" />
      </Router>
    </CartProvider>
  );
}

export default App;