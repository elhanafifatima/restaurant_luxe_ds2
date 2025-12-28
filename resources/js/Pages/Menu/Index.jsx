import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, menuItems }) {
    const [category, setCategory] = useState('all');

    const categories = ['all', 'starter', 'main', 'dessert', 'drink'];

    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);

    return (
        <RestaurantLayout user={auth.user}>
            <Head title="Our Menu" />

            <div className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-amber-500 mb-4">Our Menu</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our exquisitely crafted dishes, prepared with the freshest ingredients and culinary mastery.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-center space-x-4 mb-12 flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-6 py-2 rounded-full uppercase text-sm tracking-wider transition ${category === cat
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden group hover:shadow-xl transition duration-300 border border-transparent hover:border-amber-500/30">
                                    <div className="h-48 overflow-hidden relative">
                                        {item.image_path ? (
                                            <img
                                                src={`/storage/${item.image_path}`}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded shadow">
                                            ${parseFloat(item.price).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-white group-hover:text-amber-500 transition">{item.name}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">{item.description}</p>
                                        <button className="text-amber-500 text-sm hover:text-amber-400 uppercase tracking-wide font-bold">
                                            View Details &rarr;
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                No items found in this category.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </RestaurantLayout>
    );
}
