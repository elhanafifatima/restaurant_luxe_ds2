import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'admin';

    return (
        <AdminLayout>
            <Head title="Tableau de Bord - LUXE" />

            <div className="mb-10">
                <h2 className="text-3xl font-light text-white mb-2 font-serif uppercase tracking-widest">
                    Aperçu de l'activité
                </h2>
                <p className="text-gray-400 font-sans italic">
                    Bienvenue dans votre centre de gestion, LUXE Gastronomie.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                <StatCard
                    title={isAdmin ? "Total Réservations" : "Mes Réservations"}
                    value={stats.reservationCount}
                    icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    color="from-[#D4AF37] to-[#C19B2E]"
                />
                <StatCard
                    title="Plats au Menu"
                    value={stats.menuCount}
                    icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    color="from-[#1e315f] to-[#142344]"
                />
                {isAdmin && (
                    <StatCard
                        title="Clients Inscrits"
                        value={stats.userCount}
                        icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        color="from-[#5D4037] to-[#3E2723]"
                    />
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <h3 className="text-xl font-serif text-[#D4AF37] mb-6 uppercase tracking-widest">
                        {isAdmin ? "Actions Administrateur" : "Mes Services"}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {isAdmin ? (
                            <>
                                <ActionButton icon="M12 4v16m8-8H4" label="Ajouter au Menu" href={route('admin.menu.create')} />
                                <ActionButton icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" label="Gérer les Réservations" href={route('admin.reservations.index')} />
                            </>
                        ) : (
                            <>
                                <ActionButton icon="M12 4v16m8-8H4" label="Nouvelle Réservation" href={route('reservation.create')} />
                                <ActionButton icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" label="Mon Profil" href={route('profile.edit')} />
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <h3 className="text-xl font-serif text-[#D4AF37] mb-6 uppercase tracking-widest">
                        Dernières Réservations
                    </h3>
                    <div className="space-y-4">
                        {stats.recentReservations.length > 0 ? (
                            stats.recentReservations.map(res => (
                                <div key={res.id} className="flex justify-between items-center bg-[#192A51]/50 p-4 rounded-xl border border-white/5">
                                    <div>
                                        <div className="text-sm font-medium text-white">{res.name}</div>
                                        <div className="text-xs text-gray-400">{new Date(res.reservation_date).toLocaleDateString()} à {new Date(res.reservation_date).toLocaleTimeString([], { hour: '2h', minute: '2h' })}</div>
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${res.status === 'confirmed' ? 'bg-green-500/10 text-green-400' :
                                            res.status === 'cancelled' ? 'bg-red-500/10 text-red-400' :
                                                'bg-[#D4AF37]/10 text-[#D4AF37]'
                                        }`}>
                                        {res.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Aucune réservation récente.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <div className={`bg-gradient-to-br ${color} rounded-2xl p-8 shadow-2xl relative overflow-hidden group`}>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 text-white/10 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                </svg>
            </div>
            <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2 font-bold">{title}</div>
                <div className="text-4xl font-serif text-white">{value}</div>
            </div>
        </div>
    );
}

function ActionButton({ icon, label, href }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-6 py-4 bg-[#192A51] border border-white/5 rounded-xl text-sm font-medium text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all group"
        >
            <svg className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
            </svg>
            {label}
        </Link>
    );
}
