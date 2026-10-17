import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

const contactItems = [
    { icon: MapPin, label: 'Showroom & Warehouse Address', value: 'Al Kassarat Street, Industrial Area, Street 5, Doha, Qatar' },
    { icon: Phone, label: 'Direct Phone Lines', value: '+974 7060 5494 / +974 7408 0005' },
    { icon: Mail, label: 'Email Address', value: 'jazatrading@gmail.com' },
    { icon: Clock, label: 'Working Hours', value: 'Sat – Thu: 7:30 AM – 6:00 PM (Friday Closed)' },
];

const Contact = () => {
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/enquiries`, {
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                message: `Company: ${form.company || 'N/A'}\nSubject: ${form.subject || 'N/A'}\n\n${form.message}`,
                source: 'contact_page_form',
            });
            setSuccess(true);
            setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setError('Could not send enquiry. Please connect via WhatsApp directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-white text-[#111111] min-h-screen">

            <PageBanner page="contact"
                title="Contact Us"
                subtitle="Send us your material list or project requirements and our sales team will come back to you with pricing and availability."
            />

            {/* ══ 2. MAIN CONTACT & FORM SECTION ══════════════════════════════ */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left Info Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <h2 className="text-3xl font-bold text-[#111111] tracking-tight">
                                Contact Information
                            </h2>
                            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                                Reach out directly via phone, email, or visit our wholesale warehouse in Qatar's Industrial Area.
                            </p>

                            <div className="space-y-4 pt-2">
                                {contactItems.map((item) => (
                                    <div key={item.label} className="p-4 rounded bg-white border border-[#E5E5E5] flex items-start gap-4">
                                        <div className="w-10 h-10 rounded bg-[#111111] text-white flex items-center justify-center shrink-0 mt-0.5">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-neutral-500 block mb-0.5">{item.label}</span>
                                            <p className="font-bold text-xs sm:text-sm text-[#111111] leading-snug">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp Direct Banner */}
                            <a
                                href="https://wa.me/97470605494"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded flex items-center gap-4 transition-all group"
                            >
                                <div className="w-10 h-10 bg-white rounded flex items-center justify-center shrink-0">
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-7 object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">Direct WhatsApp Support</h4>
                                    <p className="text-emerald-100 text-xs">+974 7060 5494 / +974 7408 0005</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Right RFQ Form */}
                        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded border border-[#E5E5E5] shadow-sm">
                            <h2 className="text-2xl font-bold text-[#111111] mb-1">Send an Enquiry</h2>
                            <p className="text-neutral-600 text-xs mb-6">Fill out your requirement details below for a wholesale price quote.</p>

                            {success ? (
                                <div className="text-center py-10">
                                    <CheckCircle className="w-12 h-12 text-[#111111] mx-auto mb-3" />
                                    <h3 className="text-xl font-bold text-[#111111] mb-1">Thank you — your enquiry has been sent.</h3>
                                    <p className="text-neutral-600 text-xs mb-6">Our sales team will be in touch with you shortly.</p>
                                    <button onClick={() => setSuccess(false)} className="px-6 py-2.5 rounded bg-[#111111] text-white text-xs font-bold hover:bg-[#333333] transition-colors">
                                        Send Another Enquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name *</label>
                                            <input required name="name" type="text" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded bg-white border border-[#D4D4D4] text-[#111111] text-sm focus:border-[#111111] outline-none" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company</label>
                                            <input name="company" type="text" value={form.company} onChange={handleChange} className="w-full px-4 py-2.5 rounded bg-white border border-[#D4D4D4] text-[#111111] text-sm focus:border-[#111111] outline-none" placeholder="Company Name" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                                            <input required name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded bg-white border border-[#D4D4D4] text-[#111111] text-sm focus:border-[#111111] outline-none" placeholder="email@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
                                            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded bg-white border border-[#D4D4D4] text-[#111111] text-sm focus:border-[#111111] outline-none" placeholder="+974 7060 5494" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subject</label>
                                        <input name="subject" type="text" value={form.subject} onChange={handleChange} className="w-full px-4 py-2.5 rounded bg-white border border-[#D4D4D4] text-[#111111] text-sm focus:border-[#111111] outline-none" placeholder="Building Material Wholesale Order" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message / Requirements *</label>
                                        <textarea required name="message" rows={4} value={form.message} onChange={handleChange} className="w-full px-4 py-2.5 rounded bg-white border border-[#D4D4D4] text-[#111111] text-sm resize-none focus:border-[#111111] outline-none" placeholder="Enter product names, quantities, or specific project requirements..." />
                                    </div>

                                    {error && <p className="text-red-600 text-xs bg-red-50 p-3 rounded border border-red-200">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        {loading ? 'Submitting...' : <>Request a Quote <ArrowRight className="w-4 h-4 text-white" /></>}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* ══ 3. INTERACTIVE GOOGLE MAP SECTION ════════════════════════════ */}
            <section className="pb-16 sm:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4D4D4] pb-4">
                            <div>
                                                                <h3 className="font-bold text-xl text-[#111111]">Warehouse & Showroom</h3>
                                <p className="text-xs text-neutral-600 font-medium mt-0.5">Al Kassarat Street, Industrial Area, Street 5, Doha, Qatar</p>
                            </div>
                            <a
                                href="https://maps.google.com/maps?q=Street%205%2C%20Industrial%20Area%2C%20Doha%2C%20Qatar"
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs inline-flex items-center gap-2 self-start sm:self-auto transition-colors"
                            >
                                Open in Google Maps <ArrowRight className="w-4 h-4 text-white" />
                            </a>
                        </div>
                        <div className="h-80 sm:h-96 rounded-xl overflow-hidden relative border border-[#D4D4D4]">
                            <iframe
                                title="Jaza Trading Warehouse Location Map"
                                src="https://maps.google.com/maps?q=Street%205%2C%20Industrial%20Area%2C%20Doha%2C%20Qatar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;

