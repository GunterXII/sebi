// components/Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Zap, Shield, Sparkles, Droplet } from 'lucide-react';
import { DropletLoader } from './DropletLoader'; // <-- Import del componente
import logo from "../assets/LogoSebi.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@sebi.energy');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Particelle animate sullo sfondo
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = 80;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Connessioni tra particelle vicine
        for (let i = index + 1; i < particles.length; i++) {
          const dx = particles[i].x - particle.x;
          const dy = particles[i].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(140, 163, 134, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.stroke();
          }
        }

        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(140, 163, 134, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(140, 163, 134, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 163, 134, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Tracciamento mouse per effetto parallasse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const c = {
    greenBtn: '#8CA386',
    inputText: '#2D3748',
    greenSubtitle: '#5E7B5B',
    formBg: 'rgba(255,255,255,0.85)',
    inputBorder: 'rgba(140,163,134,0.3)',
    inputBorderFocus: '#8CA386',
    placeholderText: '#A0AEC0',
    cardShadow: '0 20px 60px rgba(74, 99, 69, 0.2)'
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Canvas per le particelle */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Sfondo animato con gradienti */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f0f4ee 0%, #dce4d9 50%, #c8d4c3 100%)',
          zIndex: 0
        }}
      />

      {/* Decorazioni animate */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(140,163,134,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(140,163,134,0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Cerchi decorativi fluttuanti */}
      <div 
        className="absolute w-96 h-96 rounded-full"
        style={{
          top: '-10%',
          right: '-5%',
          zIndex: 0,
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <div 
        className="absolute w-96 h-96 rounded-full"
        style={{
          bottom: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(140,163,134,0.08) 0%, transparent 70%)',
          zIndex: 0,
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Card di login */}
      <div
        className="w-full max-w-md rounded-3xl p-8 relative animate-fadeInUp"
        style={{
          zIndex: 1,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: c.cardShadow,
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${-mousePosition.x * 0.3}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
       

        {/* Logo */}
        <div className="mb-6 flex flex-col justify-center items-center animate-slideDown">
          <div className="relative">
            <img 
              src={logo} 
              alt="Logo" 
              width="220" 
              className="relative z-10 transition-transform duration-300 hover:scale-105"
            />
            <div 
              className="absolute inset-0 blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, #8CA386 0%, transparent 70%)',
                transform: 'scale(1.2)'
              }}
            />
          </div>
          <p className="text-sm mt-2 font-light tracking-wide" style={{ color: c.greenSubtitle }}>
            Sistema di Controllo Energetico Intelligente
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl text-sm animate-shake" style={{
              backgroundColor: '#FEF2F2',
              color: '#EF4444',
              border: '1px solid #FECACA'
            }}>
              {error}
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
              Email
            </label>
            <div className="relative">
             
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sebi.energy"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:shadow-lg"
                style={{
                  backgroundColor: 'rgba(247, 247, 247, 0.7)',
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = c.inputBorderFocus;
                  e.target.style.transform = 'scale(1.01)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = c.inputBorder;
                  e.target.style.transform = 'scale(1)';
                }}
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium mb-1.5" style={{ color: c.greenSubtitle }}>
              Password
            </label>
            <div className="relative">
             
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:shadow-lg"
                style={{
                  backgroundColor: 'rgba(247, 247, 247, 0.7)',
                  borderColor: c.inputBorder,
                  color: c.inputText
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = c.inputBorderFocus;
                  e.target.style.transform = 'scale(1.01)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = c.inputBorder;
                  e.target.style.transform = 'scale(1)';
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ color: c.placeholderText }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #8CA386 0%, #6B8A6B 100%)',
              boxShadow: '0 4px 20px rgba(140,163,134,0.4)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  {/* Sostituito lo spinner con DropletLoader */}
                  <DropletLoader size={18} color="#ffffff" />
                  <span>Accesso in corso...</span>
                </>
              ) : (
                <>
                  <Droplet size={18} />Accedi
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm transition-all duration-300 hover:scale-105 hover:font-medium cursor-pointer"
            style={{ color: c.greenSubtitle }}
          >
            Password dimenticata?
          </button>
        </div>

        {/* Credenziali di test */}
        <div className="mt-6 p-4 rounded-xl animate-fadeInUp" style={{
          backgroundColor: 'rgba(247, 247, 247, 0.7)',
          border: '1px solid rgba(140,163,134,0.15)',
          backdropFilter: 'blur(10px)'
        }}>
          <p className="text-xs font-semibold text-center flex items-center justify-center gap-2" style={{ color: c.greenSubtitle }}>
            <Shield size={12} /> Credenziali di test
          </p>
          <div className="grid grid-cols-2 gap-1 mt-2 text-xs" style={{ color: c.placeholderText }}>
            <div className="font-mono">admin@sebi.energy</div>
            <div className="font-mono">password</div>
            <div className="font-mono">cliente@sebi.energy</div>
            <div className="font-mono">password</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes dropletFall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;