// App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthProvider from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Unauthorized from './components/Unauthorized';
import Dashboard from '../Dashboard';
import Clients from './components/Clients';
import Strutture from './components/Strutture';
import Allarmi from './components/Allarmi';
import Impostazioni from './components/Impostazioni';
import { ToastContainer } from './components/Toast';
import {
  Menu,
  Bell,
  RefreshCw
} from 'lucide-react';

// Layout interno con Sidebar
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [toasts, setToasts] = useState([]);

  const colors = {
    greenBtn: '#8CA386',
    greenBtnHover: '#7A9174',
    greenBtnText: '#FFFFFF',
    inputText: '#3A3A3A',
    greenSubtitle: '#5E7B5B'
  };

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    // Auto-remove dopo 3 secondi
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard addToast={addToast} />;
      case 'clienti': return <Clients addToast={addToast} />;
      case 'strutture': return <Strutture addToast={addToast} />;
      case 'allarmi': return <Allarmi addToast={addToast} />;
      case 'impostazioni': return <Impostazioni addToast={addToast} />;
      default: return <Dashboard addToast={addToast} />;
    }
  };

  const getPageInfo = () => {
    switch(currentView) {
      case 'dashboard': return { title: null, subtitle: null, showTitle: false };
    
      default: return { title: null, subtitle: null, showTitle: false };
    }
  };

  const Header = () => {
    const pageInfo = getPageInfo();

    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/20 backdrop-blur-sm"
            onClick={() => setIsMobile(true)}
          >
            <Menu size={24} style={{ color: colors.inputText }} />
          </button>
          {pageInfo.showTitle && (
            <div>
              <h1 className="text-2xl font-semibold" style={{ color: colors.inputText }}>
                {pageInfo.title}
              </h1>
              <p className="text-sm mt-0.5" style={{ color: colors.greenSubtitle }}>
                {pageInfo.subtitle}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="p-2 rounded-lg transition-all hover:scale-105 relative"
            style={{ 
              backgroundColor: `${colors.greenBtn}15`,
              color: colors.greenBtn
            }}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-pulse" />
          </button>
          <button 
            className="p-2 rounded-lg transition-all hover:scale-105"
            style={{ 
              backgroundColor: `${colors.greenBtn}15`,
              color: colors.greenBtn
            }}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-background min-h-screen">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="app-content min-h-screen flex">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
          onNavigate={setCurrentView}
          activeView={currentView}
        />
        
        <main className={`
          flex-1 transition-all duration-300
          ${isMobile ? 'ml-0' : 'ml-0'}
          md:ml-20
          ${!sidebarOpen ? 'md:ml-72' : 'md:ml-20'}
        `}>
          <div className="p-4 md:p-6">
            <Header />
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Componente per proteggere le route
const RequireAuth = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#8CA386] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// App principale con routing
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route
            path="/*"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;