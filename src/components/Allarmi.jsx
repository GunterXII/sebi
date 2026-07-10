// Allarmi.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  AlertTriangle,
  Bell,
  Search,
  Filter,
  Check,
  X,
  RefreshCw,
  ChevronDown,
  Clock,
  CheckCircle,
  Building2,
  MoreVertical,
  Eye,
  Info,
  AlertCircle,
  AlertOctagon,
  Circle,
  ChevronRight,
  Download,
  Printer,
  Calendar,
  Filter as FilterIcon,
} from "lucide-react";

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
// COMPONENTE ALLARMI
// ============================================================
const Allarmi = ({ addToast }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGravity, setFilterGravity] = useState("tutti");
  const [filterStatus, setFilterStatus] = useState("tutti");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      gravita: "critico",
      struttura: "Edificio A - Milano",
      descrizione: "Temperatura superiore alla soglia critica (28.5°C)",
      timestamp: "2024-01-20 14:30",
      stato: "aperto",
      cliente: "GreenEnergy Srl",
    },
    {
      id: 2,
      gravita: "alto",
      struttura: "Serra Nord - Verona",
      descrizione: "Umidità inferiore al 40% nella zona 3",
      timestamp: "2024-01-20 13:15",
      stato: "aperto",
      cliente: "AgriTech Spa",
    },
    {
      id: 3,
      gravita: "medio",
      struttura: "Allevamento Bio - Bologna",
      descrizione: "Consumo energetico anomalo (+25%)",
      timestamp: "2024-01-20 11:45",
      stato: "aperto",
      cliente: "Zootech Italia",
    },
    {
      id: 4,
      gravita: "basso",
      struttura: "Edificio Green - Torino",
      descrizione: "Manutenzione sensore CO2 programmata",
      timestamp: "2024-01-20 10:00",
      stato: "risolto",
      cliente: "EcoBuilding Srl",
    },
    {
      id: 5,
      gravita: "critico",
      struttura: "Serra Sud - Napoli",
      descrizione: "Sistema di irrigazione offline",
      timestamp: "2024-01-19 16:20",
      stato: "aperto",
      cliente: "Serre Moderne SAS",
    },
    {
      id: 6,
      gravita: "alto",
      struttura: "Allevamento Avicolo - Padova",
      descrizione: "Ventilazione insufficiente nella zona notte",
      timestamp: "2024-01-19 15:30",
      stato: "aperto",
      cliente: "SmartFarm Srl",
    },
    {
      id: 7,
      gravita: "medio",
      struttura: "Edificio A - Milano",
      descrizione: "Calibrazione sensori consigliata",
      timestamp: "2024-01-19 14:00",
      stato: "risolto",
      cliente: "GreenEnergy Srl",
    },
    {
      id: 8,
      gravita: "basso",
      struttura: "Serra Nord - Verona",
      descrizione: "Aggiornamento firmware disponibile",
      timestamp: "2024-01-19 12:30",
      stato: "risolto",
      cliente: "AgriTech Spa",
    },
  ]);

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

  // KPI Stats
  const kpiStats = [
    {
      label: "Totale Allarmi",
      value: alerts.length,
      icon: <Bell size={20} style={{ color: c.greenBtn }} />,
      trend: "up",
    },
    {
      label: "Aperti",
      value: alerts.filter(
        (a) => a.stato === "aperto" && !resolvedAlerts.includes(a.id),
      ).length,
      icon: <AlertTriangle size={20} className="text-error" />,
      trend: "up",
    },
    {
      label: "Risolti",
      value: alerts.filter(
        (a) => a.stato === "risolto" || resolvedAlerts.includes(a.id),
      ).length,
      icon: <CheckCircle size={20} className="text-success" />,
      trend: "up",
    },
    {
      label: "Critici",
      value: alerts.filter(
        (a) => a.gravita === "critico" && !resolvedAlerts.includes(a.id),
      ).length,
      icon: <AlertOctagon size={20} className="text-error" />,
      trend: "up",
    },
  ];

  // Filtra allarmi
  const filteredAlerts = alerts.filter((a) => {
    const isResolved = resolvedAlerts.includes(a.id);
    const matchSearch =
      a.descrizione.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.struttura.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.cliente.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGravity =
      filterGravity === "tutti" || a.gravita === filterGravity;
    const matchStatus =
      filterStatus === "tutti" ||
      (filterStatus === "aperto" && !isResolved && a.stato === "aperto") ||
      (filterStatus === "risolto" && (isResolved || a.stato === "risolto"));

    // Se lo stato è 'aperto' non mostrare quelli risolti
    if (filterStatus === "aperto" && isResolved) return false;
    if (filterStatus === "risolto" && !isResolved && a.stato === "aperto")
      return false;

    return matchSearch && matchGravity && matchStatus;
  });

  // Get gravity badge
  const getGravityBadge = (gravita) => {
    switch (gravita) {
      case "critico":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertOctagon size={12} />
            Critico
          </span>
        );
      case "alto":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
            <AlertCircle size={12} />
            Alto
          </span>
        );
      case "medio":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertTriangle size={12} />
            Medio
          </span>
        );
      case "basso":
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Info size={12} />
            Basso
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <Circle size={12} />
            {gravita}
          </span>
        );
    }
  };

  // Get status badge
  const getStatusBadge = (stato, id) => {
    const isResolved = resolvedAlerts.includes(id);
    if (isResolved || stato === "risolto") {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span style={{ color: "#059669" }}>Risolto</span>
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span style={{ color: "#DC2626" }}>Aperto</span>
        </span>
      );
    }
  };

  // Handle resolve alert
  const handleResolve = (id) => {
    if (!resolvedAlerts.includes(id)) {
      setResolvedAlerts((prev) => [...prev, id]);
      if (addToast) {
        addToast("success", "Allarme risolto con successo!");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: c.inputText }}>
            Allarmi
          </h1>
          <p className="text-sm mt-0.5" style={{ color: c.greenSubtitle }}>
            Monitora e gestisci tutti gli allarmi del sistema
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setResolvedAlerts([]);
              if (addToast) {
                addToast("info", "Lista allarmi aggiornata");
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: c.greenBtn,
              boxShadow: "0 4px 12px rgba(140, 163, 134, 0.3)",
            }}
          >
            <RefreshCw size={18} />
            Aggiorna
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
              placeholder="Cerca per descrizione, struttura o cliente..."
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
            value={filterGravity}
            onChange={setFilterGravity}
            label="Gravità"
            placeholder="Tutte le gravità"
            options={[
              { value: "tutti", label: " Tutte le gravità" },
              { value: "critico", label: " Critico" },
              { value: "alto", label: " Alto" },
              { value: "medio", label: " Medio" },
              { value: "basso", label: " Basso" },
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
              { value: "aperto", label: " Aperti" },
              { value: "risolto", label: " Risolti" },
            ]}
            dropdownZIndex={50}
          />

          {(filterGravity !== "tutti" ||
            filterStatus !== "tutti" ||
            searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterGravity("tutti");
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

      {/* Tabella Allarmi */}
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
                  Gravità
                </th>
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
                  Descrizione
                </th>
                <th
                  className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Timestamp
                </th>
                <th
                  className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Stato
                </th>
                <th
                  className="text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: c.greenSubtitle }}
                >
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alert) => {
                const isResolved = resolvedAlerts.includes(alert.id);
                return (
                  <tr
                    key={alert.id}
                    onMouseEnter={() => setHoveredRow(alert.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="transition-all duration-200"
                    style={{
                      backgroundColor:
                        hoveredRow === alert.id
                          ? `${c.greenBtn}06`
                          : "transparent",
                      borderBottom: "1px solid #E5E7EB",
                      opacity: isResolved ? 0.6 : 1,
                    }}
                  >
                    <td className="py-3 px-4">
                      {getGravityBadge(alert.gravita)}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span
                          className="text-sm"
                          style={{ color: c.inputText }}
                        >
                          {alert.struttura}
                        </span>
                        <p
                          className="text-xs"
                          style={{ color: c.greenSubtitle }}
                        >
                          {alert.cliente}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm" style={{ color: c.inputText }}>
                        {alert.descrizione}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="text-sm"
                        style={{ color: c.greenSubtitle }}
                      >
                        {alert.timestamp}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(alert.stato, alert.id)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {!isResolved && alert.stato === "aperto" && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 text-white"
                          style={{
                            backgroundColor: c.greenBtn,
                            boxShadow: "0 2px 8px rgba(140, 163, 134, 0.3)",
                          }}
                        >
                          <CheckCircle size={14} />
                          Segna come risolto
                        </button>
                      )}
                      {(isResolved || alert.stato === "risolto") && (
                        <span
                          className="text-xs"
                          style={{ color: c.greenSubtitle }}
                        >
                          ✅ Risolto
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle
              size={48}
              className="mx-auto mb-4 opacity-20"
              style={{ color: c.greenBtn }}
            />
            <h3 className="text-lg font-medium" style={{ color: c.inputText }}>
              Nessun allarme trovato
            </h3>
            <p className="text-sm mt-1" style={{ color: c.greenSubtitle }}>
              {resolvedAlerts.length > 0 &&
              alerts.filter((a) => a.stato === "aperto").length === 0
                ? "Tutti gli allarmi sono stati risolti! "
                : "Prova a modificare i filtri"}
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          className="px-4 py-3 border-t flex items-center justify-between"
          style={{ borderColor: "#E5E7EB" }}
        >
          <span className="text-xs" style={{ color: c.greenSubtitle }}>
            {filteredAlerts.length} allarmi trovati
            {resolvedAlerts.length > 0 && (
              <span
                className="ml-2 px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${c.greenBtn}10`,
                  color: c.greenBtn,
                }}
              >
                {resolvedAlerts.length} risolti
              </span>
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ color: c.greenSubtitle }}
            >
              <Download size={16} />
            </button>
            <button
              className="p-1.5 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ color: c.greenSubtitle }}
            >
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>

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

export default Allarmi;
