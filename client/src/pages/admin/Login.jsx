import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import JtLogo from '../../components/JtLogo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useAuth();

    useEffect(() => {
        if (user && user.isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const loggedUser = await login(email, password);
            if (!loggedUser || !loggedUser.isAdmin) {
                setError('Access denied. Administrator privileges required.');
                toast.error('Access denied. Admin account required.');
                setSubmitting(false);
                return;
            }
            toast.success('Welcome back to Jaza Admin Portal!');
            navigate('/admin/dashboard');
        } catch (err) {
            const msg = typeof err === 'string' ? err : 'Invalid email or password';
            setError(msg);
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F4EE] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-6">
                
                {/* Header Logo & Title */}
                <div className="text-center space-y-3">
                    <div className="inline-block">
                        <JtLogo className="h-10 mx-auto" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#B15E2B] bg-[#ECE8E0] px-3 py-1 rounded-md border border-[#E5E0D8]">
                            Authorized Personnel Only
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-[#1C1B17] tracking-tight mt-3">
                            Admin Portal Sign In
                        </h2>
                        <p className="text-slate-500 text-xs font-medium mt-1">
                            Jaza Trading W.L.L Management System
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3.5 rounded-xl">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-xs font-bold text-[#1C1B17] uppercase tracking-wider mb-1.5">
                            Admin Email
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CFCE] text-xs font-medium focus:border-[#B15E2B] focus:outline-none bg-white text-[#1C1B17]"
                                placeholder="admin@jazatrading.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#1C1B17] uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D5CFCE] text-xs font-medium focus:border-[#B15E2B] focus:outline-none bg-white text-[#1C1B17]"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#B15E2B] hover:bg-[#9A5023] transition-colors shadow-sm mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <ShieldCheck className="w-4 h-4 text-white" />
                        {submitting ? 'Authenticating...' : 'Sign In to Admin Panel'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
