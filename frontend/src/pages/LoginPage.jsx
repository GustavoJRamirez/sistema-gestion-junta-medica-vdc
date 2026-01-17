import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Stethoscope, UserCog, Users, BarChart3, Lock } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRoleLogin = async (role) => {
        const result = await login(role);
        if (result.success) {
            navigate('/dashboard');
        }
    };

    const roles = [
        {
            id: 'administrativo',
            label: 'Administrativo',
            icon: UserCog,
            color: 'bg-blue-600 hover:bg-blue-700',
            desc: 'Gestión de usuarios y pacientes'
        },
        {
            id: 'medico_evaluador',
            label: 'Médico Evaluador',
            icon: Stethoscope,
            color: 'bg-green-600 hover:bg-green-700',
            desc: 'Carga de juntas médicas'
        },
        {
            id: 'director_medico',
            label: 'Director Médico',
            icon: Shield,
            color: 'bg-indigo-600 hover:bg-indigo-700',
            desc: 'Aprobación y revisión'
        },
        {
            id: 'rrhh',
            label: 'RRHH',
            icon: Users,
            color: 'bg-purple-600 hover:bg-purple-700',
            desc: 'Consultas y reportes'
        },
        {
            id: 'gerencial',
            label: 'Gerencial',
            icon: BarChart3,
            color: 'bg-orange-600 hover:bg-orange-700',
            desc: 'Métricas y estadísticas'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side - Brand */}
                <div className="md:w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-center">
                    <div className="mb-6">
                        <Shield className="h-16 w-16 text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Sistema de Gestión de Juntas Médicas</h1>
                    <p className="text-slate-300 mb-8">
                        Plataforma integral para la administración, evaluación y auditoría de juntas médicas VDC.
                    </p>
                    <div className="flex items-center text-sm text-slate-400 bg-slate-800 p-4 rounded-lg">
                        <Lock className="h-4 w-4 mr-2" />
                        <span>Acceso seguro y auditado</span>
                    </div>
                </div>

                {/* Right Side - Login Actions */}
                <div className="md:w-1/2 p-12 bg-white">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido</h2>
                    <p className="text-gray-500 mb-8">Seleccione un rol para ingresar a la demo:</p>

                    <div className="space-y-3">
                        {roles.map((role) => {
                            const Icon = role.icon;
                            return (
                                <button
                                    key={role.id}
                                    onClick={() => handleRoleLogin(role.id)}
                                    className={`w-full group flex items-center p-4 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md ${role.color} hover:text-white text-left`}
                                >
                                    <div className={`p-2 rounded-lg bg-gray-100 group-hover:bg-white/20 mr-4 text-gray-600 group-hover:text-white transition-colors`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 group-hover:text-white text-lg">
                                            {role.label}
                                        </h3>
                                        <p className="text-sm text-gray-500 group-hover:text-white/80">
                                            {role.desc}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400">
                            Versión Demo v1.0.0
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
