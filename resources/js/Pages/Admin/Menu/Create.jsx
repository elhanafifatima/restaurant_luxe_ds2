import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        name: '',
        description: '',
        price: '',
        category: 'main',
        image_path: '',
        ingredients: '',
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
        post(route('admin.menu.store'));
    };

    return (
        <AdminLayout>
            <Head title="Créer un Article - Admin" />

            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-light text-white mb-2 font-serif uppercase tracking-widest">Nouveau Article</h2>
                    <p className="text-gray-400 font-sans italic">Ajoutez une nouvelle création à votre carte gastronomique.</p>
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
                                    placeholder="ex: Filet de Boeuf Rossini"
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
                                    placeholder="Décrivez les saveurs du plat..."
                                ></textarea>
                                {errors.description && <div className="text-red-400 text-xs mt-2 italic">{errors.description}</div>}
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Ingrédients</label>
                                <textarea
                                    value={data.ingredients}
                                    onChange={e => setData('ingredients', e.target.value)}
                                    className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans h-32 resize-none"
                                    placeholder="Liste des ingrédients principaux..."
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
                                        placeholder="0.00"
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

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Image du plat</label>
                                <div className="mt-2 flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden bg-white/5">
                                        {data.image_path ? (
                                            <img
                                                src={typeof data.image_path === 'string' ? data.image_path : URL.createObjectURL(data.image_path)}
                                                className="w-full h-full object-cover"
                                                alt="Preview"
                                            />
                                        ) : (
                                            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            onChange={e => setData('image_path', e.target.files[0])}
                                            className="block w-full text-sm text-gray-400
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-xs file:font-bold
                                                file:bg-[#D4AF37] file:text-black
                                                hover:file:bg-white transition-all
                                                cursor-pointer"
                                            accept="image/*"
                                        />
                                        <p className="text-[10px] text-gray-500 mt-2 italic uppercase tracking-wider">JPG, PNG ou WebP. Max 2Mo.</p>
                                    </div>
                                </div>
                                {errors.image_path && <div className="text-red-400 text-xs mt-2 italic">{errors.image_path}</div>}
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
                                Créer l'Article
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
