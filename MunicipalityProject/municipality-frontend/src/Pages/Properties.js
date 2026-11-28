import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [owners, setOwners] = useState([]);

    const [formData, setFormData] = useState({
        ownerId: '',
        address: '',
        propertyType: ''
    });

    const [editingId, setEditingId] = useState(null);

    // Fetch Properties
    const fetchProperties = async () => {
        try {
            const response = await api.get('/Properties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error loading properties:', error);
        }
    };

    // Fetch Owners
    const fetchOwners = async () => {
        try {
            const response = await api.get('/Owners');
            setOwners(response.data);
        } catch (error) {
            console.error('Error loading owners:', error);
        }
    };

    // Load data when page opens
    useEffect(() => {
        fetchProperties();
        fetchOwners();
    }, []);

    // Handle form inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update Property
    const handleSubmit = async (e) => {
        e.preventDefault();

        const propertyData = {
            ownerId: Number(formData.ownerId),
            address: formData.address || null,
            propertyType: formData.propertyType || null
        };

        try {
            if (editingId !== null) {
                // Update Property
                await api.put(`/Properties/${editingId}`, {
                    propertyId: editingId,
                    ...propertyData
                });
            } else {
                // Add Property
                await api.post('/Properties', propertyData);
            }

            handleCancel();
            fetchProperties();

        } catch (error) {
            console.error('Error saving property:', error);
            alert('Error saving property. Check the API connection.');
        }
    };

    // Edit Property
    const handleEdit = (property) => {
        setFormData({
            ownerId: property.ownerId.toString(),
            address: property.address || '',
            propertyType: property.propertyType || ''
        });

        setEditingId(property.propertyId);
    };

    // Delete Property
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await api.delete(`/Properties/${id}`);
                fetchProperties();
            } catch (error) {
                console.error('Error deleting property:', error);
                alert('Unable to delete property.');
            }
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setFormData({
            ownerId: '',
            address: '',
            propertyType: ''
        });

        setEditingId(null);
    };

    return (
        <div className="container-fluid">

            {/* Page Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Properties Management</h2>
                    <p className="text-muted">
                        Manage municipal properties and property owners
                    </p>
                </div>
            </div>

            {/* Property Form */}
            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-white py-3">
                    <h5 className="mb-0">
                        {editingId !== null
                            ? 'Edit Property'
                            : 'Add New Property'}
                    </h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            {/* Owner */}
                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Property Owner
                                </label>

                                <select
                                    name="ownerId"
                                    className="form-select"
                                    value={formData.ownerId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Owner
                                    </option>

                                    {owners.map((owner) => (
                                        <option
                                            key={owner.ownerId}
                                            value={owner.ownerId}
                                        >
                                            {owner.ownerName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Address */}
                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Property Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter property address"
                                />
                            </div>

                            {/* Property Type */}
                            <div className="col-md-4 mb-3">
                                <label className="form-label">
                                    Property Type
                                </label>

                                <select
                                    name="propertyType"
                                    className="form-select"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Property Type
                                    </option>

                                    <option value="Residential">
                                        Residential
                                    </option>

                                    <option value="Commercial">
                                        Commercial
                                    </option>

                                    <option value="Industrial">
                                        Industrial
                                    </option>

                                    <option value="Agricultural">
                                        Agricultural
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={owners.length === 0}
                            >
                                {editingId !== null
                                    ? 'Update Property'
                                    : 'Save Property'}
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

                        {owners.length === 0 && (
                            <div className="text-warning mt-3">
                                Please register an owner before adding a property.
                            </div>
                        )}

                    </form>

                </div>
            </div>

            {/* Properties Table */}
            <div className="card shadow-sm border-0">

                <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Properties List</h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th>Property ID</th>
                                    <th>Owner</th>
                                    <th>Address</th>
                                    <th>Property Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {properties.map((property) => (
                                    <tr key={property.propertyId}>

                                        <td>
                                            {property.propertyId}
                                        </td>

                                        <td>
                                            {property.owner?.ownerName ||
                                                owners.find(
                                                    o => o.ownerId === property.ownerId
                                                )?.ownerName ||
                                                `Owner #${property.ownerId}`}
                                        </td>

                                        <td>
                                            {property.address || '-'}
                                        </td>

                                        <td>
                                            {property.propertyType || '-'}
                                        </td>

                                        <td>
                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => handleEdit(property)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleDelete(property.propertyId)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}

                                {properties.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center text-muted"
                                        >
                                            No properties found.
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

export default Properties;