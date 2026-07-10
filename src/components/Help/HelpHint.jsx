// components/Help/HelpHint.jsx
import React, { useState } from "react";
import { Lightbulb, X, ChevronDown, ChevronUp } from "lucide-react";

export const HelpHint = ({
  title,
  children,
  type = "tip", // 'tip', 'info', 'warning'
  defaultExpanded = false,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const types = {
    tip: {
      icon: <Lightbulb size={18} />,
      bg: "#8CA38610",
      border: "#8CA386",
      text: "#5E7B5B",
    },
    info: {
      icon: <Info size={18} />,
      bg: "#3B82F610",
      border: "#3B82F6",
      text: "#3B82F6",
    },
    warning: {
      icon: <AlertCircle size={18} />,
      bg: "#F59E0B10",
      border: "#F59E0B",
      text: "#D97706",
    },
  };

  const typeConfig = types[type] || types.tip;

  return (
    <div
      className={`rounded-xl border-l-4 p-4 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: typeConfig.bg,
        borderColor: typeConfig.border,
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <span style={{ color: typeConfig.text }}>{typeConfig.icon}</span>
          <span
            className="text-sm font-medium"
            style={{ color: typeConfig.text }}
          >
            {title ||
              (type === "tip"
                ? " Suggerimento"
                : type === "info"
                  ? "ℹ️ Informazione"
                  : "⚠️ Attenzione")}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp size={16} style={{ color: typeConfig.text }} />
        ) : (
          <ChevronDown size={16} style={{ color: typeConfig.text }} />
        )}
      </button>
      {isExpanded && (
        <div className="mt-3 text-sm" style={{ color: "#5E7B5B" }}>
          {children}
        </div>
      )}
    </div>
  );
};

// Hint contestuali predefiniti
export const HelpHints = {
  // Per Dashboard
  Dashboard: () => (
    <HelpHint title=" Dashboard" type="tip" defaultExpanded={false}>
      <p>Questa è la vista panoramica di tutte le tue strutture. Qui puoi:</p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>Monitorare il risparmio energetico stimato</li>
        <li>Verificare lo stato di salute di ogni struttura</li>
        <li>Filtrare le strutture per tipo o stato</li>
        <li>Creare nuovi clienti o strutture</li>
      </ul>
    </HelpHint>
  ),

  // Per Dettaglio Struttura
  StructureDetail: () => (
    <HelpHint title=" Dettaglio Struttura" type="tip" defaultExpanded={false}>
      <p>Questa è la pagina centrale per gestire la struttura. Da qui puoi:</p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>
          Visualizzare lo <strong>stato attuale</strong> della struttura
        </li>
        <li>
          Monitorare la <strong>salute</strong> del sistema
        </li>
        <li>
          Accedere a <strong>AI & Simulazione</strong> per il training
        </li>
        <li>
          Visualizzare i <strong>dati in tempo reale</strong>
        </li>
        <li>
          Controllare <strong>manualmente gli attuatori</strong>
        </li>
      </ul>
    </HelpHint>
  ),

  // Per AI & Simulazione
  AI: () => (
    <HelpHint title=" AI & Simulazione" type="info" defaultExpanded={false}>
      <p>
        L'AI analizza i dati storici per ottimizzare i consumi. Il processo è:
      </p>
      <ol className="list-decimal list-inside mt-1 space-y-0.5">
        <li>
          <strong>Avvia Training</strong> - Addestra il modello AI
        </li>
        <li>
          <strong>Promuovi a Dry-run</strong> - Testa il modello in sicurezza
        </li>
        <li>
          <strong>Attiva Controllo Automatico</strong> - Il sistema controlla
          autonomamente
        </li>
      </ol>
    </HelpHint>
  ),

  // Per Monitoraggio
  Monitoring: () => (
    <HelpHint title=" Monitoraggio" type="info" defaultExpanded={false}>
      <p>
        Il monitoraggio mostra i dati in tempo reale dalle zone della struttura:
      </p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>
          <strong>Grafici</strong> - Temperatura, umidità e CO₂ nelle ultime 24
          ore
        </li>
        <li>
          <strong>Log</strong> - Eventi e azioni automatiche del sistema
        </li>
        <li>
          <strong>Filtri</strong> - Seleziona zona e periodo di visualizzazione
        </li>
      </ul>
    </HelpHint>
  ),

  // Per Controllo
  Control: () => (
    <HelpHint
      title="️ Attuazione / Controllo"
      type="warning"
      defaultExpanded={false}
    >
      <p>
        Il controllo permette di gestire manualmente o automaticamente gli
        attuatori:
      </p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>
          <strong>Automatico</strong> - Il sistema ottimizza autonomamente i
          consumi
        </li>
        <li>
          <strong>Manuale</strong> - Puoi controllare ogni attuatore
          singolarmente
        </li>
        <li>
          <strong>Conferma</strong> - Ogni modifica richiede conferma per
          sicurezza
        </li>
      </ul>
    </HelpHint>
  ),

  // Per Clienti
  Clients: () => (
    <HelpHint title=" Clienti" type="tip" defaultExpanded={false}>
      <p>Gestisci i tuoi clienti e le loro strutture:</p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>
          <strong>Tabella</strong> - Visualizza tutti i clienti con i dettagli
        </li>
        <li>
          <strong>Clicca una riga</strong> - Per vedere i dettagli del cliente
        </li>
        <li>
          <strong>Nuovo Cliente</strong> - Aggiungi un nuovo cliente dal drawer
        </li>
      </ul>
    </HelpHint>
  ),

  // Per Allarmi
  Alarms: () => (
    <HelpHint title=" Allarmi" type="warning" defaultExpanded={false}>
      <p>Monitora e gestisci tutti gli allarmi del sistema:</p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>
          <strong>Filtri</strong> - Per gravità e stato
        </li>
        <li>
          <strong>Segna come risolto</strong> - Risolvi gli allarmi aperti
        </li>
        <li>
          <strong>KPI</strong> - Visualizza il riepilogo degli allarmi
        </li>
      </ul>
    </HelpHint>
  ),

  // Per Impostazioni
  Settings: () => (
    <HelpHint title="⚙️ Impostazioni" type="info" defaultExpanded={false}>
      <p>Gestisci gli utenti interni del sistema:</p>
      <ul className="list-disc list-inside mt-1 space-y-0.5">
        <li>
          <strong>Tabella</strong> - Visualizza tutti gli utenti
        </li>
        <li>
          <strong>Ruoli</strong> - Admin, Manager, Tecnico
        </li>
        <li>
          <strong>Invita</strong> - Aggiungi nuovi utenti al sistema
        </li>
      </ul>
    </HelpHint>
  ),
};
