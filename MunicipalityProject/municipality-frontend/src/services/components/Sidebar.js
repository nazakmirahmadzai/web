import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="brand">
                <div className="brand-icon">M</div>
                <div>
                    <h4>Municipality</h4>
                    <small>Management System</small>
                </div>
            </div>

            <div className="menu-label">MAIN MENU</div>

            <NavLink to="/" className="sidebar-link">
                <span>▦</span> Dashboard
            </NavLink>

            <NavLink to="/properties" className="sidebar-link">
                <span>⌂</span> Properties
            </NavLink>

            <NavLink to="/owners" className="sidebar-link">
                <span>♙</span> Owners
            </NavLink>

            <div className="sidebar-footer">
                <div className="admin-avatar">A</div>
                <div>
                    <strong>Administrator</strong>
                    <small>System Admin</small>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;