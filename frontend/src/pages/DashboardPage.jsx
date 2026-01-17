import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Users, FileText, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
        <div className={`p-4 rounded-lg ${color} bg-opacity-10 mr-4`}>
            <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
    </div>
);

export default function DashboardPage() {
    const { user } = useAuth();

    const renderWidgets = () => {
        switch (user.role) {
            case 'administrativo':
                return (
                    <>
                        <StatCard title="Total Usuarios" value="24" icon={Users} color="bg-blue-600" />
                        <StatCard title="Pacientes Activos" value="156" icon={Users} color="bg-green-600" />
                        <StatCard title="Juntas Mensuales" value="45" icon={FileText} color="bg-indigo-600" />
                        <StatCard title="Pendientes" value="12" icon={Clock} color="bg-orange-600" />
                    </>
                );
            case 'medico_evaluador':
                return (
                    <>
                        <StatCard title="Mis Juntas (Mes)" value="18" icon={FileText} color="bg-blue-600" />
                        <StatCard title="Borradores" value="3" icon={FileText} color="bg-gray-600" />
                        <StatCard title="Rechazadas" value="1" icon={AlertCircle} color="bg-red-600" />
                        <StatCard title="Aprobadas" value="14" icon={CheckCircle} color="bg-green-600" />
                    </>
                );
            case 'director_medico':
                return (
                    <>
                        <StatCard title="Pendientes Revisión" value="8" icon={Clock} color="bg-orange-600" />
                        <StatCard title="Aprobadas (Mes)" value="32" icon={CheckCircle} color="bg-green-600" />
                        <StatCard title="Rechazadas (Mes)" value="5" icon={AlertCircle} color="bg-red-600" />
                        <StatCard title="Tiempo Promedio" value="2.5d" icon={TrendingUp} color="bg-indigo-600" />
                    </>
                );
            default:
                return (
                    <>
                        <StatCard title="Juntas Totales" value="128" icon={FileText} color="bg-blue-600" />
                        <StatCard title="Este Mes" value="42" icon={TrendingUp} color="bg-green-600" />
                    </>
                );
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Hola, {user.nombre}</h1>
                <p className="text-gray-500">Bienvenido al panel de {user.role.replace('_', ' ')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderWidgets()}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Actividad Reciente</h3>
                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                        <p className="text-sm text-gray-600">Nueva junta creada para el paciente <span className="font-semibold">Juan Pérez</span></p>
                        <span className="ml-auto text-xs text-gray-400">Hace 10 min</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                        <p className="text-sm text-gray-600">Usuario <span className="font-semibold">Dr. Evaluador</span> inició sesión</p>
                        <span className="ml-auto text-xs text-gray-400">Hace 1 hora</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-2 w-2 rounded-full bg-orange-500 mr-3"></div>
                        <p className="text-sm text-gray-600">Junta #1024 marcada para revisión</p>
                        <span className="ml-auto text-xs text-gray-400">Hace 2 horas</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
