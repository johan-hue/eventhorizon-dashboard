// Mock Data
const mockNews = [
    {
        id: 1,
        title: "SE FUE LA LUZ EN LA AV LAS FLORES",
        description: "Se reporta corte de energía eléctrica en la Av. Las Flores ocurrido a las 4:16 p.m. La interrupción afecta a los vecinos de la zona, generando inconvenientes en sus actividades cotidianas.",
        status: "pendiente",
        author: "Juan Felipe Pérez Rojas",
        date: "2025-01-20",
        time: "16:16",
        location: "AV LAS FLORES. JR PRIMAVERA 204",
        category: "Servicios Públicos",
        priority: "alta",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop"
    },
    {
        id: 2,
        title: "MEJORAS EN EL PARQUE CENTRAL",
        description: "Se han completado las obras de renovación del parque central de la comunidad. Nuevos juegos infantiles y áreas verdes han sido instalados para el disfrute de las familias.",
        status: "resuelto",
        author: "María González López",
        date: "2025-01-19",
        time: "10:30",
        location: "Parque Central - Plaza Principal",
        category: "Infraestructura",
        priority: "media",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=200&fit=crop"
    },
    {
        id: 3,
        title: "PROBLEMA CON EL AGUA POTABLE",
        description: "Varios vecinos reportan baja presión de agua en la zona residencial norte. El problema persiste desde hace 3 días afectando principalmente las horas de la mañana.",
        status: "en-proceso",
        author: "Carlos Mendoza Silva",
        date: "2025-01-18",
        time: "08:15",
        location: "Zona Residencial Norte",
        category: "Servicios Públicos",
        priority: "alta",
        image: "https://images.unsplash.com/photo-1544480189-54c3b1b1e2d8?w=400&h=200&fit=crop"
    },
    {
        id: 4,
        title: "NUEVA RUTA DE TRANSPORTE PÚBLICO",
        description: "Se ha habilitado una nueva ruta de autobús que conecta el centro con la zona industrial. El servicio opera de lunes a sábado desde las 6:00 AM hasta las 10:00 PM.",
        status: "resuelto",
        author: "Ana Patricia Ruiz",
        date: "2025-01-17",
        time: "14:45",
        location: "Centro - Zona Industrial",
        category: "Transporte",
        priority: "media",
        image: "https://images.unsplash.com/photo-1544783401-2dda4fb685f7?w=400&h=200&fit=crop"
    },
    {
        id: 5,
        title: "DAÑOS EN VEREDAS PRINCIPALES",
        description: "Las veredas de las calles principales presentan deterioro significativo. Varios tramos tienen huecos y grietas que representan peligro para los peatones.",
        status: "pendiente",
        author: "Roberto Vásquez Torres",
        date: "2025-01-16",
        time: "12:20",
        location: "Calles Principales del Centro",
        category: "Infraestructura",
        priority: "media",
        image: "https://images.unsplash.com/photo-1574493264363-f7c4c4b3451c?w=400&h=200&fit=crop"
    },
    {
        id: 6,
        title: "ILUMINACIÓN DEFICIENTE EN PARQUES",
        description: "Varios parques de la comunidad presentan problemas de iluminación nocturna. Las luminarias están dañadas o completamente apagadas, afectando la seguridad.",
        status: "en-proceso",
        author: "Lucía Hernández Morales",
        date: "2025-01-15",
        time: "19:30",
        location: "Parques Comunitarios",
        category: "Seguridad",
        priority: "alta",
        image: "https://images.unsplash.com/photo-1574493264363-f7c4c4b3451c?w=400&h=200&fit=crop"
    },
    {
        id: 7,
        title: "RECOLECCIÓN DE BASURA IRREGULAR",
        description: "El servicio de recolección de basura ha sido irregular en las últimas semanas. Algunos sectores han quedado sin servicio por varios días consecutivos.",
        status: "pendiente",
        author: "Pedro Almonte García",
        date: "2025-01-14",
        time: "06:45",
        location: "Varios Sectores",
        category: "Servicios Públicos",
        priority: "media",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop"
    },
    {
        id: 8,
        title: "CAMPAÑA DE VACUNACIÓN COMUNITARIA",
        description: "Se realizará una jornada de vacunación gratuita en el centro de salud comunitario. Disponible para todas las edades con horarios extendidos.",
        status: "resuelto",
        author: "Dr. Elena Vargas Cruz",
        date: "2025-01-13",
        time: "09:00",
        location: "Centro de Salud Comunitario",
        category: "Salud",
        priority: "alta",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
    }
];

