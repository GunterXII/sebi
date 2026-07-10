// components/StepperStati.jsx
import React from 'react';
import { CheckCircle, Clock, PlayCircle, Settings, AlertCircle } from 'lucide-react';

const StepperStati = ({ currentState, onStateChange, isAdmin }) => {
  // Definizione degli stati
  const states = [
    {
      id: 'configurazione',
      label: 'Configurazione',
      description: 'Struttura in fase di configurazione',
      icon: <Settings size={16} />,
      color: '#6B7280',
      bgColor: '#6B728015',
      borderColor: '#6B728030'
    },
    {
      id: 'simulazione',
      label: 'Simulazione',
      description: 'Training AI in corso',
      icon: <PlayCircle size={16} />,
      color: '#3B82F6',
      bgColor: '#3B82F615',
      borderColor: '#3B82F630'
    },
    {
      id: 'dry-run',
      label: 'Dry-run',
      description: 'Sistema in osservazione',
      icon: <Clock size={16} />,
      color: '#F59E0B',
      bgColor: '#F59E0B15',
      borderColor: '#F59E0B30'
    },
    {
      id: 'live',
      label: 'Live',
      description: 'Sistema attivo e operativo',
      icon: <CheckCircle size={16} />,
      color: '#10B981',
      bgColor: '#10B98115',
      borderColor: '#10B98130'
    }
  ];

  // Indice dello stato corrente
  const currentIndex = states.findIndex(s => s.id === currentState);
  const currentStateData = states[currentIndex] || states[0];

  // Determina se la transizione è disponibile
  const canTransition = (from, to) => {
    const transitions = {
      'configurazione': ['simulazione'],
      'simulazione': ['dry-run'],
      'dry-run': ['live'],
      'live': []
    };
    return transitions[from]?.includes(to) || false;
  };

  // Gestisci cambio stato
  const handleStateChange = (stateId) => {
    if (canTransition(currentState, stateId) && isAdmin) {
      onStateChange?.(stateId);
    }
  };

  return (
    <div className="w-full">
      {/* Badge stato attuale */}
      <div className="mb-4">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: currentStateData.bgColor,
            color: currentStateData.color,
            border: `1px solid ${currentStateData.borderColor}`
          }}
        >
          {currentStateData.icon}
          <span className="font-medium">{currentStateData.label}</span>
          <span className="text-xs opacity-75">• {currentStateData.description}</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="relative">
        {/* Linea di connessione */}
        <div className="absolute top-5 left-0 right-0 h-0.5" style={{ backgroundColor: '#E5E7EB' }}>
          <div 
            className="h-full transition-all duration-500"
            style={{ 
              width: `${(currentIndex / (states.length - 1)) * 100}%`,
              backgroundColor: currentStateData.color 
            }}
          />
        </div>

        {/* Step indicator */}
        <div className="relative flex justify-between">
          {states.map((state, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const isClickable = canTransition(currentState, state.id) && isAdmin;

            return (
              <div key={state.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleStateChange(state.id)}
                  disabled={!isClickable}
                  className={`
                    relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isActive ? 'text-white' : 'text-gray-400'}
                    ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                  `}
                  style={{
                    backgroundColor: isActive ? state.color : '#E5E7EB',
                    boxShadow: isCurrent ? `0 0 0 4px ${state.color}30` : 'none'
                  }}
                >
                  {state.icon}
                </button>
                
                <span 
                  className={`text-xs font-medium mt-2 transition-all duration-300 ${
                    isActive ? '' : 'text-gray-400'
                  }`}
                  style={{ color: isActive ? state.color : '#9CA3AF' }}
                >
                  {state.label}
                </span>
                
                {isCurrent && (
                  <span className="text-[10px] mt-0.5 text-center" style={{ color: state.color }}>
                    Corrente
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info stato e azioni */}
      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-sm font-medium" style={{ color: '#3A3A3A' }}>
              Stato: {currentStateData.label}
            </span>
            <p className="text-xs" style={{ color: '#5E7B5B' }}>
              {currentStateData.description}
            </p>
          </div>
          
          {isAdmin && (
            <div className="flex items-center gap-2">
              {currentState === 'configurazione' && (
                <button
                  onClick={() => handleStateChange('simulazione')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                  style={{ backgroundColor: '#3B82F6' }}
                >
                  Avvia Simulazione
                </button>
              )}
              {currentState === 'simulazione' && (
                <button
                  onClick={() => handleStateChange('dry-run')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  Promuovi a Dry-run
                </button>
              )}
              {currentState === 'dry-run' && (
                <button
                  onClick={() => handleStateChange('live')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                  style={{ backgroundColor: '#10B981' }}
                >
                  Attiva Controllo Automatico
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperStati;