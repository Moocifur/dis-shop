import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/diesel-logo.png"
                  alt="Diesel Injection Service Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold">Diesel Injection Service</h3>
                <p className="text-xs text-gray-400">Since 1951</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for all diesel injection needs. Quality, experience, and reliability since 1951.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Injector Testing</Link></li>
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Pump Rebuilds</Link></li>
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Fleet Service</Link></li>
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Diagnostics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/#about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-blue-400 transition-colors">Our Services</Link></li>
              <li><Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/parts" className="hover:text-blue-400 transition-colors">Shop Parts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:909-885-0590" className="hover:text-blue-400 transition-colors">
                  (909) 885-0590
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:contactus@injectorsusa.com" className="hover:text-blue-400 transition-colors">
                  contactus@injectorsusa.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                <div>
                  <p>8482 Cherry Ave</p>
                  <p>Fontana, CA 92335</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Diesel Injection Service. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer