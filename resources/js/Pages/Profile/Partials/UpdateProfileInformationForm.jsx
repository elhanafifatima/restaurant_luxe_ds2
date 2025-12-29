import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, setError, clearErrors } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const handleNameChange = (e) => {
        const value = e.target.value;
        setData('name', value);

        // Validation: No numbers allowed
        if (/\d/.test(value)) {
            setError('name', 'Veuillez n\'utiliser que des lettres pour le nom.');
        } else {
            clearErrors('name');
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (/\d/.test(data.name)) {
            setError('name', 'Le nom ne peut pas contenir de chiffres. Veuillez remplir avec des mots.');
            return;
        }

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-8">
                <h2 className="text-xl font-serif text-[#D4AF37] uppercase tracking-widest">
                    Informations du Profil
                </h2>
                <div className="w-12 h-0.5 bg-[#D4AF37]/30 mt-2 mb-4"></div>
                <p className="text-sm text-gray-400 font-sans italic">
                    Mettez à jour vos informations de profil et votre adresse email.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Nom</label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={handleNameChange}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        required
                        autoFocus
                    />
                    <InputError className="mt-2 italic text-xs text-rose-400" message={errors.name} />
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-300 outline-none font-sans"
                        required
                    />
                    <InputError className="mt-2 italic text-xs text-rose-400" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                        <p className="text-sm text-gray-400">
                            Votre adresse email n'est pas vérifiée.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="block mt-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors underline"
                            >
                                Cliquez ici pour renvoyer l'email de vérification.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                Un nouveau lien de vérification a été envoyé.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-6 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-10 py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-[10px] hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 uppercase tracking-widest disabled:opacity-50"
                    >
                        Enregistrer
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                            Enregistré avec succès.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
