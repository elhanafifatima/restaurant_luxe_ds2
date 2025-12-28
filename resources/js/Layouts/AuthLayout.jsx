import { Link } from '@inertiajs/react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#192A51] text-[#E5E5E5] font-serif">
            {/* Left Side: Image Content */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/login-bg.png')" }}
                >
                    <div className="absolute inset-0 bg-[#192A51]/60 backdrop-blur-[1px]"></div>
                </div>
                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <Link href="/" className="inline-block">
                        <span className="text-3xl font-bold tracking-widest text-[#D4AF37]">LUXE</span>
                    </Link>

                    <div className="max-w-md">
                        <div className="w-20 h-1 bg-[#D4AF37] mb-8"></div>
                        <h2 className="text-5xl font-light leading-tight mb-6 text-white">
                            L'art de la haute gastronomie.
                        </h2>
                        <p className="text-gray-200 text-lg font-sans leading-relaxed">
                            Plongez dans un univers où chaque détail est une célébration du goût et de l'élégance.
                        </p>
                    </div>

                    <div className="text-sm font-sans text-gray-400">
                        © {new Date().getFullYear()} Restaurant Luxe. Tous droits réservés.
                    </div>
                </div>
            </div>

            {/* Right Side: Form Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#192A51]">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="lg:hidden text-center mb-10">
                        <Link href="/" className="inline-block">
                            <span className="text-4xl font-bold tracking-widest text-[#D4AF37]">LUXE</span>
                        </Link>
                    </div>

                    <div className="bg-[#1e315f] p-8 lg:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 backdrop-blur-sm">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
}
