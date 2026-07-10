// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    TECHNICIAN: 'tecnico',
    CLIENT: 'cliente'
  };

  const PERMISSIONS = {
    VIEW_ALL_CLIENTS: 'view_all_clients',
    VIEW_ALL_STRUCTURES: 'view_all_structures',
    CONFIGURE_STRUCTURES: 'configure_structures',
    MODIFY_CONFIGURATIONS: 'modify_configurations',
    START_TRAINING: 'start_training',
    CHANGE_STRUCTURE_STATUS: 'change_structure_status',
    VIEW_TECHNICAL_LOGS: 'view_technical_logs',
    MANAGE_USERS: 'manage_users',
    MANAGE_ALARMS: 'manage_alarms',
    ACTIVATE_AUTO_CONTROL: 'activate_auto_control',
    PROMOTE_TO_DRY_RUN: 'promote_to_dry_run',
    VIEW_CLIENTS: 'view_clients',
    VIEW_STRUCTURES: 'view_structures',
    VIEW_REPORTS: 'view_reports',
    VIEW_STRUCTURE_DETAILS: 'view_structure_details',
    VIEW_SENSOR_DATA: 'view_sensor_data',
    VIEW_OWN_STRUCTURES: 'view_own_structures',
    VIEW_SIMPLE_DATA: 'view_simple_data',
    VIEW_REPORTS_CLIENT: 'view_reports_client',
    SET_PREFERENCES: 'set_preferences'
  };

  const rolePermissions = {
    [ROLES.ADMIN]: [
      PERMISSIONS.VIEW_ALL_CLIENTS,
      PERMISSIONS.VIEW_ALL_STRUCTURES,
      PERMISSIONS.CONFIGURE_STRUCTURES,
      PERMISSIONS.MODIFY_CONFIGURATIONS,
      PERMISSIONS.START_TRAINING,
      PERMISSIONS.CHANGE_STRUCTURE_STATUS,
      PERMISSIONS.VIEW_TECHNICAL_LOGS,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_ALARMS,
      PERMISSIONS.ACTIVATE_AUTO_CONTROL,
      PERMISSIONS.PROMOTE_TO_DRY_RUN,
      PERMISSIONS.VIEW_CLIENTS,
      PERMISSIONS.VIEW_STRUCTURES,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.VIEW_STRUCTURE_DETAILS,
      PERMISSIONS.VIEW_SENSOR_DATA
    ],
    [ROLES.MANAGER]: [
      PERMISSIONS.VIEW_CLIENTS,
      PERMISSIONS.VIEW_STRUCTURES,
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.VIEW_STRUCTURE_DETAILS,
      PERMISSIONS.VIEW_SENSOR_DATA
    ],
    [ROLES.TECHNICIAN]: [
      PERMISSIONS.VIEW_STRUCTURE_DETAILS,
      PERMISSIONS.VIEW_SENSOR_DATA,
      PERMISSIONS.VIEW_STRUCTURES
    ],
    [ROLES.CLIENT]: [
      PERMISSIONS.VIEW_OWN_STRUCTURES,
      PERMISSIONS.VIEW_SIMPLE_DATA,
      PERMISSIONS.VIEW_REPORTS_CLIENT,
      PERMISSIONS.SET_PREFERENCES
    ]
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simula chiamata API
      setTimeout(() => {
        // Lista utenti di test
        const users = {
          'admin@sebi.energy': {
            id: 1,
            name: 'Amministratore',
            email: 'admin@sebi.energy',
            role: ROLES.ADMIN,
            avatar: 'AD'
          },
          'manager@sebi.energy': {
            id: 2,
            name: 'Manager',
            email: 'manager@sebi.energy',
            role: ROLES.MANAGER,
            avatar: 'MN'
          },
          'tecnico@sebi.energy': {
            id: 3,
            name: 'Tecnico',
            email: 'tecnico@sebi.energy',
            role: ROLES.TECHNICIAN,
            avatar: 'TC'
          },
          'cliente@sebi.energy': {
            id: 4,
            name: 'Cliente',
            email: 'cliente@sebi.energy',
            role: ROLES.CLIENT,
            avatar: 'CL'
          }
        };

        // Verifica se l'email esiste
        const foundUser = users[email];
        
        // Se l'utente non esiste o la password è sbagliata
        if (!foundUser) {
          reject(new Error('Email non trovata'));
          return;
        }

        if (password !== 'password' && password !== 'Password123') {
          reject(new Error('Password non valida'));
          return;
        }

        // Login riuscito
        const userPermissions = rolePermissions[foundUser.role] || [];
        setUser(foundUser);
        setPermissions(userPermissions);
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('permissions', JSON.stringify(userPermissions));
        resolve(foundUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setPermissions([]);
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
  };

  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const isAdmin = () => {
    return user?.role === ROLES.ADMIN;
  };

  const isClient = () => {
    return user?.role === ROLES.CLIENT;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedPermissions = localStorage.getItem('permissions');
    if (savedUser && savedPermissions) {
      try {
        setUser(JSON.parse(savedUser));
        setPermissions(JSON.parse(savedPermissions));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
      }
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    isLoading,
    permissions,
    login,
    logout,
    hasPermission,
    hasRole,
    isAdmin,
    isClient,
    ROLES,
    PERMISSIONS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;