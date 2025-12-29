import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, reservations }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'cancelled': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
            default: return 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'confirmed': return 'Confirmée';
            case 'cancelled': return 'Annulée';
            default: return 'En attente';
        }
    };

    return (
        <RestaurantLayout user={auth.user}>
            <Head title="Mes Réservations - Restaurant Luxe" />

            <div className="bg-[#192A51] py-24 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-serif text-[#D4AF37] mb-4 uppercase tracking-[0.2em] font-light">
                            Mes Réservations
                        </h1>
                        <div className="w-24 h-0.5 bg-[#D4AF37]/30 mx-auto mb-6"></div>
                        <p className="text-gray-400 font-sans italic tracking-widest text-sm uppercase">Consultez l'historique et le statut de vos demandes.</p>
                    </div>

                    {reservations.length === 0 ? (
                        <div className="text-center py-20 bg-[#1e315f]/30 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <p className="text-gray-400 font-sans italic mb-8">Vous n'avez pas encore effectué de réservation.</p>
                            <Link
                                href={route('reservation.create')}
                                className="px-10 py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-xs hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-[#D4AF37]/20 uppercase tracking-widest"
                            >
                                Réserver une Table
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {reservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="bg-[#1e315f]/50 border border-white/5 p-8 rounded-2xl backdrop-blur-md shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#D4AF37]/30 transition-all duration-500 group"
                                >
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(reservation.status)}`}>
                                                {getStatusLabel(reservation.status)}
                                            </span>
                                            <span className="text-gray-500 text-xs font-sans uppercase tracking-widest">
                                                Ref: #RES-{String(reservation.id).padStart(5, '0')}
                                            </span>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[#D4AF37] text-lg font-serif">
                                                    {new Date(reservation.reservation_date).toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-white text-2xl font-light tracking-widest mt-1">
                                                    {new Date(reservation.reservation_date).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-end">
                                                <p className="text-gray-400 text-sm font-sans italic">
                                                    <span className="text-white font-bold not-italic">{reservation.guests_count}</span> Personnes
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">
                                                    Table pour {reservation.name}
                                                </p>
                                            </div>
                                        </div>

                                        {reservation.special_requests && (
                                            <div className="pt-4 border-t border-white/5">
                                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Demandes Particulières:</p>
                                                <p className="text-gray-300 text-sm italic font-sans">{reservation.special_requests}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="p-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                            </svg>
                                        </button>
                                        <button className="flex-1 md:flex-none px-8 py-4 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                                            Détails
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </RestaurantLayout>
    );
}
