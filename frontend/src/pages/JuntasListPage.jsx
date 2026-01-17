import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Eye, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import JuntaMedicaForm from '../components/JuntaMedicaForm';

// Animation Styles
const styles = `
  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .modal-pop {
    animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
`;

// Extended Mock Data mapped to Form Fields
const MOCK_JUNTAS = [
    {
        id: '0043/2025',
        fecha: '2025-10-14',
        estado: 'Finalizada',
        formData: {
            juntaNumero: '0043/2025',
            fechaRealizacion: '2025-10-14',
            apellidoNombre: 'Gómez, María Elena',
            dni: '24.567.890',
            edad: 45,
            sexo: 'Femenino',
            domicilio: 'Av. 9 de Julio 1234, Resistencia',
            telefono: '3624-112233',
            email: 'maria.gomez@email.com',
            establecimiento: 'E.E.P. N° 2',
            cargoDocente: 'Maestra de Grado',
            antiguedadDocencia: '15 años',
            motivo: 'Licencia por enfermedad prolongada',
            motivoConsulta: 'Paciente refiere insomnio, anhedonia y fatiga crónica.',
            diagnostico: 'F32.1',
            denominacion: 'Episodio depresivo moderado',
            naturaleza: 'Enfermedad Inculpable',
            dictamen: 'NO APTO TEMPORALMENTE',
            fundamentacionDictamen: 'Se sugiere licencia por 30 días con tratamiento psicoterapéutico y farmacológico.',
            medicoNombre: 'Dr. Ricardo Pérez',
            medicoMatricula: 'MP-1234'
        }
    },
    {
        id: '0044/2025',
        fecha: '2025-10-15',
        estado: 'En Revisión',
        formData: {
            juntaNumero: '0044/2025',
            fechaRealizacion: '2025-10-15',
            apellidoNombre: 'Fernández, Carlos Alberto',
            dni: '22.333.444',
            edad: 52,
            sexo: 'Masculino',
            domicilio: 'Calle 5 N° 400, Sáenz Peña',
            telefono: '3644-445566',
            establecimiento: 'E.E.S. N° 45',
            cargoDocente: 'Profesor de Matemáticas',
            motivo: 'Incapacidad laboral',
            motivoConsulta: 'Dolor lumbar crónico con irradiación a MMII',
            diagnostico: 'M54.5',
            denominacion: 'Lumbago con ciática',
            naturaleza: 'Enfermedad Profesional',
            dictamen: 'APTO CON RESTRICCIONES',
            fundamentacionDictamen: 'No realizar esfuerzos físicos.',
            medicoNombre: 'Dr. Marcos Díaz',
            medicoMatricula: 'MP-9988'
        }
    }
];

export default function JuntasListPage() {
    const location = useLocation();
    const isMine = new URLSearchParams(location.search).get('mine');
    const [selectedJunta, setSelectedJunta] = useState(null);

    const closeModal = () => {
        setSelectedJunta(null);
    };

    return (
        <DashboardLayout>
            <style>{styles}</style>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {isMine ? 'Mis Juntas Médicas' : 'Listado de Juntas'}
                </h1>
                <div className="text-sm text-gray-500">
                    Mostrando {MOCK_JUNTAS.length} registros
                </div>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Junta N°</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_JUNTAS.map((junta) => (
                            <tr key={junta.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(junta.fecha).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                    {junta.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {junta.formData.apellidoNombre} <br />
                                    <span className="text-xs text-gray-400">DNI: {junta.formData.dni}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${junta.estado === 'Finalizada' ? 'bg-green-100 text-green-800' :
                                            junta.estado === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {junta.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => setSelectedJunta(junta)}
                                        className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg transition-colors hover:scale-110 transform"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Custom Modal using JuntaMedicaForm in ReadOnly mode */}
            {selectedJunta && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="modal-pop bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden pointer-events-auto border border-gray-200 m-4 flex flex-col relative">

                        {/* Modal Header */}
                        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white shrink-0">
                            <div>
                                <h2 className="text-lg font-bold">Visualizando Junta #{selectedJunta.id}</h2>
                                <p className="text-xs text-slate-300">Modo Solo Lectura</p>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-1 rounded-full hover:bg-slate-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Reusing Form Component */}
                        <div className="flex-1 overflow-hidden">
                            <JuntaMedicaForm
                                readOnly={true}
                                initialData={selectedJunta.formData}
                            />
                        </div>

                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
