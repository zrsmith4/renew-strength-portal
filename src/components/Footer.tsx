
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
// import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              {/* Use uploaded logo image */}
              <img
                src="/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png"
                alt="Renew Strength and Wellness Logo"
                className="h-12 w-auto"
                style={{ maxHeight: '48px' }}
              />
            </Link>
            <div className="mt-2">
              <h3 className="font-serif text-lg text-brand-navy">RENEW</h3>
              <p className="text-sm text-gray-600">Strength and Wellness</p>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Bringing faith-based physical therapy care directly to you.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg text-brand-navy mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-green transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-green transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-brand-green transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-brand-green transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-green transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg text-brand-navy mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#cards" className="text-gray-600 hover:text-brand-green transition-colors">In-Person Assessment</Link>
              </li>
              <li>
                <Link to="/services#cards" className="text-gray-600 hover:text-brand-green transition-colors">Telehealth</Link>
              </li>
              <li>
                <Link to="/services#cards" className="text-gray-600 hover:text-brand-green transition-colors">Dry Needling</Link>
              </li>
              {/* "Mobile Concierge Care" link removed */}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg text-brand-navy mb-4">Contact</h3>
            <ul className="space-y-2">
              {/* Removed phone and email */}
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-green transition-colors">
                  Send Us a Message
                </Link>
              </li>
              <li className="mt-4">
                <p className="text-sm text-gray-500">
                  Available for home visits in<br />
                  Greater Chicagoland Metro area
                </p>
              </li>
              <li className="mt-4 flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand-green transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand-green transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-brand-green transition-colors"
                  aria-label="Linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Renew Strength and Wellness. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy#privacy" className="text-sm text-gray-500 hover:text-brand-green transition-colors">Privacy Policy</Link>
            <Link to="/privacy#terms" className="text-sm text-gray-500 hover:text-brand-green transition-colors">Terms of Service</Link>
            <Link to="/privacy#accessibility" className="text-sm text-gray-500 hover:text-brand-green transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
