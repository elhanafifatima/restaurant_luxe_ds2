import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ menuItem }) {
    const { data, setData, put, processing, errors, setError, clearErrors } = useForm({
        name: menuItem.name || '',
        description: menuItem.description || '',
        price: menuItem.price || '',
        category: menuItem.category || 'main',
        image_path: menuItem.image_path || '',
        ingredients: menuItem.ingredients || '',
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setData('name', value);
        if (value && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
            setError('name', 'Le nom du plat ne doit contenir que des lettres.');
        } else {
            clearErrors('name');
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setData('price', value);
        if (value && parseFloat(value) <= 0) {
            setError('price', 'Le prix doit être supérieur à 0.');
        } else {
            clearErrors('price');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.menu.update', menuItem.id));
    };

    return (
        <AdminLayout>
            <Head title="Modifier l'article - Admin" />

            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-light text-white mb-2 font-serif uppercase tracking-widest">Modifier l'Article</h2>
                    <p className="text-gray-400 font-sans italic">Ajustez les détails de votre création culinaire.</p>
                </div>
            </div>

            <div className="max-w-3xl">
                <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Nom du plat</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={handleNameChange}
                                    className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                                    required
                                />
                                {errors.name && <div className="text-red-400 text-xs mt-2 italic">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans h-32 resize-none"
                                ></textarea>
                                {errors.description && <div className="text-red-400 text-xs mt-2 italic">{errors.description}</div>}
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Ingrédients</label>
                                <textarea
                                    value={data.ingredients}
                                    onChange={e => setData('ingredients', e.target.value)}
                                    className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans h-32 resize-none"
                                    placeholder="Liste des ingrédients..."
                                ></textarea>
                                {errors.ingredients && <div className="text-red-400 text-xs mt-2 italic">{errors.ingredients}</div>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Prix (€)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={handlePriceChange}
                                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                                        required
                                    />
                                    {errors.price && <div className="text-red-400 text-xs mt-2 italic">{errors.price}</div>}
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Catégorie</label>
                                    <select
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans appearance-none cursor-pointer"
                                    >
                                        <option value="starter" className="bg-[#192A51]">Entrée</option>
                                        <option value="main" className="bg-[#192A51]">Plat Principal</option>
                                        <option value="dessert" className="bg-[#192A51]">Dessert</option>
                                        <option value="drink" className="bg-[#192A51]">Boisson</option>
                                    </select>
                                    {errors.category && <div className="text-red-400 text-xs mt-2 italic">{errors.category}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-6 pt-6 border-t border-white/5">
                            <Link
                                href={route('dashboard')}
                                className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors font-bold"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-xs hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 uppercase tracking-widest disabled:opacity-50"
                            >
                                Mettre à Jour
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
