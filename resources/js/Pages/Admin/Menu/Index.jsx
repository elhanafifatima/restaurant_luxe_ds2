import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ menuItems }) {
    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cet article de la carte ?')) {
            router.delete(route('admin.menu.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Gestion du Menu - Admin" />

            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-light text-white mb-2 font-serif uppercase tracking-widest">Gestion de la Carte</h2>
                    <p className="text-gray-400 font-sans italic">Administrez vos plats et boissons avec élégance.</p>
                </div>
                <Link
                    href={route('admin.menu.create')}
                    className="px-6 py-3 bg-[#D4AF37] text-black rounded-xl font-bold text-sm hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 uppercase tracking-widest"
                >
                    Ajouter un Plat
                </Link>
            </div>

            <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
                {menuItems.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-white/5">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Article</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Catégorie</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Prix</th>
                                    <th className="px-8 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {menuItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-md mt-1 font-sans italic">
                                                {item.description}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 uppercase tracking-widest">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-sans font-bold text-gray-300">
                                            {parseFloat(item.price).toFixed(2)} €
                                        </td>
                                        <td className="px-8 py-5 text-right space-x-4">
                                            <Link
                                                href={route('admin.menu.edit', item.id)}
                                                className="text-[10px] font-bold text-gray-400 hover:text-[#D4AF37] uppercase tracking-widest transition-colors"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-[10px] font-bold text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors"
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
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <p className="text-gray-500 italic font-sans">Votre carte est vide pour le moment.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
