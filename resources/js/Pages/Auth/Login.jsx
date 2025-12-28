import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Connexion - Restaurant Luxe" />

            <div className="mb-8">
                <h1 className="text-3xl font-light text-[#D4AF37] mb-2 font-serif uppercase tracking-widest">Bienvenue</h1>
                <p className="text-gray-400 font-sans text-sm">Veuillez vous authentifier pour accéder à votre espace.</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">
                        Adresse Email
                    </label>
                    <div className="relative">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 font-sans font-bold">
                            Mot de passe
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
                            >
                                Oublié ?
                            </Link>
                        )}
                    </div>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-4 h-4 border border-[#D4AF37]/30 rounded transition-all ${data.remember ? 'bg-[#D4AF37]' : 'bg-transparent'}`}>
                                {data.remember && (
                                    <svg className="w-3 h-3 text-black mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <span className="ms-3 text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition-colors font-sans font-bold">Rester connecté</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button
                        className={`w-full bg-[#D4AF37] hover:bg-[#C19B2E] text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-xs font-sans shadow-lg shadow-[#D4AF37]/20 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={processing}
                    >
                        Se Connecter
                    </button>
                </div>

                <div className="text-center pt-6 border-t border-white/5">
                    <p className="text-[11px] uppercase tracking-widest text-gray-500 font-sans font-bold">
                        Nouveau client ?{' '}
                        <Link href={route('register')} className="text-[#D4AF37] hover:text-white transition-colors ml-2 underline decoration-[#D4AF37]/30">
                            Créer un compte prestige
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
