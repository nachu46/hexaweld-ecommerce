import { Helmet } from 'react-helmet-async';
import { Building2, Flame, Anchor, HardHat, Factory, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Industries = () => {
    const industries = [
        {
            icon: Building2,
            title: 'Construction & Civil Engineering',
            desc: 'High-volume building materials, scaffolding fittings, safety shoes, structural fasteners, and power tools for Qatar’s mega infrastructure projects.',
            tag: 'Infrastructure & Commercial',
        },
        {
            icon: Flame,
            title: 'Oil, Gas & Petrochemical',
            desc: 'Certified explosion-proof equipment, heavy-duty MIG welding plants, high-pressure pipe cylinders, and specialized PPE for onshore and offshore rigs.',
            tag: 'Energy & Extraction',
        },
        {
            icon: Anchor,
            title: 'Marine & Offshore Fabrication',
            desc: 'Corrosion-resistant marine hardware, stainless steel lock sets, marine-grade paints, and specialized welding consumables for shipyards.',
            tag: 'Maritime & Port Logistics',
        },
        {
            icon: HardHat,
            title: 'Structural Steel & Metalwork',
            desc: 'Precision TIG/MIG arc welders, plasma cutters, grinding discs, flux-cored wires, and industrial safety helmets for fabrication yards.',
            tag: 'Metal Fabrication',
        },
        {
            icon: Factory,
            title: 'General Industrial Manufacturing',
            desc: 'Complete industrial supply kits, maintenance tools, sanitation fixtures, and electrical accessories for industrial zone factories.',
            tag: 'Manufacturing & MEP',
        },
    ];

    return (
        <div className="bg-[#F6F4EE] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#1C1B17]">
            <Helmet>
                <title>Industries We Serve | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Industrial equipment supplier for Construction, Oil & Gas, Marine, Fabrication, and Manufacturing sectors in Qatar." />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="pb-8 border-b border-[#E5E0D8]">
                    <span className="text-[#B15E2B] text-xs font-bold uppercase tracking-widest block mb-3">
                        SECTOR-SPECIFIC EXPERTISE
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#1C1B17] mb-4">
                        Industries We Serve in Qatar
                    </h1>
                    <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                        Delivering tailored equipment, bulk wholesale supplies, and safety compliance across Qatar’s key commercial and industrial sectors.
                    </p>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {industries.map((ind, i) => {
                        const IconComponent = ind.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white rounded-3xl p-8 border border-[#E5E0D8] hover:border-[#B15E2B] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#ECE8E0] text-[#B15E2B] flex items-center justify-center border border-[#E5E0D8]">
                                            <IconComponent className="w-6 h-6 text-[#B15E2B]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#B15E2B] bg-[#F6F4EE] px-2.5 py-1 rounded border border-[#D5CFCE]">
                                            {ind.tag}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-black text-slate-900 mb-3">{ind.title}</h2>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                                        {ind.desc}
                                    </p>
                                </div>

                                <Link
                                    to={`/products`}
                                    className="inline-flex items-center justify-between text-xs font-bold text-slate-900 hover:text-blue-600 pt-4 border-t border-slate-100"
                                >
                                    <span>Browse Sector Products</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Industries;
