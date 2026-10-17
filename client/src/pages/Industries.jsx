import { Helmet } from 'react-helmet-async';
import { Building2, Flame, Anchor, HardHat, Factory, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import PageBanner from '../components/PageBanner';
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
        <div className="bg-white min-h-screen text-[#111111]">
            <Helmet>
                <title>Industries We Serve | Jaza Trading W.L.L Qatar</title>
                <meta name="description" content="Industrial equipment supplier for Construction, Oil & Gas, Marine, Fabrication, and Manufacturing sectors in Qatar." />
            </Helmet>
            <PageBanner page="industries" title="Industries We Serve" subtitle="We supply contractors and facilities across Qatar’s main commercial and industrial sectors." />
            <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
{/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {industries.map((ind, i) => {
                        const IconComponent = ind.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white rounded-xl p-8 border border-[#E5E5E5] hover:border-[#111111] transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded bg-[#EDEDED] text-[#111111] flex items-center justify-center border border-[#E5E5E5]">
                                            <IconComponent className="w-6 h-6 text-[#111111]" />
                                        </div>
                                        <span className="text-[10px] font-bold text-[#111111] bg-[#F5F5F5] px-2.5 py-1 rounded border border-[#D4D4D4]">
                                            {ind.tag}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-neutral-900 mb-3">{ind.title}</h2>
                                    <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-6">
                                        {ind.desc}
                                    </p>
                                </div>

                                <Link
                                    to={`/products`}
                                    className="inline-flex items-center justify-between text-xs font-bold text-neutral-900 hover:text-neutral-900 pt-4 border-t border-neutral-100"
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
        </div>
    );
};

export default Industries;
