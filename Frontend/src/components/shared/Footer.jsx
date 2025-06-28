import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center text-center md:text-left">
          {/* Logo & Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#6A38C2]">Job<span className="text-[#F83002]">Hunt</span></h2>
            <p className="text-sm text-gray-500 mt-2">© 2024 Job Hunt. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 hidden lg:block">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Quick Links</h4>
            <ul className="text-gray-500 space-y-1">
              <li><a href="/" className="hover:text-[#6A38C2] transition">Home</a></li>
              <li><a href="/jobs" className="hover:text-[#6A38C2] transition">Jobs</a></li>
              <li><a href="/browse" className="hover:text-[#6A38C2] transition">Browse</a></li>
              <li><a href="/contact" className="hover:text-[#6A38C2] transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-5">
            <a href="https://facebook.com" className="text-gray-600 hover:text-[#1877F2]" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.326 0 2.464.098 2.794.142v3.24h-1.917c-1.504 0-1.796.715-1.796 1.764v2.31h3.588l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" className="text-gray-600 hover:text-[#1DA1F2]" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.56c-.89.39-1.84.65-2.84.77a4.958 4.958 0 002.17-2.73 9.94 9.94 0 01-3.13 1.2 4.92 4.92 0 00-8.38 4.49A13.96 13.96 0 011.64 3.15a4.92 4.92 0 001.52 6.56 4.91 4.91 0 01-2.23-.62v.06a4.93 4.93 0 003.95 4.83 4.94 4.94 0 01-2.22.08 4.93 4.93 0 004.6 3.42 9.9 9.9 0 01-6.1 2.1c-.39 0-.77-.02-1.15-.07a13.94 13.94 0 007.56 2.22c9.05 0 14-7.5 14-14v-.64A10.1 10.1 0 0024 4.56z" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-[#0077B5]" aria-label="LinkedIn">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t pt-4 text-center text-sm text-gray-400">
          Made with ❤️ by Manoj
        </div>
      </div>
    </footer>
  );
};

export default Footer;
