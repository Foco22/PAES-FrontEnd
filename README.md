# PAES Frontend - Education Analytics Platform

## Overview

A data visualization platform that provides insights into Chilean education system performance through PAES (Prueba de Acceso a la Educación Superior) test results. This application helps parents, students, and education stakeholders make informed decisions by visualizing school performance across different regions and communes of Chile.

## Key Features

### 🗺️ Interactive Map Visualization
- Full-screen map of Chile with regional and commune selection
- Black and white minimalist design for clear data presentation
- Real-time school location markers using latitude/longitude coordinates
- Color-coded performance indicators based on `PUNTAJE_PROMEDIO_2017_2026`

### 📊 Performance Analytics
- School performance comparisons across different regions
- Historical data tracking from 2017-2026
- Multi-subject analysis (CLEC, MATE, HCSOC, CIEN)
- Educational background and dependency analysis

### 🎯 Social Impact
This project empowers Chilean families by:
- **Transparency**: Making education performance data accessible and understandable
- **Informed Choices**: Helping parents identify better educational opportunities for their children
- **System Improvement**: Highlighting performance gaps to drive public education improvements
- **Equal Opportunities**: Supporting students from all backgrounds to access quality education

## Technology Stack

- **Frontend**: React with TypeScript
- **Mapping**: Google Maps API integration
- **Deployment**: Docker containerization
- **Data**: REST APIs for PAES results and school information

## Data Dimensions

### Geographic Coverage
- All Chilean regions (`CODIGO_REGION`)
- Commune-level detail (`CODIGO_COMUNA`)
- Individual school locations (latitude/longitude)

### Performance Metrics
- Average PAES scores (`PUNTAJE_PROMEDIO_2017_2026`)
- Subject-specific performance:
  - CLEC (Reading Comprehension)
  - MATE1/MATE2 (Mathematics)
  - HCSOC (History and Social Sciences)
  - CIEN (Sciences)

### School Classification
- Educational tracks (`RAMA_EDUCACIONAL`)
- School dependencies (`GRUPO_DEPENDENCIA`)
- School identification (`RBD`, `COD_ENS`)

## Getting Started

### Prerequisites
- Node.js
- Docker
- Google Maps API key

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Mission

Transform Chilean education data into actionable insights that promote educational equity and excellence. By making performance data transparent and accessible, we contribute to strengthening Chile's public education system and ensuring every student has the opportunity to reach their full potential.

## Contributing

This project aims to improve educational outcomes in Chile. We welcome contributions that help make education data more accessible and useful for Chilean families and educators.

---

*"Data-driven decisions for better education in Chile"*
