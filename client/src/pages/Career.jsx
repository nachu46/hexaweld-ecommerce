import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Send, CheckCircle2, AlertCircle, MapPin, Mail, Phone, Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageBanner from '../components/PageBanner';
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
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Careers & Opportunities | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Join the team at Jaza Trading W.L.L, a premier building materials wholesaler in Doha, Qatar. Explore open job positions and apply online." />
            </Helmet>
            <PageBanner page="career" title="Careers" subtitle="Join the Jaza Trading team in Doha. See current openings below or send us your CV." />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Open Positions Grid */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mt-1">Open Job Positions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {OPEN_POSITIONS.map((pos) => (
                            <div key={pos.title} className="bg-white rounded-xl border border-[#E5E5E5] p-6 transition-all flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-bold text-[#111111] bg-[#F5F5F5] px-2.5 py-1 rounded-md border border-[#D4D4D4]">
                                            {pos.dept}
                                        </span>
                                        <span className="text-[10px] font-bold text-neutral-600 bg-[#EDEDED] px-2 py-0.5 rounded-md">
                                            {pos.type}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#111111]">{pos.title}</h3>
                                    <p className="text-xs text-neutral-500 flex items-center gap-1 font-semibold">
                                        <MapPin className="w-3.5 h-3.5 text-[#111111]" /> {pos.location}
                                    </p>
                                    <p className="text-xs text-neutral-600 leading-relaxed font-medium pt-1">
                                        {pos.desc}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        setForm(f => ({ ...f, position: pos.title }));
                                        window.scrollTo({ top: document.getElementById('apply-form').offsetTop - 100, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-colors"
                                >
                                    <span>Apply For Position</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form */}
                <div id="apply-form" className="bg-white rounded-xl border border-neutral-200 p-6 sm:p-10 max-w-3xl mx-auto space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-neutral-900 mt-1">Submit Your CV / Application</h2>
                        <p className="text-neutral-500 text-xs font-medium mt-1">
                            Fill out the details below and our HR team in Doha will reach out to qualified candidates.
                        </p>
                    </div>

                    {success ? (
                        <div className="p-6 rounded bg-emerald-50 border border-emerald-200 text-center space-y-3">
                            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                            <h3 className="text-lg font-bold text-emerald-900">Application Received!</h3>
                            <p className="text-xs text-emerald-700 font-medium max-w-md mx-auto">
                                Thank you for applying to Jaza Trading W.L.L. Our HR team will review your application and contact you if your profile matches our requirements.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="px-5 py-2 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                            >
                                Submit Another Application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                                        Full Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Abdullah Al-Mansoori"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="abdullah@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+974 7060 5494"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                                        Select Position <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={form.position}
                                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                                    >
                                        {OPEN_POSITIONS.map(p => (
                                            <option key={p.title} value={p.title}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                                    Years of Qatar / Gulf Experience
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 3 years experience in building materials"
                                    value={form.experience}
                                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-600 mb-1.5">
                                    Brief Introduction / Cover Letter
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your background, Qatar ID / NOC status, and technical experience..."
                                    value={form.coverLetter}
                                    onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4 text-white" />
                                {loading ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
        </div>
    );
};

export default Career;
