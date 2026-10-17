import { useEffect, useState } from 'react';
import axios from 'axios';

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=75`;

// Pages with an image banner at the top. The admin can replace any image;
// if they haven't, the default below is used.
export const PAGE_BANNERS = [
    { key: 'about', label: 'About Us', default: '/jaza_office_reception.jpg' },
    { key: 'products', label: 'Products', default: u('photo-1504148455328-c376907d081c') },
    { key: 'categories', label: 'Product Categories', default: u('photo-1581092160607-ee22621dd758') },
    { key: 'brands', label: 'Our Brands', default: u('photo-1504307651254-35680f356dfd') },
    { key: 'certificates', label: 'Certificates', default: '/jaza_executive_office.jpg' },
    { key: 'services', label: 'Services', default: u('photo-1504328345606-18bbc8c9d7d1') },
    { key: 'industries', label: 'Industries', default: u('photo-1504307651254-35680f356dfd') },
    { key: 'career', label: 'Careers', default: u('photo-1621905251189-08b45d6a269e') },
    { key: 'faq', label: 'FAQ', default: u('photo-1589939705384-5185137a7f0f') },
    { key: 'contact', label: 'Contact Us', default: '/qatar_katara_towers.png' },
    { key: 'checkout', label: 'Checkout', default: u('photo-1504148455328-c376907d081c') },
    { key: 'policies', label: 'Policy pages (Privacy, Terms, Shipping, Returns)', default: '/jaza_executive_office.jpg' },
];

export const defaultBannerFor = (key) => PAGE_BANNERS.find((p) => p.key === key)?.default || '';

// Custom images set in the admin panel, fetched once and shared by every page
let cache = null;
let inflight = null;
const listeners = new Set();

export const loadPageBanners = (force = false) => {
    if (cache && !force) return Promise.resolve(cache);
    if (inflight && !force) return inflight;
    inflight = axios.get('/api/page-banners')
        .then(({ data }) => (data && typeof data === 'object' ? data : {}))
        .catch(() => ({}))
        .then((map) => {
            cache = map;
            inflight = null;
            listeners.forEach((fn) => fn(map));
            return map;
        });
    return inflight;
};

export const usePageBanners = () => {
    const [map, setMap] = useState(cache || {});
    useEffect(() => {
        listeners.add(setMap);
        loadPageBanners().then(setMap);
        return () => listeners.delete(setMap);
    }, []);
    return map;
};
