import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SLOW_AFTER_MS = 5000;

// Thin bar at the top of the page while API requests are running, plus a short
// note when they take a while (the free server can need ~1 minute to wake up).
const ApiProgress = () => {
    const [state, setState] = useState('idle'); // idle | loading | done
    const [slow, setSlow] = useState(false);
    const pending = useRef(0);
    const slowTimer = useRef(null);
    const doneTimer = useRef(null);

    useEffect(() => {
        const start = (config) => {
            pending.current += 1;
            clearTimeout(doneTimer.current);
            setState('loading');
            if (!slowTimer.current) slowTimer.current = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
            return config;
        };
        const finish = () => {
            pending.current = Math.max(0, pending.current - 1);
            if (pending.current === 0) {
                clearTimeout(slowTimer.current);
                slowTimer.current = null;
                setSlow(false);
                setState('done');
                doneTimer.current = setTimeout(() => setState('idle'), 500);
            }
        };
        const req = axios.interceptors.request.use(start, (err) => { finish(); return Promise.reject(err); });
        const res = axios.interceptors.response.use(
            (r) => { finish(); return r; },
            (err) => { finish(); return Promise.reject(err); },
        );
        return () => {
            axios.interceptors.request.eject(req);
            axios.interceptors.response.eject(res);
            clearTimeout(slowTimer.current);
            clearTimeout(doneTimer.current);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {state !== 'idle' && (
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                        <motion.div
                            className="h-full bg-[#111111] rounded-r-full shadow-[0_0_8px_rgba(0,0,0,0.25)]"
                            initial={{ width: '0%' }}
                            animate={{ width: state === 'done' ? '100%' : '85%' }}
                            transition={state === 'done' ? { duration: 0.25 } : { duration: 8, ease: [0.1, 0.6, 0.2, 1] }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {slow && (
                    <motion.div
                        role="status"
                        className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-3 bg-[#111111] text-white text-sm pl-4 pr-5 py-3 rounded-full shadow-lg max-w-[calc(100vw-32px)]"
                        initial={{ opacity: 0, y: 20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="flex gap-1 shrink-0" aria-hidden="true">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-white"
                                    animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                                />
                            ))}
                        </span>
                        <span>Loading… this can take a moment on the first visit.</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ApiProgress;
