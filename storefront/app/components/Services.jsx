import { Wrench, Truck, Award, CheckCircle } from 'lucide-react'

const Services = () => {
    const services = [
        {
            title: "Injector Shop",
            description: "Complete testing, repairs, and rebuilds for all injector brands including Bosch, Denso, Stanadyne, and Zexel.",
            icon: <Wrench className="w-8 h-8" />,
            features: ["Testing & Diagnostics", "Complete Rebuilds", "All Major Brands", "Quick Turnaround"]
        },
        {
            title: "Service Department",
            description: "Bosch's first Diesel Vehicle Diagnostic facility in the US. Fleet maintenance and performance upgrades.",
            icon: <Truck className="w-8 h-8" />,
            features: ["Fleet Maintenance", "Preventative Service", "Performance Upgrades", "Bosch Certified"]
        },
        {
            title: "Pump Shop",
            description: "State-of-the-art injection pump testing, repairs, and complete rebuilds with precision equipment.",
            icon: <Award className="w-8 h-8" />,
            features: ["Precision Testing", "Complete Rebuilds", "State-of-Art Equipment", "Quality Guaranteed"]
        }
    ];

    return (
        <section id="services" className="py-20 bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Services</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Comprehensive diesel injection solutions backed by decades of experience and cutting-edge technology
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-gray-900 p-8 rounded-xl hover:bg-gray-700 transition-colors group">
                            <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 mb-6">{service.description}</p>

                            <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services