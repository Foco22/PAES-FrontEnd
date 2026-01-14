import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { School } from './types/school';
import { getSchools, getSchoolDetail, getRegions, getComunaPolygon, type SchoolDetail, type Region, type ComunaPolygon } from './services/api';
import { SchoolDetailPanel } from './components/SchoolDetailPanel';
import './App.css';
import './components/SchoolDetailPanel.css';

// Function to get color based on score - Blue → White → Red gradient
const getColorByScore = (score: number | null): string => {
  if (!score) return '#BDBDBD'; // Gray for missing data

  // Blue (high scores) → White (middle) → Red (low scores)
  // Score range: 400-900
  const minScore = 400;
  const maxScore = 900;
  const midScore = (minScore + maxScore) / 2; // 650

  if (score >= maxScore) return '#0D47A1'; // Dark Blue
  if (score <= minScore) return '#C62828'; // Dark Red

  if (score > midScore) {
    // High scores: White → Blue
    const ratio = (score - midScore) / (maxScore - midScore);
    const r = Math.round(255 - (255 - 13) * ratio);
    const g = Math.round(255 - (255 - 71) * ratio);
    const b = Math.round(255 - (255 - 161) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Low scores: Red → White
    const ratio = (score - minScore) / (midScore - minScore);
    const r = Math.round(198 + (255 - 198) * ratio);
    const g = Math.round(40 + (255 - 40) * ratio);
    const b = Math.round(40 + (255 - 40) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
};

// Component to control map view changes
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2
    });
  }, [map, center, zoom]);

  return null;
}

// Custom Zoom Controls Component
function ZoomControls() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="zoom-controls">
      <button onClick={handleZoomIn} className="zoom-button" title="Acercar">
        +
      </button>
      <button onClick={handleZoomOut} className="zoom-button" title="Alejar">
        −
      </button>
    </div>
  );
}


