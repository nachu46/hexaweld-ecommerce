import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Trash2, Plus, Upload, Image, X, Edit2, Check, Loader2, Tag } from 'lucide-react';
import AdminNav from '../../components/AdminNav';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState('');
    const [newImage, setNewImage] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editImage, setEditImage] = useState('');
    const [editUploading, setEditUploading] = useState(false);
    const fileRef = useRef();
    const editFileRef = useRef();

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        } catch {
            console.error('Error fetching categories');
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const flash = (type, msg) => {
        if (type === 'success') { setSuccess(msg); setError(''); }
        else { setError(msg); setSuccess(''); }
        setTimeout(() => { setSuccess(''); setError(''); }, 3500);
    };

    /* ── Upload helper ── */
    const uploadImage = async (file, setImg, setLoading) => {
        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);
        try {
            const { data } = await axios.post('/api/upload', formData);
            setImg(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${data}`);
        } catch {
            flash('error', 'Image upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /* ── Create ── */
    const createHandler = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        try {
            await axios.post('/api/categories', { name: newName.trim(), image: newImage });
            setNewName('');
            setNewImage('');
            flash('success', 'Category created successfully!');
            fetchCategories();
        } catch (err) {
            flash('error', err.response?.data?.message || 'Error creating category');
        }
    };

    /* ── Delete ── */
    const deleteHandler = async (id) => {
        if (!window.confirm('Delete this category?')) return;
        try {
            await axios.delete(`/api/categories/${id}`);
            fetchCategories();
        } catch {
            flash('error', 'Error deleting category');
        }
    };

    /* ── Edit: start ── */
    const startEdit = (cat) => {
        setEditId(cat._id);
        setEditName(cat.name);
        setEditImage(cat.image || '');
    };

    /* ── Edit: save ── */
    const saveEdit = async (id) => {
        try {
            await axios.put(`/api/categories/${id}`, { name: editName.trim(), image: editImage });
            flash('success', 'Category updated!');
            setEditId(null);
            fetchCategories();
        } catch (err) {
            flash('error', err.response?.data?.message || 'Error updating category');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-12">
            <AdminNav 
                title="Category Management" 
                subtitle="Organize building materials, tools, lock cylinders, and hardware categories."
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                {/* Alerts */}
                {error && <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">{error}</div>}
                {success && <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">{success}</div>}

                {/* Add Category Form */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                    <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#007AFF]" /> Add New Category
                    </h2>
                    <form onSubmit={createHandler} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                                Category Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none bg-slate-50/50"
                                placeholder="e.g. Electricals & Power Tools"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Category Image</label>
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {newImage
                                        ? <img src={newImage} alt="preview" className="w-full h-full object-contain p-1" />
                                        : <Image className="w-6 h-6 text-slate-300" />
                                    }
                                </div>

                                <div className="flex-1 space-y-2">
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files[0]) uploadImage(e.target.files[0], setNewImage, setUploading);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileRef.current.click()}
                                        disabled={uploading}
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-xl transition-all"
                                    >
                                        {uploading
                                            ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
                                            : <><Upload className="w-4 h-4" /> Upload Image</>
                                        }
                                    </button>

                                    <input
                                        type="text"
                                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-slate-900 focus:outline-none"
                                        placeholder="Or paste image URL…"
                                        value={newImage}
                                        onChange={(e) => setNewImage(e.target.value)}
                                    />

                                    {newImage && (
                                        <button type="button" onClick={() => setNewImage('')} className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700">
                                            <X className="w-3.5 h-3.5" /> Clear image
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors">
                            <Plus className="w-4 h-4 text-blue-400" /> Save Category
                        </button>
                    </form>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Image</th>
                                <th className="px-5 py-3 text-left text-[10px] font-black text-slate-500 uppercase tracking-wider">Category Name</th>
                                <th className="px-5 py-3 text-right text-[10px] font-black text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((cat) => (
                                <tr key={cat._id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-5 py-3">
                                        {editId === cat._id ? (
                                            <div className="flex flex-col gap-1.5 w-36">
                                                <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                    {editImage
                                                        ? <img src={editImage} alt="cat" className="w-full h-full object-contain p-1" />
                                                        : <Image className="w-5 h-5 text-slate-300" />
                                                    }
                                                </div>
                                                <input
                                                    ref={editFileRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        if (e.target.files[0]) uploadImage(e.target.files[0], setEditImage, setEditUploading);
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => editFileRef.current.click()}
                                                    disabled={editUploading}
                                                    className="flex items-center gap-1 text-[10px] font-bold text-[#007AFF] hover:underline"
                                                >
                                                    {editUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                                    {editUploading ? 'Uploading…' : 'Change image'}
                                                </button>
                                                <input
                                                    type="text"
                                                    className="px-2 py-1 rounded border border-slate-200 text-[10px]"
                                                    placeholder="Or paste URL"
                                                    value={editImage}
                                                    onChange={(e) => setEditImage(e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                {cat.image
                                                    ? <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-1" />
                                                    : <Image className="w-5 h-5 text-slate-300" />
                                                }
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-5 py-3">
                                        {editId === cat._id ? (
                                            <input
                                                type="text"
                                                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium w-full"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />
                                        ) : (
                                            <span className="text-xs font-bold text-slate-900">{cat.name}</span>
                                        )}
                                    </td>

                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            {editId === cat._id ? (
                                                <>
                                                    <button
                                                        onClick={() => saveEdit(cat._id)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                                                    >
                                                        <Check className="w-3.5 h-3.5" /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditId(null)}
                                                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg"
                                                    >
                                                        <X className="w-3.5 h-3.5" /> Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => startEdit(cat)}
                                                        className="p-1.5 text-slate-600 hover:text-[#007AFF] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteHandler(cat._id)}
                                                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-10 text-slate-400 text-xs font-bold">
                                        No categories defined yet — create one above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
