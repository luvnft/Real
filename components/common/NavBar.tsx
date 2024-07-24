'use client'
import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-800 to-black shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Logo
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-green-200 hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link href='/dashboard'>
            <Button
              
              className="text-green-200 hover:text-white border-green-200 hover:border-white hover:bg-green-700 transition-colors duration-200"
            >
              Dashboard
            </Button>
            </Link>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-green-200 hover:text-white hover:bg-green-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-green-900 text-white">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-green-200 hover:text-white hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    className="text-green-200 hover:text-white border-green-200 hover:border-white hover:bg-green-700 transition-colors duration-200"
                  >
                    Dashboard
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;