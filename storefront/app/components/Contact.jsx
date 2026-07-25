import { Phone, Clock, MapPin, Mail } from 'lucide-react'

const Contact = () => {
  return (
    <section id="location" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-400">Ready to get your diesel systems running like new?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 bg-gray-900 rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Visit Our Shop</h3>
              </div>
              <p className="text-gray-400 mb-4">Come see our state-of-the-art facility</p>
              <div className="text-blue-400 mb-4">
                <p className="font-semibold">8482 Cherry Ave</p>
                <p>Fontana, CA 92335</p>
              </div>
            </div>

            <div className="h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.80479757826!2d-117.49204186060977!3d34.10014077325072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcacf6e214cd87%3A0x1068670f25b6c3a6!2sDiesel%20Injection%20Service!5e0!3m2!1sen!2sus!4v1754958626201!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Diesel Injection Service Location"
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">

            <div className="bg-gray-900 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Call Us Today</h3>
              <p className="text-gray-400 mb-6">Ready to help with your diesel needs</p>

              <div className="space-y-3">
                <a
                  href="tel:909-885-0590"
                  className="block text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  (909) 885-0590
                </a>
                <div className="text-sm text-gray-400">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>contactus@injectorsusa.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Business Hours</h3>
              <p className="text-gray-400 mb-6">We're here when you need us</p>

              <div className="space-y-3 text-left max-w-xs mx-auto">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-blue-400 font-semibold">7AM - 5PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday - Sunday</span>
                  <span className="text-red-400 font-semibold">Closed</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact