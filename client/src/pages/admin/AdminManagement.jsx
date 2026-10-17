import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, UserPlus, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AdminNav from '../../components/AdminNav';

const ROLE_BADGES = {
    superadmin: 'bg-purple-50 text-purple-700 border-purple-200',
    admin: 'bg-neutral-50 text-[#111111] border-neutral-200',
    editor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const AdminManagement = () => {
    const { user } = useAuth();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
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
            setError('Failed to load admin accounts list');
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
            setSuccess('New admin account created successfully!');
            setForm({ name: '', email: '', password: '', role: 'admin' });
            fetchAdmins();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create admin');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this admin account?')) return;
        try {
            await axios.delete(`/api/admin/${id}`, authHeader());
            setAdmins((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete admin');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-12">
            <AdminNav 
                title="Admin Team & Roles" 
                subtitle="Manage team members, roles, and administrative access credentials."
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Create Form */}
                <div className="bg-white rounded border border-neutral-200 p-6">
                    <h2 className="text-base font-black text-neutral-900 mb-4 flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-[#111111]" /> Add New Admin Account
                    </h2>

                    {error && <p className="text-rose-600 text-xs font-bold mb-4 bg-rose-50 border border-rose-200 p-3 rounded">{error}</p>}
                    {success && <p className="text-emerald-700 text-xs font-bold mb-4 bg-emerald-50 border border-emerald-200 p-3 rounded">{success}</p>}

                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. Salim Al-Kuwari' },
                            { label: 'Email Address', key: 'email', type: 'email', placeholder: 'salim@jazatrading.com' },
                            { label: 'Account Password', key: 'password', type: 'password', placeholder: '••••••••' },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key}>
                                <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">{label}</label>
                                <input
                                    type={type}
                                    value={form[key]}
                                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    placeholder={placeholder}
                                    required
                                    className="w-full px-3.5 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1.5">Access Role</label>
                            <select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded border border-neutral-200 text-xs font-medium focus:border-neutral-900 focus:outline-none bg-neutral-50/50"
                            >
                                <option value="editor">Editor (Products & Content)</option>
                                <option value="admin">Admin (Full Management)</option>
                                <option value="superadmin">Super Admin (System Owner)</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex justify-end pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                            >
                                <UserPlus className="w-4 h-4 text-neutral-500" /> Create Account
                            </button>
                        </div>
                    </form>
                </div>

                {/* Admins Table */}
                <div className="bg-white rounded border border-neutral-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-100">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="text-left px-6 py-3.5 text-[10px] font-black text-neutral-500 uppercase tracking-wider">User Name</th>
                                <th className="text-left px-6 py-3.5 text-[10px] font-black text-neutral-500 uppercase tracking-wider">Email Address</th>
                                <th className="text-left px-6 py-3.5 text-[10px] font-black text-neutral-500 uppercase tracking-wider">Role</th>
                                <th className="text-right px-6 py-3.5 text-[10px] font-black text-neutral-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-10 text-neutral-400 text-xs font-bold">Loading accounts...</td></tr>
                            ) : admins.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-10 text-neutral-400 text-xs font-bold">No admin accounts found</td></tr>
                            ) : admins.map((a) => (
                                <tr key={a._id} className="hover:bg-neutral-50/60 transition-colors">
                                    <td className="px-6 py-3.5 text-xs font-bold text-neutral-900">{a.name}</td>
                                    <td className="px-6 py-3.5 text-xs font-medium text-neutral-500">{a.email}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${ROLE_BADGES[a.role] || ROLE_BADGES.admin}`}>
                                            {a.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        {a._id !== user?._id && (
                                            <button
                                                onClick={() => handleDelete(a._id)}
                                                className="p-1.5 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                                title="Delete Admin Account"
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
