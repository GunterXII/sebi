// StructureDetail.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import StepperStati from "./StepperStati";
import { LearningChart } from "./Charts/LearningChart";
import { ConsumptionChart } from "./Charts/ConsumptionChart";
import { MonitoringChart } from "./Charts/MonitoringChart";
import {
  calculateHealth,
  getHealthColor,
  getHealthLabel,
  getHealthIcon,
} from "../utils/healthUtils";
import {
  Settings as SettingsIcon,
  Building2,
  Users,
  ArrowLeft,
  Settings,
  Zap,
  Thermometer,
  Droplets,
  Wind,
  Lightbulb,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Play,
  Pause,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Eye,
  Edit,
  Copy,
  MoreVertical,
  Cpu,
  Database,
  Wifi,
  Server,
  HardDrive,
  Shield,
  Bell,
  Mail,
  Phone,
  MapPin,
  Link,
  ExternalLink,
  Sparkles,
  Brain,
  LineChart,
  Gauge,
  Sliders,
  ToggleLeft,
  ToggleRight,
  PlayCircle,
  StopCircle,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Leaf,
  Droplet,
  Sun,
  CloudRain,
  Fan,
  Home,
  Factory,
  Sprout,
  Filter,
  Search,
  ChevronLeft,
  X,
  AlertCircle,
  Info,
  Check,
} from "lucide-react";

