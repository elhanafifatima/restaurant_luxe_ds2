import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ menuItem }) {
    const { data, setData, put, processing, errors } = useForm({
        name: menuItem.name || '',
        description: menuItem.description || '',
        price: menuItem.price || '',
        category: menuItem.category || 'main',
        image_path: menuItem.image_path || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.menu.update', menuItem.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Menu Item
                </h2>
            }
        >
            <Head title="Edit Menu Item" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 rounded-md shadow-sm"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 rounded-md shadow-sm h-24"
                                    ></textarea>
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 rounded-md shadow-sm"
                                            required
                                        />
                                        {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <select
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 rounded-md shadow-sm"
                                        >
                                            <option value="starter">Starter</option>
                                            <option value="main">Main</option>
                                            <option value="dessert">Dessert</option>
                                            <option value="drink">Drink</option>
                                        </select>
                                        {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Image Path (optional)</label>
                                    <input
                                        type="text"
                                        value={data.image_path}
                                        onChange={e => setData('image_path', e.target.value)}
                                        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 rounded-md shadow-sm"
                                        placeholder="e.g., menu/dish.jpg"
                                    />
                                    {errors.image_path && <div className="text-red-500 text-sm mt-1">{errors.image_path}</div>}
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('menu.index')}
                                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition disabled:opacity-50"
                                    >
                                        Update Item
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
