// Data Management - Mock data and data operations

// Mock Data
const mockNews = [
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
    },
    {
        id: '4',
        title: 'SEMÁFORO DAÑADO EN CRUCE PRINCIPAL',
        description: 'El semáforo del cruce entre Av. Principal y Jr. Comercio presenta fallas intermitentes desde ayer. Los conductores reportan confusión y riesgo de accidentes.',
        author: 'Ana Patricia Ruiz',
        date: '17/08/2025',
        time: '11:20',
        status: 'pendiente',
        location: 'AV PRINCIPAL CON JR COMERCIO',
        image: '/placeholder-news.jpg'
    },
    {
        id: '5',
        title: 'RUIDOS MOLESTOS EN ZONA RESIDENCIAL',
        description: 'Vecinos de la zona residencial reportan ruidos excesivos durante las noches por construcción no autorizada. Se solicita intervención de las autoridades.',
        author: 'Roberto Silva Mendez',
        date: '16/08/2025',
        time: '22:30',
        status: 'en-proceso',
        location: 'ZONA RESIDENCIAL NORTE',
        image: '/placeholder-news.jpg'
    }
];

const mockEvents = [
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
    },
    {
        id: '4',
        title: 'Festival Cultural de Verano',
        description: 'Gran festival con música, danza y gastronomía local. Ven en familia y disfruta de un día lleno de cultura y diversión.',
        organizer: 'Comité Cultural',
        date: '05-08-2025',
        time: '15:00',
        location: 'Plaza de Armas',
        participants: 45,
        maxParticipants: 100,
        image: '/placeholder-event.jpg'
    },
    {
        id: '5',
        title: 'Taller de Reciclaje para Niños',
        description: 'Taller educativo donde los niños aprenderán sobre la importancia del reciclaje y cómo cuidar el medio ambiente.',
        organizer: 'Eco Vecinos',
        date: '12-08-2025',
        time: '10:00',
        location: 'Centro Comunitario - Sala 2',
        participants: 12,
        maxParticipants: 20,
        image: '/placeholder-event.jpg'
    }
];

const mockUsers = [
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

// Data Management Class
class DataManager {
    constructor() {
        this.news = [...mockNews];
        this.events = [...mockEvents];
        this.users = [...mockUsers];
        this.currentUser = {
            name: "GERMAN HERNANDEZ",
            role: "Administrador",
            dni: "98765432",
            email: "GermanH@gmail.com",
            phone: "912345678",
            birthDate: "12/10/1990"
        };
    }

    // News methods
    getAllNews() {
        return this.news;
    }

    getNewsById(id) {
        return this.news.find(item => item.id === id);
    }

    updateNewsStatus(id, status) {
        const newsItem = this.news.find(item => item.id === id);
        if (newsItem) {
            newsItem.status = status;
            return true;
        }
        return false;
    }

    deleteNews(id) {
        const index = this.news.findIndex(item => item.id === id);
        if (index !== -1) {
            this.news.splice(index, 1);
            return true;
        }
        return false;
    }

    filterNews(searchTerm, statusFilter) {
        return this.news.filter(item => {
            const matchesSearch = !searchTerm || 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.date.includes(searchTerm);
            
            const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }

    getNewsStats() {
        return {
            total: this.news.length,
            pending: this.news.filter(n => n.status === 'pendiente').length,
            inProgress: this.news.filter(n => n.status === 'en-proceso').length,
            resolved: this.news.filter(n => n.status === 'resuelto').length
        };
    }

    // Events methods
    getAllEvents() {
        return this.events;
    }

    getEventById(id) {
        return this.events.find(item => item.id === id);
    }

    deleteEvent(id) {
        const index = this.events.findIndex(item => item.id === id);
        if (index !== -1) {
            this.events.splice(index, 1);
            return true;
        }
        return false;
    }

    filterEvents(searchTerm) {
        return this.events.filter(event => {
            return !searchTerm ||
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.date.includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    getEventsStats() {
        const totalParticipants = this.events.reduce((sum, event) => sum + event.participants, 0);
        const avgParticipation = this.events.length > 0 
            ? this.events.reduce((sum, event) => sum + (event.participants / event.maxParticipants), 0) / this.events.length * 100
            : 0;
        const needPromotion = this.events.filter(e => e.participants < e.maxParticipants / 2).length;

        return {
            total: this.events.length,
            totalParticipants,
            avgParticipation: Math.round(avgParticipation),
            needPromotion
        };
    }

    // Users methods
    createUser(userData) {
        const newUser = {
            id: Date.now().toString(),
            ...userData
        };
        this.users.push(newUser);
        return newUser;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Global data manager instance
const dataManager = new DataManager();