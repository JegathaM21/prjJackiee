import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Search } from 'lucide-react';

const AdminDashboardPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', program: 'LEP', status: 'Applied' });
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/students');
            if (response.ok) {
                const data = await response.json();
                setStudents(data);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' });
            setStudents(students.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const url = isCreating ? 'http://localhost:8080/api/students' : `http://localhost:8080/api/students/${editingId}`;
        const method = isCreating ? 'POST' : 'PUT';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const savedStudent = await response.json();
                if (isCreating) {
                    setStudents([...students, savedStudent]);
                } else {
                    setStudents(students.map(s => s.id === editingId ? savedStudent : s));
                }
                resetForm();
            }
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const startEdit = (student) => {
        setEditingId(student.id);
        setFormData({ name: student.name, email: student.email, program: student.program, status: student.status });
        setIsCreating(false);
    };

    const resetForm = () => {
        setEditingId(null);
        setIsCreating(false);
        setFormData({ name: '', email: '', program: 'LEP', status: 'Applied' });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Internal Program Manager</h1>
                <button 
                    onClick={() => setIsCreating(true)}
                    className="bg-iron-gold text-iron-dark px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-500 transition-colors"
                >
                    <Plus size={20} /> Add Student
                </button>
            </div>

            {/* Form Modal/Inline */}
            {(isCreating || editingId) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-iron-accent p-8 rounded-xl border border-gray-700 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">{isCreating ? 'Add New Student' : 'Edit Student'}</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm text-iron-slate mb-1">Name</label>
                                <input className="w-full bg-iron-dark border border-gray-700 rounded p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm text-iron-slate mb-1">Email</label>
                                <input className="w-full bg-iron-dark border border-gray-700 rounded p-2" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                            </div>
                            <div>
                                <label className="block text-sm text-iron-slate mb-1">Program</label>
                                <select className="w-full bg-iron-dark border border-gray-700 rounded p-2" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
                                    <option value="LEP">Leadership Essentials (LEP)</option>
                                    <option value="Master Class">Master Class</option>
                                    <option value="100 Board Members">100 Board Members</option>
                                    <option value="MBW">Master of Business Warfare</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-iron-slate mb-1">Status</label>
                                <select className="w-full bg-iron-dark border border-gray-700 rounded p-2" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                    <option value="Applied">Applied</option>
                                    <option value="Reviewing">Reviewing</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={resetForm} className="px-4 py-2 text-iron-slate hover:text-white">Cancel</button>
                                <button type="submit" className="bg-iron-gold text-iron-dark px-6 py-2 rounded font-semibold hover:bg-yellow-500">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-iron-accent rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-iron-slate">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Program</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {students.length === 0 && !loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-iron-slate">No students found. Add one to get started.</td>
                                </tr>
                            ) : (
                                students.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="p-4 font-medium">{student.name}</td>
                                        <td className="p-4 text-iron-slate">{student.email}</td>
                                        <td className="p-4">
                                            <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-sm border border-blue-900">{student.program}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-sm border ${
                                                student.status === 'Accepted' ? 'bg-green-900/30 text-green-300 border-green-900' :
                                                student.status === 'Rejected' ? 'bg-red-900/30 text-red-300 border-red-900' :
                                                'bg-yellow-900/30 text-yellow-300 border-yellow-900'
                                            }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => startEdit(student)} className="text-iron-slate hover:text-iron-gold p-1"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(student.id)} className="text-iron-slate hover:text-red-400 p-1"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
