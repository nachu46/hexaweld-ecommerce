import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, Package, Tag, ShieldCheck, 
    Image, Megaphone, MessageSquare, BarChart3, 
    Users, ExternalLink, Plus
} from 'lucide-react';

const ADMIN_LINKS = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Tag },
    { label: 'Partner Brands', path: '/admin/brands', icon: ShieldCheck },
    { label: 'Banners', path: '/admin/banners', icon: Image },
    { label: 'Promos', path: '/admin/announcement', icon: Megaphone },
    { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Admin Users', path: '/admin/admins', icon: Users },
];

const AdminNav = ({ title, subtitle, actionLink, actionLabel, actionIcon: ActionIcon = Plus }) => {
    const location = useLocation();

    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Title Bar */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B15E2B] bg-[#ECE8E0] px-2.5 py-1 rounded-md border border-[#D5CFCE]">
                                Jaza Admin Portal
                            </span>
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-[#1C1B17] tracking-tight mt-1">
                            {title || 'Admin Management'}
                        </h1>
                        {subtitle && (
                            <p className="text-slate-500 text-xs font-medium mt-0.5">{subtitle}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            to="/"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D5CFCE] hover:border-[#B15E2B] bg-white text-[#1C1B17] font-bold text-xs transition-all shadow-xs"
                            title="View Live Store"
                        >
                            <span>Live Shop</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#B15E2B]" />
                        </Link>

                        {actionLink && actionLabel && (
                            <Link
                                to={actionLink}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B15E2B] hover:bg-[#8E4920] text-white font-bold text-xs transition-all shadow-xs"
                            >
                                <ActionIcon className="w-3.5 h-3.5" />
                                <span>{actionLabel}</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Horizontal Sub-nav Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
                    {ADMIN_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path || 
                            (link.path !== '/admin/dashboard' && location.pathname.startsWith(link.path));

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-[#B15E2B] text-white shadow-xs'
                                        : 'text-slate-700 hover:text-[#B15E2B] hover:bg-[#ECE8E0]'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default AdminNav;
