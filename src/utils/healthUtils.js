// utils/healthUtils.js
export const calculateHealth = (structure) => {
  let health = 100;

  // Se in configurazione, salute 0
  if (structure.stato === "Configurazione") {
    return 0;
  }

  // Se in simulazione, salute base
  if (structure.stato === "Simulazione") {
    health = 40;
  }

  // Se in dry-run, salute media
  if (structure.stato === "Dry-run") {
    health = 70;
  }

  // Se in live, salute basata su sensori
  if (structure.stato === "Live") {
    health = 80;
  }

  // Riduci per allarmi
  if (structure.allarmi > 0) {
    health -= structure.allarmi * 5;
  }

  // Se non ci sono sensori, salute bassa
  if (structure.sensori === 0) {
    health = Math.min(health, 20);
  }

  return Math.max(0, Math.min(100, health));
};

export const getHealthColor = (health) => {
  if (health > 80) return "#10B981";
  if (health > 60) return "#F59E0B";
  if (health > 40) return "#F97316";
  return "#EF4444";
};

export const getHealthLabel = (health) => {
  if (health > 80) return "Ottimo";
  if (health > 60) return "Buono";
  if (health > 40) return "Attenzione";
  return "Critico";
};

export const getHealthIcon = (health) => {
  if (health > 80) return "✅";
  if (health > 60) return "";
  if (health > 40) return "⚠️";
  return "";
};
