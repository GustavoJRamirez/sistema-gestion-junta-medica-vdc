import React, { useState, useEffect } from 'react';
import './JuntaMedicaForm.css';

const sections = [
    { id: 'identificacion', label: 'I. Identificación', number: 'I' },
    { id: 'laborales', label: 'II. Datos Laborales', number: 'II' },
    { id: 'motivo', label: 'III. Motivo', number: 'III' },
    { id: 'enfermedad', label: 'VI. Enfermedad Actual', number: 'VI' },
    { id: 'diagnostico', label: 'X. Diagnóstico', number: 'X' },
    { id: 'dictamen', label: 'XII. Dictamen', number: 'XII' },
    { id: 'profesionales', label: 'XVIII. Profesionales', number: 'XVIII' }
];

export default function JuntaMedicaForm({ readOnly = false, initialData = {} }) {
    const [activeTab, setActiveTab] = useState('identificacion');
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        if (readOnly) return;
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? value : '') : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!readOnly) {
            alert('Dictamen Guardado Correctamente');
        }
    };

    // Helper to render inputs with common props
    const renderInput = (name, type = "text", props = {}) => (
        <input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            disabled={readOnly}
            className={readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
            {...props}
        />
    );

    const renderSelect = (name, options) => (
        <select
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            disabled={readOnly}
            className={readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
        >
            <option value="">Seleccionar...</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    );

    const renderTextarea = (name, rows = 3) => (
        <textarea
            name={name}
            rows={rows}
            value={formData[name] || ''}
            onChange={handleChange}
            disabled={readOnly}
            className={readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}
        />
    );

    return (
        <div className={`junta-layout ${readOnly ? 'h-full border-0 shadow-none' : ''}`}>
            {!readOnly && (
                <div className="bg-slate-900 text-white p-4">
                    <h1 className="text-xl font-bold">MODELO DE DICTAMEN MÉDICO</h1>
                    <p className="text-sm text-slate-300">Expediente: E 83-2025-1087-Ae</p>
                </div>
            )}

            {/* Tabs Navigation */}
            <div className="junta-tabs bg-gray-50 border-b border-gray-200">
                {sections.map(section => (
                    <div
                        key={section.id}
                        className={`junta-tab ${activeTab === section.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(section.id)}
                    >
                        {section.label}
                    </div>
                ))}
            </div>

            {/* Scrollable Content */}
            <div className="junta-content-scroll bg-white">
                <form id="juntaForm" onSubmit={handleSubmit}>

                    {!readOnly && (
                        <div className="junta-alert">
                            <div>
                                <strong>DOCUMENTO CONFIDENCIAL</strong><br />
                                Ley N° 25.326 de Protección de Datos Personales
                            </div>
                        </div>
                    )}

                    {/* I. IDENTIFICACIÓN */}
                    {activeTab === 'identificacion' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">I</div>
                                <h2>DATOS DE IDENTIFICACIÓN</h2>
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Junta Médica N°</label>
                                    {renderInput("juntaNumero")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Fecha Realización</label>
                                    {renderInput("fechaRealizacion", "date")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Lugar</label>
                                    {renderInput("lugar", "text", { defaultValue: "Dirección de Salud Laboral" })}
                                </div>
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Apellido y Nombre</label>
                                    {renderInput("apellidoNombre")}
                                </div>
                                <div className="junta-form-group">
                                    <label>DNI</label>
                                    {renderInput("dni")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Fecha Nacimiento</label>
                                    {renderInput("fechaNacimiento", "date")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Edad</label>
                                    {renderInput("edad")}
                                </div>
                            </div>

                            <div className="junta-form-group">
                                <label>Sexo</label>
                                <div className="junta-checkbox-group">
                                    {['Masculino', 'Femenino', 'Otro'].map(opt => (
                                        <label key={opt} className={`junta-checkbox-item ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}>
                                            <input
                                                type="radio"
                                                name="sexo"
                                                value={opt}
                                                checked={formData.sexo === opt}
                                                onChange={handleChange}
                                                disabled={readOnly}
                                            /> {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Domicilio Actual</label>
                                    {renderInput("domicilio")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Localidad</label>
                                    {renderInput("localidad")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Teléfono</label>
                                    {renderInput("telefono", "tel")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Email</label>
                                    {renderInput("email", "email")}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* II. DATOS LABORALES */}
                    {activeTab === 'laborales' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">II</div>
                                <h2>DATOS LABORALES</h2>
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Establecimiento Educativo</label>
                                    {renderInput("establecimiento")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Localidad</label>
                                    {renderInput("localidadEstablecimiento")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Cargo/Función</label>
                                    {renderInput("cargoDocente")}
                                </div>
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Antigüedad Docencia</label>
                                    {renderInput("antiguedadDocencia")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Situación de Revista</label>
                                    {renderSelect("situacionRevista", ["Titular", "Suplente", "Interino"])}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* III. MOTIVO */}
                    {activeTab === 'motivo' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">III</div>
                                <h2>MOTIVO DE LA JUNTA MÉDICA</h2>
                            </div>

                            <div className="junta-form-group">
                                <label>Motivo Principal</label>
                                <div className="junta-checkbox-group" style={{ flexDirection: 'column' }}>
                                    {[
                                        "Licencia por enfermedad prolongada",
                                        "Reingreso posterior a licencia prolongada",
                                        "Evaluación de aptitud psicofísica",
                                        "Cambio de funciones",
                                        "Incapacidad laboral"
                                    ].map(motivo => (
                                        <label key={motivo} className={`junta-checkbox-item ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}>
                                            <input
                                                type="checkbox"
                                                name="motivo"
                                                value={motivo}
                                                checked={formData.motivo === motivo} // Simplified check for demo
                                                onChange={handleChange}
                                                disabled={readOnly}
                                            /> {motivo}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VI. ENFERMEDAD ACTUAL */}
                    {activeTab === 'enfermedad' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">VI</div>
                                <h2>ENFERMEDAD ACTUAL</h2>
                            </div>

                            <div className="junta-form-group">
                                <label>Motivo de Consulta - Síntomas Principales</label>
                                {renderTextarea("motivoConsulta")}
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Fecha Inicio Síntomas</label>
                                    {renderInput("fechaInicioSintomas", "date")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Evolución</label>
                                    {renderSelect("evolucion", ["Estacionaria", "Progresiva", "Mejoría"])}
                                </div>
                            </div>

                            <div className="junta-form-group">
                                <label>Descripción Cronológica</label>
                                {renderTextarea("descripcionCronologica", 5)}
                            </div>
                        </div>
                    )}

                    {/* X. DIAGNÓSTICO */}
                    {activeTab === 'diagnostico' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">X</div>
                                <h2>DIAGNÓSTICO</h2>
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Código CIE Principal</label>
                                    {renderInput("codigoCIE")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Denominación</label>
                                    {renderInput("denominacion")}
                                </div>
                            </div>

                            <div className="junta-form-group">
                                <label>Naturaleza de la Enfermedad</label>
                                <div className="junta-checkbox-group" style={{ flexDirection: 'column' }}>
                                    {['Enfermedad Inculpable', 'Enfermedad Profesional', 'Accidente de Trabajo'].map(nat => (
                                        <label key={nat} className={`junta-checkbox-item ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}>
                                            <input
                                                type="radio"
                                                name="naturaleza"
                                                value={nat}
                                                checked={formData.naturaleza === nat}
                                                onChange={handleChange}
                                                disabled={readOnly}
                                            /> {nat}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* XII. DICTAMEN */}
                    {activeTab === 'dictamen' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">XII</div>
                                <h2>DICTAMEN Y RECOMENDACIONES</h2>
                            </div>

                            <div className="junta-form-group border border-blue-100 bg-blue-50 p-4 rounded-lg">
                                <label className="text-blue-900 font-bold mb-3 block">DICTAMEN SOBRE APTITUD LABORAL</label>
                                <div className="junta-checkbox-group" style={{ flexDirection: 'column' }}>
                                    {[
                                        'APTO para el desempeño funciones docentes',
                                        'APTO CON RESTRICCIONES',
                                        'NO APTO TEMPORALMENTE',
                                        'NO APTO PERMANENTEMENTE'
                                    ].map(dic => (
                                        <label key={dic} className={`junta-checkbox-item ${readOnly ? 'cursor-not-allowed opacity-75' : ''}`}>
                                            <input
                                                type="radio"
                                                name="dictamen"
                                                value={dic}
                                                checked={formData.dictamen === dic}
                                                onChange={handleChange}
                                                disabled={readOnly}
                                            /> {dic}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="junta-form-group mt-4">
                                <label>Fundamentación del Dictamen</label>
                                {renderTextarea("fundamentacionDictamen", 4)}
                            </div>

                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Próxima Reevaluación</label>
                                    {renderInput("fechaReevaluacion", "date")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Plazo (días)</label>
                                    {renderInput("plazoReevaluacion")}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* XVIII. PROFESIONALES */}
                    {activeTab === 'profesionales' && (
                        <div className={`junta-section-card ${readOnly ? 'shadow-none border-0 p-0' : ''}`}>
                            <div className="junta-section-header">
                                <div className="junta-section-number">XVIII</div>
                                <h2>PROFESIONALES INTERVINIENTES</h2>
                            </div>

                            <h3 className="font-bold text-slate-700 mb-3">Médico Evaluador</h3>
                            <div className="junta-form-grid">
                                <div className="junta-form-group">
                                    <label>Nombre Completo</label>
                                    {renderInput("medicoNombre")}
                                </div>
                                <div className="junta-form-group">
                                    <label>Matrícula</label>
                                    {renderInput("medicoMatricula")}
                                </div>
                            </div>
                        </div>
                    )}

                </form>
            </div>

            {/* Actions */}
            {!readOnly && (
                <div className="junta-actions-bar">
                    <button className="btn-secondary" type="button">Limpiar</button>
                    <button className="btn-primary" type="submit" onClick={handleSubmit}>Guardar Dictamen</button>
                </div>
            )}
        </div>
    );
}
