import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: auth.user ? auth.user.name : '',
        email: auth.user ? auth.user.email : '',
        phone: '',
        reservation_date: '',
        guests_count: 2,
        special_requests: '',
    });

    // Get current date and time in ISO format for the 'min' attribute
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minDateTime = now.toISOString().slice(0, 16);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setData('name', value);
        if (value && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
            setError('name', 'Le nom ne doit contenir que des lettres.');
        } else {
            clearErrors('name');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setData('phone', value);
        if (value && !/^[\d\s+]+$/.test(value)) {
            setError('phone', 'Le numéro de téléphone ne doit contenir que des chiffres.');
        } else {
            clearErrors('phone');
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(data.name)) {
            setError('name', 'Nom invalide (lettres uniquement).');
            return;
        }

        if (!/^[\d\s+]+$/.test(data.phone)) {
            setError('phone', 'Téléphone invalide (chiffres uniquement).');
            return;
        }

        if (new Date(data.reservation_date) < new Date()) {
            setError('reservation_date', 'Veuillez choisir une date dans le futur.');
            return;
        }

        post(route('reservation.store'), {
            onSuccess: () => reset('reservation_date', 'guests_count', 'special_requests'),
        });
    };

    return (
        <RestaurantLayout user={auth.user}>
            <Head title="Réserver une Table - Restaurant Luxe" />

            <div className="bg-[#192A51] py-24 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl w-full mx-4 bg-[#1e315f]/50 p-10 md:p-16 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden backdrop-blur-md">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-serif text-[#D4AF37] mb-4 uppercase tracking-[0.2em] font-light">
                                Réservation
                            </h2>
                            <div className="w-24 h-0.5 bg-[#D4AF37]/30 mx-auto mb-6"></div>
                            <p className="text-gray-400 font-sans italic tracking-widest text-sm uppercase">Une expérience gastronomique d'exception vous attend.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-sans font-bold">Nom Complet</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={handleNameChange}
                                        className="w-full bg-[#192A51]/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all duration-300 font-sans"
                                        placeholder="Votre nom"
                                        required
                                    />
                                    {errors.name && <div className="text-rose-400 text-xs mt-2 italic">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-sans font-bold">Adresse Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-[#192A51]/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all duration-300 font-sans"
                                        placeholder="email@exemple.com"
                                        required
                                    />
                                    {errors.email && <div className="text-rose-400 text-xs mt-2 italic">{errors.email}</div>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-sans font-bold">Téléphone</label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={handlePhoneChange}
                                        className="w-full bg-[#192A51]/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all duration-300 font-sans"
                                        placeholder="+33 0 00 00 00 00"
                                        required
                                    />
                                    {errors.phone && <div className="text-rose-400 text-xs mt-2 italic">{errors.phone}</div>}
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-sans font-bold">Nombre de Convives</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={data.guests_count}
                                            onChange={e => setData('guests_count', e.target.value)}
                                            className="w-full bg-[#192A51]/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all duration-300 font-sans"
                                            required
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs uppercase tracking-widest pointer-events-none">Personnes</span>
                                    </div>
                                    {errors.guests_count && <div className="text-rose-400 text-xs mt-2 italic">{errors.guests_count}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-sans font-bold">Date & Heure Souhaitée</label>
                                <input
                                    type="datetime-local"
                                    min={minDateTime}
                                    value={data.reservation_date}
                                    onChange={e => setData('reservation_date', e.target.value)}
                                    className="w-full bg-[#192A51]/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all duration-300 font-sans custom-datetime-picker"
                                    required
                                />
                                {errors.reservation_date && <div className="text-rose-400 text-xs mt-2 italic">{errors.reservation_date}</div>}
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3 font-sans font-bold">Demandes Spéciales</label>
                                <textarea
                                    value={data.special_requests}
                                    onChange={e => setData('special_requests', e.target.value)}
                                    className="w-full bg-[#192A51]/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all duration-300 font-sans h-32 resize-none"
                                    placeholder="Allergies, anniversaires, ou préférences de table..."
                                ></textarea>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B08D26] text-black font-bold py-5 rounded-xl hover:from-white hover:to-gray-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-2xl shadow-[#D4AF37]/20 disabled:opacity-50 uppercase tracking-[0.3em] text-xs"
                                >
                                    {processing ? 'Confirmation en cours...' : 'Confirmer la Réservation'}
                                </button>
                                <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-[0.2em]">Votre table sera maintenue pendant 15 minutes après l'heure réservée.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </RestaurantLayout>
    );
}
