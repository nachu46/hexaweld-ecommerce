import { MapPin, Phone, Mail, Clock, MessageCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

const Contact = () => (
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
                        <h2 className="text-xl font-bold text-[#0F172A] mb-1">Send us a Message</h2>
                        <p className="text-[#64748B] text-sm mb-6">We reply within 24 hours on business days.</p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Name</label>
                                    <input type="text" id="name" className="input" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Email</label>
                                    <input type="email" id="email" className="input" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Subject</label>
                                <input type="text" id="subject" className="input" placeholder="Product Enquiry" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Message</label>
                                <textarea id="message" rows={5} className="input resize-none" placeholder="How can we help you?" />
                            </div>
                            <button type="button" disabled className="w-full py-3 rounded-lg bg-slate-100 text-[#94A3B8] text-sm font-semibold cursor-not-allowed">
                                Send Message <span className="text-slate-300">(Demo — use WhatsApp below)</span>
                            </button>
                        </form>
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

export default Contact;
