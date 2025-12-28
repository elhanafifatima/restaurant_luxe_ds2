import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user ? auth.user.name : '',
        email: auth.user ? auth.user.email : '',
        phone: '',
        reservation_date: '',
        guests_count: 2,
        special_requests: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('reservation.store'), {
            onSuccess: () => reset('reservation_date', 'guests_count', 'special_requests'),
        });
    };

    return (
        <RestaurantLayout user={auth.user}>
            <Head title="Book a Table" />

            <div className="bg-gray-900 py-20 min-h-screen flex items-center justify-center">
                <div className="max-w-2xl w-full mx-4 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden">
                    {/* Decorative bg */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-serif text-white mb-2 text-center">Reserve Your Table</h2>
                        <p className="text-gray-400 text-center mb-8">Join us for an unforgettable evening.</p>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        required
                                    />
                                    {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={data.guests_count}
                                        onChange={e => setData('guests_count', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        required
                                    />
                                    {errors.guests_count && <div className="text-red-500 text-sm mt-1">{errors.guests_count}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={data.reservation_date}
                                    onChange={e => setData('reservation_date', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition dark-calendar"
                                    required
                                />
                                {errors.reservation_date && <div className="text-red-500 text-sm mt-1">{errors.reservation_date}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Special Requests</label>
                                <textarea
                                    value={data.special_requests}
                                    onChange={e => setData('special_requests', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition h-24"
                                    placeholder="Allergies, anniversary, etc."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 rounded hover:from-amber-600 hover:to-amber-700 transition shadow-lg disabled:opacity-50 uppercase tracking-widest"
                            >
                                {processing ? 'Confirming...' : 'Confirm Reservation'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </RestaurantLayout>
    );
}
