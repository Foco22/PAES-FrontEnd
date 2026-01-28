export const translations = {
  es: {
    // Home screen
    homeTitle: '¿Cómo son los colegios de tu barrio?',
    homeSubtitle: '(PAES 2023-2026)',
    homeSource: 'Los datos utilizados fueron obtenidos a partir de información oficial publicada por el DEMRE, disponible en el siguiente',
    homeSourceLink: 'enlace',

    // Controls
    loading: 'Cargando...',
    selectRegion: 'Seleccionar región',
    selectComuna: 'Seleccionar comuna',
    search: 'Buscar',

    // Zoom
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',

    // Important note
    importantNote: 'Nota importante:',
    importantNoteText: 'Estos datos consideran únicamente los resultados de las pruebas de Matemática y Comprensión Lectora de los últimos años. El objetivo de este instrumento no es clasificar a los colegios como "buenos" o "deficientes", sino presentar los resultados de las pruebas de selección universitaria desde una perspectiva distinta.',
    importantNoteText2: 'La elección de un establecimiento educacional para un hijo es una decisión multifactorial, que depende de aspectos como disponibilidad de cupos, situación económica, actividades extracurriculares, ambiente escolar, entre otros. Estas pruebas no miden muchos factores que pueden ser incluso más relevantes que un examen y que, en muchos casos, influyen de manera más determinante en el futuro de las personas.',

    // Legends
    type: 'Tipo',
    public: 'Pública',
    private: 'Privada',
    score: 'Pje',

    // Popup
    noName: 'Sin nombre',

    // Errors
    errorLoadingRegions: 'Error al cargar las regiones',
    errorLoadingSchoolDetail: 'Error al cargar los detalles de la escuela',
    errorSelectRegionComuna: 'Por favor selecciona región y comuna',
    errorLoadingSchools: 'Error al cargar las escuelas. Verifica que el backend esté funcionando.',

    // School Detail Panel
    generalInfo: 'Información General',
    typeLabel: 'Tipo:',
    dependency: 'Dependencia:',
    comuna: 'Comuna:',
    region: 'Región:',
    avgScore: 'Puntaje Promedio PAES (2023-2026):',
    monthlyPayment: 'Pago Mensual:',
    enrollment: 'Matrícula:',
    na: 'N/A',

    // Charts
    scoreEvolution: 'Evolución de Puntajes PAES',
    school: 'Colegio',
    publicAvg: 'Prom. Público',
    privateAvg: 'Prom. Privado',
    scoreExplanation: 'El Puntaje representa el promedio de los puntajes en Matemática y Comprensión Lectora para los alumnos del establecimiento.',
    studentEvolution: 'Evolución del número de estudiantes que rindieron la PAES',
    studentExplanation: 'Cantidad de alumnos que rindieron la PAES por cada año.',
    students: 'estudiantes',
    year: 'año',
  },
  en: {
    // Home screen
    homeTitle: 'How are the schools in your neighborhood?',
    homeSubtitle: '(PAES 2023-2026)',
    homeSource: 'The data used was obtained from official information published by DEMRE, available at the following',
    homeSourceLink: 'link',

    // Controls
    loading: 'Loading...',
    selectRegion: 'Select region',
    selectComuna: 'Select comuna',
    search: 'Search',

    // Zoom
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',

    // Important note
    importantNote: 'Important note:',
    importantNoteText: 'This data only considers the results of the Mathematics and Reading Comprehension tests from recent years. The purpose of this tool is not to classify schools as "good" or "deficient", but to present the results of the university admission tests from a different perspective.',
    importantNoteText2: 'Choosing a school for a child is a multifactorial decision that depends on aspects such as availability of spots, financial situation, extracurricular activities, school environment, among others. These tests do not measure many factors that may be even more relevant than an exam and that, in many cases, have a more decisive influence on people\'s futures.',

    // Legends
    type: 'Type',
    public: 'Public',
    private: 'Private',
    score: 'Score',

    // Popup
    noName: 'No name',

    // Errors
    errorLoadingRegions: 'Error loading regions',
    errorLoadingSchoolDetail: 'Error loading school details',
    errorSelectRegionComuna: 'Please select a region and comuna',
    errorLoadingSchools: 'Error loading schools. Check that the backend is running.',

    // School Detail Panel
    generalInfo: 'General Information',
    typeLabel: 'Type:',
    dependency: 'Dependency:',
    comuna: 'Comuna:',
    region: 'Region:',
    avgScore: 'Average PAES Score (2023-2026):',
    monthlyPayment: 'Monthly Payment:',
    enrollment: 'Enrollment Fee:',
    na: 'N/A',

    // Charts
    scoreEvolution: 'PAES Score Evolution',
    school: 'School',
    publicAvg: 'Public Avg.',
    privateAvg: 'Private Avg.',
    scoreExplanation: 'The score represents the average of Mathematics and Reading Comprehension scores for the students of the school.',
    studentEvolution: 'Evolution of the number of students who took the PAES',
    studentExplanation: 'Number of students who took the PAES each year.',
    students: 'students',
    year: 'year',
  },
} as const;


