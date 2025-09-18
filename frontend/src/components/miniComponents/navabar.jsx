import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const searchRef = useRef(null);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Categories', to: '/categories' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'About Us', to: '/about' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  // ✅ close search if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white text-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-2xl font-bold tracking-wide text-blue-700 hover:text-black transition duration-300"
        >
          Maheshwari Machineries
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`relative hover:text-blue-700 transition duration-300 ${
                location.pathname === to ? 'text-blue-700 font-semibold' : 'text-gray-800'
              }`}
            >
              <span className="hover-underline-animation">{label}</span>
            </Link>
          ))}
        </div>

        {/* Search & Hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-gray-800 hover:text-blue-700"
          >
            <Search size={22} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-gray-800 focus:outline-none"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-white px-4 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen pb-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block hover:text-blue-700 transition ${
                location.pathname === to ? 'text-blue-700 font-semibold' : 'text-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Full-width search overlay (mobile-friendly) */}
      {searchOpen && (
        <div
          ref={searchRef}
          className="absolute inset-x-0 top-0 bg-white shadow-lg p-4 flex items-center z-50"
        >
          <form onSubmit={handleSearch} className="flex flex-1 items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 border rounded-l-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Go
            </button>
          </form>
          <button
            onClick={() => setSearchOpen(false)}
            className="ml-3 text-gray-600 hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Hover underline animation */}
      <style>
        {`
          .hover-underline-animation {
            position: relative;
            display: inline-block;
          }
          .hover-underline-animation::after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: #1D4ED8;
            transform-origin: bottom right;
            transition: transform 0.3s ease-out;
          }
          .hover-underline-animation:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar;
