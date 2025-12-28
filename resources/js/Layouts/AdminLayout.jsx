import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { name: 'Tableau de bord', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', route: 'dashboard', active: route().current('dashboard'), adminOnly: true },

        // Admin Only
        { name: 'Gestion du Menu', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', route: 'admin.menu.index', active: route().current('admin.menu.*'), adminOnly: true },
        { name: 'Toutes les Réservations', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', route: 'admin.reservations.index', active: route().current('admin.reservations.*'), adminOnly: true },

        // Client Only
        { name: 'Mes Réservations', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', route: 'reservations.mine', active: route().current('reservations.mine'), clientOnly: true },

        { name: 'Profil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', route: 'profile.edit', active: route().current('profile.edit') },
    ];

    const filteredNavItems = navItems.filter(item => {
        if (item.adminOnly && user.role !== 'admin') return false;
        if (item.clientOnly && user.role === 'admin') return false;
        return true;
    });

    return (
        <div className="flex min-h-screen bg-[#192A51] text-gray-200">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#1e315f] border-r border-white/5 flex flex-col`}>
                <div className="h-20 flex items-center justify-center border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2">
                        <span className={`font-bold tracking-widest text-[#D4AF37] ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`}>LUXE</span>
                        {isSidebarOpen && <span className="text-[10px] uppercase tracking-tighter text-gray-400 mt-1">{user.role === 'admin' ? 'Admin' : 'Espace Client'}</span>}
                    </Link>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.route ? (route().has(item.route) ? route(item.route) : '#') : '#'}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${item.active
                                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                                : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                }`}
                        >
                            <svg className={`w-5 h-5 ${item.active ? 'text-black' : 'text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {isSidebarOpen && <span className="font-medium text-sm">Déconnexion</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-[#1e315f]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                                {user.role === 'admin' ? 'Administrateur' : user.role === 'personnel' ? 'Personnel' : 'Client Privilégié'}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold border border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/10">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
