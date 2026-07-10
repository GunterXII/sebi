// Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Zap,
  Leaf,
  ThermometerSun,
  Droplets,
  Wind,
  Lightbulb,
  Sprout,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Home,
  Search,
  User,
  Shield,
  HelpCircle,
  PlusCircle
} from 'lucide-react';
import logo from "../assets/LogoSebi.png";
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ 
  isOpen, 
  setIsOpen, 
  isMobile, 
  setIsMobile,
  onNavigate,
  activeView  
}) => {
  const { user, logout, hasPermission, PERMISSIONS } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleNavClick = (id) => {
    setActiveItem(id);
    if (onNavigate) {
      onNavigate(id);
    }
    if (isMobile) {
      setIsMobile(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menu items filtrati per ruolo
  const getMenuItems = () => {
    const items = [];

    // Dashboard - sempre visibile
    items.push({
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      badge: null
    });

    // Clienti - solo Admin e Manager
    if (hasPermission(PERMISSIONS.VIEW_CLIENTS) || hasPermission(PERMISSIONS.VIEW_ALL_CLIENTS)) {
      items.push({
        id: 'clienti',
        label: 'Clienti',
        icon: <Users size={20} />,
        badge: null
      });
    }

    // Strutture - tutti tranne cliente (che vede solo le sue)
    if (hasPermission(PERMISSIONS.VIEW_STRUCTURES) || hasPermission(PERMISSIONS.VIEW_ALL_STRUCTURES)) {
      items.push({
        id: 'strutture',
        label: 'Strutture',
        icon: <Building2 size={20} />,
      });
    }

    // Allarmi - solo Admin
    if (hasPermission(PERMISSIONS.MANAGE_ALARMS)) {
      items.push({
        id: 'allarmi',
        label: 'Allarmi',
        icon: <Bell size={20} />,
      });
    }

    // Impostazioni - solo Admin
    if (hasPermission(PERMISSIONS.MANAGE_USERS)) {
      items.push({
        id: 'impostazioni',
        label: 'Impostazioni',
        icon: <Settings size={20} />,
        badge: null
      });
    }

    return items;
  };

  const menuItems = getMenuItems();

  // Sottocategorie per le strutture (solo Admin)
  const structureTypes = [
    { id: 'edifici', label: 'Edifici', icon: <Building2 size={16} />, count: 8 },
    { id: 'allevamenti', label: 'Allevamenti', icon: <Sprout size={16} />, count: 3 },
    { id: 'serre', label: 'Serre', icon: <Leaf size={16} />, count: 1 }
  ];

  // Stato dei sensori
  const sensorStatus = [
    { label: 'Attivi', count: 24, icon: <CheckCircle size={14} className="text-success" /> },
    { label: 'Allarme', count: 3, icon: <AlertTriangle size={14} className="text-error" /> },
    { label: 'Manutenzione', count: 2, icon: <Activity size={14} className="text-warning" /> }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Determina le iniziali dell'utente per l'avatar
  const getUserInitials = () => {
    if (!user) return '?';
    if (user.avatar) return user.avatar;
    return user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  // Determina il ruolo visualizzato
  const getRoleLabel = (role) => {
    switch(role) {
      case 'admin': return 'Amministratore';
      case 'manager': return 'Manager';
      case 'tecnico': return 'Tecnico';
      case 'cliente': return 'Cliente';
      default: return role;
    }
  };

  return (
    <>
      {/* Overlay per mobile */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setIsMobile(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full 
          sidebar-glass
          transition-all duration-300 ease-in-out
          z-50
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobile ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          flex flex-col
        `}
        style={{
          transitionProperty: 'width, transform',
        }}
      >
        {/* Header Logo con animazione */}
        <div className={`
          flex items-center justify-between
          h-16 px-4 border-b border-white/10
          ${isCollapsed ? 'justify-center' : ''}
          transition-all duration-300
        `}>
          <div className={`
            flex items-center gap-3
            ${isCollapsed ? 'hidden' : 'flex'}
            animate-fadeIn p-6
          `}>
            <img src={logo} alt="SEBI Energy" className="" />
          </div>

          {/* Logo mini per collapsed */}
          {isCollapsed && (
            <div className="
              w-10 h-10 rounded-xl bg-[#8CA386] flex items-center justify-center
              transition-all duration-300 hover:scale-110 hover:rotate-12
              shadow-lg shadow-[#8CA386]/20
              animate-fadeIn
            ">
              <Zap size={22} className="text-white" />
            </div>
          )}

          {/* Toggle collapse button */}
          <button
            onClick={toggleCollapse}
            className={`
              hidden md:flex items-center justify-center
              w-8 h-8 rounded-lg
              transition-all duration-300 ease-in-out
              hover:bg-white/20 hover:scale-110
              ${isCollapsed ? 'mx-auto' : ''}
              group
            `}
          >
            <ChevronLeft 
              size={18} 
              className={`
                transition-all duration-300
                group-hover:translate-x-[-2px]
                ${isCollapsed ? 'rotate-180' : ''}
              `}
            />
          </button>

          {/* Close button mobile */}
          <button
            className="
              md:hidden flex items-center justify-center 
              w-8 h-8 rounded-lg 
              transition-all duration-300 hover:bg-white/20 hover:scale-110
            "
            onClick={() => setIsMobile(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4">
          {/* Menu principale */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = activeItem === item.id || activeView === item.id;
              const isHovered = hoveredItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5
                    rounded-lg transition-all duration-300 ease-in-out
                    ${isActive
                      ? 'bg-[#8CA386] text-white font-medium shadow-lg shadow-[#8CA386]/20'
                      : isHovered
                        ? 'bg-[#8CA386]/20 text-[#8CA386]'
                        : 'text-secondary hover:text-[#8CA386] hover:bg-[#8CA386]/10'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                    group relative
                    cursor-pointer
                    hover:scale-[1.02] active:scale-[0.98]
                  `}
                >
                  {/* Bordo animato a sinistra - solo per item attivo */}
                  {isActive && (
                    <span className={`
                      absolute left-0 top-1/2 -translate-y-1/2
                      w-0.5 h-6 rounded-full
                      bg-white transition-all duration-300
                    `} />
                  )}

                  {/* Icona */}
                  <span className={`
                    flex-shrink-0 transition-all duration-300
                    ${isActive 
                      ? 'text-white' 
                      : isHovered 
                        ? 'text-[#8CA386] scale-110' 
                        : 'group-hover:scale-110 group-hover:rotate-6'
                    }
                  `}>
                    {item.icon}
                  </span>
                  
                  {!isCollapsed && (
                    <>
                      <span className={`
                        flex-1 text-left text-sm transition-all duration-300
                        ${isActive 
                          ? 'text-white' 
                          : isHovered 
                            ? 'text-[#8CA386]' 
                            : 'text-secondary group-hover:text-[#8CA386]'
                        }
                      `}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`
                          px-2 py-0.5 text-xs font-medium rounded-full
                          transition-all duration-300
                          ${isActive
                            ? 'bg-white/20 text-white scale-110'
                            : isHovered
                              ? 'bg-[#8CA386]/20 text-[#8CA386] scale-110'
                              : 'bg-error/20 text-error group-hover:scale-110'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {/* Tooltip per collapsed */}
                  {isCollapsed && item.badge && (
                    <span className="
                      absolute -top-1 -right-1 w-5 h-5 
                      bg-error text-white text-xs font-bold 
                      rounded-full flex items-center justify-center
                      animate-pulse
                    ">
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip label per collapsed */}
                  {isCollapsed && (
                    <div className="
                      absolute left-full ml-2 px-2 py-1
                      bg-white/90 dark:bg-black/90 text-primary text-xs font-medium
                      rounded-md shadow-lg border border-white/20
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300 ease-in-out
                      pointer-events-none whitespace-nowrap
                      z-50
                      translate-x-[-4px] group-hover:translate-x-0
                      backdrop-blur-sm
                    ">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Divider con animazione */}
          <div className="my-4 relative">
            <div className="border-t border-white/10" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-8 h-2 bg-[#8CA386]/20 rounded-full blur-sm animate-pulse" />
          </div>

          {/* Sezione Strutture (sottocategorie) - solo per Admin */}
         
          {/* Divider */}
          {!isCollapsed && (hasPermission(PERMISSIONS.VIEW_ALL_STRUCTURES) || hasPermission(PERMISSIONS.CONFIGURE_STRUCTURES)) && (
            <div className="my-4 border-t border-white/10" />
          )}

          {/* Stato sensori - solo per Admin */}
          
        </div>

        {/* Footer con animazioni */}
        <div className={`
          border-t border-white/10 p-3
          ${isCollapsed ? 'flex flex-col items-center gap-2' : ''}
          transition-all duration-300
        `}>
          {/* Avatar utente */}
          <div className={`
            flex items-center gap-3 p-2 rounded-lg
            transition-all duration-300 ease-in-out
            cursor-pointer
            hover:bg-[#8CA386]/10 hover:scale-[1.02]
            ${isCollapsed ? 'justify-center' : ''}
            group
          `}>
            <div className="
              w-9 h-9 rounded-full bg-[#8CA386]/20 flex items-center justify-center 
              text-[#8CA386] font-semibold text-sm
              transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
              border border-[#8CA386]/10
            ">
              {getUserInitials()}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate transition-all duration-300 group-hover:translate-x-1">
                  {user?.name || 'Utente'}
                </p>
                <p className="text-xs text-secondary/60 truncate transition-all duration-300 group-hover:text-secondary">
                  {user?.email || 'user@sebi.energy'}
                </p>
                {user?.role && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#8CA386]/10 text-[#8CA386]">
                    {getRoleLabel(user.role)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Azioni footer */}
          <div className={`
            flex items-center gap-1
            ${isCollapsed ? 'flex-col' : 'justify-between'}
          `}>
            <button
              onClick={handleLogout}
              className="
                p-2 rounded-lg transition-all duration-300 ease-in-out
                text-secondary/60 hover:text-error hover:bg-error/10
                hover:scale-110 active:scale-95
                group relative
              "
            >
              <LogOut size={18} />
              {!isCollapsed && (
                <span className="text-xs text-secondary/60 ml-1 group-hover:text-error">
                  Esci
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;