import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-lg font-bold">Anime Website</div>

      {/* Menu desktop */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <a href="#" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>

      {/* Hamburger button (mobile) */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <i className="ph ph-x text-2xl"></i>
        ) : (
          <i className="ph ph-list text-2xl"></i>
        )}
      </button>

      {/* Mobile menu */}
      <div
        className={`absolute top-14 left-0 w-full bg-blue-700 flex flex-col items-center gap-4 py-6 md:hidden shadow-lg transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <Link
          to="/"
          className="hover:underline"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <a
          href="#"
          className="hover:underline"
          onClick={() => setIsOpen(false)}
        >
          About
        </a>
        <a
          href="#"
          className="hover:underline"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
