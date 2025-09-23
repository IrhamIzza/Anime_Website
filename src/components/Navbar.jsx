import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-blue-400 text-lg font-bold">Portofolio</div>

        {/* Menu desktop */}
        <ul className="hidden sm:flex gap-6 text-white">
          <li>
            <Link to="/" className="hover:text-blue-400 duration-300 ease-out">
              Home
            </Link>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-400 duration-300 ease-out">
              About
            </a>
          </li>
          <li>
            <a href="#project" className="hover:text-blue-400 duration-300 ease-out">
              Services
            </a>
          </li>
          <li>
            <a href="#skill" className="hover:text-blue-400 duration-300 ease-out">
              Skill
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-400 duration-300 ease-out">
              Contact
            </a>
          </li>
        </ul>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)} className="block sm:hidden text-white focus:outline-none" aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <i className="ph ph-x text-2xl"></i>
          ) : (
            <i className="ph ph-list text-2xl"></i>
          )}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`transition-all duration-300 sm:hidden mt-3 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        <ul className="flex flex-col gap-2 text-white">
          <li>
            <Link
              to="/" className="block px-2 py-1 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#about" className="block px-2 py-1 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#project" className="block px-2 py-1 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}
            >
              Project
            </a>
          </li>
          <li>
            <a
              href="#skill" className="block px-2 py-1 hover:bg-blue-500 rounded" onClick={() => setIsOpen(false)}
            >
              Skill
            </a>
          </li>
          <li>
            <a href="#contact"className="block px-2 py-1 hover:bg-blue-500 rounded"onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