function App() {
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedComuna, setSelectedComuna] = useState<string>('');
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-33.4489, -70.6693]); // Santiago
  const [mapZoom, setMapZoom] = useState(6);
  const [selectedSchoolDetail, setSelectedSchoolDetail] = useState<SchoolDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [comunaPolygon, setComunaPolygon] = useState<ComunaPolygon | null>(null);

  // Load regions on mount
  useEffect(() => {
    const loadRegions = async () => {
      try {
        const data = await getRegions();
        setRegiones(data);
      } catch (err) {
        console.error('Error loading regions:', err);
        setError('Error al cargar las regiones');
      } finally {
        setLoadingRegions(false);
      }
    };
    loadRegions();
  }, []);

  // Read URL parameters and auto-search when regions are loaded
  useEffect(() => {
    if (!loadingRegions && regiones.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const regionParam = params.get('region');
      const comunaParam = params.get('comuna');

      if (regionParam && comunaParam && !showMap) {
        setSelectedRegion(regionParam);
        setSelectedComuna(comunaParam);

        // Auto-search with URL parameters
        const autoSearch = async () => {
          setLoading(true);
          try {
            const data = await getSchools(regionParam, comunaParam);
            setSchools(data);
            if (data.length > 0 && data[0].latitud && data[0].longitud) {
              setMapCenter([data[0].latitud, data[0].longitud]);
              setMapZoom(14);
            }

            // Fetch comuna polygon if available
            if (data.length > 0 && data[0].cod_com_rbd) {
              try {
                const polygon = await getComunaPolygon(data[0].cod_com_rbd);
                setComunaPolygon(polygon);
              } catch (polygonError) {
                console.error('Error loading comuna polygon:', polygonError);
              }
            }

            setShowMap(true);
          } catch (err) {
            console.error('Error loading schools from URL:', err);
          } finally {
            setLoading(false);
          }
        };
        autoSearch();
      }
    }
  }, [loadingRegions, regiones, showMap]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedComuna('');
    setSchools([]);
    setComunaPolygon(null);
    setError(null);
  };

  const handleComunaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComuna(e.target.value);
    setSchools([]); // Clear schools when comuna changes
    setComunaPolygon(null); // Clear polygon when comuna changes
    setSelectedSchoolDetail(null); // Close any open detail panel
  };

  const handleSchoolClick = async (rbd: number) => {
    console.log('🔍 School clicked, RBD:', rbd);
    console.log('📊 Current loadingDetail state:', loadingDetail);

    if (loadingDetail) {
      console.log('⚠️ Already loading, skipping...');
      return;
    }

    setLoadingDetail(true);
    try {
      console.log('🌐 Fetching school detail...');
      const detail = await getSchoolDetail(rbd);
      console.log('✅ School detail received:', detail);
      setSelectedSchoolDetail(detail);
    } catch (err) {
      console.error('❌ Error loading school detail:', err);
      setError('Error al cargar los detalles de la escuela');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoadingDetail(false);
      console.log('✨ Finished loading detail');
    }
  };

  const handleCloseDetail = () => {
    setSelectedSchoolDetail(null);
  };

  const handleSearch = async () => {
    if (!selectedRegion || !selectedComuna) {
      setError('Por favor selecciona región y comuna');
      return;
    }

    setLoading(true);
    setError(null);

    // Clear schools first to trigger map recreation
    setSchools([]);

    try {
      const data = await getSchools(selectedRegion, selectedComuna);

      console.log(`📍 Loaded ${data.length} schools for ${selectedComuna}`);

      // Center map on first school if available
      if (data.length > 0 && data[0].latitud && data[0].longitud) {
        const newCenter: [number, number] = [data[0].latitud, data[0].longitud];
        console.log(`🗺️ Setting map center to:`, newCenter);
        setMapCenter(newCenter);
        setMapZoom(14);
      }

      // Set schools AFTER updating center
      setSchools(data);

      // Fetch comuna polygon if we have schools with cod_com_rbd
      if (data.length > 0 && data[0].cod_com_rbd) {
        try {
          const polygon = await getComunaPolygon(data[0].cod_com_rbd);
          setComunaPolygon(polygon);
        } catch (polygonError) {
          console.error('Error loading comuna polygon:', polygonError);
          // Don't show error to user, polygon is optional
        }
      }

      // Update URL with search parameters
      const params = new URLSearchParams();
      params.set('region', selectedRegion);
      params.set('comuna', selectedComuna);
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

      // Show map after successful search
      setShowMap(true);
    } catch (err) {
      setError('Error al cargar las escuelas. Verifica que el backend esté funcionando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedRegionData = regiones.find(r => r.nombre === selectedRegion);

  return (
    <div className="app-container">
      {selectedSchoolDetail && (
        <SchoolDetailPanel
          school={selectedSchoolDetail}
          onClose={handleCloseDetail}
        />
      )}

      {!showMap ? (
        // Home Screen
        <div className="home-screen">
          <div className="home-content">
            <h1 className="home-title">¿Cómo son los colegios de tu barrio?</h1>
            <p className="home-subtitle">(PAES 2023-2026)</p>
            <div className="home-controls">
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                disabled={loading || loadingRegions}
                className="select-minimal"
              >
                <option value="">{loadingRegions ? 'Cargando...' : 'Seleccionar región'}</option>
                {regiones.map(region => (
                  <option key={region.nombre} value={region.nombre}>
                    {region.nombre}
                  </option>
                ))}
              </select>

              <select
                value={selectedComuna}
                onChange={handleComunaChange}
                disabled={!selectedRegion || loading}
                className="select-minimal"
              >
                <option value="">Seleccionar comuna</option>
                {selectedRegionData?.comunas.map(comuna => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                disabled={!selectedRegion || !selectedComuna || loading}
                className="button-minimal"
              >
                {loading ? '...' : 'Buscar'}
              </button>
            </div>
            <p className="home-source">
              Los datos utilizados fueron obtenidos a partir de información oficial publicada por el DEMRE, disponible en el siguiente <a href="https://portal-transparencia.demre.cl/portal-base-datos" target="_blank" rel="noopener noreferrer">enlace</a>.
            </p>
          </div>
        </div>
      ) : (
        // Map View
        <>
          <div className="top-bar">
            <div className="controls">
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                disabled={loading || loadingRegions}
                className="select-minimal"
              >
                <option value="">{loadingRegions ? 'Cargando...' : 'Seleccionar región'}</option>
                {regiones.map(region => (
                  <option key={region.nombre} value={region.nombre}>
                    {region.nombre}
                  </option>
                ))}
              </select>

              <select
                value={selectedComuna}
                onChange={handleComunaChange}
                disabled={!selectedRegion || loading}
                className="select-minimal"
              >
                <option value="">Seleccionar comuna</option>
                {selectedRegionData?.comunas.map(comuna => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                disabled={!selectedRegion || !selectedComuna || loading}
                className="button-minimal"
              >
                {loading ? '...' : 'Buscar'}
              </button>
            </div>
          </div>

          {/* Important Note - Fixed at bottom center */}
          <div className="important-note" style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '900px',
            width: '90%',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease'
          }}>
            <p style={{
              fontSize: '0.7rem',
              color: '#444',
              lineHeight: '1.5',
              marginBottom: '10px',
              margin: 0
            }}>
              <strong>Nota importante:</strong> Estos datos consideran únicamente los resultados de las pruebas de Matemática y Comprensión Lectora de los últimos años. El objetivo de este instrumento no es clasificar a los colegios como "buenos" o "deficientes", sino presentar los resultados de las pruebas de selección universitaria desde una perspectiva distinta.
            </p>
            <p style={{
              fontSize: '0.7rem',
              color: '#444',
              lineHeight: '1.5',
              margin: '10px 0 0 0'
            }}>
              La elección de un establecimiento educacional para un hijo es una decisión multifactorial, que depende de aspectos como disponibilidad de cupos, situación económica, actividades extracurriculares, ambiente escolar, entre otros. Estas pruebas no miden muchos factores que pueden ser incluso más relevantes que un examen y que, en muchos casos, influyen de manera más determinante en el futuro de las personas.
            </p>
          </div>

          {schools.length > 0 && (
            <div style={{ position: 'absolute', bottom: '32px', right: '24px', display: 'flex', gap: '16px', alignItems: 'flex-end', zIndex: 1000 }}>
              <div style={{
                background: 'white',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minWidth: 'auto'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
                  Tipo
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#999', border: '2.5px solid #000' }}></div>
                    <span>Pública</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#999', border: '2.5px solid #fff', boxShadow: '0 0 0 1px #ddd' }}></div>
                    <span>Privada</span>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minWidth: 'auto'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
                  Pje
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px', fontSize: '0.7rem', color: '#666' }}>
                    <span style={{ fontWeight: 600, color: '#0D47A1' }}>900</span>
                    <span style={{ fontWeight: 600, color: '#C62828' }}>400</span>
                  </div>
                  <div style={{
                    background: 'linear-gradient(to bottom, #0D47A1, #64B5F6, #FFFFFF, #EF9A9A, #C62828)',
                    width: '16px',
                    height: '180px',
                    borderRadius: '8px',
                    border: '2px solid #E0E0E0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}></div>
                </div>
              </div>
            </div>
          )}

          <MapContainer
            key={`${selectedRegion}-${selectedComuna}`}
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100vh', width: '100vw' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            <ZoomControls />
            <MapController center={mapCenter} zoom={mapZoom} />

            {/* Comuna polygon boundary - non-interactive so it doesn't block marker clicks */}
            {comunaPolygon && (
              <GeoJSON
                key={comunaPolygon.properties.cod_comuna}
                data={comunaPolygon}
                interactive={false}
                style={{
                  color: '#000000',
                  weight: 1,
                  opacity: 0.4,
                  fillOpacity: 0.02,
                  fillColor: '#000000'
                }}
              />
            )}

            {schools.map((school, index) => {
              const score = school.puntaje_promedio_2023_2026;
              const color = getColorByScore(score);
              const isPublic = school.tipo_educacion?.toLowerCase().includes('blica') || false;
              const borderColor = isPublic ? '#000' : '#fff';

              console.log(`Rendering school ${index}:`, school.nombre, 'RBD:', school.rbd);

              return school.latitud && school.longitud ? (
                <CircleMarker
                  key={`${school.rbd}-${index}`}
                  center={[school.latitud, school.longitud]}
                  radius={10}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.85,
                    color: borderColor,
                    weight: 2.5,
                  }}
                  eventHandlers={{
                    click: () => {
                      console.log('CircleMarker click event fired for:', school.nombre, 'RBD:', school.rbd);
                      if (school.rbd) {
                        handleSchoolClick(school.rbd);
                      }
                    }
                  }}
                >
                  <Popup>
                    <div className="popup-content">
                      <div className="popup-title">{school.nombre || 'Sin nombre'}</div>
                      <div className="popup-score">
                        <span className="popup-score-value">{score?.toFixed(1) || 'N/A'}</span> pts
                      </div>
                      {school.tipo_educacion && (
                        <div style={{
                          fontSize: '0.65rem',
                          color: 'rgba(0, 0, 0, 0.45)',
                          marginTop: '3px',
                          letterSpacing: '0.2px',
                          fontWeight: 400
                        }}>
                          {school.tipo_educacion}
                        </div>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              ) : null;
            })}
          </MapContainer>
        </>
      )}

      {error && <div className="error-toast">{error}</div>}
    </div>
  );
}

export default App;
