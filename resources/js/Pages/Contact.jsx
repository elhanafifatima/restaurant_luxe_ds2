import RestaurantLayout from '@/Layouts/RestaurantLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Since we don't have a backend route for contact, we'll just simulate success
        // post(route('contact.store')); 
        alert('Thank you for contacting us! We will get back to you shortly.');
        reset();
    };

    return (
        <RestaurantLayout>
            <Head title="Contact Us" />

            <div className="bg-gray-900 py-20 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl font-serif text-amber-500 mb-6">Get in Touch</h2>
                        <p className="text-gray-400 mb-8">
                            We value your feedback and inquiries. Whether you're planning a private event or just want to say hello, we're here to help.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="text-amber-500 text-xl">📍</div>
                                <div>
                                    <h4 className="text-white font-semibold">Address</h4>
                                    <p className="text-gray-400">123 Luxury Avenue, Paris, France</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="text-amber-500 text-xl">📞</div>
                                <div>
                                    <h4 className="text-white font-semibold">Phone</h4>
                                    <p className="text-gray-400">+33 1 23 45 67 89</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="text-amber-500 text-xl">✉️</div>
                                <div>
                                    <h4 className="text-white font-semibold">Email</h4>
                                    <p className="text-gray-400">concierge@restaurantluxe.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="mt-8 bg-gray-800 h-64 rounded-lg flex items-center justify-center border border-gray-700">
                            <span className="text-gray-500">Map Integration Here</span>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-xl">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                <textarea
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none h-32"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-amber-500 text-white font-bold py-3 rounded hover:bg-amber-600 transition uppercase tracking-widest"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </RestaurantLayout>
    );
}
