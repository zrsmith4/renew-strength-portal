
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {/* Use uploaded logo image - make larger, no text */}
            <img
              src="/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png"
              alt="Renew Strength and Wellness Physical Therapy Logo - Mobile PT Services Chicago"
              className="h-16 w-auto"
              style={{ maxHeight: '64px' }}
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-brand-navy hover:text-brand-green transition-colors font-medium">
              About
            </Link>
            <Link to="/services" className="text-brand-navy hover:text-brand-green transition-colors font-medium">
              Services
            </Link>
            <Link to="/locations" className="text-brand-navy hover:text-brand-green transition-colors font-medium">
              Areas
            </Link>
            <Link to="/pricing" className="text-brand-navy hover:text-brand-green transition-colors font-medium">
              Pricing
            </Link>
            {/* Blog link temporarily hidden */}
            {/*
            <Link to="/blog" className="text-brand-navy hover:text-brand-green transition-colors font-medium">
              Blog
            </Link>
            */}
            <Link to="/contact" className="text-brand-navy hover:text-brand-green transition-colors font-medium">
              Contact
            </Link>
            {/* MVP: Re-enable for future auth features */}
            {/*
            <Link to="/login" className="text-brand-navy font-medium hover:text-brand-green transition-colors">
              Log In
            </Link>
            */}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* MVP: Re-enable for future auth features */}
            {/*
            <Link to="/login" className="text-brand-navy font-medium hover:text-brand-green transition-colors">
              Log In
            </Link>
            */}
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Book an Appointment</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="h-6 w-6 text-brand-navy" />
            ) : (
              <Menu className="h-6 w-6 text-brand-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link
              to="/about"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/locations/chicago-suburbs"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Locations
            </Link>
            <Link
              to="/pricing"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {/* Blog link temporarily hidden */}
            {/*
            <Link
              to="/blog"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            */}
            <Link
              to="/contact"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {/* MVP: Re-enable for future auth features */}
            {/*
            <Link
              to="/login"
              className="text-brand-navy hover:text-brand-green transition-colors font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Link>
            */}
            <Link to="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2" onClick={() => setIsMenuOpen(false)}>
                Book an Appointment
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
