import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-serif text-rose-400 uppercase tracking-widest">
                    Supprimer le Compte
                </h2>
                <div className="w-12 h-0.5 bg-rose-500/30 mt-2 mb-4"></div>
                <p className="mt-1 text-sm text-gray-400 font-sans italic leading-relaxed">
                    Une fois votre compte supprimé, toutes ses ressources et données seront définitivement effacées.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="px-8 py-3 border border-rose-500/30 text-rose-400 rounded-xl font-bold text-[10px] hover:bg-rose-500 hover:text-white transition-all uppercase tracking-widest"
            >
                Supprimer le compte
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8 bg-[#192A51] border border-white/5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-rose-500/5 blur-3xl"></div>

                    <h2 className="text-2xl font-serif text-white mb-4 uppercase tracking-widest">
                        Êtes-vous sûr ?
                    </h2>

                    <p className="text-sm text-gray-400 font-sans italic leading-relaxed mb-8">
                        Veuillez entrer votre mot de passe pour confirmer que vous souhaitez supprimer définitivement votre compte.
                    </p>

                    <div className="mb-8">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-sans font-bold">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-[#1e315f]/50 border border-white/10 text-white rounded-xl px-4 py-4 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all duration-300 outline-none font-sans"
                            placeholder="Votre mot de passe"
                            autoFocus
                        />
                        <InputError message={errors.password} className="mt-2 italic text-xs text-rose-400" />
                    </div>

                    <div className="flex justify-end gap-6 pt-6 border-t border-white/5">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors font-bold"
                        >
                            Annuler
                        </button>

                        <button
                            className={`px-8 py-4 bg-rose-500 text-white rounded-xl font-bold text-[10px] hover:bg-rose-600 transition-all transform hover:scale-105 shadow-xl shadow-rose-900/20 uppercase tracking-widest ${processing ? 'opacity-50' : ''}`}
                            disabled={processing}
                        >
                            Confirmer la Suppression
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
