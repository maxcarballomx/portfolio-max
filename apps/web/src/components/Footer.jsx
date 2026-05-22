import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-background border-t border-white/10 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h3 className="text-2xl tracking-[0.2em] font-light mb-4">
              PHOTOGRAPHY & VISUAL EXPERIMENTS
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            A curated gallery of fine art prints. Each piece is a portal to the extraordinary.
            </p>
          </div>

          {/* Collections Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs tracking-[0.2em] text-primary uppercase mb-8">
              Collections
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/collections" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  I Photographic Abstractions 2015-2025
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  II Visual Experiments 2000 - 2025
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  III Urban Photography
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  IV Contemporary Architecture & Interiors
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  V Chromatic Constructs 2026
                </Link>
              </li>
              </ul>
          </div>

          {/* Information Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.2em] text-primary uppercase mb-8">
              Information
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/print-quality" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  Print Quality & Materials
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  About the Artist
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  Contact Studio
                </Link>
              </li>
              <li>
                <Link to="/pdf-book" className="text-sm text-foreground/80 hover:text-primary transition-colors tracking-wide">
                  Acquire PDF Book
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs tracking-widest text-muted-foreground">
          <p>© {new Date().getFullYear()} MAX CARBALLO</p>
          <p className="mt-4 md:mt-0">ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>;
};
export default Footer;