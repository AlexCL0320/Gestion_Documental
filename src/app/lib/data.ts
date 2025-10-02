import { PlaceHolderImages } from '@/lib/placeholder-images';

export type DocumentType = 
    | 'Evaluaciones' 
    | 'Instrumentaciones' 
    | 'Rubricas' 
    | 'Actas de Inicio' 
    | 'Reporte Final' 
    | 'Reporte Intermedio';

export type Document = {
  id: string;
  name: string;
  type: DocumentType;
  teacher: {
    name: string;
    avatarUrl: string;
  };
  status: 'Entregada' | 'Sin Entregar' | 'Rechazada';
  lastUpdated: string; // ISO date string
  version: number;
};

export type Activity = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  action: string;
  target: string;
  timestamp: string; // ISO date string
};

export type Teacher = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    status: 'Activo' | 'Inactivo';
    department: string;
    contractType: 'Base' | 'Interinato' | 'Honorarios';
};

const teachers: Omit<Teacher, 'id' | 'status' | 'department' | 'contractType'>[] = [
  { name: 'Elena Ortiz', email: 'elena.ortiz@example.com', avatarUrl: PlaceHolderImages.find(img => img.id === 'user1')?.imageUrl ?? '' },
  { name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', avatarUrl: PlaceHolderImages.find(img => img.id === 'user2')?.imageUrl ?? '' },
  { name: 'Ana Torres', email: 'ana.torres@example.com', avatarUrl: PlaceHolderImages.find(img => img.id === 'user3')?.imageUrl ?? '' },
  { name: 'Javier Peña', email: 'javier.pena@example.com', avatarUrl: PlaceHolderImages.find(img => img.id === 'user4')?.imageUrl ?? '' },
  { name: 'Sofía Reyes', email: 'sofia.reyes@example.com', avatarUrl: PlaceHolderImages.find(img => img.id === 'user5')?.imageUrl ?? '' },
];


export const teachersData: Teacher[] = [
    {
      id: 'TCH001',
      name: 'Elena Ortiz',
      email: 'elena.ortiz@itoaxaca.edu.mx',
      avatarUrl: PlaceHolderImages.find(img => img.id === 'user1')?.imageUrl ?? '',
      status: 'Activo',
      department: 'Ingeniería de Sistemas',
      contractType: 'Base',
    },
    {
      id: 'TCH002',
      name: 'Carlos Ruiz',
      email: 'carlos.ruiz@itoaxaca.edu.mx',
      avatarUrl: PlaceHolderImages.find(img => img.id === 'user2')?.imageUrl ?? '',
      status: 'Activo',
      department: 'Ingeniería Industrial',
      contractType: 'Interinato',
    },
    {
      id: 'TCH003',
      name: 'Ana Torres',
      email: 'ana.torres@itoaxaca.edu.mx',
      avatarUrl: PlaceHolderImages.find(img => img.id === 'user3')?.imageUrl ?? '',
      status: 'Inactivo',
      department: 'Ciencias Básicas',
      contractType: 'Honorarios',
    },
    {
      id: 'TCH004',
      name: 'Javier Peña',
      email: 'javier.pena@itoaxaca.edu.mx',
      avatarUrl: PlaceHolderImages.find(img => img.id === 'user4')?.imageUrl ?? '',
      status: 'Activo',
      department: 'Ingeniería Eléctrica',
      contractType: 'Base',
    },
    {
      id: 'TCH005',
      name: 'Sofía Reyes',
      email: 'sofia.reyes@itoaxaca.edu.mx',
      avatarUrl: PlaceHolderImages.find(img => img.id === 'user5')?.imageUrl ?? '',
      status: 'Activo',
      department: 'Ingeniería Química',
      contractType: 'Interinato',
    },
  ];

const now = new Date();

export const documents: Document[] = [
  {
    id: 'DOC001',
    name: 'Instrumentación Didáctica - Algoritmos',
    type: 'Instrumentaciones',
    teacher: teachers[0],
    status: 'Entregada',
    lastUpdated: new Date(now.setDate(now.getDate() - 1)).toISOString(),
    version: 2,
  },
  {
    id: 'DOC002',
    name: 'Reporte Semestral de Actividades',
    type: 'Reporte Final',
    teacher: teachers[1],
    status: 'Rechazada',
    lastUpdated: new Date(now.setHours(now.getHours() - 3)).toISOString(),
    version: 3,
  },
  {
    id: 'DOC003',
    name: 'Plan de Trabajo - Fisica I',
    type: 'Actas de Inicio',
    teacher: teachers[2],
    status: 'Sin Entregar',
    lastUpdated: new Date(now.setDate(now.getDate() - 10)).toISOString(),
    version: 0,
  },
  {
    id: 'DOC004',
    name: 'Evidencias de Tutorías',
    type: 'Evaluaciones',
    teacher: teachers[3],
    status: 'Entregada',
    lastUpdated: new Date(now.setDate(now.getDate() - 3)).toISOString(),
    version: 1,
  },
  {
    id: 'DOC005',
    name: 'Instrumentación Didáctica - Cálculo',
    type: 'Instrumentaciones',
    teacher: teachers[4],
    status: 'Entregada',
    lastUpdated: new Date(now.setDate(now.getDate() - 5)).toISOString(),
    version: 1,
  },
  {
    id: 'DOC006',
    name: 'Rúbrica de Proyecto Final',
    type: 'Rubricas',
    teacher: teachers[0],
    status: 'Sin Entregar',
    lastUpdated: new Date(now.setDate(now.getDate() - 12)).toISOString(),
    version: 0,
  },
  {
    id: 'DOC007',
    name: 'Reporte Intermedio de Residencia',
    type: 'Reporte Intermedio',
    teacher: teachers[1],
    status: 'Entregada',
    lastUpdated: new Date(now.setDate(now.getDate() - 2)).toISOString(),
    version: 1,
  },
  {
    id: 'DOC008',
    name: 'Evaluación Departamental',
    type: 'Evaluaciones',
    teacher: teachers[2],
    status: 'Rechazada',
    lastUpdated: new Date(now.setDate(now.getDate() - 4)).toISOString(),
    version: 2,
  }
];

export const activities: Activity[] = [
    {
      id: 'ACT001',
      user: teachers[1],
      action: 'ha subido una nueva versión de',
      target: 'Reporte Semestral de Actividades',
      timestamp: new Date(now.setHours(now.getHours() - 3)).toISOString(),
    },
    {
      id: 'ACT002',
      user: { name: 'Jefatura de Docencia', avatarUrl: PlaceHolderImages.find(img => img.id === 'user2')?.imageUrl ?? '' },
      action: 'ha rechazado la entrega de',
      target: 'Reporte Semestral de Actividades',
      timestamp: new Date(now.setHours(now.getHours() - 2)).toISOString(),
    },
    {
      id: 'ACT003',
      user: teachers[0],
      action: 'ha entregado',
      target: 'Instrumentación Didáctica - Algoritmos',
      timestamp: new Date(now.setDate(now.getDate() - 1)).toISOString(),
    },
    {
      id: 'ACT004',
      user: teachers[3],
      action: 'ha entregado',
      target: 'Evidencias de Tutorías',
      timestamp: new Date(now.setDate(now.getDate() - 3)).toISOString(),
    },
    {
      id: 'ACT005',
      user: { name: 'Sistema', avatarUrl: '' },
      action: 'ha enviado un recordatorio de entrega a',
      target: 'Ana Torres',
      timestamp: new Date(now.setDate(now.getDate() - 4)).toISOString(),
    },
  ];