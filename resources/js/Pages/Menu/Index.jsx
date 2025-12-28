import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Index({ auth, menuItems }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Group items by category
    const categoryNames = [...new Set(menuItems.map(item => item.category))];

    return (
        <RestaurantLayout user={auth.user}>
            <Head title="La Carte - Restaurant Luxe" />

            <div className="bg-[#192A51] pt-32 pb-24 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-20 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-6 uppercase tracking-[0.3em] font-light">
                            La Carte
                        </h1>
                        <div className="w-32 h-0.5 bg-[#D4AF37]/30 mx-auto mb-8"></div>
                        <p className="text-gray-400 font-sans italic tracking-[0.2em] text-sm uppercase max-w-2xl mx-auto leading-relaxed">
                            Découvrez une symphonie de saveurs orchestrée par notre chef, où chaque plat raconte une histoire d'exception.
                        </p>
                    </div>

                    {/* Menu Content */}
                    {categoryNames.map((category) => (
                        <div key={category} className="mb-24">
                            <h2 className="text-2xl font-serif text-white mb-12 uppercase tracking-[0.4em] flex items-center gap-6">
                                <span className="text-[#D4AF37] opacity-50">/</span> {category}
                                <div className="flex-1 h-[1px] bg-white/5"></div>
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {menuItems.filter(item => item.category === category).map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-[#1e315f]/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm group hover:border-[#D4AF37]/30 transition-all duration-700 hover:transform hover:-translate-y-2"
                                    >
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={item.image_path || '/images/dish-placeholder.jpg'}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#192A51] via-transparent to-transparent opacity-60"></div>
                                            <div className="absolute bottom-6 right-6">
                                                <span className="text-2xl font-serif text-[#D4AF37] bg-[#192A51]/80 backdrop-blur-md px-4 py-2 rounded-lg border border-[#D4AF37]/20">
                                                    {item.price}€
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8">
                                            <h3 className="text-xl font-serif text-white mb-3 uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm font-sans line-clamp-2 italic mb-8 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <button
                                                onClick={() => openModal(item)}
                                                className="w-full py-4 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                                            >
                                                Voir plus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[#0a0f1d]/90 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-500"
                                enterFrom="opacity-0 scale-95 translate-y-10"
                                enterTo="opacity-100 scale-100 translate-y-0"
                                leave="ease-in duration-300"
                                leaveFrom="opacity-100 scale-100 translate-y-0"
                                leaveTo="opacity-0 scale-95 translate-y-10"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-[2rem] bg-[#192A51] border border-white/10 text-left align-middle shadow-[0_50px_100px_rgba(0,0,0,0.6)] transition-all">
                                    {selectedItem && (
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Image side */}
                                            <div className="lg:w-1/2 h-[300px] lg:h-auto relative">
                                                <img
                                                    src={selectedItem.image_path || '/images/dish-placeholder.jpg'}
                                                    alt={selectedItem.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#192A51] hidden lg:block"></div>
                                            </div>

                                            {/* Info side */}
                                            <div className="lg:w-1/2 p-10 lg:p-14">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-2 block">
                                                            {selectedItem.category}
                                                        </span>
                                                        <Dialog.Title as="h3" className="text-3xl font-serif text-white uppercase tracking-widest leading-tight">
                                                            {selectedItem.name}
                                                        </Dialog.Title>
                                                    </div>
                                                    <span className="text-2xl font-serif text-[#D4AF37]">
                                                        {selectedItem.price}€
                                                    </span>
                                                </div>

                                                <div className="w-12 h-0.5 bg-[#D4AF37]/30 mb-8"></div>

                                                <div className="space-y-8">
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Description</h4>
                                                        <p className="text-gray-300 font-sans italic leading-relaxed">
                                                            {selectedItem.description}
                                                        </p>
                                                    </div>

                                                    {selectedItem.ingredients && (
                                                        <div>
                                                            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Ingrédients</h4>
                                                            <p className="text-gray-400 font-sans text-sm leading-relaxed">
                                                                {selectedItem.ingredients}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-12">
                                                    <button
                                                        onClick={closeModal}
                                                        className="px-10 py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-xs hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-[#D4AF37]/20 uppercase tracking-widest"
                                                    >
                                                        Fermer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </RestaurantLayout>
    );
}
