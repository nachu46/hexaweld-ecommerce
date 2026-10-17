import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '0px 0px -80px 0px' };

// Fades and lifts its content in the first time it scrolls into view
export const Reveal = ({ children, delay = 0, y = 28, x = 0, scale = 1, className = '' }) => {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y, x, scale }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
};

// Wrap a grid with RevealGroup and its cards with RevealItem to bring them in one after another
export const RevealGroup = ({ children, className = '', stagger = 0.09 }) => {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduce ? false : 'hidden'}
            whileInView="show"
            viewport={VIEWPORT}
            variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
        >
            {children}
        </motion.div>
    );
};

export const RevealItem = ({ children, className = '' }) => (
    <motion.div
        className={className}
        variants={{
            hidden: { opacity: 0, y: 32 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
        }}
    >
        {children}
    </motion.div>
);

// Counts up to a number like "10,000+" when it scrolls into view
export const CountUp = ({ value, className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
    const reduce = useReducedMotion();
    const match = String(value).match(/^([\d,]+)(.*)$/);
    const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
    const suffix = match ? match[2] : '';
    const [display, setDisplay] = useState(target === null || reduce ? value : `0${suffix}`);

    useEffect(() => {
        if (!inView || target === null || reduce) return;
        const controls = animate(0, target, {
            duration: 1.8,
            ease: 'easeOut',
            onUpdate: (v) => setDisplay(`${Math.round(v).toLocaleString('en-US')}${suffix}`),
        });
        return () => controls.stop();
    }, [inView, target, suffix, reduce]);

    return <span ref={ref} className={className}>{display}</span>;
};
