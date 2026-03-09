import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, ChevronRight, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || '';


const contactItems = [
    { icon: MapPin, label: 'Our Location', value: '123 Industrial Area, Welding Zone\nMetal City, 67890', color: 'text-slate-500', bg: 'bg-slate-50' },
    { icon: Phone, label: 'Phone Number', value: '+91 90616 27236', sub: 'Mon–Sat  9am – 6pm', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Mail, label: 'Email Address', value: 'info@hexaweld.com', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 6:00 PM', sub: 'Sunday: Closed', color: 'text-purple-500', bg: 'bg-purple-50' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
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
                message: `Subject: ${form.subject}\n\n${form.message}`,
                source: 'form',
            });
            setSuccess(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setError('Something went wrong. Please try WhatsApp instead.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* ── Breadcrumb ── */}
            <div className="border-b border-white/40 glass-navbar relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-[#64748B]">
                    <span>Home</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#007AFF] font-medium">Contact</span>
                </div>
            </div>

            {/* ── Page Header ── */}
            <div className="py-12 border-b border-white/40 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <p className="section-label mb-2">Contact Us</p>
                        <h1 className="text-4xl font-black text-[#0F172A] mb-2">Get in <span className="text-gradient-orange">Touch</span></h1>
                        <p className="text-[#64748B]">Have a question or bulk order? We'd love to hear from you.</p>
                    </motion.div>
                </div>
            </div>

            {/* ── Main ── */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                            className="card rounded-2xl p-8 shadow-card-lg"
                        >
                            <h2 className="text-xl font-bold text-[#0F172A] mb-1">Request a Quote</h2>
                            <p className="text-[#64748B] text-sm mb-6">We reply within 24 hours on business days.</p>

                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                                >
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0F172A] mb-1">Message Sent!</h3>
                                        <p className="text-[#64748B] text-sm">Our team will get back to you within 24 hours.</p>
                                    </div>
                                    <button onClick={() => setSuccess(false)} className="btn-outline !rounded-full !px-6 !py-2 text-sm">
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Name *</label>
                                            <input required name="name" type="text" value={form.name} onChange={handleChange} className="input" placeholder="Your Name" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Email</label>
                                            <input name="email" type="email" value={form.email} onChange={handleChange} className="input" placeholder="your@email.com" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Phone *</label>
                                            <input required name="phone" type="tel" value={form.phone} onChange={handleChange} className="input" placeholder="+91 98765 43210" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Subject</label>
                                            <input name="subject" type="text" value={form.subject} onChange={handleChange} className="input" placeholder="Product Enquiry" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Message *</label>
                                        <textarea required name="message" rows={5} value={form.message} onChange={handleChange} className="input resize-none" placeholder="Tell us about your requirement, quantities, or any specific questions..." />
                                    </div>

                                    {error && (
                                        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <span className="animate-pulse">Sending...</span>
                                        ) : (
                                            <><Send className="w-4 h-4" /> Send Message</>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* Info + WhatsApp */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex flex-col gap-4"
                        >
                            {contactItems.map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUp}
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.2 }}
                                    className="card card-hover rounded-xl p-5 flex items-start gap-4"
                                >
                                    <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">{item.label}</p>
                                        {item.value.split('\n').map((line, i) => (
                                            <p key={i} className="text-[#0F172A] font-semibold text-sm">{line}</p>
                                        ))}
                                        {item.sub && <p className="text-[#94A3B8] text-xs mt-0.5">{item.sub}</p>}
                                    </div>
                                </motion.div>
                            ))}

                            {/* WhatsApp CTA */}
                            <motion.a
                                variants={fadeUp}
                                href="https://wa.me/919061627236"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-5 bg-[#25D366] hover:bg-[#20BA5A] rounded-xl transition-all duration-300 hover:shadow-lg group"
                            >
                                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                                    <img src="/whatsapp.png" alt="WhatsApp" className="w-auto h-8 object-contain drop-shadow-sm" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-bold">Direct WhatsApp Support</p>
                                    <p className="text-emerald-100 text-sm">Instant response — chat with our team now</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
