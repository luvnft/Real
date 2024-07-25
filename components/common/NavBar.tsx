'use client';
import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' }
  ];

  return (
    <nav className="bg-gradient-to-r from-green-800 to-black shadow-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Logo
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden items-center space-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-green-200 transition-colors duration-200 hover:bg-green-700 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard">
              <Button className="border-green-200 text-green-200 transition-colors duration-200 hover:border-white hover:bg-green-700 hover:text-white">
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-200 hover:bg-green-700 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-green-900 text-white">
                <nav className="mt-4 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-green-200 transition-colors duration-200 hover:bg-green-700 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-200 transition-colors duration-200 hover:border-white hover:bg-green-700 hover:text-white"
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
