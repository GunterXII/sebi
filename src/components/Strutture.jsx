// Strutture.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Building2,
  Search,
  Plus,
  Users,
  Eye,
  MoreVertical,
  ChevronDown,
  X,
  RefreshCw,
  Filter,
  Check,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings as SettingsIcon,
  Zap,
  TrendingUp,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Lightbulb,
} from "lucide-react";
import StructureDetail from "./StructureDetail";
import CreateStructureWizard from "./CreateStructureWizard";

// ============================================================
// COMPONENTE SELECT PERSONALIZZATO
// ============================================================
const Select = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  dropdownZIndex = 50,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  const GREEN = "#709467";
  const GREEN_MID = "#5e7b5b";
  const GREEN_MUTE = "#9aaa96";
  const GREEN_BTN = "#8CA386";

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          height: "40px",
          padding: "0 14px",
          borderRadius: "10px",
          border: `1.5px solid ${open ? GREEN_BTN : "rgba(140,163,134,0.30)"}`,
          background: open
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          fontSize: "13px",
          color: GREEN_MID,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 1px 6px rgba(74,99,69,0.07)",
          transition: "border-color 0.18s, background 0.18s",
          whiteSpace: "nowrap",
          minWidth: "130px",
        }}
      >
        {label && (
          <span style={{ fontSize: "11px", color: GREEN_MUTE, flexShrink: 0 }}>
            {label}:
          </span>
        )}
        <span style={{ flex: 1, fontWeight: 500, textAlign: "left" }}>
          {selected?.label ?? placeholder ?? "Seleziona"}
        </span>
        <ChevronDown
          size={13}
          color={GREEN_BTN}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s",
            flexShrink: 0,
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "46px",
            left: 0,
            zIndex: dropdownZIndex,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "12px",
            padding: "5px",
            boxShadow:
              "0 8px 32px rgba(74,99,69,0.13), 0 2px 8px rgba(74,99,69,0.06)",
            border: "1px solid rgba(140,163,134,0.22)",
            minWidth: "100%",
          }}
        >
          {options.map((opt) => {
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
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: active ? "rgba(140,163,134,0.13)" : "transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                  textAlign: "left",
                  color: active ? GREEN : GREEN_MID,
                  fontWeight: active ? 600 : 400,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!active)
                    e.currentTarget.style.background = "rgba(140,163,134,0.07)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    width: "14px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
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
// COMPONENTE STRUTTURE
// ============================================================
const Strutture = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("tutti");
  const [filterStatus, setFilterStatus] = useState("tutti");
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const c = {
    greenPrimary: "#709467",
    greenLight: "#8BA882",
    greenBtn: "#8CA386",
    greenBtnHover: "#7A9174",
    greenBtnText: "#FFFFFF",
    greenSubtitle: "#5E7B5B",
    formBg: "#F7F7F7",
    inputBorder: "#D1D1D1",
    inputBorderFocus: "#8CA386",
    inputBorderError: "#E57373",
    inputText: "#3A3A3A",
    placeholderText: "#AAAAAA",
    cardShadow: "0 8px 40px rgba(74, 99, 69, 0.18)",
  };

  // Dati strutture
  const structures = [
    {
      id: 1,
      nome: "Edificio A - Milano",
      cliente: "GreenEnergy Srl",
      tipo: "edificio",
      stato: "Live",
      salute: 92,
      risparmio: 12450,
      sensori: 24,
      zone: 8,
      attuatori: 12,
      indirizzo: "Via Roma 123, Milano",
      ultimoAggiornamento: "2 min fa",
      training: "15/01/2024 14:30",
      consumi: [65, 72, 68, 75, 70, 78, 82],
    },
    {
      id: 2,
      nome: "Serra Nord - Verona",
      cliente: "AgriTech Spa",
      tipo: "serra",
      stato: "Live",
      salute: 88,
      risparmio: 8750,
      sensori: 18,
      zone: 4,
      attuatori: 8,
      indirizzo: "Via delle Serre 45, Verona",
      ultimoAggiornamento: "5 min fa",
      training: "12/01/2024 10:00",
      consumi: [55, 60, 58, 62, 65, 58, 55],
    },
    {
      id: 3,
      nome: "Allevamento Bio - Bologna",
      cliente: "Zootech Italia",
      tipo: "allevamento",
      stato: "Simulazione",
      salute: 78,
      risparmio: 5320,
      sensori: 32,
      zone: 6,
      attuatori: 15,
      indirizzo: "Via Campagna 67, Bologna",
      ultimoAggiornamento: "15 min fa",
      training: "10/01/2024 16:45",
      consumi: [80, 85, 78, 82, 79, 75, 72],
    },
    {
      id: 4,
      nome: "Edificio Green - Torino",
      cliente: "EcoBuilding Srl",
      tipo: "edificio",
      stato: "Live",
      salute: 95,
      risparmio: 15200,
      sensori: 28,
      zone: 10,
      attuatori: 14,
      indirizzo: "Via Verde 89, Torino",
      ultimoAggiornamento: "1 min fa",
      training: "18/01/2024 09:00",
      consumi: [45, 48, 52, 50, 47, 43, 40],
    },
    {
      id: 5,
      nome: "Serra Sud - Napoli",
      cliente: "Serre Moderne SAS",
      tipo: "serra",
      stato: "Configurazione",
      salute: 0,
      risparmio: 0,
      sensori: 0,
      zone: 0,
      attuatori: 0,
      indirizzo: "Via dei Fiori 12, Napoli",
      ultimoAggiornamento: "1 ora fa",
      training: "N/A",
      consumi: [0, 0, 0, 0, 0, 0, 0],
    },
    {
      id: 6,
      nome: "Allevamento Avicolo - Padova",
      cliente: "SmartFarm Srl",
      tipo: "allevamento",
      stato: "Live",
      salute: 85,
      risparmio: 9800,
      sensori: 26,
      zone: 5,
      attuatori: 10,
      indirizzo: "Via Agricola 34, Padova",
      ultimoAggiornamento: "3 min fa",
      training: "14/01/2024 11:30",
      consumi: [70, 75, 72, 68, 65, 62, 60],
    },
  ];

  // KPI Stats
  const kpiStats = [
    {
      label: "Totale Strutture",
      value: structures.length,
      icon: <Building2 size={20} style={{ color: c.greenBtn }} />,
      trend: "up",
    },
    {
      label: "Live",
      value: structures.filter((s) => s.stato === "Live").length,
      icon: <CheckCircle size={20} className="text-success" />,
      trend: "up",
    },
    {
      label: "In Simulazione",
      value: structures.filter((s) => s.stato === "Simulazione").length,
      icon: <Clock size={20} className="text-warning" />,
      trend: "neutral",
    },
    {
      label: "Configurazione",
      value: structures.filter((s) => s.stato === "Configurazione").length,
      icon: <SettingsIcon size={20} className="text-info" />,
      trend: "neutral",
    },
  ];

  // Filtra strutture
  const filteredStructures = structures.filter((s) => {
    const matchSearch =
      s.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.cliente.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === "tutti" || s.tipo === filterType;
    const matchStatus = filterStatus === "tutti" || s.stato === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  // Get status badge
  const getStatusBadge = (stato) => {
    switch (stato) {
      case "Live":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span style={{ color: "#059669" }}>Live</span>
          </span>
        );
      case "Simulazione":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span style={{ color: "#D97706" }}>Simulazione</span>
          </span>
        );
      case "Configurazione":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span style={{ color: "#2563EB" }}>Configurazione</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span style={{ color: "#6B7280" }}>{stato}</span>
          </span>
        );
    }
  };

  // Se è selezionata una struttura, mostra il dettaglio
  if (viewMode === "detail" && selectedStructure) {
    return (
      <StructureDetail
        structureId={selectedStructure.id}
        onBack={() => {
          setViewMode("list");
          setSelectedStructure(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: c.inputText }}>
            Strutture
          </h1>
          <p className="text-sm mt-0.5" style={{ color: c.greenSubtitle }}>
            Gestisci le tue strutture e monitora le performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: c.greenBtn,
              boxShadow: "0 4px 12px rgba(140, 163, 134, 0.3)",
            }}
          >
            <Plus size={18} />
            Nuova Struttura
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
              border: "1px solid #E5E7EB",
              boxShadow: c.cardShadow,
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${c.greenBtn}15` }}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.trend === "up"
                    ? "text-success"
                    : stat.trend === "down"
                      ? "text-error"
                      : "text-gray-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <p
              className="text-2xl font-bold mt-2"
              style={{ color: c.inputText }}
            >
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
              placeholder="Cerca struttura o cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
              style={{
                backgroundColor: c.formBg,
                borderColor: searchQuery ? c.inputBorderFocus : c.inputBorder,
                color: c.inputText,
                boxShadow: searchQuery
                  ? `0 0 0 4px ${c.inputBorderFocus}20`
                  : "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = c.inputBorderFocus;
                e.target.style.boxShadow = `0 0 0 4px ${c.inputBorderFocus}20`;
              }}
              onBlur={(e) => {
                if (!searchQuery) {
                  e.target.style.borderColor = c.inputBorder;
                  e.target.style.boxShadow = "none";
                }
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
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
            value={filterType}
            onChange={setFilterType}
            label="Tipo"
            placeholder="Tutti i tipi"
            options={[
              { value: "tutti", label: "️ Tutti i tipi" },
              { value: "edificio", label: " Edifici" },
              { value: "serra", label: " Serre" },
              { value: "allevamento", label: " Allevamenti" },
            ]}
            dropdownZIndex={50}
          />

          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            label="Stato"
            placeholder="Tutti gli stati"
            options={[
              { value: "tutti", label: " Tutti gli stati" },
              { value: "Live", label: " Live" },
              { value: "Simulazione", label: " Simulazione" },
              { value: "Configurazione", label: " Configurazione" },
            ]}
            dropdownZIndex={50}
          />

          {(filterType !== "tutti" ||
            filterStatus !== "tutti" ||
            searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("tutti");
                setFilterStatus("tutti");
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: `${c.greenBtn}10`,
                color: c.greenBtn,
                border: `1px solid ${c.greenBtn}20`,
              }}
            >
              <X size={14} />
              Reset filtri
            </button>
          )}
        </div>
      </div>

      {/* Tabella Strutture */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: c.formBg,
          border: "1px solid #E5E7EB",
          boxShadow: c.cardShadow,
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                <th
                  className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Struttura
                </th>
                <th
                  className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Cliente
                </th>
                <th
                  className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Sensori
                </th>
                <th
                  className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Salute
                </th>
                <th
                  className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Stato
                </th>
                <th
                  className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStructures.map((structure) => (
                <tr
                  key={structure.id}
                  onClick={() => {
                    setSelectedStructure(structure);
                    setViewMode("detail");
                  }}
                  onMouseEnter={() => setHoveredRow(structure.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="cursor-pointer transition-all duration-200 group"
                  style={{
                    backgroundColor:
                      hoveredRow === structure.id
                        ? `${c.greenBtn}06`
                        : "transparent",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${c.greenBtn}15` }}
                      >
                        <Building2 size={16} style={{ color: c.greenBtn }} />
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: c.inputText }}
                      >
                        {structure.nome}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-sm"
                      style={{ color: c.greenSubtitle }}
                    >
                      {structure.cliente}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm" style={{ color: c.inputText }}>
                      {structure.sensori}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-16 h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: "#E5E7EB" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${structure.salute}%`,
                            backgroundColor:
                              structure.salute > 80
                                ? c.greenBtn
                                : structure.salute > 60
                                  ? "#F59E0B"
                                  : "#EF4444",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: c.inputText }}
                      >
                        {structure.salute}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(structure.stato)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStructure(structure);
                        setViewMode("detail");
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
        {filteredStructures.length === 0 && (
          <div className="text-center py-12">
            <Building2
              size={48}
              className="mx-auto mb-4 opacity-20"
              style={{ color: c.greenBtn }}
            />
            <h3 className="text-lg font-medium" style={{ color: c.inputText }}>
              Nessuna struttura trovata
            </h3>
            <p className="text-sm mt-1" style={{ color: c.greenSubtitle }}>
              Prova a modificare i filtri o crea una nuova struttura
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          className="px-4 py-3 border-t flex items-center justify-between"
          style={{ borderColor: "#E5E7EB" }}
        >
          <span className="text-xs" style={{ color: c.greenSubtitle }}>
            {filteredStructures.length} strutture trovate
          </span>
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ color: c.greenSubtitle }}
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Wizard Creazione Struttura */}
      <CreateStructureWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onConfirm={(data) => {
          console.log("Nuova struttura creata:", data);
          // Qui puoi aggiungere la logica per salvare la struttura
          // Ad esempio: aggiungi la nuova struttura alla lista
          const newStructure = {
            id: structures.length + 1,
            nome:
              data.type === "edificio"
                ? "Nuovo Edificio"
                : data.type === "serra"
                  ? "Nuova Serra"
                  : "Nuovo Allevamento",
            cliente: "Nuovo Cliente",
            tipo: data.type,
            stato: "Simulazione", // Automaticamente in simulazione
            salute: 0,
            risparmio: 0,
            sensori: data.sensors.length,
            zone: data.zones.length,
            attuatori: data.actuators.length,
            indirizzo: "Indirizzo non specificato",
            ultimoAggiornamento: "Ora",
            training: "N/A",
            consumi: [0, 0, 0, 0, 0, 0, 0],
          };

          // Aggiungi alla lista (in un'app reale faresti una chiamata API)
          // structures.push(newStructure);

          setIsWizardOpen(false);
        }}
      />

      {/* Animazioni CSS */}
      <style>{`
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

export default Strutture;
