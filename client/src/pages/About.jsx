import { ArrowRight, Phone, Mail, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const ourBrands = [
    { name: 'TORK®', sub: 'Electricals, Power Tools & Accessories', desc: 'Cordless drills, cutting discs, tool kits and wall switches.' },
    { name: 'EUREX®', sub: 'Lock Cylinders & Door Handles', desc: 'Euro profile lock cylinders, stainless handles and mortise lock bodies.' },
    { name: 'NEXT®', sub: 'Hand Tools & Painting Accessories', desc: 'Hammers, pliers, screwdrivers, tape measures and rollers.' },
    { name: 'MARK SAFETY PRO®', sub: 'Safety Boots & PPE', desc: 'CE EN ISO certified S3 steel toe safety boots, helmets and gloves.' },
    { name: 'CLEXO®', sub: 'Sanitaryware & Faucets', desc: 'Ceramic wash basins, shower heads and chrome mixer taps.' },
    { name: 'TENZO®', sub: 'Power Tools & Machinery', desc: 'Angle grinders, brushless impact drills and generators.' },
];

const partnerBrands = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM Coatings & Chemicals', 'Jotun', 'Mas Paints', 'Makita', 'Edon'
];

const values = [
    { title: 'Reliability', text: 'On-time deliveries and well-managed stock across Qatar.' },
    { title: 'Quality', text: 'Certified tools, cylinders and materials built for real site conditions.' },
    { title: 'Value', text: 'Direct wholesale pricing for contractors and traders.' },
    { title: 'Service', text: 'Dedicated B2B support and quick order processing.' },
];

const Heading = ({ children }) => (
    <>
        <h2 className="text-3xl sm:text-4xl font-semibold">{children}</h2>
        <div className="h-1 w-14 bg-[#111111] mt-4 mb-8" />
    </>
);

const About = () => {
    return (
        <div className="flex flex-col bg-white text-[#111111]">

            <PageBanner page="about"
                title="About Us"
                subtitle="Supplying Qatar’s construction and industrial sector with quality building materials since 2009."
            />

            {/* Company */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <img
                        src="/jaza_executive_office.jpg"
                        alt="Jaza Trading office, Doha"
                        className="w-full h-[440px] object-cover rounded"
                    />
                    <div>
                        <Heading>Building materials wholesaler in Qatar</Heading>
                        <p className="text-neutral-600 leading-relaxed">
                            Established in Qatar in 2009, Jaza Trading W.L.L is a division of Sana Group and a wholesaler of industrial hardware, electricals, safety footwear, door locks and sanitaryware.
                        </p>
                        <p className="text-neutral-600 leading-relaxed mt-4">
                            Over the years we have built a reputation for reliability, quality, competitive pricing and lasting customer relationships. With more than 15 years in the Qatar market, we understand what contractors need and supply the right products at the right value.
                        </p>
                        <p className="text-neutral-600 leading-relaxed mt-4">
                            Our goal is to deliver quality and dependable service while building long-term partnerships with contractors, trading companies and industrial clients across the country.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & mission */}
            <section className="py-16 sm:py-24 bg-[#F5F5F5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 sm:p-10 rounded border border-[#E5E5E5]">
                        <Eye className="w-9 h-9" strokeWidth={1.5} />
                        <h3 className="text-2xl font-semibold mt-5 mb-3">Our Vision</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            To become a leading and future-ready building materials company in Qatar, contributing to the country’s development through innovation, quality and excellence.
                        </p>
                    </div>
                    <div className="bg-white p-8 sm:p-10 rounded border border-[#E5E5E5]">
                        <Target className="w-9 h-9" strokeWidth={1.5} />
                        <h3 className="text-2xl font-semibold mt-5 mb-3">Our Mission</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            To provide quality building materials at competitive prices with responsive service — understanding our customers’ needs and being a company they trust, remember and choose again.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Heading>Our Core Values</Heading>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#111111]">
                        {values.map((v, i) => (
                            <div key={v.title} className={`py-8 sm:pr-8 ${i > 0 ? 'lg:pl-8 lg:border-l border-[#E5E5E5]' : ''}`}>
                                <p className="text-sm text-neutral-400">0{i + 1}</p>
                                <h3 className="text-xl font-semibold mt-2">{v.title}</h3>
                                <p className="text-neutral-600 text-sm leading-relaxed mt-2">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-16 sm:py-24 bg-[#F5F5F5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Heading>Our Own Brands</Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ourBrands.map((b) => (
                            <div key={b.name} className="bg-white p-7 rounded border border-[#E5E5E5]">
                                <p className="text-xl font-bold">{b.name}</p>
                                <p className="text-sm text-neutral-500 mt-1">{b.sub}</p>
                                <p className="text-neutral-600 text-sm leading-relaxed mt-4">{b.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#D4D4D4]">
                        <p className="font-semibold mb-4">We also distribute</p>
                        <div className="flex flex-wrap gap-2">
                            {partnerBrands.map((pb) => (
                                <span key={pb} className="text-sm px-4 py-2 bg-white rounded-xl border border-[#E5E5E5]">{pb}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 sm:py-20 bg-[#111111] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-semibold !text-white">Partner with Jaza Trading</h2>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-6 text-neutral-300 text-sm">
                            <a href="tel:+97470605494" className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" /> +974 7060 5494 / +974 7408 0005</a>
                            <a href="mailto:jazatrading@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="w-4 h-4" /> jazatrading@gmail.com</a>
                        </div>
                    </div>
                    <Link
                        to="/contact"
                        className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded bg-white text-[#111111] text-sm font-semibold hover:bg-neutral-200 transition-colors self-start lg:self-auto"
                    >
                        Request Wholesale Pricing <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
