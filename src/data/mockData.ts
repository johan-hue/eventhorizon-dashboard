export interface News {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  time: string;
  status: 'pendiente' | 'en-proceso' | 'resuelto';
  location: string;
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  image?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  birthDate: string;
  email: string;
  role: 'admin' | 'vecino' | 'moderador';
}

export const mockNews: News[] = [
  {
    id: '1',
    title: 'SE FUE LA LUZ EN LA AV LAS FLORES',
    description: 'Se reporta corte de energía eléctrica en la Av. Las Flores ocurrido a las 4:16 p.m. La interrupción afecta a los vecinos de la zona, generando inconvenientes en sus actividades cotidianas. Se solicita atención y restablecimiento del servicio a la brevedad posible.',
    author: 'Juan Felipe Pérez Rojas',
    date: '20/08/2025',
    time: '16:16',
    status: 'pendiente',
    location: 'AV LAS FLORES. JR PRIMAVERA 204',
    image: '/placeholder-news.jpg'
  },
  {
    id: '2',
    title: 'FUGA DE AGUA EN JR LIBERTAD',
    description: 'Se reporta una fuga considerable de agua potable en el Jr. Libertad altura de la cuadra 3. El problema viene causando charcos y desperdicio del recurso hídrico.',
    author: 'María González Silva',
    date: '19/08/2025',
    time: '09:30',
    status: 'en-proceso',
    location: 'JR LIBERTAD CUADRA 3',
    image: '/placeholder-news.jpg'
  },
  {
    id: '3',
    title: 'BASURA ACUMULADA EN PARQUE CENTRAL',
    description: 'Los vecinos reportan acumulación excesiva de basura en el Parque Central. Se solicita el servicio de limpieza urgente para mantener la salubridad del área.',
    author: 'Carlos Mendoza López',
    date: '18/08/2025',
    time: '14:45',
    status: 'resuelto',
    location: 'PARQUE CENTRAL',
    image: '/placeholder-news.jpg'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Inauguración Centro Deportivo el Golazo',
    description: 'Te invitamos a la gran inauguración del nuevo centro deportivo. Habrá actividades para toda la familia, rifas y sorpresas.',
    organizer: 'Juan Marco García Mendoza',
    date: '20-07-2025',
    time: '8:00',
    location: 'Centro Deportivo el Golazo - Av San Carlos',
    participants: 8,
    maxParticipants: 24,
    image: '/placeholder-event.jpg'
  },
  {
    id: '2',
    title: 'Reunión Vecinal Mensual',
    description: 'Reunión mensual para tratar temas importantes del barrio. Participación de todos los vecinos.',
    organizer: 'Ana Patricia Ruiz',
    date: '25-07-2025',
    time: '19:00',
    location: 'Centro Comunitario - Av Principal',
    participants: 15,
    maxParticipants: 50,
    image: '/placeholder-event.jpg'
  },
  {
    id: '3',
    title: 'Campaña de Limpieza Comunitaria',
    description: 'Jornada de limpieza y embellecimiento de nuestro barrio. Todos los vecinos están invitados a participar.',
    organizer: 'Comité de Limpieza',
    date: '30-07-2025',
    time: '07:00',
    location: 'Plaza Principal',
    participants: 23,
    maxParticipants: 40,
    image: '/placeholder-event.jpg'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Juan Felipe',
    lastName: 'Pérez Rojas',
    dni: '12345678',
    phone: '987654321',
    birthDate: '1985-03-15',
    email: 'juan.perez@email.com',
    role: 'admin'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'González Silva',
    dni: '87654321',
    phone: '987654322',
    birthDate: '1990-07-22',
    email: 'maria.gonzalez@email.com',
    role: 'vecino'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Mendoza López',
    dni: '11223344',
    phone: '987654323',
    birthDate: '1988-12-10',
    email: 'carlos.mendoza@email.com',
    role: 'moderador'
  }
];