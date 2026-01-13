import axios from 'axios';
import type { School } from '../types/school';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_KEY = import.meta.env.VITE_API_KEY || '';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
  },
});

export interface ScoreByYear {
  year: number;
  score: number | null;
}

export interface StudentsByYear {
  year: number;
  students: number | null;
}

export interface Region {
  nombre: string;
  comunas: string[];
}

export interface SchoolDetail {
  rbd: number;
  nombre: string;
  tipo_educacion: string | null;
  grupo_dependencia: string;
  puntaje_promedio_2017_2026: number | null;
  pago_mensual: number | null;
  pago_matricula: number | null;
  latitud: number | null;
  longitud: number | null;
  region: string;
  comuna: string;
  scores_by_year: ScoreByYear[];
  students_by_year: StudentsByYear[];
  avg_publicos_by_year: ScoreByYear[];
  avg_privados_by_year: ScoreByYear[];
}

export interface ComunaPolygon {
  type: 'Feature';
  properties: {
    cod_comuna: number;
    nombre: string;
    region: string;
    provincia: string;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export const getRegions = async (): Promise<Region[]> => {
  try {
    const response = await apiClient.get<Region[]>('/regions');
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};

export const getSchools = async (region: string, comuna: string): Promise<School[]> => {
  try {
    const response = await apiClient.get<School[]>('/schools', {
      params: {
        region,
        comuna
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
};

export const getSchoolDetail = async (rbd: number): Promise<SchoolDetail> => {
  try {
    const response = await apiClient.get<SchoolDetail>(`/schools/${rbd}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school detail:', error);
    throw error;
  }
};

export const getComunaPolygon = async (codComuna: number): Promise<ComunaPolygon> => {
  try {
    const response = await apiClient.get<ComunaPolygon>(`/polygons/comunas/${codComuna}/polygon`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comuna polygon:', error);
    throw error;
  }
};