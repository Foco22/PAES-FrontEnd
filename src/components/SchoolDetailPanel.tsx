import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SchoolDetail } from '../services/api';

interface SchoolDetailPanelProps {
  school: SchoolDetail | null;
  onClose: () => void;
}

export function SchoolDetailPanel({ school, onClose }: SchoolDetailPanelProps) {
  if (!school) return null;

  // Combine all score data for comparison chart
  const combinedScoreData = school.scores_by_year.map((item, index) => ({
    año: item.year,
    colegio: item.score,
    'Prom. Público': school.avg_publicos_by_year[index]?.score || null,
    'Prom. Privado': school.avg_privados_by_year[index]?.score || null
  }));

  const studentsData = school.students_by_year
    .filter(item => item.students !== null)
    .map(item => ({
      año: item.year,
      estudiantes: item.students
    }));

  return (
    <div className="school-detail-panel">
      <div className="panel-header">
        <div>
          <h2>{school.nombre}</h2>
          <p className="panel-rbd">RBD: {school.rbd}</p>
        </div>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="panel-content">
        {/* General Information */}
        <div className="info-section">
          <h3>Información General</h3>
          <div className="info-grid">
            {school.tipo_educacion && (
              <div className="info-item">
                <span className="info-label">Tipo:</span>
                <span className="info-value">{school.tipo_educacion}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Dependencia:</span>
              <span className="info-value">{school.grupo_dependencia || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Comuna:</span>
              <span className="info-value">{school.comuna}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Región:</span>
              <span className="info-value">{school.region}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Puntaje Promedio PAES & PSU (2017-2026):</span>
              <span className="info-value highlight">
                {school.puntaje_promedio_2017_2026?.toFixed(1) || 'N/A'}
              </span>
            </div>
            {school.pago_mensual && school.pago_mensual > 0 && (
              <div className="info-item">
                <span className="info-label">Pago Mensual:</span>
                <span className="info-value">${school.pago_mensual.toLocaleString()}</span>
              </div>
            )}
            {school.pago_matricula && school.pago_matricula > 0 && (
              <div className="info-item">
                <span className="info-label">Matrícula:</span>
                <span className="info-value">${school.pago_matricula.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Score Evolution Chart with Comparisons */}
        {combinedScoreData.length > 0 && (
          <div className="chart-section">
            <h3>Evolucion de Puntajes (PSU & PAES)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={combinedScoreData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="año"
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis
                  domain={[400, 900]}
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                {/* School score line */}
                <Line
                  type="monotone"
                  dataKey="colegio"
                  name="Colegio"
                  stroke="#2c2c2c"
                  strokeWidth={3}
                  dot={{ fill: '#2c2c2c', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                {/* Public schools average line */}
                <Line
                  type="monotone"
                  dataKey="Prom. Público"
                  name="Prom. Público"
                  stroke="#C62828"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#C62828', r: 3 }}
                  activeDot={{ r: 5 }}
                />
                {/* Private schools average line */}
                <Line
                  type="monotone"
                  dataKey="Prom. Privado"
                  name="Prom. Privado"
                  stroke="#0D47A1"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#0D47A1', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p style={{
              fontSize: '0.7rem',
              color: '#666',
              marginTop: '10px',
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              El Puntaje representa el promedio de los puntajes en Matemática y Comprensión Lectora para los alumnos del establecimiento. Para los años con PSU, los resultados se escalaron a la escala actual de la PAES.
            </p>
          </div>
        )}

        {/* Student Count Chart */}
        {studentsData.length > 0 && (
          <div className="chart-section">
            <h3>Evolución del número de estudiantes que rindieron la PSU/PAES</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={studentsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="año"
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#666"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
                <Bar
                  dataKey="estudiantes"
                  fill="#555"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p style={{
              fontSize: '0.7rem',
              color: '#666',
              marginTop: '10px',
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              Cantidad de alumnos que rindieron la Prueba de Selección Universitaria por cada año.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
