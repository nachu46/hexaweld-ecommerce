import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import JtLogo from './JtLogo';

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-neutral-400 font-sans">

            {/* Quote band */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">Need a bulk or project quotation?</h3>
                        <p className="text-sm mt-1">Send us your material list and our sales team will get back to you with pricing and availability.</p>
                    </div>
                    <Link
                        to="/contact"
                        className="shrink-0 inline-flex items-center justify-center px-7 py-3 rounded-lg bg-white text-[#111111] text-sm font-semibold hover:bg-neutral-200 transition-colors"
                    >
                        Request a Quote
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 text-sm">

                <div className="col-span-2 lg:col-span-1 space-y-4">
                    <JtLogo dark />
                    <p className="leading-relaxed">
                        Wholesale supplier of building materials, tools, door hardware, sanitaryware and safety products in Qatar since 2009. A division of Sana Group.
                    </p>
                </div>

                <div>
                    <h4 className="text-white text-base font-semibold mb-4">Company</h4>
                    <ul className="space-y-2.5">
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-white">Services</Link></li>
                        <li><Link to="/certificates" className="hover:text-white">Certificates</Link></li>
                        <li><Link to="/career" className="hover:text-white">Careers</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-base font-semibold mb-4">Products</h4>
                    <ul className="space-y-2.5">
                        <li><Link to="/products" className="hover:text-white">All Products</Link></li>
                        <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
                        <li><Link to="/brands" className="hover:text-white">Our Brands</Link></li>
                        <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                    </ul>
                </div>

                <div className="col-span-2 lg:col-span-1">
                    <h4 className="text-white text-base font-semibold mb-4">Head Office</h4>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                            <span>Al Kassarat Street, Industrial Area, Street 5, P.O. Box 31221, Doha, Qatar</span>
                        </li>
                        <li>
                            <a href="tel:+97470605494" className="flex gap-3 hover:text-white">
                                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                                <span>+974 7060 5494<br />+974 7408 0005</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:jazatrading@gmail.com" className="flex gap-3 hover:text-white">
                                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                                <span>jazatrading@gmail.com</span>
                            </a>
                        </li>
                        <li className="flex gap-3">
                            <Clock className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                            <span>Sat – Thu, 7:00 AM – 7:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24 sm:pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
                    <span>© {new Date().getFullYear()} Jaza Trading W.L.L. All rights reserved.</span>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms-and-conditions" className="hover:text-white">Terms</Link>
                        <Link to="/shipping-policy" className="hover:text-white">Shipping</Link>
                        <Link to="/return-policy" className="hover:text-white">Returns</Link>
                        <span>
                            Developed by{' '}
                            <a href="https://khairitsolution.com" target="_blank" rel="noreferrer" className="text-white hover:underline">Khair.it</a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
