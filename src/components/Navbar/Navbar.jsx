import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800  text-white py-4 shadow-md ">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-2xl font-semibold tracking-tight ml-2">XP Marketplace</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex">
            <li className="ml-4"><a href="#" className="block font-semibold text-lg tracking-tight hover:text-gray-200">Features</a></li>
            <li className="ml-4"><a href="#" className="block font-semibold text-lg tracking-tight hover:text-gray-200">Pricing</a></li>
            <li className="ml-4"><a href="#" className="block font-semibold text-lg tracking-tight hover:text-gray-200">Resources</a></li>
            <li className="ml-4"><a href="#" className="block font-semibold text-lg tracking-tight hover:text-gray-200">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;