// ============================================================
// COMPONENTE MODALE DI CONFERMA
// ============================================================
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  action,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
        style={{ animation: "fadeIn 0.2s ease-out" }}
        onClick={onClose}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ animation: "fadeInUp 0.3s ease-out" }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(140,163,134,0.15)",
            boxShadow: "0 20px 60px rgba(74,99,69,0.15)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: "#FEF3C7" }}
            >
              <AlertCircle size={24} style={{ color: "#D97706" }} />
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#3A3A3A" }}
              >
                {title}
              </h3>
              <p className="text-sm mt-1" style={{ color: "#5E7B5B" }}>
                {message}
              </p>
              <p
                className="text-xs mt-2 font-medium"
                style={{ color: "#8CA386" }}
              >
                Azione: {action}
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#F7F7F7",
                color: "#5E7B5B",
              }}
            >
              Annulla
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#8CA386",
                boxShadow: "0 4px 12px rgba(140,163,134,0.3)",
              }}
            >
              Conferma
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================
// COMPONENTE STRUCTURE DETAIL
// ============================================================
const StructureDetail = ({ structureId, onBack, addToast }) => {
  const { isAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState("panoramica");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Stato della struttura
  const [structureState, setStructureState] = useState("configurazione");

  // Stati per la sezione AI & Simulazione
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingStatus, setTrainingStatus] = useState("idle");
  const [timeRemaining, setTimeRemaining] = useState("--:--");
  const [priorityBalance, setPriorityBalance] = useState(50);
  const [isDryRun, setIsDryRun] = useState(false);
  const [isAutoControl, setIsAutoControl] = useState(false);

  // Stati per il monitoraggio
  const [selectedPeriod, setSelectedPeriod] = useState("24h");
  const [selectedZone, setSelectedZone] = useState("all");
  const [logs, setLogs] = useState([]);

  // Stati per il controllo
  const [controlModes, setControlModes] = useState({});
  const [actuatorValues, setActuatorValues] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    action: "",
    onConfirm: null,
  });

  // Simula log in tempo reale
  useEffect(() => {
    if (activeSection === "monitoraggio" && isDryRun) {
      const intervals = [
        { zone: "Zona Ufficio 1", action: "riscaldamento portato al 60%" },
        { zone: "Zona Ufficio 2", action: "ventilazione attivata al 45%" },
        { zone: "Zona Serra Nord", action: "irrigazione avviata" },
        { zone: "Zona Ufficio 1", action: "temperatura raggiunta 22°C" },
        { zone: "Zona Allevamento", action: "umidità regolata al 65%" },
        { zone: "Zona Serra Nord", action: "ombregiamento attivato" },
        { zone: "Zona Ufficio 2", action: "illuminazione ridotta al 30%" },
        { zone: "Zona Allevamento", action: "ventilazione aumentata al 70%" },
      ];

      let index = 0;
      const interval = setInterval(() => {
        const log = intervals[index % intervals.length];
        const now = new Date();
        const timestamp = now.toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        setLogs((prev) => [
          {
            id: Date.now(),
            zone: log.zone,
            action: log.action,
            timestamp,
          },
          ...prev.slice(0, 49),
        ]);
        index++;
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [activeSection, isDryRun]);

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

  // Dati struttura (esempio)
  const structure = {
    id: 1,
    nome: "Edificio A - Milano",
    cliente: "GreenEnergy Srl",
    stato: "Live",
    salute: 92,
    indirizzo: "Via Roma 123, Milano",
    training: "15/01/2024 14:30",
    risparmio: 12450,
    zone: 8,
    sensori: 24,
    attuatori: 12,
    allarmi: [
      {
        id: 1,
        tipo: "warning",
        messaggio: "Temperatura fuori range",
        data: "10 min fa",
      },
      {
        id: 2,
        tipo: "info",
        messaggio: "Manutenzione programmata",
        data: "2 ore fa",
      },
    ],
    kpi: {
      consumo: "2,847 kWh",
      efficienza: "92%",
      co2: "1.2 t",
      risparmio: "€ 12,450",
    },
    step: {
      current: 3,
      total: 5,
      labels: [
        "Configurazione",
        "Calibrazione",
        "Training AI",
        "Ottimizzazione",
        "Monitoraggio",
      ],
    },
    zones: [
      { id: 1, nome: "Zona Ufficio 1" },
      { id: 2, nome: "Zona Ufficio 2" },
      { id: 3, nome: "Zona Serra Nord" },
      { id: 4, nome: "Zona Allevamento" },
    ],
  };

  // Calcola salute dinamica
  const health = calculateHealth({
    stato: structureState,
    allarmi: structure.allarmi?.length || 0,
    sensori: structure.sensori || 0,
  });

  // Gestione cambio stato
  const handleStateChange = (newState) => {
    setStructureState(newState);
    if (addToast) {
      addToast(
        "success",
        `Struttura passata a ${newState.charAt(0).toUpperCase() + newState.slice(1)}`,
      );
    }
  };

  // Dati attuatori per zona
  const actuatorsByZone = {
    1: [
      {
        id: "heating",
        label: "Riscaldamento",
        icon: <Thermometer size={20} />,
        default: 60,
      },
      {
        id: "ventilation",
        label: "Ventilazione",
        icon: <Wind size={20} />,
        default: 45,
      },
      {
        id: "lighting",
        label: "Illuminazione",
        icon: <Lightbulb size={20} />,
        default: 30,
      },
    ],
    2: [
      {
        id: "heating",
        label: "Riscaldamento",
        icon: <Thermometer size={20} />,
        default: 55,
      },
      {
        id: "ventilation",
        label: "Ventilazione",
        icon: <Wind size={20} />,
        default: 50,
      },
      {
        id: "lighting",
        label: "Illuminazione",
        icon: <Lightbulb size={20} />,
        default: 40,
      },
    ],
    3: [
      {
        id: "heating",
        label: "Riscaldamento",
        icon: <Thermometer size={20} />,
        default: 70,
      },
      {
        id: "irrigation",
        label: "Irrigazione",
        icon: <Droplets size={20} />,
        default: 80,
      },
      {
        id: "shading",
        label: "Ombregiamento",
        icon: <Sun size={20} />,
        default: 50,
      },
    ],
    4: [
      {
        id: "heating",
        label: "Riscaldamento",
        icon: <Thermometer size={20} />,
        default: 65,
      },
      {
        id: "ventilation",
        label: "Ventilazione",
        icon: <Wind size={20} />,
        default: 70,
      },
      {
        id: "cooling",
        label: "Raffreddamento",
        icon: <Fan size={20} />,
        default: 30,
      },
    ],
  };

  // Inizializza stati di controllo
  useEffect(() => {
    const initialModes = {};
    const initialValues = {};
    structure.zones.forEach((zone) => {
      initialModes[zone.id] = "automatico";
      const actuators = actuatorsByZone[zone.id] || [];
      actuators.forEach((act) => {
        initialValues[`${zone.id}-${act.id}`] = act.default || 50;
      });
    });
    setControlModes(initialModes);
    setActuatorValues(initialValues);
  }, []);

  // Sezioni disponibili
  const sections = [
    { id: "panoramica", label: "Panoramica", icon: <Activity size={18} /> },
    {
      id: "ai-simulazione",
      label: "AI & Simulazione",
      icon: <Brain size={18} />,
    },
    {
      id: "monitoraggio",
      label: "Monitoraggio dati reali",
      icon: <LineChart size={18} />,
    },
    {
      id: "controllo",
      label: "Attuazione / Controllo",
      icon: <Sliders size={18} />,
    },
  ];

  // Get status badge
  const getStatusBadge = (stato) => {
    switch (stato) {
      case "Live":
        return (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span style={{ color: "#059669" }}>Live</span>
          </span>
        );
      case "Simulazione":
        return (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span style={{ color: "#D97706" }}>Simulazione</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span style={{ color: "#6B7280" }}>{stato}</span>
          </span>
        );
    }
  };

  // Funzione per avviare il training
  const startTraining = () => {
    setIsTraining(true);
    setTrainingStatus("training");
    setTrainingProgress(0);
    setTimeRemaining("2:30");

    if (addToast) {
      addToast("info", "Training avviato. Attendi il completamento...");
    }

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        const newProgress = prev + Math.random() * 3;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setTrainingStatus("completed");
          setTimeRemaining("0:00");
          if (addToast) {
            addToast("success", "Training completato con successo!");
          }
          return 100;
        }
        const remaining = Math.max(
          0,
          Math.ceil(((100 - newProgress) / 100) * 150),
        );
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        return newProgress;
      });
    }, 200);
  };

  // Dati per i grafici
  const learningData = [
    { epoch: 0, accuracy: 0, loss: 1.0 },
    { epoch: 10, accuracy: 0.45, loss: 0.65 },
    { epoch: 20, accuracy: 0.62, loss: 0.42 },
    { epoch: 30, accuracy: 0.73, loss: 0.28 },
    { epoch: 40, accuracy: 0.81, loss: 0.18 },
    { epoch: 50, accuracy: 0.87, loss: 0.12 },
    { epoch: 60, accuracy: 0.91, loss: 0.08 },
    { epoch: 70, accuracy: 0.94, loss: 0.05 },
    { epoch: 80, accuracy: 0.96, loss: 0.03 },
    { epoch: 90, accuracy: 0.97, loss: 0.02 },
    { epoch: 100, accuracy: 0.98, loss: 0.01 },
  ];

  const consumptionData = {
    without: [65, 72, 68, 75, 70, 78, 82, 69, 73, 71],
    with: [45, 48, 52, 50, 47, 43, 40, 46, 44, 42],
  };

  // Dati per i grafici di monitoraggio per zona
  const getZoneData = (zoneId, period) => {
    const baseData = {
      temperature: Array.from({ length: 24 }, () =>
        Math.round(18 + Math.random() * 8),
      ),
      humidity: Array.from({ length: 24 }, () =>
        Math.round(45 + Math.random() * 35),
      ),
      co2: Array.from({ length: 24 }, () =>
        Math.round(350 + Math.random() * 150),
      ),
    };
    return baseData;
  };

  // Funzione per gestire il toggle modalità
  const handleModeToggle = (zoneId) => {
    const currentMode = controlModes[zoneId];
    const newMode = currentMode === "automatico" ? "manuale" : "automatico";

    setConfirmModal({
      isOpen: true,
      title: `Cambio modalità`,
      message: `Sei sicuro di voler passare alla modalità ${newMode === "automatico" ? "Automatica" : "Manuale"} per la zona?`,
      action: `Passa a ${newMode === "automatico" ? "Automatica" : "Manuale"}`,
      onConfirm: () => {
        setControlModes((prev) => ({ ...prev, [zoneId]: newMode }));
        setConfirmModal({
          isOpen: false,
          title: "",
          message: "",
          action: "",
          onConfirm: null,
        });
        if (addToast) {
          addToast(
            "success",
            `Modalità ${newMode === "automatico" ? "Automatica" : "Manuale"} attivata per la zona`,
          );
        }
      },
    });
  };

  // Funzione per gestire il cambio valore attuatore
  const handleActuatorChange = (zoneId, actuatorId, value) => {
    const key = `${zoneId}-${actuatorId}`;
    setActuatorValues((prev) => ({ ...prev, [key]: value }));
  };

  // Funzione per confermare il cambio valore
  const handleActuatorConfirm = (zoneId, actuatorId, value, label) => {
    setConfirmModal({
      isOpen: true,
      title: `Conferma modifica`,
      message: `Sei sicuro di voler impostare ${label} al ${value}%?`,
      action: `Imposta ${label} al ${value}%`,
      onConfirm: () => {
        const key = `${zoneId}-${actuatorId}`;
        setActuatorValues((prev) => ({ ...prev, [key]: value }));
        setConfirmModal({
          isOpen: false,
          title: "",
          message: "",
          action: "",
          onConfirm: null,
        });
        if (addToast) {
          addToast("success", `${label} impostato al ${value}%`);
        }
      },
    });
  };

  // Render section content
  const renderSection = () => {
    switch (activeSection) {
      case "panoramica":
        return (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Consumo",
                  value: structure.kpi.consumo,
                  icon: <Zap size={20} />,
                },
                {
                  label: "Efficienza",
                  value: structure.kpi.efficienza,
                  icon: <Gauge size={20} />,
                },
                {
                  label: "CO2 Risparmiata",
                  value: structure.kpi.co2,
                  icon: <Leaf size={20} />,
                },
                {
                  label: "Risparmio",
                  value: structure.kpi.risparmio,
                  icon: <TrendingUp size={20} />,
                },
              ].map((kpi, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: c.formBg,
                    border: "1px solid #E5E7EB",
                    boxShadow: c.cardShadow,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${c.greenBtn}15` }}
                    >
                      {kpi.icon}
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: c.greenSubtitle }}>
                        {kpi.label}
                      </p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: c.inputText }}
                      >
                        {kpi.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.formBg,
                  border: "1px solid #E5E7EB",
                  boxShadow: c.cardShadow,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${c.greenBtn}15` }}
                  >
                    <Clock size={20} style={{ color: c.greenBtn }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: c.greenSubtitle }}>
                      Ultimo Training
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: c.inputText }}
                    >
                      {structure.training}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.formBg,
                  border: "1px solid #E5E7EB",
                  boxShadow: c.cardShadow,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${c.greenBtn}15` }}
                  >
                    <TrendingUp size={20} style={{ color: c.greenBtn }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: c.greenSubtitle }}>
                      Risparmio Stimato
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: c.inputText }}
                    >
                      € {structure.risparmio.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.formBg,
                  border: "1px solid #E5E7EB",
                  boxShadow: c.cardShadow,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${c.greenBtn}15` }}
                  >
                    <AlertTriangle size={20} style={{ color: c.greenBtn }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: c.greenSubtitle }}>
                      Ultimi Allarmi
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: c.inputText }}
                    >
                      {structure.allarmi.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone, Sensori, Attuatori */}
            <div className="grid grid-cols-3 gap-4">
              <div
                className="rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.formBg,
                  border: "1px solid #E5E7EB",
                  boxShadow: c.cardShadow,
                }}
              >
                <p className="text-2xl font-bold" style={{ color: c.greenBtn }}>
                  {structure.zone}
                </p>
                <p className="text-xs" style={{ color: c.greenSubtitle }}>
                  Zone
                </p>
              </div>
              <div
                className="rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.formBg,
                  border: "1px solid #E5E7EB",
                  boxShadow: c.cardShadow,
                }}
              >
                <p className="text-2xl font-bold" style={{ color: c.greenBtn }}>
                  {structure.sensori}
                </p>
                <p className="text-xs" style={{ color: c.greenSubtitle }}>
                  Sensori
                </p>
              </div>
              <div
                className="rounded-xl p-4 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: c.formBg,
                  border: "1px solid #E5E7EB",
                  boxShadow: c.cardShadow,
                }}
              >
                <p className="text-2xl font-bold" style={{ color: c.greenBtn }}>
                  {structure.attuatori}
                </p>
                <p className="text-xs" style={{ color: c.greenSubtitle }}>
                  Attuatori
                </p>
              </div>
            </div>

            {/* Lista allarmi */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: c.formBg,
                border: "1px solid #E5E7EB",
                boxShadow: c.cardShadow,
              }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: "#E5E7EB" }}
              >
                <h3
                  className="text-sm font-medium"
                  style={{ color: c.inputText }}
                >
                  Ultimi Allarmi
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {structure.allarmi.map((allarme) => (
                  <div
                    key={allarme.id}
                    className="px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {allarme.tipo === "warning" ? (
                        <AlertTriangle size={16} className="text-warning" />
                      ) : (
                        <Bell size={16} className="text-info" />
                      )}
                      <span className="text-sm" style={{ color: c.inputText }}>
                        {allarme.messaggio}
                      </span>
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: c.greenSubtitle }}
                    >
                      {allarme.data}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "ai-simulazione":
        // Se la struttura è in Configurazione
        if (structureState === "configurazione") {
          return (
            <div className="space-y-6">
              <div
                className="rounded-xl p-12 text-center"
                style={{
                  backgroundColor: "#F7F7F7",
                  border: "2px dashed #8CA38640",
                }}
              >
                <SettingsIcon
                  size={64}
                  className="mx-auto mb-4"
                  style={{ color: "#8CA386", opacity: 0.5 }}
                />
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  Struttura in Configurazione
                </h3>
                <p className="text-sm mt-2" style={{ color: "#5E7B5B" }}>
                  Per accedere alle funzionalità AI, completa prima la
                  configurazione della struttura
                </p>
                <button
                  className="mt-4 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: "#8CA386" }}
                  onClick={() => {
                    if (addToast) {
                      addToast(
                        "info",
                        "Reindirizzamento al wizard di configurazione...",
                      );
                    }
                  }}
                >
                  Completa Configurazione
                </button>
              </div>
            </div>
          );
        }

        // Se la struttura è in Simulazione o Live
        return (
          <div className="space-y-6">
            {/* Header AI */}
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  <Brain
                    size={20}
                    className="inline mr-2"
                    style={{ color: "#8CA386" }}
                  />
                  AI & Simulazione
                </h3>
                <p className="text-sm" style={{ color: "#5E7B5B" }}>
                  Modello AI addestrato su {structure.sensori} sensori
                </p>
              </div>
              <span
                className={`flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full ${
                  trainingStatus === "completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : trainingStatus === "training"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {trainingStatus === "completed" && <CheckCircle size={14} />}
                {trainingStatus === "training" && (
                  <Activity size={14} className="animate-spin" />
                )}
                {trainingStatus === "idle" && <Clock size={14} />}
                {trainingStatus === "completed"
                  ? "Addestrato"
                  : trainingStatus === "training"
                    ? "In Addestramento"
                    : "Non Addestrato"}
              </span>
            </div>

            {/* Training Section */}
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "#F7F7F7",
                border: "1px solid #E5E7EB",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium" style={{ color: "#3A3A3A" }}>
                  Addestramento Modello
                </h4>
                <button
                  onClick={startTraining}
                  disabled={isTraining || trainingStatus === "completed"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 ${
                    isTraining || trainingStatus === "completed"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  style={{ backgroundColor: "#8CA386" }}
                >
                  {isTraining ? (
                    <>
                      <Activity size={18} className="animate-spin" />
                      Addestramento in corso...
                    </>
                  ) : trainingStatus === "completed" ? (
                    <>
                      <CheckCircle size={18} />
                      Addestrato
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      Avvia Training
                    </>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: "#5E7B5B" }}>Avanzamento</span>
                  <span style={{ color: "#3A3A3A" }}>
                    {Math.round(trainingProgress)}%
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "#E5E7EB" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${trainingProgress}%`,
                      backgroundColor:
                        trainingProgress === 100 ? "#059669" : "#8CA386",
                    }}
                  />
                </div>
                <div
                  className="flex items-center justify-between text-xs"
                  style={{ color: "#5E7B5B" }}
                >
                  <span>Tempo rimanente: {timeRemaining}</span>
                  <span>
                    Stato:{" "}
                    {trainingStatus === "completed"
                      ? "✅ Completato"
                      : trainingStatus === "training"
                        ? " In corso"
                        : "⏸️ In attesa"}
                  </span>
                </div>
              </div>
            </div>

            {/* Grafici con Chart.js */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Apprendimento AI */}
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "#F7F7F7",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h4
                  className="text-sm font-medium mb-3"
                  style={{ color: "#3A3A3A" }}
                >
                  Apprendimento IA
                </h4>
                <div className="h-64">
                  <LearningChart data={learningData} />
                </div>
              </div>

              {/* Confronto Consumi */}
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "#F7F7F7",
                  border: "1px solid #E5E7EB",
                }}
              >
                <h4
                  className="text-sm font-medium mb-3"
                  style={{ color: "#3A3A3A" }}
                >
                  Confronto Consumi
                </h4>
                <div className="h-64">
                  <ConsumptionChart
                    without={consumptionData.without}
                    with={consumptionData.with}
                  />
                </div>
              </div>
            </div>

            {/* Priority Slider */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "#F7F7F7",
                border: "1px solid #E5E7EB",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#3A3A3A" }}
                >
                  Priorità
                </span>
                <span className="text-xs" style={{ color: "#5E7B5B" }}>
                  {priorityBalance <= 33
                    ? " Risparmio"
                    : priorityBalance <= 66
                      ? "⚖️ Bilanciato"
                      : " Comfort"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs" style={{ color: "#5E7B5B" }}>
                  Risparmio
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priorityBalance}
                  onChange={(e) => setPriorityBalance(parseInt(e.target.value))}
                  className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                  style={{
                    backgroundColor: "#E5E7EB",
                    accentColor: "#8CA386",
                  }}
                />
                <span className="text-xs" style={{ color: "#5E7B5B" }}>
                  Comfort
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: "#8CA386" }}>
                  Risparmio Energetico
                </span>
                <span className="text-xs" style={{ color: "#8CA386" }}>
                  Benessere
                </span>
              </div>
            </div>

            {/* Action Buttons - solo Admin */}
            <div className="flex flex-wrap gap-3">
              {isAdmin &&
                trainingStatus === "completed" &&
                structureState !== "dry-run" && (
                  <button
                    onClick={() => {
                      handleStateChange("dry-run");
                      setIsDryRun(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#F59E0B" }}
                  >
                    <Activity size={18} />
                    Promuovi a Dry-run
                  </button>
                )}

              {isAdmin && structureState === "dry-run" && !isAutoControl && (
                <button
                  onClick={() => {
                    handleStateChange("live");
                    setIsAutoControl(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: "#10B981" }}
                >
                  <Zap size={18} />
                  Attiva Controllo Automatico
                </button>
              )}

              {isAutoControl && (
                <span
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium"
                  style={{ backgroundColor: "#059669" }}
                >
                  <CheckCircle size={18} />
                  Sistema Attivo
                </span>
              )}

              {structureState === "dry-run" && (
                <span
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium"
                  style={{
                    backgroundColor: "#FEF3C7",
                    color: "#D97706",
                  }}
                >
                  <Clock size={18} />
                  Modalità Dry-run
                </span>
              )}
            </div>

            {/* Info Box */}
            <div
              className="rounded-xl p-4 border-l-4"
              style={{
                backgroundColor: "#8CA38608",
                borderColor: "#8CA386",
              }}
            >
              <p className="text-sm" style={{ color: "#5E7B5B" }}>
                <strong>Suggerimento:</strong> L'AI analizza i dati storici per
                ottimizzare i consumi. Dopo l'addestramento, puoi promuovere la
                struttura in Dry-run per testare il modello in sicurezza.
              </p>
            </div>
          </div>
        );

      case "monitoraggio":
        // Se la struttura è in Configurazione o Simulazione (non Dry-run)
        if (
          structureState === "configurazione" ||
          (structureState === "simulazione" && !isDryRun)
        ) {
          return (
            <div className="space-y-6">
              <div
                className="rounded-xl p-12 text-center"
                style={{
                  backgroundColor: "#F7F7F7",
                  border: "2px dashed #8CA38640",
                }}
              >
                <LineChart
                  size={64}
                  className="mx-auto mb-4"
                  style={{ color: "#8CA386", opacity: 0.5 }}
                />
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  Monitoraggio non disponibile
                </h3>
                <p className="text-sm mt-2" style={{ color: "#5E7B5B" }}>
                  {structureState === "configurazione"
                    ? "Completa la configurazione e avvia il training AI per abilitare il monitoraggio"
                    : "Promuovi la struttura a Dry-run per iniziare il monitoraggio in tempo reale"}
                </p>
                {structureState === "simulazione" && (
                  <button
                    className="mt-4 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#8CA386" }}
                    onClick={() => setActiveSection("ai-simulazione")}
                  >
                    Vai a AI & Simulazione
                  </button>
                )}
              </div>
            </div>
          );
        }

        // Monitoraggio disponibile (Dry-run o Live)
        const zoneData = getZoneData(selectedZone, selectedPeriod);
        const hours = Array.from(
          { length: 24 },
          (_, i) => `${String(i).padStart(2, "0")}:00`,
        );

        return (
          <div className="space-y-6">
            {/* Header Monitoraggio */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  <LineChart
                    size={20}
                    className="inline mr-2"
                    style={{ color: "#8CA386" }}
                  />
                  Monitoraggio Dati Reali
                </h3>
                <p className="text-sm" style={{ color: "#5E7B5B" }}>
                  Dati in tempo reale dalle zone della struttura
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            {/* Filtri e controlli */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#5E7B5B" }}>
                  Zona:
                </span>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border-2 text-sm focus:outline-none"
                  style={{
                    backgroundColor: "#F7F7F7",
                    borderColor: "#D1D1D1",
                    color: "#3A3A3A",
                  }}
                >
                  <option value="all">Tutte le zone</option>
                  {structure.zones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#5E7B5B" }}>
                  Periodo:
                </span>
                <div
                  className="flex rounded-lg overflow-hidden border-2"
                  style={{ borderColor: "#D1D1D1" }}
                >
                  {["1h", "6h", "12h", "24h"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                        selectedPeriod === period ? "text-white" : ""
                      }`}
                      style={{
                        backgroundColor:
                          selectedPeriod === period ? "#8CA386" : "#F7F7F7",
                        color: selectedPeriod === period ? "white" : "#5E7B5B",
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#F7F7F7", color: "#5E7B5B" }}
              >
                <RefreshCw size={18} />
              </button>
            </div>

            {/* Layout a due colonne */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonna sinistra - Grafici (2/3) */}
              <div className="lg:col-span-2 space-y-4">
                {/* Temperatura */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "#F7F7F7",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className="text-sm font-medium"
                      style={{ color: "#3A3A3A" }}
                    >
                      <Thermometer
                        size={16}
                        className="inline mr-2"
                        style={{ color: "#EF4444" }}
                      />
                      Temperatura
                    </h4>
                    <span className="text-xs" style={{ color: "#5E7B5B" }}>
                      Media:{" "}
                      {(
                        zoneData.temperature.reduce((a, b) => a + b, 0) /
                        zoneData.temperature.length
                      ).toFixed(1)}
                      °C
                    </span>
                  </div>
                  <div className="h-32">
                    <MonitoringChart
                      data={zoneData.temperature}
                      label="Temperatura"
                      color="#EF4444"
                      unit="°C"
                      hours={hours}
                    />
                  </div>
                </div>

                {/* Umidità */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "#F7F7F7",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className="text-sm font-medium"
                      style={{ color: "#3A3A3A" }}
                    >
                      <Droplets
                        size={16}
                        className="inline mr-2"
                        style={{ color: "#3B82F6" }}
                      />
                      Umidità
                    </h4>
                    <span className="text-xs" style={{ color: "#5E7B5B" }}>
                      Media:{" "}
                      {(
                        zoneData.humidity.reduce((a, b) => a + b, 0) /
                        zoneData.humidity.length
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="h-32">
                    <MonitoringChart
                      data={zoneData.humidity}
                      label="Umidità"
                      color="#3B82F6"
                      unit="%"
                      hours={hours}
                    />
                  </div>
                </div>

                {/* CO₂ */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "#F7F7F7",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className="text-sm font-medium"
                      style={{ color: "#3A3A3A" }}
                    >
                      <Wind
                        size={16}
                        className="inline mr-2"
                        style={{ color: "#8B5CF6" }}
                      />
                      CO₂
                    </h4>
                    <span className="text-xs" style={{ color: "#5E7B5B" }}>
                      Media:{" "}
                      {(
                        zoneData.co2.reduce((a, b) => a + b, 0) /
                        zoneData.co2.length
                      ).toFixed(0)}{" "}
                      ppm
                    </span>
                  </div>
                  <div className="h-32">
                    <MonitoringChart
                      data={zoneData.co2}
                      label="CO₂"
                      color="#8B5CF6"
                      unit="ppm"
                      hours={hours}
                    />
                  </div>
                </div>
              </div>

              {/* Colonna destra - Log in tempo reale (1/3) */}
              <div className="space-y-4">
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "#F7F7F7",
                    border: "1px solid #E5E7EB",
                    minHeight: "400px",
                    maxHeight: "600px",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className="text-sm font-medium"
                      style={{ color: "#3A3A3A" }}
                    >
                      <Activity
                        size={16}
                        className="inline mr-2"
                        style={{ color: "#8CA386" }}
                      />
                      Log in tempo reale
                    </h4>
                    <span className="text-xs" style={{ color: "#5E7B5B" }}>
                      {logs.length} eventi
                    </span>
                  </div>

                  <div
                    className="space-y-2 overflow-y-auto"
                    style={{ maxHeight: "500px" }}
                  >
                    {logs.length === 0 ? (
                      <div
                        className="text-center py-8"
                        style={{ color: "#AAAAAA" }}
                      >
                        <Clock size={32} className="mx-auto mb-2 opacity-30" />
                        <p className="text-sm">In attesa di eventi...</p>
                        <p className="text-xs">
                          I log appariranno in tempo reale
                        </p>
                      </div>
                    ) : (
                      logs.map((log) => (
                        <div
                          key={log.id}
                          className="p-2 rounded-lg transition-all duration-300 hover:scale-[1.01]"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #E5E7EB",
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                            <div className="flex-1">
                              <p
                                className="text-xs font-medium"
                                style={{ color: "#3A3A3A" }}
                              >
                                {log.zone}
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: "#5E7B5B" }}
                              >
                                {log.action}
                              </p>
                            </div>
                            <span
                              className="text-[10px] whitespace-nowrap"
                              style={{ color: "#AAAAAA" }}
                            >
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {logs.length > 0 && (
                    <div
                      className="mt-3 pt-3 border-t"
                      style={{ borderColor: "#E5E7EB" }}
                    >
                      <button
                        className="w-full text-xs font-medium transition-all hover:scale-105"
                        style={{ color: "#8CA386" }}
                      >
                        <Download size={14} className="inline mr-1" />
                        Esporta log
                      </button>
                    </div>
                  )}
                </div>

                {/* Info box */}
                <div
                  className="rounded-xl p-3 border-l-4"
                  style={{
                    backgroundColor: "#8CA38608",
                    borderColor: "#8CA386",
                  }}
                >
                  <p className="text-xs" style={{ color: "#5E7B5B" }}>
                    I dati vengono aggiornati in tempo reale. I log mostrano le
                    azioni eseguite automaticamente dal sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "controllo":
        // Se la struttura non è in stato Live
        if (structureState !== "live") {
          return (
            <div className="space-y-6">
              <div
                className="rounded-xl p-12 text-center"
                style={{
                  backgroundColor: "#F7F7F7",
                  border: "2px dashed #8CA38640",
                }}
              >
                <Sliders
                  size={64}
                  className="mx-auto mb-4"
                  style={{ color: "#8CA386", opacity: 0.5 }}
                />
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  Controllo non disponibile
                </h3>
                <p className="text-sm mt-2" style={{ color: "#5E7B5B" }}>
                  {structureState === "configurazione"
                    ? "Completa la configurazione per abilitare il controllo"
                    : "La struttura deve essere in stato Live per abilitare il controllo"}
                </p>
                {structureState === "simulazione" && (
                  <button
                    className="mt-4 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "#8CA386" }}
                    onClick={() => setActiveSection("ai-simulazione")}
                  >
                    Vai a AI & Simulazione
                  </button>
                )}
              </div>
            </div>
          );
        }

        // Controllo disponibile (Live)
        return (
          <div className="space-y-6">
            {/* Header Controllo */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#3A3A3A" }}
                >
                  <Sliders
                    size={20}
                    className="inline mr-2"
                    style={{ color: "#8CA386" }}
                  />
                  Attuazione / Controllo
                </h3>
                <p className="text-sm" style={{ color: "#5E7B5B" }}>
                  Controlla manualmente o automaticamente gli attuatori per zona
                </p>
              </div>
              <span className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            {/* Zone */}
            <div className="space-y-4">
              {structure.zones.map((zone) => {
                const mode = controlModes[zone.id] || "automatico";
                const actuators = actuatorsByZone[zone.id] || [];
                const isManual = mode === "manuale";

                return (
                  <div
                    key={zone.id}
                    className="rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      backgroundColor: "#F7F7F7",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    {/* Zona Header con Toggle */}
                    <div
                      className="flex items-center justify-between p-4"
                      style={{
                        backgroundColor: isManual ? "#8CA38610" : "transparent",
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: "#8CA38615" }}
                        >
                          <Home size={18} style={{ color: "#8CA386" }} />
                        </div>
                        <div>
                          <h4
                            className="font-medium"
                            style={{ color: "#3A3A3A" }}
                          >
                            {zone.nome}
                          </h4>
                          <span
                            className="text-xs"
                            style={{ color: "#5E7B5B" }}
                          >
                            {isManual
                              ? " Modalità Manuale"
                              : " Modalità Automatica"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleModeToggle(zone.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          isManual ? "text-white" : ""
                        }`}
                        style={{
                          backgroundColor: isManual ? "#8CA386" : "#E5E7EB",
                          color: isManual ? "white" : "#5E7B5B",
                        }}
                      >
                        {isManual ? (
                          <>
                            <ToggleRight size={18} />
                            Manuale
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={18} />
                            Automatico
                          </>
                        )}
                      </button>
                    </div>

                    {/* Attuatori */}
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {actuators.map((actuator) => {
                          const key = `${zone.id}-${actuator.id}`;
                          const value =
                            actuatorValues[key] || actuator.default || 50;
                          const isActive = value > 0;

                          return (
                            <div
                              key={actuator.id}
                              className="p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                              style={{
                                backgroundColor: "#FFFFFF",
                                border: `1px solid ${isActive ? "#8CA386" : "#E5E7EB"}`,
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span style={{ color: "#8CA386" }}>
                                    {actuator.icon}
                                  </span>
                                  <span
                                    className="text-sm font-medium"
                                    style={{ color: "#3A3A3A" }}
                                  >
                                    {actuator.label}
                                  </span>
                                </div>
                                <span
                                  className="text-xs font-medium"
                                  style={{
                                    color: isActive ? "#059669" : "#6B7280",
                                  }}
                                >
                                  {isActive ? " Attivo" : "⚪ Inattivo"}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={value}
                                  onChange={(e) => {
                                    if (isManual) {
                                      handleActuatorChange(
                                        zone.id,
                                        actuator.id,
                                        parseInt(e.target.value),
                                      );
                                    }
                                  }}
                                  disabled={!isManual}
                                  className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer"
                                  style={{
                                    backgroundColor: "#E5E7EB",
                                    accentColor: "#8CA386",
                                    opacity: isManual ? 1 : 0.5,
                                  }}
                                />
                                <span
                                  className="text-sm font-medium min-w-[40px] text-right"
                                  style={{ color: "#3A3A3A" }}
                                >
                                  {value}%
                                </span>
                              </div>

                              {isManual && (
                                <button
                                  onClick={() =>
                                    handleActuatorConfirm(
                                      zone.id,
                                      actuator.id,
                                      value,
                                      actuator.label,
                                    )
                                  }
                                  className="w-full mt-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                                  style={{
                                    backgroundColor: "#8CA38615",
                                    color: "#8CA386",
                                  }}
                                >
                                  <Check size={14} className="inline mr-1" />
                                  Conferma modifica
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info Box */}
            <div
              className="rounded-xl p-4 border-l-4"
              style={{
                backgroundColor: "#8CA38608",
                borderColor: "#8CA386",
              }}
            >
              <p className="text-sm" style={{ color: "#5E7B5B" }}>
                <strong>Suggerimento:</strong> In modalità Manuale puoi
                controllare ogni attuatore singolarmente. In modalità Automatica
                il sistema ottimizza i consumi in base ai dati storici e alle
                condizioni attuali.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con navigazione */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#8CA386]/10"
            style={{ color: c.greenBtn }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1
              className="text-2xl font-semibold"
              style={{ color: c.inputText }}
            >
              {structure.nome}
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-sm" style={{ color: c.greenSubtitle }}>
                {structure.cliente}
              </span>
              <span className="text-xs" style={{ color: c.placeholderText }}>
                •
              </span>
              <span className="text-xs" style={{ color: c.greenSubtitle }}>
                {structure.indirizzo}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(
            structureState === "live"
              ? "Live"
              : structureState === "dry-run"
                ? "Simulazione"
                : structureState,
          )}
          <button
            className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ color: c.greenSubtitle }}
          >
            <Edit size={18} />
          </button>
          <button
            className="p-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ color: c.greenSubtitle }}
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Stepper Stati */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: c.formBg,
          border: "1px solid #E5E7EB",
          boxShadow: c.cardShadow,
        }}
      >
        <StepperStati
          currentState={structureState}
          onStateChange={handleStateChange}
          isAdmin={isAdmin}
        />
      </div>

      {/* Navigation Tabs */}
      <div
        className="flex flex-wrap gap-1 border-b"
        style={{ borderColor: "#E5E7EB" }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg
              transition-all duration-300
              ${
                activeSection === section.id
                  ? "text-white"
                  : "hover:bg-[#8CA386]/10"
              }
            `}
            style={{
              backgroundColor:
                activeSection === section.id ? c.greenBtn : "transparent",
              color: activeSection === section.id ? "white" : c.greenSubtitle,
              borderBottom:
                activeSection === section.id ? "none" : "2px solid transparent",
            }}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="min-h-[400px]">{renderSection()}</div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() =>
          setConfirmModal({
            isOpen: false,
            title: "",
            message: "",
            action: "",
            onConfirm: null,
          })
        }
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        action={confirmModal.action}
      />
    </div>
  );
};

export default StructureDetail;
