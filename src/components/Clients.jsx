// Clients.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  UserPlus,
  Mail,
  Phone,
  Building2,
  ChevronDown,
  X,
  RefreshCw,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  User,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Download,
  Printer,
  Filter,
  Check
} from 'lucide-react';

// ============================================================
// COMPONENTE SELECT PERSONALIZZATO
// ============================================================
const Select = ({ options, value, onChange, label, placeholder, dropdownZIndex = 50 }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);

  const GREEN = '#709467';
  const GREEN_MID = '#5e7b5b';
  const GREEN_MUTE = '#9aaa96';
  const GREEN_BTN = '#8CA386';

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          height: '40px',
          padding: '0 14px',
          borderRadius: '10px',
          border: `1.5px solid ${open ? GREEN_BTN : 'rgba(140,163,134,0.30)'}`,
          background: open ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          fontSize: '13px',
          color: GREEN_MID,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 1px 6px rgba(74,99,69,0.07)',
          transition: 'border-color 0.18s, background 0.18s',
          whiteSpace: 'nowrap',
          minWidth: '130px',
        }}
      >
        {label && (
          <span style={{ fontSize: '11px', color: GREEN_MUTE, flexShrink: 0 }}>
            {label}:
          </span>
        )}
        <span style={{ flex: 1, fontWeight: 500, textAlign: 'left' }}>
          {selected?.label ?? placeholder ?? 'Seleziona'}
        </span>
        <ChevronDown
          size={13}
          color={GREEN_BTN}
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s',
            flexShrink: 0
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '46px',
            left: 0,
            zIndex: dropdownZIndex,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '5px',
            boxShadow: '0 8px 32px rgba(74,99,69,0.13), 0 2px 8px rgba(74,99,69,0.06)',
            border: '1px solid rgba(140,163,134,0.22)',
            minWidth: '100%',
          }}
        >
          {options.map(opt => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: active ? 'rgba(140,163,134,0.13)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  textAlign: 'left',
                  color: active ? GREEN : GREEN_MID,
                  fontWeight: active ? 600 : 400,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) e.currentTarget.style.background = 'rgba(140,163,134,0.07)';
                }}
                onMouseLeave={e => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ width: '14px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {active && <Check size={12} color={GREEN} />}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================================
// COMPONENTE DRAWER
// ============================================================
const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          style={{
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[480px] max-w-[90vw] z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(140,163,134,0.15)',
          boxShadow: '-8px 0 40px rgba(74,99,69,0.1)'
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(140,163,134,0.10)' }}>
          <h2 className="text-xl font-semibold" style={{ color: '#3A3A3A' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-[#8CA386]/10"
            style={{ color: '#5E7B5B' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          {children}
        </div>
      </div>
    </>
  );
};

// ============================================================
// COMPONENTE CLIENTI
// ============================================================
const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('tutti');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const c = {
    greenPrimary: '#709467',
    greenLight: '#8BA882',
    greenBtn: '#8CA386',
    greenBtnHover: '#7A9174',
    greenBtnText: '#FFFFFF',
    greenSubtitle: '#5E7B5B',
    formBg: '#F7F7F7',
    inputBorder: '#D1D1D1',
    inputBorderFocus: '#8CA386',
    inputBorderError: '#E57373',
    inputText: '#3A3A3A',
    placeholderText: '#AAAAAA',
    cardShadow: '0 8px 40px rgba(74, 99, 69, 0.18)'
  };

  // Dati clienti
  const clients = [
    {
      id: 1,
      nome: 'GreenEnergy Srl',
      referente: 'Mario Rossi',
      email: 'mario.rossi@greenenergy.it',
      telefono: '+39 02 1234 567',
      strutture: 3,
      status: 'attivo',
      dataIscrizione: '15/01/2024',
      indirizzo: 'Via Roma 123, Milano',
      settore: 'Energia',
      note: 'Cliente premium dal 2024'
    },
    {
      id: 2,
      nome: 'AgriTech Spa',
      referente: 'Laura Bianchi',
      email: 'laura.bianchi@agritech.it',
      telefono: '+39 045 9876 543',
      strutture: 2,
      status: 'attivo',
      dataIscrizione: '22/03/2024',
      indirizzo: 'Via delle Serre 45, Verona',
      settore: 'Agricoltura',
      note: 'Specializzato in serre hi-tech'
    },
    {
      id: 3,
      nome: 'Zootech Italia',
      referente: 'Paolo Verdi',
      email: 'paolo.verdi@zootech.it',
      telefono: '+39 051 4567 890',
      strutture: 1,
      status: 'inattivo',
      dataIscrizione: '10/06/2024',
      indirizzo: 'Via Campagna 67, Bologna',
      settore: 'Zootecnia',
      note: 'In fase di configurazione'
    },
    {
      id: 4,
      nome: 'EcoBuilding Srl',
      referente: 'Anna Neri',
      email: 'anna.neri@ecobuilding.it',
      telefono: '+39 011 2345 678',
      strutture: 4,
      status: 'attivo',
      dataIscrizione: '05/02/2024',
      indirizzo: 'Via Verde 89, Torino',
      settore: 'Edilizia',
      note: 'Cliente strategico'
    },
    {
      id: 5,
      nome: 'Serre Moderne SAS',
      referente: 'Giuseppe Gialli',
      email: 'giuseppe.gialli@serremoderne.it',
      telefono: '+39 081 8765 432',
      strutture: 1,
      status: 'inattivo',
      dataIscrizione: '18/07/2024',
      indirizzo: 'Via dei Fiori 12, Napoli',
      settore: 'Agricoltura',
      note: 'Nuovo cliente'
    },
    {
      id: 6,
      nome: 'SmartFarm Srl',
      referente: 'Francesca Blu',
      email: 'francesca.blu@smartfarm.it',
      telefono: '+39 049 3456 789',
      strutture: 2,
      status: 'attivo',
      dataIscrizione: '30/04/2024',
      indirizzo: 'Via Agricola 34, Padova',
      settore: 'Agricoltura 4.0',
      note: 'Utilizza AI avanzata'
    }
  ];

  // Filtra clienti
  const filteredClients = clients.filter(client => {
    const matchSearch = client.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        client.referente.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'tutti' || client.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // KPI Stats
  const kpiStats = [
    {
      label: 'Totale Clienti',
      value: clients.length,
      icon: <Users size={20} style={{ color: c.greenBtn }} />,
      trend: 'up'
    },
    {
      label: 'Clienti Attivi',
      value: clients.filter(c => c.status === 'attivo').length,
     
      trend: 'up'
    },
    {
      label: 'Clienti Inattivi',
      value: clients.filter(c => c.status === 'inattivo').length,
      icon: <Clock size={20} className="text-warning" />,
      trend: 'neutral'
    },
    {
      label: 'Totale Strutture',
      value: clients.reduce((acc, c) => acc + c.strutture, 0),
     
      trend: 'up'
    }
  ];

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === 'attivo') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span style={{ color: '#059669' }}>Attivo</span>
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <span style={{ color: '#6B7280' }}>Inattivo</span>
        </span>
      );
    }
  };

  // Handle row click
  const handleRowClick = (client) => {
    setSelectedClient(client);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: c.inputText }}>
            Clienti
          </h1>
          <p className="text-sm mt-0.5" style={{ color: c.greenSubtitle }}>
            Gestisci i tuoi clienti e le loro strutture
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setSelectedClient(null);
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: c.greenBtn,
              boxShadow: '0 4px 12px rgba(140, 163, 134, 0.3)'
            }}
          >
            <UserPlus size={18} />
            Nuovo Cliente
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {kpiStats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: c.formBg,
              border: '1px solid #E5E7EB',
              boxShadow: c.cardShadow
            }}
          >
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${c.greenBtn}15` }}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium ${
                stat.trend === 'up' ? 'text-success' :
                stat.trend === 'down' ? 'text-error' :
                'text-gray-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2" style={{ color: c.inputText }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: c.greenSubtitle }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filtri e Ricerca */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative group">
            
            <input
              type="text"
              placeholder="Cerca cliente, referente o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
              style={{
                backgroundColor: c.formBg,
                borderColor: searchQuery ? c.inputBorderFocus : c.inputBorder,
                color: c.inputText,
                boxShadow: searchQuery ? `0 0 0 4px ${c.inputBorderFocus}20` : 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = c.inputBorderFocus;
                e.target.style.boxShadow = `0 0 0 4px ${c.inputBorderFocus}20`;
              }}
              onBlur={(e) => {
                if (!searchQuery) {
                  e.target.style.borderColor = c.inputBorder;
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-300 hover:scale-110"
                style={{ color: c.placeholderText }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            label="Stato"
            placeholder="Tutti gli stati"
            options={[
              { value: 'tutti', label: ' Tutti gli stati' },
              { value: 'attivo', label: ' Attivo' },
              { value: 'inattivo', label: ' Inattivo' }
            ]}
            dropdownZIndex={50}
          />

          {(filterStatus !== 'tutti' || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('tutti');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: `${c.greenBtn}10`,
                color: c.greenBtn,
                border: `1px solid ${c.greenBtn}20`
              }}
            >
              <X size={14} />
              Reset filtri
            </button>
          )}
        </div>
      </div>

      {/* Tabella Clienti */}
      <div className="rounded-xl overflow-hidden" style={{
        backgroundColor: c.formBg,
        border: '1px solid #E5E7EB',
        boxShadow: c.cardShadow
      }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Cliente
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Referente
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Email
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Telefono
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Strutture
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Stato
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider" style={{ color: c.greenSubtitle }}>
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => handleRowClick(client)}
                  onMouseEnter={() => setHoveredRow(client.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: hoveredRow === client.id ? `${c.greenBtn}06` : 'transparent',
                    borderBottom: '1px solid #E5E7EB'
                  }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c.greenBtn}15` }}>
                        <Building2 size={16} style={{ color: c.greenBtn }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: c.inputText }}>
                        {client.nome}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm" style={{ color: c.inputText }}>
                      {client.referente}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm" style={{ color: c.greenSubtitle }}>
                      {client.email}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm" style={{ color: c.greenSubtitle }}>
                      {client.telefono}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{
                      backgroundColor: `${c.greenBtn}10`,
                      color: c.greenBtn
                    }}>
                      {client.strutture}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(client.status)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(client);
                      }}
                      className="p-1.5 rounded-lg transition-all duration-300 hover:scale-110"
                      style={{ color: c.greenSubtitle }}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto mb-4 opacity-20" style={{ color: c.greenBtn }} />
            <h3 className="text-lg font-medium" style={{ color: c.inputText }}>
              Nessun cliente trovato
            </h3>
            <p className="text-sm mt-1" style={{ color: c.greenSubtitle }}>
              Prova a modificare i filtri o crea un nuovo cliente
            </p>
          </div>
        )}

       
      </div>

      {/* Drawer Nuovo Cliente / Dettagli Cliente */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedClient ? 'Dettagli Cliente' : 'Nuovo Cliente'}
      >
        {selectedClient ? (
          // Dettagli Cliente
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b" style={{ borderColor: 'rgba(140,163,134,0.10)' }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${c.greenBtn}15` }}>
                <Building2 size={28} style={{ color: c.greenBtn }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: c.inputText }}>
                  {selectedClient.nome}
                </h3>
                <p className="text-sm" style={{ color: c.greenSubtitle }}>
                  {selectedClient.settore}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${c.greenBtn}05` }}>
                <User size={18} style={{ color: c.greenBtn }} />
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>Referente</p>
                  <p className="text-sm font-medium" style={{ color: c.inputText }}>{selectedClient.referente}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${c.greenBtn}05` }}>
                <Mail size={18} style={{ color: c.greenBtn }} />
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>Email</p>
                  <p className="text-sm font-medium" style={{ color: c.inputText }}>{selectedClient.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${c.greenBtn}05` }}>
                <Phone size={18} style={{ color: c.greenBtn }} />
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>Telefono</p>
                  <p className="text-sm font-medium" style={{ color: c.inputText }}>{selectedClient.telefono}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${c.greenBtn}05` }}>
                <MapPin size={18} style={{ color: c.greenBtn }} />
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>Indirizzo</p>
                  <p className="text-sm font-medium" style={{ color: c.inputText }}>{selectedClient.indirizzo}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${c.greenBtn}05` }}>
                <Building2 size={18} style={{ color: c.greenBtn }} />
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>Strutture</p>
                  <p className="text-sm font-medium" style={{ color: c.inputText }}>{selectedClient.strutture}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${c.greenBtn}05` }}>
                <Calendar size={18} style={{ color: c.greenBtn }} />
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>Data Iscrizione</p>
                  <p className="text-sm font-medium" style={{ color: c.inputText }}>{selectedClient.dataIscrizione}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(140,163,134,0.10)' }}>
              <button
                className="flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: c.greenBtn }}
              >
                Modifica
              </button>
              <button
                className="flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#FEF2F2',
                  color: '#EF4444',
                  border: '1px solid #FECACA'
                }}
              >
                Elimina
              </button>
            </div>
          </div>
        ) : (
          // Form Nuovo Cliente
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
                Nome Cliente
              </label>
              <input
                type="text"
                placeholder="Inserisci il nome del cliente"
                className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: c.formBg,
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => e.target.style.borderColor = c.inputBorderFocus}
                onBlur={(e) => e.target.style.borderColor = c.inputBorder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
                Referente
              </label>
              <input
                type="text"
                placeholder="Inserisci il nome del referente"
                className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: c.formBg,
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => e.target.style.borderColor = c.inputBorderFocus}
                onBlur={(e) => e.target.style.borderColor = c.inputBorder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
                Email
              </label>
              <input
                type="email"
                placeholder="Inserisci l'email"
                className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: c.formBg,
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => e.target.style.borderColor = c.inputBorderFocus}
                onBlur={(e) => e.target.style.borderColor = c.inputBorder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
                Telefono
              </label>
              <input
                type="tel"
                placeholder="Inserisci il telefono"
                className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: c.formBg,
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => e.target.style.borderColor = c.inputBorderFocus}
                onBlur={(e) => e.target.style.borderColor = c.inputBorder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
                Settore
              </label>
              <input
                type="text"
                placeholder="Inserisci il settore"
                className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: c.formBg,
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => e.target.style.borderColor = c.inputBorderFocus}
                onBlur={(e) => e.target.style.borderColor = c.inputBorder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
                Indirizzo
              </label>
              <input
                type="text"
                placeholder="Inserisci l'indirizzo"
                className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: c.formBg,
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => e.target.style.borderColor = c.inputBorderFocus}
                onBlur={(e) => e.target.style.borderColor = c.inputBorder}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: c.greenBtn,
                boxShadow: '0 4px 12px rgba(140, 163, 134, 0.3)'
              }}
            >
              Crea Cliente
            </button>
          </form>
        )}
      </Drawer>

      {/* Animazioni CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Clients;