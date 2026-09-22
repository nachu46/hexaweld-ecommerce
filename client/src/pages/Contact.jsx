import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';

const contactItems = [
    { icon: MapPin, label: 'Location Address', value: 'Al Kassarat Street, Industrial Area, Street 5, Qatar' },
    { icon: Phone, label: 'Direct Phone', value: '+974 70605494 / +974 74080005' },
    { icon: Mail, label: 'Email Address', value: 'jazatrading@gmail.com' },
    { icon: Clock, label: 'Working Hours', value: 'Sat – Thu: 8:00 AM – 6:00 PM (Friday Closed)' },
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
        <div className="flex flex-col bg-white text-slate-900 font-sans min-h-screen">

            {/* ══ 1. HERO BANNER ARCH (Matching Front Page Design) ══════════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pt-3 pb-8">
                <div className="max-w-7xl mx-auto bg-[#0B132B] rounded-3xl overflow-hidden relative text-white p-8 sm:p-14 min-h-[380px] flex flex-col justify-between shadow-xl">
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
                            CONTACT & ENQUIRIES • QATAR
                        </span>
                        <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            JAZA TRADING W.L.L
                        </span>
                    </div>

                    <div className="my-6 z-10 max-w-2xl">
                        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                            Let’s build<br />
                            <span className="text-slate-200">something together.</span>
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Have a project in mind or bulk building material requirements? Send us your enquiry and our Qatar sales team will get back to you promptly.
                        </p>
                    </div>

                    <div className="z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <span>FAST WHOLESALE QUOTES</span>
                        <span>WE RESPOND WITHIN 1 BUSINESS DAY</span>
                    </div>
                </div>
            </section>

            {/* ══ 2. MAIN CONTACT & FORM SECTION ══════════════════════════════ */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Left Info Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">GET IN TOUCH</span>
                                <div className="w-12 h-px bg-slate-300" />
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Contact Information
                            </h2>
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                Reach out directly via phone, email, or visit our facility in Qatar's Industrial Area.
                            </p>

                            <div className="space-y-4 pt-2">
                                {contactItems.map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4 shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#007AFF] flex items-center justify-center shrink-0 mt-0.5">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">{item.label}</span>
                                            <p className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">{item.value}</p>
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
                                    <p className="text-emerald-100 text-xs">+974 70605494 / +974 74080005</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Right RFQ Form */}
                        <div className="lg:col-span-7 bg-[#EBF1F8] p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-black text-slate-900 mb-1">Send an Enquiry</h2>
                            <p className="text-slate-600 text-xs mb-6">Fill out your requirement details below for a wholesale quote.</p>

                            {success ? (
                                <div className="text-center py-10">
                                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Enquiry Submitted Successfully!</h3>
                                    <p className="text-slate-600 text-xs mb-6">Our Qatar sales team will contact you within 1 business day.</p>
                                    <button onClick={() => setSuccess(false)} className="px-6 py-2.5 rounded-full bg-[#0B132B] text-white text-xs font-bold">
                                        Send Another Enquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Name *</label>
                                            <input required name="name" type="text" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Company</label>
                                            <input name="company" type="text" value={form.company} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="Company Name" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email *</label>
                                            <input required name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="email@company.com" />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone</label>
                                            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="+974 70605494" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Subject</label>
                                        <input name="subject" type="text" value={form.subject} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:border-[#007AFF] outline-none" placeholder="Building Material Wholesale Order" />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Message / Requirements *</label>
                                        <textarea required name="message" rows={4} value={form.message} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs resize-none focus:border-[#007AFF] outline-none" placeholder="Enter product names, quantities, or specific project requirements..." />
                                    </div>

                                    {error && <p className="text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-200">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-full bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                                    >
                                        {loading ? 'Submitting...' : <>Request a Quote <ArrowRight className="w-4 h-4 text-white" /></>}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;
