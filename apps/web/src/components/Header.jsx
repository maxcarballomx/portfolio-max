
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'PDF Book', path: '/pdf-book' },
    { name: 'Print Quality', path: '/print-quality' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo Branding */}
          <div className="flex items-center">
            <Link to="/" className="group flex-shrink-0" aria-label="Max Carballo Photography Home">
              <img 
                src="https://horizons-cdn.hostinger.com/d5ee2971-8c43-48c6-80ef-1e98bf612f97/0ba3fd9e4fc924df6dee2aad504e96cc.png" 
                alt="Max Carballo Logo" 
                className="h-10 md:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>
          </div>

          {/* Right: Nav Links, Cart, & Mobile Toggle */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'text-primary' : 'text-foreground'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Shopping Cart */}
            <Link to="/shop" className="relative group p-2" aria-label="View Shopping Cart">
              <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[0.6rem] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-white/5 lg:hidden py-8 px-6 shadow-2xl"
          >
            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg tracking-widest uppercase transition-colors duration-300 ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
