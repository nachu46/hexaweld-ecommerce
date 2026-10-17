import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRight, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, ShieldCheck, Truck, BadgeCheck, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Reveal, RevealGroup, RevealItem, CountUp } from '../components/Reveal';
import { getImageUrl } from '../utils/getImageUrl';

const EASE = [0.22, 1, 0.36, 1];

const FALLBACK_SLIDES = [
    {
        title: 'Building materials supplier in Qatar',
        subtitle: 'Electricals, power tools, door hardware, sanitaryware and safety products — supplied wholesale to contractors since 2009.',
        buttonText: 'View Products',
        buttonLink: '/products',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    },
    {
        title: 'Tools and hardware for every site',
        subtitle: 'Our own brands TORK®, TENZO®, EUREX® and NEXT® alongside leading names like Makita and Jotun.',
        buttonText: 'View Brands',
        buttonLink: '/brands',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1920&q=80',
    },
    {
        title: 'Jaza Trading W.L.L',
        subtitle: 'A division of Sana Group, serving Qatar’s construction and industrial sector from Street 5, Industrial Area.',
        buttonText: 'About Us',
        buttonLink: '/about',
        image: '/jaza_office_reception.jpg',
    },
];

const OWN_BRANDS = [
    { name: 'TORK®', cat: 'Electricals & power tools' },
    { name: 'EUREX®', cat: 'Locks & door hardware' },
    { name: 'NEXT®', cat: 'Hand tools & painting' },
    { name: 'MARK SAFETY PRO®', cat: 'Safety shoes & PPE' },
    { name: 'CLEXO®', cat: 'Sanitaryware' },
    { name: 'TENZO®', cat: 'Power tools & machinery' },
];

const DISTRIBUTED_BRANDS = [
    'Vini-Tape', 'Oryx Paints', 'Tenby', 'National Paints', 'Total', 'EBM Coatings & Chemicals', 'Jotun', 'Mas Paints', 'Makita', 'Edon'
];

const CATEGORIES = [
    {
        title: 'Power & Hand Tools',
        categoryQuery: 'Electricals,%20Power%20Tools%20%26%20Accessories',
        img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Door Hardware',
        categoryQuery: 'Lock%20Cylinder,%20Door%20Handles%20%26%20Lock%20Body',
        img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Painting Accessories',
        categoryQuery: 'Hand%20Tools%20%26%20Painting%20Accessories',
        img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Safety & PPE',
        categoryQuery: 'Safety%20Shoes%20%26%20Safety%20Products',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Sanitaryware',
        categoryQuery: 'Sanitary%20Wares',
        img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'Power Machinery',
        categoryQuery: 'Power%20Tools%20%26%20Machineries',
        img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    },
];

const STATS = [
    { value: '2009', label: 'Established in Qatar', static: true },
    { value: '10,000+', label: 'Products in stock' },
    { value: '16+', label: 'Brands supplied' },
    { value: '500+', label: 'Project clients' },
];

const VALUES = [
    { icon: Handshake, title: 'Reliability', text: 'Consistent stock and on-time delivery to site, project after project.' },
    { icon: BadgeCheck, title: 'Quality', text: 'Genuine products from certified manufacturers with full warranty.' },
    { icon: ShieldCheck, title: 'Value', text: 'Competitive wholesale pricing for contractors and resellers.' },
    { icon: Truck, title: 'Service', text: 'A responsive sales team and our own delivery fleet across Qatar.' },
];

const CONTACT_ROWS = [
    { icon: MapPin, content: <span>Al Kassarat Street, Industrial Area, Street 5<br /><span className="text-neutral-500">P.O. Box 31221, Doha, Qatar</span></span> },
    { icon: Phone, content: <span><a href="tel:+97470605494" className="hover:underline">+974 7060 5494</a> / <a href="tel:+97474080005" className="hover:underline">+974 7408 0005</a></span> },
    { icon: Mail, content: <a href="mailto:jazatrading@gmail.com" className="hover:underline break-all">jazatrading@gmail.com</a> },
    { icon: Clock, content: <span>Saturday – Thursday, 7:00 AM – 7:00 PM</span> },
];


