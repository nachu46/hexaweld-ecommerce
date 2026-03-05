import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ROLE_COLORS = {
    superadmin: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    admin: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
    editor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
};

const AdminManagement = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const authHeader = () => ({
        headers: { Authorization: `Bearer ${user?.token}` },
    });

    const fetchAdmins = async () => {
        try {
            const { data } = await axios.get('/api/admin/list-admins', authHeader());
            setAdmins(data);
        } catch {
            setError('Failed to load admins');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAdmins(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        try {
            await axios.post('/api/admin/create-admin', form, authHeader());
            setSuccess('Admin created successfully!');
            setForm({ name: '', email: '', password: '', role: 'admin' });
            fetchAdmins();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create admin');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this admin?')) return;
        try {
            await axios.delete(`/api/admin/${id}`, authHeader());
            setAdmins((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete admin');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-blue-500" />
                        Admin Management
                    </h1>
                    <p className="text-gray-400 mt-1">Manage admin users and their roles</p>
                </div>

                {/* Create Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
                >
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-500" /> Create New Admin
                    </h2>
                    {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>}
                    {success && <p className="text-emerald-400 text-sm mb-4 bg-emerald-500/10 px-4 py-2 rounded-lg">{success}</p>}
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
                            { label: 'Email', key: 'email', type: 'email', placeholder: 'john@hexaweld.com' },
                            { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key}>
                                <label className="block text-sm text-gray-400 mb-1">{label}</label>
                                <input
                                    type={type}
                                    value={form[key]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    placeholder={placeholder}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Role</label>
                            <select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                            >
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-slate-500 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Create Admin
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Admins Table */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Name</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Email</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Role</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-10 text-gray-500">Loading...</td></tr>
                            ) : admins.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-10 text-gray-500">No admins found</td></tr>
                            ) : admins.map((a) => (
                                <tr key={a._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{a.name}</td>
                                    <td className="px-6 py-4 text-gray-400">{a.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[a.role] || ROLE_COLORS.admin}`}>
                                            {a.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {a._id !== user?._id && (
                                            <button
                                                onClick={() => handleDelete(a._id)}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminManagement;
