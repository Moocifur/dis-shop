import Link from 'next/link'
import { Award } from 'lucide-react'

const Hero = () => {
    return (
        <section
            id="home"
            className="relative py-20"
            style={{
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/hero-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Award className="w-6 h-6 text-yellow-500" />
                            <span className="text-yellow-500 font-semibold">Bosch Certified • Since 1951</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            When <span className="text-blue-400">Quality</span> and
                            <span className="text-blue-400"> Experience</span> Matter
                        </h1>

                        <p className="text-xl text-gray-300 mb-8">
                            Over 75 years of diesel injection expertise. From fleet maintenance to precision rebuilds,
                            we're the trusted choice for diesel professionals across the region.
                        </p>

                        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mb-4">
                            <a href="#services" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center sm:flex-1">
                                View Services
                            </a>

                            <Link href="/parts" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all text-center sm:flex-1 flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                </svg>
                                Shop Parts
                            </Link>
                        </div>

                        <a href="#contact" className="border-2 border-white hover:border-blue-400 hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all text-center block sm:max-w-xs sm:mx-auto shadow-lg">
                            Contact Us
                        </a>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl">
                            <div className="bg-gray-800 p-6 rounded-xl">
                                <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">75</div>
                                        <div className="text-sm text-gray-400">Years Experience</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">1st</div>
                                        <div className="text-sm text-gray-400">Bosch Certified US</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">60000+</div>
                                        <div className="text-sm text-gray-400">Happy Clients</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">24hr</div>
                                        <div className="text-sm text-gray-400">Test Results*</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero