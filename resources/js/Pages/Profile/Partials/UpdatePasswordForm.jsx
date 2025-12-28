import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePassword({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-8">
                <h2 className="text-xl font-serif text-[#D4AF37] uppercase tracking-widest">
                    Changer le Mot de Passe
                </h2>
                <div className="w-12 h-0.5 bg-[#D4AF37]/30 mt-2 mb-4"></div>
                <p className="text-sm text-gray-400 font-sans italic">
                    Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Mot de passe actuel</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2 italic text-xs text-rose-400" />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Nouveau mot de passe</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2 italic text-xs text-rose-400" />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Confirmer le mot de passe</label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2 italic text-xs text-rose-400" />
                </div>

                <div className="flex items-center gap-6 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-10 py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-[10px] hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 uppercase tracking-widest disabled:opacity-50"
                    >
                        Mettre à jour
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                            Mot de passe mis à jour.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
