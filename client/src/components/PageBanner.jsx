import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageBanners, defaultBannerFor } from '../pageBanners';
import { getImageUrl } from '../utils/getImageUrl';

const EASE = [0.22, 1, 0.36, 1];

// Title band at the top of inner pages. `page` picks the background image,
// which the admin can change under Admin → Page Banners.
const PageBanner = ({ title, subtitle, crumbs = [], page, image }) => {
    const custom = usePageBanners();
    const reduce = useReducedMotion();
    const bg = getImageUrl(image || (page && custom[page]) || defaultBannerFor(page));

    const item = (delay) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: EASE },
    });

    return (
        <section className="relative bg-[#111111] text-white overflow-hidden">
            {bg && (
                <>
                    <motion.img
                        key={bg}
                        src={bg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={reduce ? false : { scale: 1.12, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.6, ease: EASE }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/35" />
                </>
            )}
            <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
                <motion.h1 {...item(0.1)} className="text-[32px] leading-tight sm:text-5xl font-semibold !text-white">
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p {...item(0.2)} className="mt-4 max-w-2xl text-neutral-200 leading-relaxed">
                        {subtitle}
                    </motion.p>
                )}
                <motion.nav {...item(0.3)} className="mt-6 inline-flex flex-wrap items-center gap-1.5 text-sm text-neutral-300 bg-white/10 rounded-full px-4 py-1.5">
                    <Link to="/" className="hover:text-white">Home</Link>
                    {(crumbs.length ? crumbs : [{ label: title }]).map((c) => (
                        <span key={c.label} className="flex items-center gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5" />
                            {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
                        </span>
                    ))}
                </motion.nav>
            </div>
        </section>
    );
};

export default PageBanner;