const mockEvents = [
    {
        id: 1,
        title: "Inauguración Centro Deportivo",
        description: "Gran inauguración del nuevo centro deportivo comunitario. Habrá actividades para toda la familia, deportes, música y refrigerios gratuitos.",
        organizer: "Juan Marco García Mendoza",
        date: "2025-01-25",
        time: "08:00",
        location: "Centro Deportivo el Golazo - Av San Carlos",
        participants: 8,
        maxParticipants: 24,
        category: "Deportes",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
    },
    {
        id: 2,
        title: "Taller de Jardinería Urbana",
        description: "Aprende técnicas de jardinería urbana y cultivo de plantas en espacios pequeños. Incluye materiales y plantas para llevar a casa.",
        organizer: "María Fernanda López",
        date: "2025-01-28",
        time: "15:00",
        location: "Casa Comunal - Sala 2",
        participants: 15,
        maxParticipants: 20,
        category: "Educativo",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop"
    },
    {
        id: 3,
        title: "Reunión Vecinal Mensual",
        description: "Reunión ordinaria para discutir temas comunitarios, proyectos en desarrollo y propuestas de los vecinos.",
        organizer: "Comité Vecinal",
        date: "2025-01-30",
        time: "18:30",
        location: "Auditorio Municipal",
        participants: 45,
        maxParticipants: 100,
        category: "Administrativo",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=400&h=200&fit=crop"
    },
    {
        id: 4,
        title: "Festival Gastronómico",
        description: "Muestra de la gastronomía local con la participación de familias de la comunidad. Comidas tradicionales y platos innovadores.",
        organizer: "Asociación Cultural",
        date: "2025-02-02",
        time: "11:00",
        location: "Plaza Principal",
        participants: 32,
        maxParticipants: 50,
        category: "Cultural",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop"
    },
    {
        id: 5,
        title: "Campaña de Limpieza Ambiental",
        description: "Jornada de limpieza y cuidado del medio ambiente. Incluye limpieza de parques, siembra de árboles y charla sobre reciclaje.",
        organizer: "Grupo Ecológico Verde",
        date: "2025-02-05",
        time: "07:00",
        location: "Parque Central",
        participants: 22,
        maxParticipants: 40,
        category: "Ambiental",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop"
    },
    {
        id: 6,
        title: "Curso de Primeros Auxilios",
        description: "Curso básico de primeros auxilios dirigido a todos los miembros de la comunidad. Certificado incluido al completar el curso.",
        organizer: "Cruz Roja Comunitaria",
        date: "2025-02-08",
        time: "09:00",
        location: "Centro de Salud",
        participants: 18,
        maxParticipants: 25,
        category: "Salud",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
    },
    {
        id: 7,
        title: "Competencia de Fútbol Juvenil",
        description: "Torneo de fútbol para jóvenes de 14 a 18 años. Premios para los primeros tres lugares y participación para todos.",
        organizer: "Club Deportivo Los Campeones",
        date: "2025-02-10",
        time: "16:00",
        location: "Campo Deportivo Municipal",
        participants: 28,
        maxParticipants: 32,
        category: "Deportes",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
    },
    {
        id: 8,
        title: "Taller de Arte para Niños",
        description: "Actividad creativa para niños de 6 a 12 años. Pintura, dibujo y manualidades con materiales incluidos.",
        organizer: "Centro Cultural Infantil",
        date: "2025-02-12",
        time: "14:00",
        location: "Biblioteca Comunitaria",
        participants: 12,
        maxParticipants: 15,
        category: "Educativo",
        status: "próximo",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop"
    }
];

const mockUsers = [
    {
        id: 1,
        name: "Juan Administrador",
        email: "admin@lavozdetodos.com",
        role: "admin",
        newsManaged: 12,
        eventsCreated: 8
    }
];

// Current user (for demo purposes)
let currentUser = mockUsers[0];
let selectedNewsItem = null;
let selectedEventItem = null;