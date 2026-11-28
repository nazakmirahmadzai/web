import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './services/components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Properties from './Pages/Properties';
import Owners from './Pages/Owners';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Sidebar />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/owners" element={<Owners />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;