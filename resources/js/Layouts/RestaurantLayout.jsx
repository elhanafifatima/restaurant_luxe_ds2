import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function RestaurantLayout({ children }) {
    const { props } = usePage();
    const user = props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#192A51] text-[#E5E5E5] font-serif selection:bg-[#D4AF37] selection:text-black">
            <nav className="bg-[#192A51]/90 border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-24">
                        <div className="flex items-center">
                            <Link href="/" className="group flex items-center gap-3">
                                <span className="text-3xl font-bold tracking-[0.2em] text-[#D4AF37] transition-all group-hover:tracking-[0.3em]">LUXE</span>
                                <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 hidden sm:block">Gastronomie</span>
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center space-x-12">
                            <NavLink href={route('home')} active={route().current('home')}>ACCUEIL</NavLink>
                            <NavLink href={route('menu.index')} active={route().current('menu.index')}>LE MENU</NavLink>
                            <NavLink href={route('reservation.create')} active={route().current('reservation.create')}>RÉSERVATIONS</NavLink>
                            <NavLink href={route('contact')} active={route().current('contact')}>CONTACT</NavLink>
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={user.role === 'admin' ? route('dashboard') : route('profile.edit')}
                                        className="text-[11px] font-bold tracking-widest text-[#D4AF37] hover:text-white transition-colors uppercase"
                                    >
                                        {user.role === 'admin' ? 'Administration' : 'Mon Profil'}
                                    </Link>
                                    <div className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-sm bg-[#D4AF37]/5">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('login')}
                                        className="text-[11px] font-bold tracking-widest text-[#D4AF37] hover:text-white transition-colors uppercase"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2 bg-[#D4AF37] text-black text-[11px] font-bold tracking-widest rounded-full hover:bg-[#C19B2E] transition-all transform hover:scale-105 uppercase"
                                    >
                                        Rejoindre
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="flex lg:hidden items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 text-gray-400 hover:text-white transition"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8h16M4 16h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${showingNavigationDropdown ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} absolute top-full left-0 w-full bg-[#16191E] border-b border-white/5 transition-all duration-500 ease-in-out lg:hidden`}>
                    <div className="px-6 py-8 space-y-6">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>ACCUEIL</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('menu.index')} active={route().current('menu.index')}>LE MENU</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('reservation.create')} active={route().current('reservation.create')}>RÉSERVATIONS</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('contact')} active={route().current('contact')}>CONTACT</ResponsiveNavLink>
                        <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                            {user ? (
                                <Link href={route('profile.edit')} className="text-center text-[#D4AF37] font-bold tracking-widest text-xs py-3 border border-[#D4AF37]/30 rounded-full">MON PROFIL</Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-center text-gray-400 font-bold tracking-widest text-xs py-3">CONNEXION</Link>
                                    <Link href={route('register')} className="text-center bg-[#D4AF37] text-black font-bold tracking-widest text-xs py-3 rounded-full">S'INSCRIRE</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="animate-fade-in">{children}</main>

            <footer className="bg-[#0f1a35] pt-24 pb-12 border-t border-[#D4AF37]/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/" className="inline-block mb-8">
                                <span className="text-3xl font-bold tracking-[0.2em] text-[#D4AF37]">LUXE</span>
                            </Link>
                            <p className="text-gray-400 font-sans leading-relaxed max-w-sm">
                                Une expérience gastronomique redéfinie. Découvrez le mariage parfait entre tradition et modernité dans un cadre d'exception.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white text-xs tracking-widest uppercase mb-8 font-bold">Navigation</h4>
                            <ul className="space-y-4 text-sm text-gray-400 font-sans">
                                <li><Link href={route('home')} className="hover:text-[#D4AF37] transition">Notre Concept</Link></li>
                                <li><Link href={route('menu.index')} className="hover:text-[#D4AF37] transition">Carte & Menus</Link></li>
                                <li><Link href={route('reservation.create')} className="hover:text-[#D4AF37] transition">Privatisation</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs tracking-widest uppercase mb-8 font-bold">Contact</h4>
                            <ul className="space-y-4 text-sm text-gray-400 font-sans">
                                <li>15 Rue de l'Excellence, Paris</li>
                                <li>+33 1 23 45 67 89</li>
                                <li>contact@restaurant-luxe.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-[10px] uppercase tracking-widest text-[#5D4037] font-bold font-sans">
                            &copy; {new Date().getFullYear()} Restaurant Luxe. Tous droits réservés.
                        </div>
                        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-500 font-sans">
                            <a href="#" className="hover:text-white transition">Mentions Légales</a>
                            <a href="#" className="hover:text-white transition">Confidentialité</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            {...props}
            className={`text-[11px] font-bold tracking-[0.2em] transition-all duration-300 relative group py-2
                ${active ? 'text-white' : 'text-gray-500 hover:text-white'}`}
        >
            {children}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
        </Link>
    );
}

function ResponsiveNavLink({ active = false, children, ...props }) {
    return (
        <Link
            {...props}
            className={`block text-lg font-serif transition-colors ${active ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
        >
            {children}
        </Link>
    );
}

