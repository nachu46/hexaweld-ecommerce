import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
    LayoutDashboard, Package, Tag, ShieldCheck, 
    Image, Megaphone, MessageSquare, BarChart3, 
    Users, ExternalLink, Plus, LogOut, Images
} from 'lucide-react';

const ADMIN_LINKS = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Tag },
    { label: 'Partner Brands', path: '/admin/brands', icon: ShieldCheck },
    { label: 'Home Slider', path: '/admin/banners', icon: Image },
    { label: 'Page Banners', path: '/admin/page-banners', icon: Images },
    { label: 'Promos', path: '/admin/announcement', icon: Megaphone },
    { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Admin Users', path: '/admin/admins', icon: Users },
];

const AdminNav = ({ title, subtitle, actionLink, actionLabel, actionIcon: ActionIcon = Plus }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    return (
        <div className="bg-white border-b border-neutral-200 sticky top-0 z-30 mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Title Bar */}
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111] bg-[#EDEDED] px-2.5 py-1 rounded-md border border-[#D4D4D4]">
                                Jaza Admin Portal
                            </span>
                            {user?.name && (
                                <span className="text-xs text-neutral-500 font-medium">
                                    • Logged in as <strong className="text-[#111111]">{user.name}</strong>
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-[#111111] tracking-tight mt-1">
                            {title || 'Admin Management'}
                        </h1>
                        {subtitle && (
                            <p className="text-neutral-500 text-xs font-medium mt-0.5">{subtitle}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            to="/"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-[#D4D4D4] hover:border-[#111111] bg-white text-[#111111] font-bold text-xs transition-all"
                            title="View Live Store"
                        >
                            <span>Live Shop</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#111111]" />
                        </Link>

                        {actionLink && actionLabel && (
                            <Link
                                to={actionLink}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#111111] hover:bg-[#333333] text-white font-bold text-xs transition-all"
                            >
                                <ActionIcon className="w-3.5 h-3.5" />
                                <span>{actionLabel}</span>
                            </Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs transition-all"
                            title="Sign Out of Admin"
                        >
                            <LogOut className="w-3.5 h-3.5 text-rose-600" />
                            <span>Log Out</span>
                        </button>
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
                                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded text-xs font-bold whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-[#111111] text-white '
                                        : 'text-neutral-700 hover:text-[#111111] hover:bg-[#EDEDED]'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
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
