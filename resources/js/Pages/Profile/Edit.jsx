import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout>
            <Head title="Profil - Restaurant Luxe" />

            <div className="mb-10">
                <h2 className="text-3xl font-light text-white mb-2 font-serif uppercase tracking-widest">Paramètres du Profil</h2>
                <p className="text-gray-400 font-sans italic">Gérez vos informations personnelles et la sécurité de votre compte.</p>
            </div>

            <div className="space-y-8 max-w-3xl">
                <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-[#1e315f]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-8 backdrop-blur-sm">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
