import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Owners() {
    const [owners, setOwners] = useState([]);
    const [formData, setFormData] = useState({
        ownerName: '',
        phone: ''
    });

    const [editingId, setEditingId] = useState(null);

    // Load owners from API
    const fetchOwners = async () => {
        try {
            const response = await api.get('/Owners');
            setOwners(response.data);
        } catch (error) {
            console.error('Error loading owners:', error);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    // Handle form input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update Owner
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId !== null) {
                // Update Owner
                await api.put(`/Owners/${editingId}`, {
                    ownerId: editingId,
                    ownerName: formData.ownerName,
                    phone: formData.phone || null
                });
            } else {
                // Add Owner
                await api.post('/Owners', {
                    ownerName: formData.ownerName,
                    phone: formData.phone || null
                });
            }

            setFormData({
                ownerName: '',
                phone: ''
            });

            setEditingId(null);

            fetchOwners();

        } catch (error) {
            console.error('Error saving owner:', error);
            alert('Error saving owner. Check the API connection.');
        }
    };

    // Edit Owner
    const handleEdit = (owner) => {
        setFormData({
            ownerName: owner.ownerName,
            phone: owner.phone || ''
        });

        setEditingId(owner.ownerId);
    };

    // Delete Owner
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this owner?')) {
            try {
                await api.delete(`/Owners/${id}`);
                fetchOwners();
            } catch (error) {
                console.error('Error deleting owner:', error);
                alert('Unable to delete owner.');
            }
        }
    };

    // Cancel Editing
    const handleCancel = () => {
        setFormData({
            ownerName: '',
            phone: ''
        });

        setEditingId(null);
    };

    return (
        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Owners Management</h2>
                    <p className="text-muted">
                        Manage municipality property owners
                    </p>
                </div>
            </div>

            {/* Owner Form */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white py-3">
                    <h5 className="mb-0">
                        {editingId !== null ? 'Edit Owner' : 'Add New Owner'}
                    </h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Owner Name
                                </label>

                                <input
                                    type="text"
                                    name="ownerName"
                                    className="form-control"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {editingId !== null ? 'Update Owner' : 'Save Owner'}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>
                    </form>

                </div>
            </div>

            {/* Owners Table */}
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Owners List</h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th>Owner ID</th>
                                    <th>Owner Name</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {owners.map((owner) => (
                                    <tr key={owner.ownerId}>
                                        <td>{owner.ownerId}</td>
                                        <td>{owner.ownerName}</td>
                                        <td>{owner.phone || '-'}</td>

                                        <td>
                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => handleEdit(owner)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(owner.ownerId)}
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {owners.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-muted">
                                            No owners found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Owners;