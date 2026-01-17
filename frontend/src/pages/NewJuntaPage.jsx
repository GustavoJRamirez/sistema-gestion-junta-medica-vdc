import DashboardLayout from '../components/DashboardLayout';
import JuntaMedicaForm from '../components/JuntaMedicaForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewJuntaPage() {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="mb-6 flex items-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Nueva Junta Médica</h1>
                    <p className="text-gray-500">Formulario oficial de Dictamen Médico</p>
                </div>
            </div>

            <JuntaMedicaForm />
        </DashboardLayout>
    );
}
