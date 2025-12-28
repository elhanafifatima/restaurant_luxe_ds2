import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function RestaurantLayout({ children, user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-amber-500 selection:text-white">
            <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-serif text-amber-500 font-bold tracking-wider">
                                    LUXE
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    Home
                                </NavLink>
                                <NavLink href={route('menu.index')} active={route().current('menu.index')}>
                                    Menu
                                </NavLink>
                                <NavLink href={route('reservation.create')} active={route().current('reservation.create')}>
                                    Reservations
                                </NavLink>
                                <NavLink href={route('contact')} active={route().current('contact')}>
                                    Contact
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-sm text-gray-400 hover:text-white transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="text-sm text-gray-400 hover:text-white transition"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('menu.index')} active={route().current('menu.index')}>
                            Menu
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('reservation.create')} active={route().current('reservation.create')}>
                            Reservations
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('contact')} active={route().current('contact')}>
                            Contact
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h3 className="text-xl font-serif text-amber-500 mb-2">RESTAURANT LUXE</h3>
                        <p className="text-sm">Excellence in every dish.</p>
                    </div>
                    <div className="text-sm">
                        &copy; {new Date().getFullYear()} Restaurant Luxe. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-amber-500 text-amber-500 focus:border-amber-600'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300 focus:text-gray-300 focus:border-gray-700') +
                className
            }
        >
            {children}
        </Link>
    );
}

function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-amber-500 text-amber-500 bg-gray-800 focus:text-amber-600 focus:bg-gray-900 focus:border-amber-600'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:border-gray-300 focus:text-gray-200 focus:bg-gray-800 focus:border-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
