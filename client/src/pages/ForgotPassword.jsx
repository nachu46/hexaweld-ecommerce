import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSent(true);
        }
    };

    return (
        <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Forgot Password | Jaza Trading W.L.L</title>
            </Helmet>

            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-slate-900">Reset Password</h1>
                    <p className="text-xs text-slate-500 font-medium mt-1">Enter your registered email address to receive password instructions</p>
                </div>

                {sent ? (
                    <div className="p-6 bg-emerald-50 text-emerald-800 text-center rounded-2xl border border-emerald-200 space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h2 className="text-base font-bold">Reset Email Sent!</h2>
                        <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                            Instructions to reset your password have been sent to <strong>{email}</strong>.
                        </p>
                        <Link to="/login" className="inline-block pt-2 text-xs font-bold text-emerald-900 underline">
                            Return to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0B132B]"
                                    placeholder="name@company.qa"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}

                <div className="text-center pt-4 border-t border-slate-100">
                    <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900">
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
