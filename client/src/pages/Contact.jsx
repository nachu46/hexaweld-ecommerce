import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
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
        <div className="flex flex-col bg-[#F6F4EE] text-[#1C1B17] font-sans min-h-screen">

            {/* ══ 1. HERO HEADER ═══════════════════════════════════════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-8">
                <div className="max-w-7xl mx-auto pb-8 border-b border-[#E5E0D8] space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B15E2B]">
                            CONTACT & ENQUIRIES • QATAR
                        </span>
                        <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E4046]">
                            JAZA TRADING W.L.L
                        </span>
                    </div>

                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#1C1B17] leading-tight tracking-tight mb-4">
                            Let’s build <span className="text-[#B15E2B]">something together.</span>
                        </h1>
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                            Have a project in mind or bulk building material requirements? Send us your enquiry and our Qatar sales team will get back to you promptly.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-slate-700 font-bold uppercase tracking-wider">
                        <span className="text-[#B15E2B]">FAST WHOLESALE QUOTES</span>
                        <span>WE RESPOND WITHIN 1 BUSINESS DAY</span>
                    </div>
                </div>
            </section>

            {/* ══ 2. MAIN CONTACT & FORM SECTION ══════════════════════════════ */}
            <section className="py-14 bg-[#F6F4EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left Info Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">GET IN TOUCH</span>
                                <div className="w-12 h-px bg-[#D5CFCE]" />
                            </div>

                            <h2 className="text-3xl font-serif font-bold text-[#1C1B17] tracking-tight">
                                Contact Information
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Reach out directly via phone, email, or visit our wholesale warehouse in Qatar's Industrial Area.
                            </p>

                            <div className="space-y-4 pt-2">
                                {contactItems.map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl bg-white border border-[#E5E0D8] flex items-start gap-4 shadow-xs">
                                        <div className="w-10 h-10 rounded-xl bg-[#B15E2B]/10 text-[#B15E2B] border border-[#B15E2B]/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">{item.label}</span>
                                            <p className="font-bold text-xs sm:text-sm text-[#1C1B17] leading-snug">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp Direct Banner */}
                            <a
                                href="https://wa.me/97470605494"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-2xl flex items-center gap-4 transition-all shadow-md group"
                            >
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
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
                        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E0D8] shadow-sm">
                            <h2 className="text-2xl font-serif font-bold text-[#1C1B17] mb-1">Send an Enquiry</h2>
                            <p className="text-slate-600 text-xs mb-6">Fill out your requirement details below for a wholesale price quote.</p>

                            {success ? (
                                <div className="text-center py-10">
                                    <CheckCircle className="w-12 h-12 text-[#B15E2B] mx-auto mb-3" />
                                    <h3 className="text-xl font-serif font-bold text-[#1C1B17] mb-1">Enquiry Submitted Successfully!</h3>
                                    <p className="text-slate-600 text-xs mb-6">Our Qatar sales team will contact you within 1 business day.</p>
                                    <button onClick={() => setSuccess(false)} className="px-6 py-2.5 rounded-full bg-[#B15E2B] text-white text-xs font-bold hover:bg-[#8E4920] transition-colors">
                                        Send Another Enquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Name *</label>
                                            <input required name="name" type="text" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] text-xs focus:border-[#B15E2B] outline-none" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company</label>
                                            <input name="company" type="text" value={form.company} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] text-xs focus:border-[#B15E2B] outline-none" placeholder="Company Name" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email *</label>
                                            <input required name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] text-xs focus:border-[#B15E2B] outline-none" placeholder="email@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone</label>
                                            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] text-xs focus:border-[#B15E2B] outline-none" placeholder="+974 7060 5494" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Subject</label>
                                        <input name="subject" type="text" value={form.subject} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] text-xs focus:border-[#B15E2B] outline-none" placeholder="Building Material Wholesale Order" />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Message / Requirements *</label>
                                        <textarea required name="message" rows={4} value={form.message} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-[#F6F4EE] border border-[#D5CFCE] text-[#1C1B17] text-xs resize-none focus:border-[#B15E2B] outline-none" placeholder="Enter product names, quantities, or specific project requirements..." />
                                    </div>

                                    {error && <p className="text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-full bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
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
            <section className="pb-14 bg-[#F6F4EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#ECE8E0] rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5CFCE] pb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B] block mb-1">VISIT WAREHOUSE & SHOWROOM</span>
                                <h3 className="font-serif font-bold text-xl text-[#1C1B17]">Doha Central Warehouse & Distribution Location</h3>
                                <p className="text-xs text-slate-600 font-medium mt-0.5">Al Kassarat Street, Industrial Area, Street 5, Doha, Qatar</p>
                            </div>
                            <a
                                href="https://maps.google.com/maps?q=Street%205%2C%20Industrial%20Area%2C%20Doha%2C%20Qatar"
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 rounded-full bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs inline-flex items-center gap-2 self-start sm:self-auto transition-colors shadow-xs"
                            >
                                Open in Google Maps <ArrowRight className="w-4 h-4 text-white" />
                            </a>
                        </div>
                        <div className="h-80 sm:h-96 rounded-2xl overflow-hidden relative border border-[#D5CFCE] shadow-xs">
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

