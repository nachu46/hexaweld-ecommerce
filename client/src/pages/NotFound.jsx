import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight } from 'lucide-react';

const NotFound = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="min-h-[70vh] bg-white flex items-center px-4 py-20">
            <Helmet>
                <title>Page Not Found | Jaza Trading W.L.L</title>
                <meta name="description" content="The page you requested could not be found." />
            </Helmet>

            <div className="max-w-2xl mx-auto w-full">
                <p className="text-8xl sm:text-9xl font-bold text-[#111111] leading-none">404</p>
                <h1 className="text-2xl sm:text-3xl font-semibold mt-6">Page not found</h1>
                <p className="text-neutral-600 mt-3 leading-relaxed">
                    The page you are looking for may have been moved or no longer exists. Try searching our products instead.
                </p>

                <form onSubmit={handleSearch} className="mt-8 flex border border-[#D4D4D4] rounded-xl overflow-hidden focus-within:border-[#111111]">
                    <input
                        type="text"
                        className="w-full px-4 py-3 text-sm focus:outline-none"
                        placeholder="Search tools, hardware, safety items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="bg-[#111111] hover:bg-[#333333] text-white px-5 flex items-center gap-2 text-sm font-medium shrink-0">
                        <Search className="w-4 h-4" /> Search
                    </button>
                </form>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <Link to="/" className="inline-flex items-center gap-1.5 font-medium hover:underline">Home <ArrowRight className="w-4 h-4" /></Link>
                    <Link to="/products" className="inline-flex items-center gap-1.5 font-medium hover:underline">Products <ArrowRight className="w-4 h-4" /></Link>
                    <Link to="/contact" className="inline-flex items-center gap-1.5 font-medium hover:underline">Contact Us <ArrowRight className="w-4 h-4" /></Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
