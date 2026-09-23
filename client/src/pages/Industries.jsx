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
        <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Industries We Serve | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Industrial equipment supplier for Construction, Oil & Gas, Marine, Fabrication, and Manufacturing sectors in Qatar." />
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="bg-[#0B132B] text-white rounded-3xl p-8 sm:p-14 shadow-xl text-center max-w-4xl mx-auto relative overflow-hidden">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-3">
                        SECTOR-SPECIFIC EXPERTISE
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                        Industries We Serve in Qatar
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
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
                                className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-[#0B132B] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0B132B] flex items-center justify-center">
                                            <IconComponent className="w-6 h-6 text-[#0B132B]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
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
