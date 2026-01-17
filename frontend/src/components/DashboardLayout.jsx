import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Home, Users, UserPlus, ClipboardList, FileText,
    BarChart3, LogOut, Menu, X, Clock, CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!user) return null;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = {
        administrativo: [
            { label: 'Dashboard', icon: Home, path: '/dashboard' },
            { label: 'Usuarios', icon: Users, path: '/users' },
            { label: 'Pacientes', icon: UserPlus, path: '/patients' },
            { label: 'Juntas', icon: ClipboardList, path: '/juntas' },
        ],
        medico_evaluador: [
            { label: 'Dashboard', icon: Home, path: '/dashboard' },
            { label: 'Mis Juntas', icon: ClipboardList, path: '/juntas?mine=true' },
            { label: 'Nueva Junta', icon: ClipboardList, path: '/juntas/new' },
            { label: 'Pacientes', icon: Users, path: '/patients' },
        ],
        director_medico: [
            { label: 'Dashboard', icon: Home, path: '/dashboard' },
            { label: 'Pendientes', icon: Clock, path: '/juntas?estado=EN_REVISION' },
            { label: 'Todas las Juntas', icon: ClipboardList, path: '/juntas' },
        ],
        rrhh: [
            { label: 'Dashboard', icon: Home, path: '/dashboard' },
            { label: 'Juntas', icon: ClipboardList, path: '/juntas' },
            { label: 'Reportes', icon: FileText, path: '/reports' },
        ],
        gerencial: [
            { label: 'Dashboard', icon: Home, path: '/dashboard' },
            { label: 'Métricas', icon: BarChart3, path: '/metrics' },
            { label: 'Juntas', icon: ClipboardList, path: '/juntas' },
        ]
    };

    const currentMenu = menuItems[user.role] || [];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 bg-slate-900 text-white w-64 transform transition-transform duration-200 ease-in-out z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">VDC Juntas</h2>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {currentMenu.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <Icon className="h-5 w-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center p-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500">
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center ml-auto space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-800">{user.nombre}</p>
                            <p className="text-xs text-gray-500 uppercase">{user.role.replace('_', ' ')}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                            {user.nombre.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
