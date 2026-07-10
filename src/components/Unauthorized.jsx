// components/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: '#3A3A3A' }}>
          Accesso Negato
        </h1>
        <p className="text-sm mt-2" style={{ color: '#5E7B5B' }}>
          Non hai i permessi necessari per visualizzare questa pagina.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: '#8CA386' }}
        >
          <ArrowLeft size={18} />
          Torna alla Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;