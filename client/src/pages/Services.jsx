import { Helmet } from 'react-helmet-async';
import { Wrench, ShieldCheck, Cpu, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: Wrench,
            title: 'Machinery Repair & Overhaul',
            desc: 'Certified technicians specializing in repairing MIG/TIG/Arc welding machines, generators, and heavy-duty power tools using genuine OEM components.',
            highlights: ['On-site diagnostic inspection', 'Genuine spare parts stock', 'Turnaround within 48 hours'],
        },
        {
            icon: Cpu,
            title: 'Equipment Calibration & Testing',
            desc: 'Annual calibration and performance testing for industrial welding machines and electrical measuring devices compliant with Qatar ISO standards.',
            highlights: ['ISO calibration certificate', 'Precision current/voltage testing', 'Preventive safety audit'],
        },
        {
            icon: ShieldCheck,
            title: 'Safety & PPE Consultation',
            desc: 'Site safety audits and customized Personal Protective Equipment (PPE) packages tailored for Qatar construction and industrial sites.',
            highlights: ['Mark Safety Pro® certified boots', 'Welding helmets & respirators', 'Site-wide compliance assistance'],
        },
        {
            icon: Headphones,
            title: '24/7 Technical Support',
            desc: 'Dedicated technical advisors available for machine setup, electrode selection, gas mixture guidance, and troubleshooting on major job sites.',
            highlights: ['WhatsApp instant support', 'On-call field engineers', 'Product application demos'],
        },
    ];

    return (
        <div className="bg-[#F6F4EE] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#1C1B17]">
            <Helmet>
                <title>Industrial Services & Repair | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Professional welding equipment repair, machine calibration, PPE safety consulting, and technical support in Qatar." />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="pb-8 border-b border-[#E5E0D8]">
                    <span className="text-[#B15E2B] text-xs font-bold uppercase tracking-widest block mb-3">
                        COMPREHENSIVE B2B SOLUTIONS
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1C1B17] mb-4">
                        Industrial Services & Equipment Maintenance
                    </h1>
                    <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                        Beyond supplying top-tier equipment, Jaza Trading W.L.L provides certified technical maintenance, calibration, and safety support for Qatar’s infrastructure.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((s, i) => {
                        const IconComponent = s.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white rounded-3xl p-8 border border-[#E5E0D8] hover:border-[#B15E2B] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-[#ECE8E0] text-[#B15E2B] flex items-center justify-center mb-6 shadow-xs border border-[#E5E0D8]">
                                        <IconComponent className="w-7 h-7 text-[#B15E2B]" />
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-[#1C1B17] mb-3">{s.title}</h2>
                                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                                        {s.desc}
                                    </p>

                                    <div className="space-y-2 mb-8">
                                        {s.highlights.map((h, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                <CheckCircle2 className="w-4 h-4 text-[#B15E2B] shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-between w-full p-4 rounded-2xl bg-[#F6F4EE] hover:bg-[#B15E2B] hover:text-white border border-[#D5CFCE] font-bold text-xs transition-all group"
                                >
                                    <span>Request Service Consultation</span>
                                    <ArrowRight className="w-4 h-4 text-[#B15E2B] group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Services;
