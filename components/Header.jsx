'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
} from 'react-icons/fa';
import destroySession from '@/lib/actions/destroySession';
import { toast } from 'sonner';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { setIsAuthenticated, isAuthenticated, setIsAdmin, isAdmin, loading } =
    useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      toast.success('You logged out successfully');
      router.push('/');
    } else {
      toast.error(error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutsideDesktop =
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target);

      const clickedOutsideMobile =
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target);

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setAdminOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <header className='bg-white border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md '>
        <nav className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <Link
              href='/'
              className='flex items-center transition transform active:scale-95'
            >
              <Image
                className='h-9 w-auto'
                src={logo}
                alt='BookApp'
                priority={true}
              />
              <span className='ml-2.5 font-black text-lg tracking-tight text-slate-900'>
                Book<span className='text-blue-600'>App</span>
              </span>
            </Link>
          </div>
        </nav>
      </header>
    );
  }
  return (
    <header className='bg-white border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md '>
      <nav className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left Side: Logo and Navigation */}
          <div className='flex items-center gap-8'>
            <Link
              href='/'
              className='flex items-center transition transform active:scale-95'
            >
              <Image
                className='h-9 w-auto'
                src={logo}
                alt='BookApp'
                priority={true}
              />
              <span className='ml-2.5 font-black text-lg tracking-tight text-slate-900'>
                Book<span className='text-blue-600'>App</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-1'>
              <Link
                href='/'
                className='rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-150'
              >
                Apartments
              </Link>
              {isAuthenticated && (
                <Link
                  href='/bookings'
                  className='rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-150'
                >
                  Bookings
                </Link>
              )}
            </div>
          </div>

          {/* Right Side Menu (Desktop) */}
          <div className='hidden md:flex items-center space-x-3'>
            {/* Admin Badged Link */}
            {isAuthenticated && isAdmin && (
              <div className='relative' ref={desktopMenuRef}>
                <button
                  onClick={() => setAdminOpen((prev) => !prev)}
                  className='inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-700 border border-amber-200/60 hover:bg-amber-100 transition cursor-pointer'
                >
                  <FaShieldAlt />
                  Admin
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      adminOpen ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {adminOpen && (
                  <div className='absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-50'>
                    <Link
                      href='/admin/apartments'
                      onClick={() => setAdminOpen(false)}
                      className='block px-4 py-3 hover:bg-slate-50'
                    >
                      Apartments
                    </Link>

                    <Link
                      href='/admin/bookings'
                      onClick={() => setAdminOpen(false)}
                      className='block px-4 py-3 hover:bg-slate-50'
                    >
                      Bookings
                    </Link>
                    <Link
                      href='/admin/apartments/add'
                      onClick={() => setAdminOpen(false)}
                      className='block px-4 py-3 hover:bg-slate-50'
                    >
                      Add Apartment
                    </Link>
                    <Link
                      href='/admin/bookings/add'
                      onClick={() => setAdminOpen(false)}
                      className='block px-4 py-3 hover:bg-slate-50'
                    >
                      Add Booking
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <Link
                href='/login'
                className='inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm hover:shadow transition duration-150 gap-2'
              >
                <FaSignInAlt className='text-xs' /> Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className='inline-flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition duration-150 gap-2 cursor-pointer'
              >
                <FaSignOutAlt className='text-xs' /> Sign Out
              </button>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className='flex md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='inline-flex items-center justify-center rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:outline-none transition'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <FaTimes className='block h-5 w-5' />
              ) : (
                <FaBars className='block h-5 w-5' />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Interactive Menu Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-100 bg-white ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        id='mobile-menu'
      >
        <div className='space-y-1 px-4 pb-4 pt-2'>
          <Link
            href='/'
            onClick={() => setIsOpen(false)}
            className='block rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition'
          >
            Apartments
          </Link>

          {isAuthenticated && (
            <Link
              href='/bookings'
              onClick={() => setIsOpen(false)}
              className='block rounded-xl px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition'
            >
              Bookings
            </Link>
          )}

          {isAuthenticated && isAdmin && (
            <div ref={mobileMenuRef} className='relative'>
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className='flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-base font-semibold text-amber-700 bg-amber-50'
              >
                <span className='flex items-center gap-2'>
                  <FaShieldAlt />
                  Admin
                </span>

                <svg
                  className={`h-4 w-4 transition-transform ${
                    adminOpen ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {adminOpen && (
                <div className='ml-4 mt-2 space-y-1'>
                  <Link
                    href='/admin/apartments'
                    onClick={() => {
                      setAdminOpen(false);
                      setIsOpen(false);
                    }}
                    className='block rounded-lg px-4 py-2 hover:bg-slate-50'
                  >
                    Apartments
                  </Link>

                  <Link
                    href='/admin/bookings'
                    onClick={() => {
                      setAdminOpen(false);
                      setIsOpen(false);
                    }}
                    className='block rounded-lg px-4 py-2 hover:bg-slate-50'
                  >
                    Bookings
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className='pt-3 mt-2 border-t border-slate-100'>
            {!isAuthenticated ? (
              <Link
                href='/login'
                onClick={() => setIsOpen(false)}
                className='w-full flex items-center justify-center rounded-xl bg-blue-600 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition gap-2'
              >
                <FaSignInAlt /> Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className='w-full flex items-center justify-center rounded-xl bg-rose-50 py-2.5 text-base font-semibold text-rose-600 hover:bg-rose-100 transition gap-2 cursor-pointer'
              >
                <FaSignOutAlt /> Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
