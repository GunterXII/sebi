// CreateStructureWizard.jsx
import React, { useState } from "react";
import {
  Building2,
  Sprout,
  Leaf,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Trash2,
  Edit,
  Copy,
  Thermometer,
  Droplets,
  Wind,
  Lightbulb,
  Zap,
  Activity,
  Gauge,
  Sun,
  Cloud,
  CloudRain,
  Fan,
  Home,
  Factory,
  Warehouse,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Info,
  HelpCircle,
  Minus,
  Plus as PlusIcon,
  Settings,
  Sliders,
  BarChart3,
  Cpu,
  Database,
  Wifi,
  Server,
  HardDrive,
  ChevronDown,
} from "lucide-react";

// ============================================================
// COMPONENTE WIZARD STEP
// ============================================================
const WizardStep = ({
  children,
  title,
  description,
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="space-y-6">
      {/* Header con progresso */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: "#3A3A3A" }}>
            {title}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#5E7B5B" }}>
            {description}
          </p>
        </div>
        <span className="text-sm font-medium" style={{ color: "#8CA386" }}>
          Passo {currentStep + 1} di {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "#E5E7EB" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / totalSteps) * 100}%`,
            backgroundColor: "#8CA386",
          }}
        />
      </div>

      {/* Content */}
      <div className="mt-6">{children}</div>
    </div>
  );
};

// ============================================================
// COMPONENTE STEP 1 - Selezione Tipo
// ============================================================
const Step1SelectType = ({ selectedType, onSelectType }) => {
  const types = [
    {
      id: "edificio",
      label: "Edificio",
      icon: <Building2 size={48} />,
      color: "#8CA386",
      bg: "#8CA38610",
    },
    {
      id: "serra",
      label: "Serra",
      icon: <Leaf size={48} />,
      color: "#8CA386",
      bg: "#8CA38610",
    },
    {
      id: "allevamento",
      label: "Allevamento",
      icon: <Sprout size={48} />,
      color: "#8CA386",
      bg: "#8CA38610",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#5E7B5B" }}>
        Seleziona il tipo di struttura che desideri configurare
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectType(type.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
              selectedType === type.id
                ? "border-[#8CA386] shadow-lg"
                : "border-[#E5E7EB]"
            }`}
            style={{
              backgroundColor:
                selectedType === type.id ? `${type.bg}` : "#F7F7F7",
              boxShadow:
                selectedType === type.id
                  ? "0 8px 40px rgba(74,99,69,0.18)"
                  : "none",
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="p-4 rounded-full"
                style={{
                  backgroundColor:
                    selectedType === type.id ? `${type.color}20` : "#E5E7EB",
                }}
              >
                <span
                  style={{
                    color: selectedType === type.id ? type.color : "#6B7280",
                  }}
                >
                  {type.icon}
                </span>
              </div>
              <span
                className="text-lg font-medium"
                style={{
                  color: selectedType === type.id ? type.color : "#3A3A3A",
                }}
              >
                {type.label}
              </span>
              {selectedType === type.id && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: type.color }}
                >
                  Selezionato
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// COMPONENTE STEP 2 - Gestione Zone
// ============================================================
const Step2Zones = ({ zones, onAddZone, onRemoveZone, onUpdateZone }) => {
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneSurface, setNewZoneSurface] = useState("");

  const handleAddZone = () => {
    if (newZoneName.trim()) {
      onAddZone({
        id: Date.now(),
        nome: newZoneName,
        superficie: newZoneSurface || "N/A",
      });
      setNewZoneName("");
      setNewZoneSurface("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Nome zona (es. Piano Terra)"
            value={newZoneName}
            onChange={(e) => setNewZoneName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
            style={{
              backgroundColor: "#F7F7F7",
              borderColor: "#D1D1D1",
              color: "#3A3A3A",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
          />
        </div>
        <div className="w-32">
          <input
            type="text"
            placeholder="Superficie"
            value={newZoneSurface}
            onChange={(e) => setNewZoneSurface(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
            style={{
              backgroundColor: "#F7F7F7",
              borderColor: "#D1D1D1",
              color: "#3A3A3A",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
            onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
          />
        </div>
        <button
          onClick={handleAddZone}
          className="px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: "#8CA386" }}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="space-y-2">
        {zones.length === 0 ? (
          <div className="text-center py-8" style={{ color: "#AAAAAA" }}>
            <p className="text-sm">Nessuna zona aggiunta</p>
            <p className="text-xs">Aggiungi le zone della tua struttura</p>
          </div>
        ) : (
          zones.map((zone) => (
            <div
              key={zone.id}
              className="flex items-center justify-between p-3 rounded-lg transition-all hover:scale-[1.01]"
              style={{
                backgroundColor: "#F7F7F7",
                border: "1px solid #E5E7EB",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#8CA38615" }}
                >
                  <Home size={16} style={{ color: "#8CA386" }} />
                </div>
                <div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#3A3A3A" }}
                  >
                    {zone.nome}
                  </span>
                  <span className="text-xs ml-2" style={{ color: "#5E7B5B" }}>
                    {zone.superficie}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveZone(zone.id)}
                className="p-1.5 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-red-50"
                style={{ color: "#EF4444" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ============================================================
// COMPONENTE STEP 3 - Sensori
// ============================================================
const Step3Sensors = ({
  selectedSensors,
  onToggleSensor,
  deviceId,
  onDeviceIdChange,
}) => {
  const sensors = [
    {
      id: "temperature",
      label: "Temperatura",
      icon: <Thermometer size={24} />,
    },
    { id: "humidity", label: "Umidità", icon: <Droplets size={24} /> },
    { id: "co2", label: "CO2", icon: <Wind size={24} /> },
    { id: "light", label: "Luminosità", icon: <Lightbulb size={24} /> },
    { id: "pressure", label: "Pressione", icon: <Gauge size={24} /> },
    { id: "energy", label: "Consumo Energetico", icon: <Zap size={24} /> },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#5E7B5B" }}>
        Seleziona i sensori che vuoi installare nella struttura
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sensors.map((sensor) => {
          const isSelected = selectedSensors.includes(sensor.id);
          return (
            <button
              key={sensor.id}
              onClick={() => onToggleSensor(sensor.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                isSelected ? "border-[#8CA386]" : "border-[#E5E7EB]"
              }`}
              style={{
                backgroundColor: isSelected ? "#8CA38610" : "#F7F7F7",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span style={{ color: isSelected ? "#8CA386" : "#6B7280" }}>
                  {sensor.icon}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: isSelected ? "#8CA386" : "#3A3A3A" }}
                >
                  {sensor.label}
                </span>
                {isSelected && (
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "#8CA386" }}
                  >
                    Selezionato
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: "#5E7B5B" }}
        >
          ID Dispositivo (opzionale)
        </label>
        <input
          type="text"
          placeholder="Inserisci l'ID del dispositivo"
          value={deviceId}
          onChange={(e) => onDeviceIdChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none"
          style={{
            backgroundColor: "#F7F7F7",
            borderColor: "#D1D1D1",
            color: "#3A3A3A",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
          onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
        />
      </div>
    </div>
  );
};

// ============================================================
// COMPONENTE STEP 4 - Attuatori
// ============================================================
const Step4Actuators = ({ selectedActuators, onToggleActuator }) => {
  const actuators = [
    { id: "heating", label: "Riscaldamento", icon: <Thermometer size={24} /> },
    { id: "ventilation", label: "Ventilazione", icon: <Fan size={24} /> },
    { id: "lighting", label: "Illuminazione", icon: <Lightbulb size={24} /> },
    { id: "irrigation", label: "Irrigazione", icon: <CloudRain size={24} /> },
    { id: "cooling", label: "Raffreddamento", icon: <Cloud size={24} /> },
    { id: "shading", label: "Ombregiamento", icon: <Sun size={24} /> },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#5E7B5B" }}>
        Seleziona gli attuatori che vuoi installare nella struttura
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actuators.map((actuator) => {
          const isSelected = selectedActuators.includes(actuator.id);
          return (
            <button
              key={actuator.id}
              onClick={() => onToggleActuator(actuator.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                isSelected ? "border-[#8CA386]" : "border-[#E5E7EB]"
              }`}
              style={{
                backgroundColor: isSelected ? "#8CA38610" : "#F7F7F7",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span style={{ color: isSelected ? "#8CA386" : "#6B7280" }}>
                  {actuator.icon}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: isSelected ? "#8CA386" : "#3A3A3A" }}
                >
                  {actuator.label}
                </span>
                {isSelected && (
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: "#8CA386" }}
                  >
                    Selezionato
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// COMPONENTE STEP 5 - Limiti Operativi
// ============================================================
const Step5Limits = ({ zones, limits, onLimitChange }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#5E7B5B" }}>
        Imposta i limiti operativi per ogni zona
      </p>
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "#F7F7F7",
            border: "1px solid #E5E7EB",
          }}
        >
          <h4 className="font-medium mb-3" style={{ color: "#3A3A3A" }}>
            {zone.nome}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: "#5E7B5B" }}
              >
                Temperatura Minima (°C)
              </label>
              <input
                type="number"
                value={limits[zone.id]?.tempMin || ""}
                onChange={(e) =>
                  onLimitChange(zone.id, "tempMin", e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D1D1D1",
                  color: "#3A3A3A",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
                onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: "#5E7B5B" }}
              >
                Temperatura Massima (°C)
              </label>
              <input
                type="number"
                value={limits[zone.id]?.tempMax || ""}
                onChange={(e) =>
                  onLimitChange(zone.id, "tempMax", e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D1D1D1",
                  color: "#3A3A3A",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
                onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: "#5E7B5B" }}
              >
                Umidità Minima (%)
              </label>
              <input
                type="number"
                value={limits[zone.id]?.humidityMin || ""}
                onChange={(e) =>
                  onLimitChange(zone.id, "humidityMin", e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D1D1D1",
                  color: "#3A3A3A",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
                onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1"
                style={{ color: "#5E7B5B" }}
              >
                Umidità Massima (%)
              </label>
              <input
                type="number"
                value={limits[zone.id]?.humidityMax || ""}
                onChange={(e) =>
                  onLimitChange(zone.id, "humidityMax", e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#D1D1D1",
                  color: "#3A3A3A",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8CA386")}
                onBlur={(e) => (e.target.style.borderColor = "#D1D1D1")}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// COMPONENTE STEP 6 - Riepilogo
// ============================================================
const Step6Summary = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    zones: true,
    sensors: true,
    actuators: true,
    limits: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const typeLabels = {
    edificio: " Edificio",
    serra: " Serra",
    allevamento: " Allevamento",
  };

  const sensorLabels = {
    temperature: "️ Temperatura",
    humidity: " Umidità",
    co2: "️ CO2",
    light: " Luminosità",
    pressure: " Pressione",
    energy: "⚡ Consumo Energetico",
  };

  const actuatorLabels = {
    heating: " Riscaldamento",
    ventilation: " Ventilazione",
    lighting: " Illuminazione",
    irrigation: " Irrigazione",
    cooling: "❄️ Raffreddamento",
    shading: "☀️ Ombregiamento",
  };

  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: "#5E7B5B" }}>
        Rivedi tutti i dati prima di confermare
      </p>

      {/* Tipo */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "#E5E7EB" }}
      >
        <button
          onClick={() => toggleSection("type")}
          className="w-full flex items-center justify-between p-4 bg-[#F7F7F7] hover:bg-[#F7F7F7]/80 transition-colors"
        >
          <span className="font-medium" style={{ color: "#3A3A3A" }}>
            Tipo Struttura
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: expandedSections.type
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
              color: "#5E7B5B",
            }}
          />
        </button>
        {expandedSections.type && (
          <div className="p-4">
            <p className="text-sm" style={{ color: "#5E7B5B" }}>
              {typeLabels[data.type] || data.type}
            </p>
          </div>
        )}
      </div>

      {/* Zone */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "#E5E7EB" }}
      >
        <button
          onClick={() => toggleSection("zones")}
          className="w-full flex items-center justify-between p-4 bg-[#F7F7F7] hover:bg-[#F7F7F7]/80 transition-colors"
        >
          <span className="font-medium" style={{ color: "#3A3A3A" }}>
            Zone ({data.zones.length})
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: expandedSections.zones
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
              color: "#5E7B5B",
            }}
          />
        </button>
        {expandedSections.zones && (
          <div className="p-4 space-y-2">
            {data.zones.map((zone) => (
              <div
                key={zone.id}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#5E7B5B" }}
              >
                <Home size={14} style={{ color: "#8CA386" }} />
                <span>{zone.nome}</span>
                <span className="text-xs">({zone.superficie})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sensori */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "#E5E7EB" }}
      >
        <button
          onClick={() => toggleSection("sensors")}
          className="w-full flex items-center justify-between p-4 bg-[#F7F7F7] hover:bg-[#F7F7F7]/80 transition-colors"
        >
          <span className="font-medium" style={{ color: "#3A3A3A" }}>
            Sensori ({data.sensors.length})
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: expandedSections.sensors
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
              color: "#5E7B5B",
            }}
          />
        </button>
        {expandedSections.sensors && (
          <div className="p-4 space-y-2">
            {data.sensors.map((sensor) => (
              <div
                key={sensor}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#5E7B5B" }}
              >
                <CheckCircle size={14} style={{ color: "#8CA386" }} />
                <span>{sensorLabels[sensor] || sensor}</span>
              </div>
            ))}
            {data.deviceId && (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#5E7B5B" }}
              >
                <span className="text-xs">ID Dispositivo:</span>
                <span className="font-mono">{data.deviceId}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Attuatori */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "#E5E7EB" }}
      >
        <button
          onClick={() => toggleSection("actuators")}
          className="w-full flex items-center justify-between p-4 bg-[#F7F7F7] hover:bg-[#F7F7F7]/80 transition-colors"
        >
          <span className="font-medium" style={{ color: "#3A3A3A" }}>
            Attuatori ({data.actuators.length})
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: expandedSections.actuators
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
              color: "#5E7B5B",
            }}
          />
        </button>
        {expandedSections.actuators && (
          <div className="p-4 space-y-2">
            {data.actuators.map((actuator) => (
              <div
                key={actuator}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#5E7B5B" }}
              >
                <CheckCircle size={14} style={{ color: "#8CA386" }} />
                <span>{actuatorLabels[actuator] || actuator}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Limiti Operativi */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{ borderColor: "#E5E7EB" }}
      >
        <button
          onClick={() => toggleSection("limits")}
          className="w-full flex items-center justify-between p-4 bg-[#F7F7F7] hover:bg-[#F7F7F7]/80 transition-colors"
        >
          <span className="font-medium" style={{ color: "#3A3A3A" }}>
            Limiti Operativi
          </span>
          <ChevronDown
            size={18}
            style={{
              transform: expandedSections.limits
                ? "rotate(180deg)"
                : "rotate(0deg)",
              transition: "transform 0.3s",
              color: "#5E7B5B",
            }}
          />
        </button>
        {expandedSections.limits && (
          <div className="p-4 space-y-4">
            {data.zones.map((zone) => {
              const limits = data.limits[zone.id] || {};
              return (
                <div
                  key={zone.id}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#F7F7F7" }}
                >
                  <p
                    className="font-medium text-sm mb-2"
                    style={{ color: "#3A3A3A" }}
                  >
                    {zone.nome}
                  </p>
                  <div
                    className="grid grid-cols-2 gap-2 text-xs"
                    style={{ color: "#5E7B5B" }}
                  >
                    <span>Temp Min: {limits.tempMin || "-"}°C</span>
                    <span>Temp Max: {limits.tempMax || "-"}°C</span>
                    <span>Umidità Min: {limits.humidityMin || "-"}%</span>
                    <span>Umidità Max: {limits.humidityMax || "-"}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// COMPONENTE PRINCIPALE - CREATE STRUCTURE WIZARD
// ============================================================
const CreateStructureWizard = ({ isOpen, onClose, onConfirm, addToast }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: null,
    zones: [],
    sensors: [],
    actuators: [],
    deviceId: "",
    limits: {},
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    // Crea la nuova struttura
    const newStructure = {
      ...formData,
      id: Date.now(),
      stato: "Simulazione", // Automaticamente in simulazione
      salute: 0,
      risparmio: 0,
      nome:
        formData.type === "edificio"
          ? "Nuovo Edificio"
          : formData.type === "serra"
            ? "Nuova Serra"
            : "Nuovo Allevamento",
      cliente: "Nuovo Cliente",
      indirizzo: "Indirizzo non specificato",
      ultimoAggiornamento: "Ora",
      training: "N/A",
      consumi: [0, 0, 0, 0, 0, 0, 0],
    };

    onConfirm(newStructure);

    // Mostra toast di conferma
    if (addToast) {
      addToast(
        "success",
        "Struttura creata con successo! La struttura è ora in stato Simulazione.",
      );
    }

    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.type !== null;
      case 1:
        return formData.zones.length > 0;
      case 2:
        return formData.sensors.length > 0;
      case 3:
        return formData.actuators.length > 0;
      case 4:
        return true; // Limits are optional
      case 5:
        return true;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        style={{ animation: "fadeIn 0.2s ease-out" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ animation: "fadeInUp 0.3s ease-out" }}
      >
        <div
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(140,163,134,0.15)",
            boxShadow: "0 20px 60px rgba(74,99,69,0.15)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "rgba(140,163,134,0.10)" }}
          >
            <div>
              <h2
                className="text-xl font-semibold"
                style={{ color: "#3A3A3A" }}
              >
                Nuova Struttura
              </h2>
              <p className="text-sm" style={{ color: "#5E7B5B" }}>
                Configura la tua nuova struttura passo dopo passo
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              style={{ color: "#5E7B5B" }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-6">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      index <= currentStep ? "text-white" : "text-gray-400"
                    }`}
                    style={{
                      backgroundColor:
                        index <= currentStep ? "#8CA386" : "#E5E7EB",
                    }}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                        index < currentStep ? "bg-[#8CA386]" : "bg-[#E5E7EB]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Steps */}
            {currentStep === 0 && (
              <WizardStep
                title="Selezione Tipo"
                description="Scegli il tipo di struttura"
                currentStep={0}
                totalSteps={6}
              >
                <Step1SelectType
                  selectedType={formData.type}
                  onSelectType={(type) =>
                    setFormData((prev) => ({ ...prev, type }))
                  }
                />
              </WizardStep>
            )}

            {currentStep === 1 && (
              <WizardStep
                title="Gestione Zone"
                description="Aggiungi le zone della struttura"
                currentStep={1}
                totalSteps={6}
              >
                <Step2Zones
                  zones={formData.zones}
                  onAddZone={(zone) =>
                    setFormData((prev) => ({
                      ...prev,
                      zones: [...prev.zones, zone],
                    }))
                  }
                  onRemoveZone={(id) =>
                    setFormData((prev) => ({
                      ...prev,
                      zones: prev.zones.filter((z) => z.id !== id),
                    }))
                  }
                  onUpdateZone={(id, field, value) => {
                    setFormData((prev) => ({
                      ...prev,
                      zones: prev.zones.map((z) =>
                        z.id === id ? { ...z, [field]: value } : z,
                      ),
                    }));
                  }}
                />
              </WizardStep>
            )}

            {currentStep === 2 && (
              <WizardStep
                title="Sensori"
                description="Seleziona i sensori da installare"
                currentStep={2}
                totalSteps={6}
              >
                <Step3Sensors
                  selectedSensors={formData.sensors}
                  onToggleSensor={(id) => {
                    setFormData((prev) => ({
                      ...prev,
                      sensors: prev.sensors.includes(id)
                        ? prev.sensors.filter((s) => s !== id)
                        : [...prev.sensors, id],
                    }));
                  }}
                  deviceId={formData.deviceId}
                  onDeviceIdChange={(id) =>
                    setFormData((prev) => ({ ...prev, deviceId: id }))
                  }
                />
              </WizardStep>
            )}

            {currentStep === 3 && (
              <WizardStep
                title="Attuatori"
                description="Seleziona gli attuatori da installare"
                currentStep={3}
                totalSteps={6}
              >
                <Step4Actuators
                  selectedActuators={formData.actuators}
                  onToggleActuator={(id) => {
                    setFormData((prev) => ({
                      ...prev,
                      actuators: prev.actuators.includes(id)
                        ? prev.actuators.filter((a) => a !== id)
                        : [...prev.actuators, id],
                    }));
                  }}
                />
              </WizardStep>
            )}

            {currentStep === 4 && (
              <WizardStep
                title="Limiti Operativi"
                description="Imposta i limiti per ogni zona"
                currentStep={4}
                totalSteps={6}
              >
                <Step5Limits
                  zones={formData.zones}
                  limits={formData.limits}
                  onLimitChange={(zoneId, field, value) => {
                    setFormData((prev) => ({
                      ...prev,
                      limits: {
                        ...prev.limits,
                        [zoneId]: {
                          ...prev.limits[zoneId],
                          [field]: value,
                        },
                      },
                    }));
                  }}
                />
              </WizardStep>
            )}

            {currentStep === 5 && (
              <WizardStep
                title="Riepilogo"
                description="Rivedi tutti i dati"
                currentStep={5}
                totalSteps={6}
              >
                <Step6Summary data={formData} />
              </WizardStep>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between p-6 border-t"
            style={{ borderColor: "rgba(140,163,134,0.10)" }}
          >
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                currentStep === 0 ? "invisible" : ""
              }`}
              style={{
                color: "#5E7B5B",
                backgroundColor: "#F7F7F7",
              }}
            >
              <ChevronLeft size={18} />
              Indietro
            </button>

            <div className="flex items-center gap-3">
              {currentStep === totalSteps - 1 ? (
                <button
                  onClick={handleConfirm}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "#8CA386",
                    boxShadow: "0 4px 12px rgba(140,163,134,0.3)",
                  }}
                >
                  <Check size={18} />
                  Conferma e genera simulazione
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 ${
                    !canProceed() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{
                    backgroundColor: "#8CA386",
                    boxShadow: "0 4px 12px rgba(140,163,134,0.3)",
                  }}
                >
                  Continua
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animazioni CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default CreateStructureWizard;
