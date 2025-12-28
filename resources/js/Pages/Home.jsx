import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Home({ auth }) {
    const { props } = usePage();
    // note: auth is usually passed as prop or available via usePage().props.auth

    return (
        <RestaurantLayout user={props.auth.user}>
            <Head title="Welcome" />

            {/* Hero Section */}
            <div className="relative h-[80vh] flex items-center justify-center bg-gray-800 overflow-hidden">
                {/* Fallback BG or Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/50 z-10" />
                {/* Placeholder for Hero Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>

                <div className="relative z-20 text-center max-w-4xl px-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in-up">
                        Taste the <span className="text-amber-500">Luxury</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light">
                        A culinary journey where elegance meets flavor.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href={route('menu.index')} className="px-8 py-3 bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition uppercase tracking-widest text-sm font-semibold rounded">
                            View Menu
                        </Link>
                        <Link href={route('reservation.create')} className="px-8 py-3 bg-amber-600 border-2 border-amber-600 text-white hover:bg-amber-700 hover:border-amber-700 transition uppercase tracking-widest text-sm font-semibold rounded shadow-lg shadow-amber-900/50">
                            Book a Table
                        </Link>
                    </div>
                </div>
            </div>

            {/* About Teaser */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" alt="Interior" className="rounded-lg shadow-2xl opacity-80 hover:opacity-100 transition duration-700" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-serif text-amber-500 mb-6">Our Story</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Founded with a passion for gastronomy, Restaurant Luxe brings you the finest ingredients from around the world.
                            Our chefs craft every dish with precision and artistry, ensuring an unforgettable dining experience.
                        </p>
                        <Link href={route('contact')} className="text-amber-500 hover:text-white transition border-b border-amber-500">Contact Us→</Link>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 bg-black text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-serif text-white mb-12">Signature Experiences</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 border border-gray-800 rounded hover:border-amber-500 transition group">
                            <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition">
                                <span className="text-2xl">🍷</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fine Wines</h3>
                            <p className="text-gray-400 text-sm">Curated selection from the world's best vineyards.</p>
                        </div>
                        <div className="p-6 border border-gray-800 rounded hover:border-amber-500 transition group">
                            <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition">
                                <span className="text-2xl">🥩</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Premium Cuts</h3>
                            <p className="text-gray-400 text-sm">Aged wagyu and prime steaks cooked to perfection.</p>
                        </div>
                        <div className="p-6 border border-gray-800 rounded hover:border-amber-500 transition group">
                            <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition">
                                <span className="text-2xl">🕯️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ambiance</h3>
                            <p className="text-gray-400 text-sm">Intimate and sophisticated setting for any occasion.</p>
                        </div>
                    </div>
                </div>
            </section>
        </RestaurantLayout>
    );
}
