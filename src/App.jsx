import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import CropAnalysisPage from './pages/CropAnalysisPage';
import AnalysisProgress from './components/analysis/AnalysisProgress';
import YieldResults from './pages/YieldResults';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/analysis" replace />} />
        <Route path="/analysis" element={<MainLayout><CropAnalysisPage /></MainLayout>} />
        <Route path="/analysis/progress/:processId" element={<MainLayout><AnalysisProgress /></MainLayout>} />
        <Route path="/progress" element={<MainLayout><AnalysisProgress /></MainLayout>} />
        <Route path="/analysis/result/:sectorId" element={<MainLayout><YieldResults /></MainLayout>} />
        <Route path="/result" element={<MainLayout><YieldResults /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
