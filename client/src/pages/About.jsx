import { Shield, PenTool, Users, Target, Lightbulb, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
    { icon: Shield, title: 'Safety First', desc: 'All equipment carries top-tier safety certifications and ISO approvals.', color: 'text-slate-500', bg: 'bg-slate-50 border-slate-100' },
    { icon: PenTool, title: 'Premium Quality', desc: 'Only products from manufacturers known for engineering excellence.', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
    { icon: Users, title: 'Expert Support', desc: 'Welding specialists guide you to the perfect product for your application.', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-100' },
    { icon: Target, title: 'Precision', desc: 'Every specification matters — tools engineered to exacting tolerances.', color: 'text-purple-500', bg: 'bg-purple-50 border-purple-100' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Continuously evolving catalogue with the latest welding technology.', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-100' },
    { icon: Globe, title: 'Reliability', desc: 'Trusted by 2,000+ clients from small workshops to large manufacturers.', color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const About = () => (
    <div className="min-h-screen">

        {/* ── Page Header ── */}
        <div className="border-b border-white/40 relative z-10 glass-navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-full uppercase tracking-wider mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" /> Our Story
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-3">
                        About <span className="text-gradient-orange">Hexaweld</span>
                    </h1>
                    <p className="text-[#64748B] text-lg max-w-xl mx-auto">
                        Building the future with precision, strength, and uncompromising quality.
                    </p>
                </motion.div>
            </div>
        </div>

        {/* ── Story Section ── */}
        <section className="py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div className="card shadow-card-lg rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                alt="Welding Workshop"
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-5 flex items-center justify-between border-t border-[#E2E8F0]">
                                <div>
                                    <p className="font-bold text-[#0F172A]">12+ Years</p>
                                    <p className="text-[#64748B] text-sm">of industrial excellence</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-slate-500" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4">
                        <p className="section-label">Our Story</p>
                        <h2 className="text-3xl font-black text-[#0F172A]">Born from a <span className="text-gradient-orange">passion</span> for precision</h2>
                        <p className="text-[#64748B] leading-relaxed">Hexaweld was established with a singular vision: to provide the welding industry with equipment that doesn't just meet standards — it exceeds them. Precision and reliability aren't just features, they're necessities.</p>
                        <p className="text-[#64748B] leading-relaxed">From small workshops to large industrial manufacturing units, we've served a diverse range of clients ensuring they have the best tools for the job. Our commitment to quality has made us a trusted name across the industry.</p>
                        <p className="text-[#64748B] leading-relaxed">We specialise in advanced welding machines, high-grade safety gear, and precision accessories — every product hand-selected for performance and durability.</p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* ── Values Grid ── */}
        <section className="py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="section-label mb-1">Our Values</p>
                    <h2 className="text-3xl font-black text-[#0F172A]">Why choose <span className="text-gradient-orange">Hexaweld?</span></h2>
                </div>
                <motion.div
                    variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {values.map((v) => (
                        <motion.div
                            key={v.title}
                            variants={fadeUp}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="card card-hover p-6 flex flex-col gap-3"
                        >
                            <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                <v.icon className={`w-5 h-5 ${v.color}`} />
                            </div>
                            <h3 className="text-[#0F172A] font-bold">{v.title}</h3>
                            <p className="text-[#64748B] text-sm leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    </div>
);

export default About;
