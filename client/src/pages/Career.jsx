import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Send, CheckCircle2, AlertCircle, MapPin, Mail, Phone, Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OPEN_POSITIONS = [
    {
        title: 'B2B Sales Engineer - Building Materials',
        location: 'Industrial Area, Doha, Qatar',
        type: 'Full-Time',
        dept: 'Sales & Commercial',
        desc: 'Responsible for driving building materials, electrical tools, and lock cylinder sales to major contracting firms across Qatar.'
    },
    {
        title: 'Warehouse & Inventory Supervisor',
        location: 'Street 5, Industrial Area, Qatar',
        type: 'Full-Time',
        dept: 'Logistics & Warehouse',
        desc: 'Manage stock receiving, inventory dispatch, and heavy machinery organization in our Doha central warehouse.'
    },
    {
        title: 'Heavy Logistics & Delivery Driver',
        location: 'Doha & Regional Qatar',
        type: 'Full-Time',
        dept: 'Transport',
        desc: 'Operate commercial delivery vehicles supplying project sites in Lusail, Al Wakrah, Industrial Area, and West Bay.'
    },
    {
        title: 'Technical Procurement Officer',
        location: 'Industrial Area, Doha, Qatar',
        type: 'Full-Time',
        dept: 'Procurement',
        desc: 'Handle international manufacturer relations, import compliance, and vendor pricing for hardware, tools, and PPE safety gear.'
    }
];

const Career = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', position: 'B2B Sales Engineer', experience: '', coverLetter: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post('/api/enquiries', {
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                productName: `Career Application: ${form.position}`,
                message: `Years of Qatar Experience: ${form.experience}\n\nCover Letter / Background:\n${form.coverLetter}`,
                source: 'career_application'
            });
            setSuccess(true);
            setForm({ name: '', email: '', phone: '', position: 'B2B Sales Engineer', experience: '', coverLetter: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application. Please contact our HR team via WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#F6F4EE] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#1C1B17]">
            <Helmet>
                <title>Careers & Opportunities | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Join the team at Jaza Trading W.L.L, a premier building materials wholesaler in Doha, Qatar. Explore open job positions and apply online." />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Hero Header */}
                <div className="pb-8 border-b border-[#E5E0D8] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <div className="flex items-center gap-2 text-[#B15E2B] text-xs font-bold uppercase tracking-widest">
                            <Briefcase className="w-4 h-4 text-[#B15E2B]" />
                            <span>CAREERS AT JAZA TRADING</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1B17] tracking-tight leading-tight">
                            Build Your Future With Us in Qatar.
                        </h1>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed">
                            Join a leading building materials supplier and division of Sana Group. We offer rewarding career paths, competitive packages, and professional growth in Qatar.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shrink-0 text-center text-xs space-y-2 w-full sm:w-auto shadow-xs">
                        <p className="text-[#B15E2B] font-bold uppercase tracking-wider text-[10px]">Headquarters</p>
                        <p className="font-bold text-sm text-[#1C1B17]">Industrial Area, Street 5, Doha</p>
                        <p className="text-slate-600 font-medium">State of Qatar</p>
                    </div>
                </div>

                {/* Open Positions Grid */}
                <div className="space-y-6">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B15E2B]">CURRENT OPPORTUNITIES</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1B17] mt-1">Open Job Positions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {OPEN_POSITIONS.map((pos) => (
                            <div key={pos.title} className="bg-white rounded-2xl border border-[#E5E0D8] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] font-bold text-[#B15E2B] bg-[#F6F4EE] px-2.5 py-1 rounded-md border border-[#D5CFCE] uppercase tracking-wider">
                                            {pos.dept}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-600 bg-[#ECE8E0] px-2 py-0.5 rounded-md">
                                            {pos.type}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#1C1B17]">{pos.title}</h3>
                                    <p className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                                        <MapPin className="w-3.5 h-3.5 text-[#B15E2B]" /> {pos.location}
                                    </p>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                                        {pos.desc}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setForm(f => ({ ...f, position: pos.title }));
                                        window.scrollTo({ top: document.getElementById('apply-form').offsetTop - 100, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-colors shadow-xs"
                                >
                                    <span>Apply For Position</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form */}
                <div id="apply-form" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs max-w-3xl mx-auto space-y-6">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007AFF]">ONLINE APPLICATION</span>
                        <h2 className="text-2xl font-black text-slate-900 mt-1">Submit Your CV / Application</h2>
                        <p className="text-slate-500 text-xs font-medium mt-1">
                            Fill out the details below and our HR team in Doha will reach out to qualified candidates.
                        </p>
                    </div>

                    {success ? (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                            <h3 className="text-lg font-bold text-emerald-900">Application Received!</h3>
                            <p className="text-xs text-emerald-700 font-medium max-w-md mx-auto">
                                Thank you for applying to Jaza Trading W.L.L. Our HR team will review your application and contact you if your profile matches our requirements.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                            >
                                Submit Another Application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                        Full Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Abdullah Al-Mansoori"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="abdullah@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+974 7060 5494"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                        Select Position <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={form.position}
                                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50"
                                    >
                                        {OPEN_POSITIONS.map(p => (
                                            <option key={p.title} value={p.title}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                    Years of Qatar / Gulf Experience
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 3 years experience in building materials"
                                    value={form.experience}
                                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                    Brief Introduction / Cover Letter
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your background, Qatar ID / NOC status, and technical experience..."
                                    value={form.coverLetter}
                                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4 text-white" />
                                {loading ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Career;
