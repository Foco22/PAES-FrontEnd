import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SchoolDetail } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

interface SchoolDetailPanelProps {
  school: SchoolDetail | null;
  onClose: () => void;
}

export function SchoolDetailPanel({ school, onClose }: SchoolDetailPanelProps) {
  const { t } = useLanguage();
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
          <h3>{t('generalInfo')}</h3>
          <div className="info-grid">
            {school.tipo_educacion && (
              <div className="info-item">
                <span className="info-label">{t('typeLabel')}</span>
                <span className="info-value">{school.tipo_educacion}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">{t('dependency')}</span>
              <span className="info-value">{school.grupo_dependencia || t('na')}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('comuna')}</span>
              <span className="info-value">{school.comuna}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('region')}</span>
              <span className="info-value">{school.region}</span>
            </div>
            <div className="info-item">
              <span className="info-label">{t('avgScore')}</span>
              <span className="info-value highlight">
                {school.puntaje_promedio_2023_2026?.toFixed(1) || t('na')}
              </span>
            </div>
            {school.pago_mensual && school.pago_mensual > 0 && (
              <div className="info-item">
                <span className="info-label">{t('monthlyPayment')}</span>
                <span className="info-value">${school.pago_mensual.toLocaleString()}</span>
              </div>
            )}
            {school.pago_matricula && school.pago_matricula > 0 && (
              <div className="info-item">
                <span className="info-label">{t('enrollment')}</span>
                <span className="info-value">${school.pago_matricula.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Score Evolution Chart with Comparisons */}
        {combinedScoreData.length > 0 && (
          <div className="chart-section">
            <h3>{t('scoreEvolution')}</h3>
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
                  name={t('school')}
                  stroke="#2c2c2c"
                  strokeWidth={3}
                  dot={{ fill: '#2c2c2c', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                {/* Public schools average line */}
                <Line
                  type="monotone"
                  dataKey="Prom. Público"
                  name={t('publicAvg')}
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
                  name={t('privateAvg')}
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
              {t('scoreExplanation')}
            </p>
          </div>
        )}

        {/* Student Count Chart */}
        {studentsData.length > 0 && (
          <div className="chart-section">
            <h3>{t('studentEvolution')}</h3>
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
                  name={t('students')}
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
              {t('studentExplanation')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
