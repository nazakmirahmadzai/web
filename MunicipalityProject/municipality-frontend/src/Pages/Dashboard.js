import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h2>Dashboard</h2>
                    <p>Municipality management overview</p>
                </div>
            </div>

            <div className="row g-4 mb-4">

                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-icon property-icon">⌂</div>
                        <div>
                            <p>Total Properties</p>
                            <h3>Property Management</h3>
                            <Link to="/properties">Manage Properties →</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-icon owner-icon">♙</div>
                        <div>
                            <p>Total Owners</p>
                            <h3>Owner Management</h3>
                            <Link to="/owners">Manage Owners →</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="stat-card">
                        <div className="stat-icon payment-icon">$</div>
                        <div>
                            <p>Municipal Revenue</p>
                            <h3>Tax & Payments</h3>
                            <span className="text-muted">
                                Coming soon
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="welcome-card">
                <h4>Welcome to Municipality Management System</h4>

                <p>
                    Manage properties, property owners, municipal taxes
                    and other municipal services from a centralized
                    system.
                </p>

                <div className="mt-4">
                    <Link to="/properties" className="btn btn-primary me-2">
                        Manage Properties
                    </Link>

                    <Link to="/owners" className="btn btn-outline-primary">
                        Manage Owners
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;