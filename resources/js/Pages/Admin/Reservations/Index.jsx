import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ reservations }) {
    const handleStatusUpdate = (id, status) => {
        router.patch(route('admin.reservations.update', id), { status });
    };

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
            router.delete(route('admin.reservations.destroy', id));
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'cancelled':
                return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default:
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    return (
        <AdminLayout>
            <Head title="Gestion des Réservations - Admin" />

            <div className="mb-10">
                <h2 className="text-3xl font-light text-white mb-2 font-serif uppercase tracking-widest">Réservations</h2>
                <p className="text-gray-400 font-sans italic">Gérez vos convives et l'occupation de votre salle.</p>
            </div>

            <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                {reservations.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/5">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Convive</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Date & Heure</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Couverts</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Statut</th>
                                    <th className="px-8 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{reservation.name}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="text-xs text-gray-400 font-sans">{reservation.email}</div>
                                            <div className="text-[10px] text-gray-500 font-sans mt-0.5">{reservation.phone}</div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-sans font-bold text-gray-300">
                                            {new Date(reservation.reservation_date).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-8 py-5 text-sm font-sans font-bold text-[#D4AF37]">
                                            {reservation.guests_count} pers.
                                        </td>
                                        <td className="px-8 py-5">
                                            <select
                                                value={reservation.status}
                                                onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusStyle(reservation.status)} bg-transparent cursor-pointer outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all`}
                                            >
                                                <option value="pending" className="bg-[#192A51]">En attente</option>
                                                <option value="confirmed" className="bg-[#192A51]">Confirmé</option>
                                                <option value="cancelled" className="bg-[#192A51]">Annulé</option>
                                            </select>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={() => handleDelete(reservation.id)}
                                                className="text-[10px] font-bold text-gray-500 hover:text-rose-400 uppercase tracking-widest transition-colors"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 italic font-sans">Aucune réservation enregistrée.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
