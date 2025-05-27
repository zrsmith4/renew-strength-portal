
import React from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/services/in-person" className="text-gray-600 hover:text-brand-green transition-colors">In-Person Assessment</Link>
              </li>
              <li>
                <Link to="/services/telehealth" className="text-gray-600 hover:text-brand-green transition-colors">Telehealth</Link>
              </li>
              <li>
                <Link to="/services/dry-needling" className="text-gray-600 hover:text-brand-green transition-colors">Dry Needling</Link>
              </li>
              <li>
                <Link to="/services/mobile" className="text-gray-600 hover:text-brand-green transition-colors">Mobile Concierge Care</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg text-brand-navy mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8854 8.64932 10.6883 9.16531 10.2409 9.38787L7.61878 10.7237C8.78517 13.6803 11.1197 16.0148 14.0763 17.1812L15.4121 14.5591C15.6347 14.1117 16.1507 13.9146 16.6228 14.0743L21.1162 15.5721C21.5246 15.7082 21.8 16.0903 21.8 16.5208V20C21.8 21.1046 20.9046 22 19.8 22H18C9.71573 22 3 15.2843 3 7V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.7369 13.7895C11.5061 14.3502 12.4939 14.3502 13.2631 13.7895L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>hello@renewpt.com</span>
              </li>
              <li className="mt-4">
                <p className="text-sm text-gray-500">
                  Available for home visits in<br />
                  Greater Metro Area
                </p>
              </li>
              <li className="mt-4 flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-green transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-green transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-green transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.94 5.00002C6.94 5.97002 6.15 6.76002 5.18 6.76002C4.21 6.76002 3.42 5.97002 3.42 5.00002C3.42 4.03002 4.21 3.24002 5.18 3.24002C6.15 3.24002 6.94 4.03002 6.94 5.00002Z" />
                    <path d="M7 8.75H3.5V21H7V8.75Z" />
                    <path d="M14.08 8.75C12.92 8.75 11.93 9.34 11.33 10.26V8.75H7.83V21H11.33V14.66C11.33 13.49 12.28 12.55 13.45 12.55C14.61 12.55 15.56 13.49 15.56 14.66V21H19.06V14.05C19.06 11.12 16.83 8.75 14.08 8.75Z" />
                  </svg>
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
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-brand-green transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-brand-green transition-colors">Terms of Service</Link>
            <Link to="/accessibility" className="text-sm text-gray-500 hover:text-brand-green transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
