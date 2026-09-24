import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, ExternalLink, Download, Eye, X, ZoomIn, CheckCircle2, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CERTIFICATES = [
    {
        id: 'tork',
        title: 'TORK® - Trademark Registration Certificate',
        sub: 'Hand Tools, Cutlery & Precision Equipment',
        brand: 'Tork (The Power Partner)',
        authority: 'State of Qatar • Ministry of Economy & Commerce',
        regNo: '94497',
        classNo: 'Class 8',
        issueDate: '23/12/2015',
        entity: 'Jaza Trading W.L.L (شركة جزاء للتجارة ذ.م.م)',
        image: '/certificates/cert_tork.png',
        desc: 'Official registered trademark in Qatar for Tork hand tools, cutting implements, and professional mechanical equipment.'
    },
    {
        id: 'clexo',
        title: 'CLEXO® - Trademark Registration Certificate',
        sub: 'Sanitaryware, Plumbing & Water Supply Systems',
        brand: 'Clexo (Design For Life!)',
        authority: 'State of Qatar • Ministry of Economy & Commerce',
        regNo: '95988',
        classNo: 'Class 11',
        issueDate: '23/12/2015',
        entity: 'Jaza Trading W.L.L (شركة جزاء للتجارة ذ.م.م)',
        image: '/certificates/cert_clexo.png',
        desc: 'Official Qatar government registration for Clexo sanitary fittings, water supply fixtures, and heating/ventilation apparatus.'
    },
    {
        id: 'eurex',
        title: 'EUREX® - Trademark Registration Certificate',
        sub: 'Architectural Door Locks & Building Hardware',
        brand: 'Eurex (Perfection By Design)',
        authority: 'State of Qatar • Ministry of Economy & Commerce',
        regNo: '105093',
        classNo: 'Class 6',
        issueDate: '15/03/2017',
        entity: 'Jaza Trading W.L.L (شركة جزاء للتجارة ذ.م.م)',
        image: '/certificates/cert_eurex.png',
        desc: 'Qatar Ministry registration for Eurex door locks, cylinders, architectural handles, hinges, and metal hardware.'
    },
    {
        id: 'mark-safety',
        title: 'MARK SAFETY PRO® - Trademark Registration Certificate',
        sub: 'PPE Safety Gear & Personal Protective Equipment',
        brand: 'MARK Safety Pro',
        authority: 'State of Qatar • Ministry of Commerce & Industry',
        regNo: '189663',
        classNo: 'Class 9',
        issueDate: '24/11/2025',
        validity: '24/11/2035',
        entity: 'Jaza Trading W.L.L (شركة جزاء للتجارة)',
        image: '/certificates/cert_mark_safety_pro.png',
        desc: 'Official registration for Mark Safety Pro industrial helmets, high-visibility clothing, safety boots, and PPE equipment.'
    },
    {
        id: 'tenzo',
        title: 'TENZO PROFESSIONAL® - Trademark Registration Certificate',
        sub: 'Power Tools, Generators & Industrial Welders',
        brand: 'TENZO Professional',
        authority: 'State of Qatar • Ministry of Commerce & Industry',
        regNo: '185584',
        classNo: 'Class 7',
        issueDate: '01/05/2025',
        validity: '01/05/2035',
        entity: 'Jaza Trading W.L.L (شركة جزاء للتجارة)',
        image: '/certificates/cert_tenzo.png',
        desc: 'Official Qatar trademark for Tenzo power machinery, industrial welding machines, generators, and heavy-duty workshop tools.'
    }
];

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <div className="bg-[#F6F4EE] text-[#1C1B17] font-sans min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Banner */}
                <div className="pb-8 border-b border-[#E5E0D8] space-y-6">
                    <div className="max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B15E2B]/10 text-[#B15E2B] text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Official Government Accreditation</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1B17] tracking-tight leading-tight">
                            Trademark Registrations & Quality Certificates
                        </h1>
                        <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                            Jaza Trading W.L.L operates under full compliance with the State of Qatar Ministry of Commerce & Industry and Ministry of Economy & Commerce. All key product brands distributed by Jaza Trading are officially registered trademarks in Qatar.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-[#E5E0D8] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div className="bg-white/80 p-3 rounded-2xl border border-[#E5E0D8]">
                            <p className="text-2xl font-serif font-bold text-[#B15E2B]">5+</p>
                            <p className="text-[11px] font-bold text-[#1C1B17]">Registered Brands</p>
                        </div>
                        <div className="bg-white/80 p-3 rounded-2xl border border-[#E5E0D8]">
                            <p className="text-2xl font-serif font-bold text-[#B15E2B]">100%</p>
                            <p className="text-[11px] font-bold text-[#1C1B17]">MOCI Verified</p>
                        </div>
                        <div className="bg-white/80 p-3 rounded-2xl border border-[#E5E0D8]">
                            <p className="text-2xl font-serif font-bold text-[#B15E2B]">State of Qatar</p>
                            <p className="text-[11px] font-bold text-[#1C1B17]">Jurisdiction</p>
                        </div>
                        <div className="bg-white/80 p-3 rounded-2xl border border-[#E5E0D8]">
                            <p className="text-2xl font-serif font-bold text-[#B15E2B]">15+ Yrs</p>
                            <p className="text-[11px] font-bold text-[#1C1B17]">Market Trust</p>
                        </div>
                    </div>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CERTIFICATES.map((cert) => (
                        <div
                            key={cert.id}
                            className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                        >
                            {/* Certificate Image Preview */}
                            <div className="relative bg-[#FAF9F5] p-4 border-b border-[#E5E0D8] aspect-[3/4] flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setSelectedCert(cert)}>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-[#1C1B17]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
                                        className="p-3 bg-white text-[#1C1B17] rounded-full shadow-lg font-bold text-xs flex items-center gap-1.5 hover:bg-[#B15E2B] hover:text-white transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>View Document</span>
                                    </button>
                                </div>
                                <span className="absolute top-3 left-3 bg-[#B15E2B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                                    {cert.classNo}
                                </span>
                            </div>

                            {/* Info Box */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <div className="flex items-center gap-1.5 text-[#B15E2B] text-[10px] font-bold uppercase tracking-wider mb-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        <span>{cert.authority}</span>
                                    </div>
                                    <h3 className="font-serif font-bold text-lg text-[#1C1B17] leading-tight">
                                        {cert.brand}
                                    </h3>
                                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                                        {cert.sub}
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                                        {cert.desc}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-slate-600 font-medium">
                                    <div>
                                        <span className="text-slate-400">Reg No:</span> <strong className="text-[#1C1B17]">{cert.regNo}</strong>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCert(cert)}
                                        className="text-[#B15E2B] font-bold inline-flex items-center gap-1 hover:underline"
                                    >
                                        <span>Full Details</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal View for Enlarged Certificate */}
                <AnimatePresence>
                    {selectedCert && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1B17]/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#E5E0D8]"
                            >
                                {/* Left Image Display */}
                                <div className="md:w-1/2 bg-[#FAF9F5] p-6 flex items-center justify-center overflow-auto border-b md:border-b-0 md:border-r border-[#E5E0D8] relative min-h-[300px]">
                                    <img
                                        src={selectedCert.image}
                                        alt={selectedCert.title}
                                        className="max-h-[75vh] w-auto object-contain rounded-lg shadow-md"
                                    />
                                    <a
                                        href={selectedCert.image}
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-full text-[#1C1B17] hover:text-[#B15E2B] shadow-md border border-[#E5E0D8] transition-colors"
                                        title="Download High-Res Image"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                </div>

                                {/* Right Document Meta & Details */}
                                <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-6 overflow-y-auto">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-[#B15E2B]/10 text-[#B15E2B] text-[11px] font-bold uppercase tracking-wider">
                                                {selectedCert.classNo} • Official Certificate
                                            </span>
                                            <button
                                                onClick={() => setSelectedCert(null)}
                                                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-serif font-bold text-[#1C1B17]">
                                                {selectedCert.title}
                                            </h2>
                                            <p className="text-xs text-slate-500 font-medium mt-1">
                                                {selectedCert.authority}
                                            </p>
                                        </div>

                                        <div className="space-y-2 bg-[#F6F4EE] p-4 rounded-2xl border border-[#E5E0D8] text-xs">
                                            <div className="flex justify-between py-1 border-b border-[#E5E0D8]">
                                                <span className="text-slate-500">Registered Owner:</span>
                                                <span className="font-bold text-[#1C1B17]">{selectedCert.entity}</span>
                                            </div>
                                            <div className="flex justify-between py-1 border-b border-[#E5E0D8]">
                                                <span className="text-slate-500">Trademark Reg No:</span>
                                                <span className="font-bold text-[#B15E2B]">{selectedCert.regNo}</span>
                                            </div>
                                            <div className="flex justify-between py-1 border-b border-[#E5E0D8]">
                                                <span className="text-slate-500">Registration Date:</span>
                                                <span className="font-bold text-[#1C1B17]">{selectedCert.issueDate}</span>
                                            </div>
                                            {selectedCert.validity && (
                                                <div className="flex justify-between py-1">
                                                    <span className="text-slate-500">Protection Expiry:</span>
                                                    <span className="font-bold text-[#1C1B17]">{selectedCert.validity}</span>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {selectedCert.desc}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between gap-3">
                                        <a
                                            href={selectedCert.image}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-colors shadow-xs"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Download Certificate</span>
                                        </a>
                                        <button
                                            onClick={() => setSelectedCert(null)}
                                            className="px-5 py-3 rounded-xl border border-[#D5CFCE] hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Certificates;
