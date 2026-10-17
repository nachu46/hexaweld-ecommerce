import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || '';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userData = await login(email, password);
            toast.success('Signed in successfully!');
            if (userData && userData.isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/account');
            }
        } catch (err) {
            const msg = typeof err === 'string' ? err : (err.response?.data?.message || 'Invalid email or password');
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Customer & Portal Login | Jaza Trading W.L.L</title>
            </Helmet>

            <div className="max-w-md w-full bg-white rounded-xl p-8 border border-neutral-200 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900">Welcome Back</h1>
                    <p className="text-xs text-neutral-500 font-medium mt-1">Sign in to your customer profile or admin portal</p>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-xs font-medium focus:outline-none focus:border-[#111111]"
                                placeholder="name@company.qa"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold text-neutral-700">Password</label>
                            <Link to="/forgot-password" className="text-[11px] font-bold text-neutral-900 hover:underline">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded text-xs font-medium focus:outline-none focus:border-[#111111]"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#111111] hover:bg-neutral-800 text-white font-bold text-xs rounded flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="text-center pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-[#111111] hover:underline">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
