import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
    });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setData('name', value);
        // Only letters, spaces, and French accents
        if (value && !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
            setError('name', 'Le nom ne doit contenir que des lettres.');
        } else {
            clearErrors('name');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setData('phone', value);
        // Only numbers, spaces, and '+'
        if (value && !/^[\d\s+]+$/.test(value)) {
            setError('phone', 'Le numéro de téléphone ne doit contenir que des chiffres.');
        } else if (value && (value.replace(/\s/g, '').length < 10 || value.replace(/\s/g, '').length > 13)) {
            setError('phone', 'Le numéro de téléphone doit contenir entre 10 et 13 chiffres.');
        } else {
            clearErrors('phone');
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(data.name)) {
            setError('name', 'Le nom est invalide (lettres uniquement).');
            return;
        }

        const strippedPhone = data.phone.replace(/\s/g, '');
        if (data.phone && !/^[\d\s+]+$/.test(data.phone)) {
            setError('phone', 'Le téléphone est invalide (chiffres uniquement).');
            return;
        }

        if (data.phone && (strippedPhone.length < 10 || strippedPhone.length > 13)) {
            setError('phone', 'Le téléphone doit contenir entre 10 et 13 chiffres.');
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Créer un compte - Restaurant Luxe" />

            <div className="mb-8">
                <h1 className="text-3xl font-light text-[#D4AF37] mb-2 font-serif uppercase tracking-widest">Rejoignez-nous</h1>
                <p className="text-gray-400 font-sans text-sm">Créez votre compte pour une expérience personnalisée.</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">
                        Nom Complet
                    </label>

                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="name"
                        autoFocus
                        onChange={handleNameChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">
                        Adresse Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">
                        Mot de passe
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">
                        Confirmer le mot de passe
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">
                        Téléphone
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        placeholder="+33 0 00 00 00 00"
                        onChange={handlePhoneChange}
                        required
                    />

                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="pt-4">
                    <button
                        className={`w-full bg-[#D4AF37] hover:bg-[#C19B2E] text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-xs font-sans shadow-lg shadow-[#D4AF37]/20 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={processing}
                    >
                        Créer mon compte
                    </button>
                </div>

                <div className="text-center pt-6 border-t border-white/5">
                    <p className="text-[11px] uppercase tracking-widest text-gray-500 font-sans font-bold">
                        Déjà un compte ?{' '}
                        <Link href={route('login')} className="text-[#D4AF37] hover:text-white transition-colors ml-2 underline decoration-[#D4AF37]/30">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
