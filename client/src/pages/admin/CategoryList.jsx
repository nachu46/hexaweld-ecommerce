import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Trash2, Plus, Upload, Image, X, Edit2, Check, Loader2 } from 'lucide-react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [newName, setNewName] = useState('');
    const [newImage, setNewImage] = useState('');        // URL of uploaded image
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editId, setEditId] = useState(null);       // category being edited
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-black text-[#0F172A] mb-7">Manage Categories</h1>

            {/* Alerts */}
            {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}
            {success && <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg text-sm">{success}</div>}

            {/* ── Add Category Form ── */}
            <div className="card rounded-xl shadow-card-lg p-6 mb-8">
                <h2 className="text-base font-bold text-[#0F172A] mb-5">Add New Category</h2>
                <form onSubmit={createHandler} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                            Category Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. Welding Machines"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">Category Image</label>
                        <div className="flex items-start gap-4">
                            {/* Preview */}
                            <div className="w-20 h-20 rounded-xl bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {newImage
                                    ? <img src={newImage} alt="preview" className="w-full h-full object-contain p-1" />
                                    : <Image className="w-7 h-7 text-[#CBD5E1]" />
                                }
                            </div>

                            <div className="flex-1 space-y-2">
                                {/* Upload button */}
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
                                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#E2E8F0] hover:border-[#007AFF] text-[#64748B] hover:text-[#007AFF] text-sm font-semibold rounded-lg transition-all duration-200"
                                >
                                    {uploading
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
                                        : <><Upload className="w-4 h-4" /> Upload Image</>
                                    }
                                </button>

                                {/* Manual URL input */}
                                <input
                                    type="text"
                                    className="input text-xs"
                                    placeholder="Or paste image URL…"
                                    value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                />

                                {newImage && (
                                    <button type="button" onClick={() => setNewImage('')} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600">
                                        <X className="w-3 h-3" /> Clear image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary">
                        <Plus className="w-4 h-4" /> Add Category
                    </button>
                </form>
            </div>

            {/* ── Categories Table ── */}
            <div className="card rounded-xl shadow-card overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">Image</th>
                            <th className="px-5 py-3 text-left text-xs font-bold text-[#64748B] uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 text-right text-xs font-bold text-[#64748B] uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                        {categories.map((cat) => (
                            <tr key={cat._id} className="hover:bg-[#F8FAFC] transition-colors">
                                {/* Image cell */}
                                <td className="px-5 py-3">
                                    {editId === cat._id ? (
                                        <div className="flex flex-col gap-1.5 w-36">
                                            <div className="w-14 h-14 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center overflow-hidden">
                                                {editImage
                                                    ? <img src={editImage} alt="cat" className="w-full h-full object-contain p-1" />
                                                    : <Image className="w-5 h-5 text-[#CBD5E1]" />
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
                                                className="flex items-center gap-1 text-[10px] font-semibold text-[#007AFF] hover:underline"
                                            >
                                                {editUploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                                {editUploading ? 'Uploading…' : 'Change image'}
                                            </button>
                                            <input
                                                type="text"
                                                className="input text-[10px] py-1"
                                                placeholder="Or paste URL"
                                                value={editImage}
                                                onChange={(e) => setEditImage(e.target.value)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center overflow-hidden">
                                            {cat.image
                                                ? <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-1" />
                                                : <Image className="w-5 h-5 text-[#CBD5E1]" />
                                            }
                                        </div>
                                    )}
                                </td>

                                {/* Name cell */}
                                <td className="px-5 py-3">
                                    {editId === cat._id ? (
                                        <input
                                            type="text"
                                            className="input text-sm"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold text-[#0F172A]">{cat.name}</span>
                                    )}
                                </td>

                                {/* Actions cell */}
                                <td className="px-5 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {editId === cat._id ? (
                                            <>
                                                <button
                                                    onClick={() => saveEdit(cat._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-all"
                                                >
                                                    <Check className="w-3.5 h-3.5" /> Save
                                                </button>
                                                <button
                                                    onClick={() => setEditId(null)}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-xs font-semibold rounded-lg hover:border-[#94A3B8] transition-all"
                                                >
                                                    <X className="w-3.5 h-3.5" /> Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => startEdit(cat)}
                                                    className="p-1.5 text-[#64748B] hover:text-[#007AFF] hover:bg-slate-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteHandler(cat._id)}
                                                    className="p-1.5 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
                                <td colSpan={3} className="text-center py-10 text-[#94A3B8] text-sm">
                                    No categories yet — add one above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
