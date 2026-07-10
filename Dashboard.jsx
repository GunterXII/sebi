// Dashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Building2,
  Sprout,
  Leaf,
  Users,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MoreVertical,
  BarChart3,
  Settings,
  Edit,
  Trash2,
  Copy,
  ChevronDown,
  X,
  RefreshCw,
  DollarSign,
  Check,
  UserPlus,
  BuildingIcon,
  Filter,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

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
// COMPONENTE DASHBOARD
// ============================================================
const Dashboard = ({ addToast, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("tutti");
  const [filterStatus, setFilterStatus] = useState("tutti");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isClientDrawerOpen, setIsClientDrawerOpen] = useState(false);

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
      nomeCliente: "GreenEnergy Srl",
      nomeStruttura: "Edificio A - Milano",
      tipo: "edificio",
      stato: "Live",
      salute: 92,
      risparmio: 12450,
      consumi: [65, 72, 68, 75, 70, 78, 82],
      indirizzo: "Via Roma 123, Milano",
      sensori: 24,
      allarmi: 0,
      ultimoAggiornamento: "2 min fa",
    },
    {
      id: 2,
      nomeCliente: "AgriTech Spa",
      nomeStruttura: "Serra Nord - Verona",
      tipo: "serra",
      stato: "Live",
      salute: 88,
      risparmio: 8750,
      consumi: [55, 60, 58, 62, 65, 58, 55],
      indirizzo: "Via delle Serre 45, Verona",
      sensori: 18,
      allarmi: 1,
      ultimoAggiornamento: "5 min fa",
    },
    {
      id: 3,
      nomeCliente: "Zootech Italia",
      nomeStruttura: "Allevamento Bio - Bologna",
      tipo: "allevamento",
      stato: "Simulazione",
      salute: 78,
      risparmio: 5320,
      consumi: [80, 85, 78, 82, 79, 75, 72],
      indirizzo: "Via Campagna 67, Bologna",
      sensori: 32,
      allarmi: 2,
      ultimoAggiornamento: "15 min fa",
    },
    {
      id: 4,
      nomeCliente: "EcoBuilding Srl",
      nomeStruttura: "Edificio Green - Torino",
      tipo: "edificio",
      stato: "Live",
      salute: 95,
      risparmio: 15200,
      consumi: [45, 48, 52, 50, 47, 43, 40],
      indirizzo: "Via Verde 89, Torino",
      sensori: 28,
      allarmi: 0,
      ultimoAggiornamento: "1 min fa",
    },
    {
      id: 5,
      nomeCliente: "Serre Moderne SAS",
      nomeStruttura: "Serra Sud - Napoli",
      tipo: "serra",
      stato: "Configurazione",
      salute: 0,
      risparmio: 0,
      consumi: [0, 0, 0, 0, 0, 0, 0],
      indirizzo: "Via dei Fiori 12, Napoli",
      sensori: 0,
      allarmi: 0,
      ultimoAggiornamento: "1 ora fa",
    },
    {
      id: 6,
      nomeCliente: "SmartFarm Srl",
      nomeStruttura: "Allevamento Avicolo - Padova",
      tipo: "allevamento",
      stato: "Live",
      salute: 85,
      risparmio: 9800,
      consumi: [70, 75, 72, 68, 65, 62, 60],
      indirizzo: "Via Agricola 34, Padova",
      sensori: 26,
      allarmi: 1,
      ultimoAggiornamento: "3 min fa",
    },
  ];

  // KPI Stats
  const kpiStats = [
    {
      label: "Clienti",
      value: structures.reduce((acc, s) => {
        if (!acc.includes(s.nomeCliente)) acc.push(s.nomeCliente);
        return acc;
      }, []).length,
      icon: <Users size={20} style={{ color: c.greenBtn }} />,
      trend: "up",
    },
    {
      label: "Strutture Totali",
      value: structures.length,
      icon: <Building2 size={20} style={{ color: c.greenBtn }} />,
      trend: "up",
    },
    {
      label: "In Simulazione",
      value: structures.filter((s) => s.stato === "Simulazione").length,
      icon: <Clock size={20} className="text-warning" />,
      trend: "neutral",
    },
    {
      label: "Live",
      value: structures.filter((s) => s.stato === "Live").length,
      icon: <CheckCircle size={20} className="text-success" />,
      trend: "up",
    },
    {
      label: "Allarmi Aperti",
      value: structures.reduce((acc, s) => acc + s.allarmi, 0),
      icon: <AlertTriangle size={20} className="text-error" />,
      trend: "down",
    },
  ];

  // Filtra strutture
  const filteredStructures = structures.filter((s) => {
    const matchSearch =
      s.nomeStruttura.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nomeCliente.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === "tutti" || s.tipo === filterType;
    const matchStatus = filterStatus === "tutti" || s.stato === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  // Get icon by tipo
  const getTypeIcon = (tipo) => {
    switch (tipo) {
      case "edificio":
        return <Building2 size={18} style={{ color: c.greenBtn }} />;
      case "serra":
        return <Leaf size={18} style={{ color: c.greenBtn }} />;
      case "allevamento":
        return <Sprout size={18} style={{ color: c.greenBtn }} />;
      default:
        return <Building2 size={18} style={{ color: c.greenBtn }} />;
    }
  };

  // Get status badge
  const getStatusBadge = (stato) => {
    switch (stato) {
      case "Live":
        return (
          <span
            className="relative flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#10B98115",
              color: "#059669",
              border: "1px solid #10B98130",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.08)",
            }}
          >
            <span className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        );
      case "Simulazione":
        return (
          <span
            className="relative flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#F59E0B15",
              color: "#D97706",
              border: "1px solid #F59E0B30",
              boxShadow: "0 0 20px rgba(245, 158, 11, 0.08)",
            }}
          >
            <span className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75 animate-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <Clock size={12} className="text-amber-500" />
            Simulazione
          </span>
        );
      case "Configurazione":
        return (
          <span
            className="relative flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#3B82F615",
              color: "#2563EB",
              border: "1px solid #3B82F630",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.08)",
            }}
          >
            <span className="relative flex items-center justify-center">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            </span>
            <Settings size={12} className="text-blue-500 animate-spin-slow" />
            Configurazione
          </span>
        );
      default:
        return (
          <span
            className="relative flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#6B728015",
              color: "#6B7280",
              border: "1px solid #6B728030",
              boxShadow: "0 0 20px rgba(107, 114, 128, 0.08)",
            }}
          >
            <span className="relative flex items-center justify-center">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-400" />
            </span>
            {stato}
          </span>
        );
    }
  };

  // Genera dati per mini grafico
  const getMiniChartData = (data) => {
    const labels = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
    return {
      labels,
      datasets: [
        {
          data,
          borderColor: "#8CA386",
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom,
            );
            gradient.addColorStop(0, "rgba(140, 163, 134, 0.3)");
            gradient.addColorStop(1, "rgba(140, 163, 134, 0)");
            return gradient;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointBackgroundColor: "#8CA386",
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} kWh`,
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: {
        borderJoinStyle: "round",
      },
    },
  };

  // Gestione click pulsanti
  const handleNewClient = () => {
    if (onNavigate) {
      onNavigate("clienti");
      // Apri drawer clienti dopo la navigazione
      setTimeout(() => setIsClientDrawerOpen(true), 100);
    }
    if (addToast) {
      addToast("info", "Apertura gestione clienti...");
    }
  };

  const handleNewStructure = () => {
    setIsWizardOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header con titolo e pulsanti */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: c.inputText }}>
            Dashboard
          </h1>
          <p className="text-sm mt-0.5" style={{ color: c.greenSubtitle }}>
            Panoramica generale delle tue strutture
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleNewClient}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: c.greenBtn,
              boxShadow: "0 4px 12px rgba(140, 163, 134, 0.3)",
            }}
          >
            <UserPlus size={18} />
            Nuovo Cliente
          </button>
          <button
            onClick={handleNewStructure}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: c.greenBtn,
              boxShadow: "0 4px 12px rgba(140, 163, 134, 0.3)",
            }}
          >
            <BuildingIcon size={18} />
            Nuova Struttura
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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
              placeholder="Cerca cliente o struttura..."
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

      {/* Stats Filtri */}
     
      {/* Card Griglia con mini grafici */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredStructures.map((structure) => (
          <div
            key={structure.id}
            className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: c.formBg,
              border: "1px solid #E5E7EB",
              boxShadow:
                hoveredCard === structure.id
                  ? c.cardShadow
                  : "0 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={() => setHoveredCard(structure.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Header */}
            <div className="p-4 border-b" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${c.greenBtn}15` }}
                  >
                    {getTypeIcon(structure.tipo)}
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: c.inputText }}>
                      {structure.nomeStruttura}
                    </h3>
                    <p className="text-sm" style={{ color: c.greenSubtitle }}>
                      {structure.nomeCliente}
                    </p>
                  </div>
                </div>
                {getStatusBadge(structure.stato)}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              {/* Salute e Risparmio */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>
                    Salute
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-20 h-1.5 rounded-full overflow-hidden"
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
                      className="text-sm font-medium"
                      style={{ color: c.inputText }}
                    >
                      {structure.salute}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: c.greenSubtitle }}>
                    Risparmio stimato
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: c.greenBtn }}
                  >
                    € {structure.risparmio.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Mini Grafico */}
              <div className="h-16">
                <Line
                  data={getMiniChartData(structure.consumi)}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Card Footer */}
            <div
              className="px-4 py-2 border-t flex items-center justify-between"
              style={{ borderColor: "#E5E7EB" }}
            >
              <button
                className="flex items-center gap-1.5 text-xs transition-all hover:scale-105"
                style={{ color: c.greenBtn }}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("strutture");
                  }
                }}
              >
                <Eye size={14} />
                Dettagli
              </button>
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 rounded transition-all hover:scale-110"
                  style={{ color: c.greenSubtitle }}
                >
                  <Edit size={14} />
                </button>
                <button
                  className="p-1.5 rounded transition-all hover:scale-110"
                  style={{ color: c.greenSubtitle }}
                >
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
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
          <button
            onClick={handleNewStructure}
            className="mt-4 px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
            style={{ backgroundColor: c.greenBtn }}
          >
            <Plus size={18} className="inline mr-2" />
            Nuova Struttura
          </button>
        </div>
      )}

      {/* Animazioni CSS */}
      <style>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