// Short black bar under headings that draws in from the left (or centre)
const Underline = ({ center = false, delay = 0.25 }) => (
    <motion.div
        className={`h-1 w-14 bg-[#111111] rounded-full mt-4 ${center ? 'mx-auto' : ''}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: EASE }}
        style={{ originX: center ? 0.5 : 0 }}
    />
);

const SectionTitle = ({ title, text, align = 'left' }) => (
    <Reveal className={`mb-8 sm:mb-10 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}>
        <h2 className="text-[28px] sm:text-4xl font-semibold text-[#111111] leading-tight">{title}</h2>
        <Underline center={align === 'center'} />
        {text && <p className="text-neutral-600 mt-5 leading-relaxed">{text}</p>}
    </Reveal>
);

const SLIDE_MS = 6000;

const heroItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Slides glide in from the side they're coming from
const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%' }),
    center: { x: 0, transition: { duration: 0.9, ease: EASE } },
    exit: (dir) => ({ x: dir > 0 ? '-35%' : '35%', opacity: 0.4, transition: { duration: 0.9, ease: EASE } }),
};

const HeroSlider = ({ slides }) => {
    const [[index, dir], setState] = useState([0, 1]);
    const [paused, setPaused] = useState(false);
    const reduce = useReducedMotion();
    const count = slides.length;
    const safeIndex = count ? index % count : 0;
    const active = slides[safeIndex] || slides[0];

    const go = (step) => setState(([i]) => [(i + step + count) % count, step]);
    const goTo = (i) => setState(([cur]) => [i, i >= cur ? 1 : -1]);

    // autoplay; restarts the timer whenever the slide changes
    useEffect(() => {
        if (count < 2 || paused) return;
        const t = setTimeout(() => go(1), SLIDE_MS);
        return () => clearTimeout(t);
    }, [count, paused, safeIndex]);

    return (
        <section
            className="relative h-[540px] sm:h-[620px] bg-[#111111] overflow-hidden select-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence initial={false} custom={dir}>
                <motion.div
                    key={safeIndex}
                    custom={dir}
                    variants={reduce ? undefined : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                    drag={count > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(e, { offset, velocity }) => {
                        if (offset.x < -60 || velocity.x < -400) go(1);
                        else if (offset.x > 60 || velocity.x > 400) go(-1);
                    }}
                >
                    {/* slow zoom while the slide is showing */}
                    <motion.img
                        src={getImageUrl(active.image)}
                        alt=""
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={reduce ? false : { scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
                            <motion.div
                                className="max-w-2xl text-white"
                                initial={reduce ? false : 'hidden'}
                                animate="show"
                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}
                            >
                                {count > 1 && (
                                    <motion.p variants={heroItem} className="text-sm text-neutral-300 mb-4 tabular-nums">
                                        {String(safeIndex + 1).padStart(2, '0')} <span className="text-neutral-500">/ {String(count).padStart(2, '0')}</span>
                                    </motion.p>
                                )}
                                <motion.h1 variants={heroItem} className="text-[34px] leading-[1.15] sm:text-6xl sm:leading-tight font-semibold !text-white">
                                    {active.title}
                                </motion.h1>
                                {active.subtitle && (
                                    <motion.p variants={heroItem} className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-neutral-200 leading-relaxed">
                                        {active.subtitle}
                                    </motion.p>
                                )}
                                <motion.div variants={heroItem} className="mt-7 sm:mt-8 flex flex-wrap gap-3">
                                    <Link
                                        to={active.buttonLink || '/products'}
                                        className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-lg bg-white text-[#111111] text-sm font-semibold hover:bg-neutral-200 transition-colors"
                                    >
                                        {active.buttonText || 'View Products'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-lg border border-white/60 text-white text-sm font-semibold hover:bg-white hover:text-[#111111] transition-colors"
                                    >
                                        Get a Quote
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {count > 1 && (
                <>
                    <button onClick={() => go(-1)} aria-label="Previous slide" className="hidden md:flex absolute z-10 left-5 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/40 text-white bg-black/10 hover:bg-white hover:text-[#111111] transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => go(1)} aria-label="Next slide" className="hidden md:flex absolute z-10 right-5 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/40 text-white bg-black/10 hover:bg-white hover:text-[#111111] transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* progress bars: the current one fills up until the next slide */}
                    <div className="absolute z-10 bottom-7 left-0 right-0">
                        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex gap-2">
                            {slides.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className="relative h-1 flex-1 max-w-[90px] rounded-full bg-white/30 overflow-hidden"
                                >
                                    {i < safeIndex && <span className="absolute inset-0 bg-white" />}
                                    {i === safeIndex && (
                                        <motion.span
                                            key={`${safeIndex}-${paused}`}
                                            className="absolute inset-y-0 left-0 bg-white"
                                            initial={{ width: paused ? '100%' : '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: paused ? 0 : SLIDE_MS / 1000, ease: 'linear' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

const Home = () => {
    const [dynamicBrands, setDynamicBrands] = useState([]);
    const [slides, setSlides] = useState(FALLBACK_SLIDES);

    useEffect(() => {
        axios.get('/api/brands')
            .then(({ data }) => { if (Array.isArray(data) && data.length > 0) setDynamicBrands(data); })
            .catch((err) => console.error('Failed to load brands:', err));

        axios.get('/api/banners')
            .then(({ data }) => {
                const fromAdmin = (Array.isArray(data) ? data : [])
                    .map((b) => ({
                        title: b.title,
                        subtitle: b.subtitle,
                        buttonText: b.buttonText || 'View Products',
                        buttonLink: b.buttonLink || b.linkUrl || '/products',
                        image: b.image || b.imageUrl,
                    }))
                    .filter((b) => b.image && b.title);
                if (fromAdmin.length > 0) setSlides(fromAdmin);
            })
            .catch(() => { });
    }, []);

    const brands = dynamicBrands.length > 0 ? dynamicBrands : OWN_BRANDS;

    return (
        <div className="flex flex-col bg-white text-[#111111] overflow-x-hidden w-full">

            <HeroSlider slides={slides} />

            {/* Welcome */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-12 items-center">
                    <Reveal x={-30} y={0}>
                        <p className="text-neutral-500 text-lg">Welcome to</p>
                        <h2 className="text-[28px] sm:text-4xl font-semibold mt-1">Jaza Trading W.L.L</h2>
                        <Underline delay={0.3} />
                        <p className="text-neutral-600 mt-6 leading-relaxed">
                            Established in Qatar in 2009, Jaza Trading W.L.L is a wholesaler of construction and industrial building supplies and a division of Sana Group. We supply electricals, door hardware, lock cylinders, hand and power tools, sanitaryware and safety products to contractors, resellers and facility managers across the country.
                        </p>
                        <p className="text-neutral-600 mt-4 leading-relaxed">
                            Our aim is simple: quality materials at competitive prices, backed by a sales team that answers the phone and a warehouse that has the stock.
                        </p>
                        <Link to="/about" className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#111111] text-white text-sm font-semibold hover:bg-[#333333] transition-colors">
                            Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Reveal>

                    <Reveal x={30} y={0} delay={0.1} className="relative pb-6 sm:pb-0">
                        <div className="overflow-hidden rounded-2xl">
                            <motion.img
                                src="/jaza_executive_office.jpg"
                                alt="Jaza Trading office"
                                className="w-full h-[320px] sm:h-[440px] object-cover"
                                initial={{ scale: 1.15 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease: EASE }}
                            />
                        </div>
                        <motion.div
                            className="absolute -bottom-2 sm:-bottom-6 left-4 sm:-left-6 bg-[#111111] text-white px-6 py-5 sm:px-7 sm:py-6 rounded-xl shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
                        >
                            <p className="text-4xl sm:text-5xl font-bold leading-none"><CountUp value="15+" /></p>
                            <p className="text-sm text-neutral-300 mt-2">Years of experience<br />in the Qatar market</p>
                        </motion.div>
                    </Reveal>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-[#111111] text-white">
                <RevealGroup className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <RevealItem
                            key={s.label}
                            className={`py-9 sm:py-10 px-3 text-center border-white/10 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
                        >
                            <p className="text-3xl sm:text-4xl font-bold">{s.static ? s.value : <CountUp value={s.value} />}</p>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-2">{s.label}</p>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </section>

            {/* Products */}
            <section className="py-16 sm:py-24 bg-[#F5F5F5]">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between md:gap-6">
                        <SectionTitle
                            title="Our Products"
                            text="From the first fix to the final handover — a full range of building materials stocked in our Doha warehouse."
                        />
                        <Reveal className="hidden md:block mb-10">
                            <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-[#111111] pb-1">
                                View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Reveal>
                    </div>

                    <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {CATEGORIES.map((cat) => (
                            <RevealItem key={cat.title}>
                                <Link
                                    to={`/products?category=${cat.categoryQuery}`}
                                    className="group relative block h-44 sm:h-72 overflow-hidden rounded-xl sm:rounded-2xl bg-[#111111]"
                                >
                                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                                        <h3 className="text-[15px] sm:text-xl font-semibold !text-white leading-snug">{cat.title}</h3>
                                        <span className="mt-1 sm:mt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-200 group-hover:text-white">
                                            View More <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            </RevealItem>
                        ))}
                    </RevealGroup>

                    <Reveal className="md:hidden mt-8 text-center">
                        <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#111111] text-white text-sm font-semibold">
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Brands */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <SectionTitle
                        title="Our Brands"
                        text="Our own trademarks, plus authorised distribution of leading paint, tool and chemical brands."
                        align="center"
                    />

                    <RevealGroup className="flex flex-wrap justify-center gap-3 sm:gap-4" stagger={0.06}>
                        {brands.map((item) => {
                            const name = item.name;
                            const logoUrl = item._id && item.logo ? getImageUrl(item.logo) : null;
                            return (
                                <RevealItem key={item._id || name} className="w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(16.666%-14px)]">
                                    <Link
                                        to={`/products?brand=${encodeURIComponent(name.replace('®', ''))}`}
                                        className="group h-28 sm:h-32 flex flex-col items-center justify-center p-4 rounded-xl border border-[#E5E5E5] bg-white text-center hover:border-[#111111] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                                    >
                                        {logoUrl ? (
                                            <img src={logoUrl} alt={name} className="max-h-12 max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition" />
                                        ) : (
                                            <>
                                                <span className="font-bold text-sm sm:text-base text-[#111111]">{name}</span>
                                                {item.cat && <span className="text-xs text-neutral-500 mt-1">{item.cat}</span>}
                                            </>
                                        )}
                                    </Link>
                                </RevealItem>
                            );
                        })}
                    </RevealGroup>

                    <Reveal className="mt-10 text-center">
                        <p className="text-sm text-neutral-500 mb-4">Also distributing</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {DISTRIBUTED_BRANDS.map((b) => (
                                <Link
                                    key={b}
                                    to={`/products?brand=${encodeURIComponent(b)}`}
                                    className="text-sm text-neutral-700 px-4 py-2 rounded-full border border-[#E5E5E5] hover:border-[#111111] hover:text-[#111111] transition-colors"
                                >
                                    {b}
                                </Link>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Core values */}
            <section className="py-16 sm:py-24 bg-[#F5F5F5]">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <SectionTitle title="Our Core Values" align="center" />
                    <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {VALUES.map(({ icon: Icon, title, text }) => (
                            <RevealItem key={title} className="h-full">
                                <div className="group h-full bg-white p-5 sm:p-8 rounded-2xl border border-[#E5E5E5] hover:border-[#111111] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#F5F5F5] group-hover:bg-[#111111] flex items-center justify-center transition-colors duration-300">
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#111111] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold mt-4 sm:mt-5">{title}</h3>
                                    <p className="text-[13px] sm:text-sm text-neutral-600 mt-1.5 sm:mt-2 leading-relaxed">{text}</p>
                                </div>
                            </RevealItem>
                        ))}
                    </RevealGroup>
                </div>
            </section>

            {/* Location */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
                    <div>
                        <SectionTitle
                            title="Visit Our Showroom"
                            text="Our warehouse and showroom in Doha’s Industrial Area hold over 10,000 product lines, ready for collection or delivery to site."
                        />
                        <RevealGroup className="space-y-4 text-sm">
                            {CONTACT_ROWS.map(({ icon: Icon, content }, i) => (
                                <RevealItem key={i} className="flex gap-4 items-start">
                                    <span className="w-10 h-10 shrink-0 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <span className="pt-2.5 min-w-0">{content}</span>
                                </RevealItem>
                            ))}
                        </RevealGroup>
                        <Reveal delay={0.2}>
                            <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#111111] text-white text-sm font-semibold hover:bg-[#333333] transition-colors">
                                Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Reveal>
                    </div>

                    <Reveal delay={0.15} scale={0.96} y={20} className="min-h-[320px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-[#E5E5E5]">
                        <iframe
                            title="Jaza Trading location"
                            src="https://maps.google.com/maps?q=Street%205%2C%20Industrial%20Area%2C%20Doha%2C%20Qatar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-full min-h-[320px] sm:min-h-[360px] border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Home;
