// Main Application Logic

// Application State
const appState = {
    currentPage: 'dashboard',
    isLoggedIn: false,
    currentUser: null,
    searchTerms: {
        news: '',
        events: ''
    },
    filters: {
        newsStatus: 'all'
    }
};

// Page Management
class PageManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.initializeNavigation();
    }

    initializeNavigation() {
        // Desktop and mobile navigation
        $$('.nav-item').forEach(item => {
            on(item, 'click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.navigateTo(page);
            });
        });
    }

    navigateTo(pageId) {
        // Update navigation active state
        $$('.nav-item').forEach(item => {
            removeClass(item, 'active');
            if (item.dataset.page === pageId) {
                addClass(item, 'active');
            }
        });

        // Update page visibility
        $$('.page').forEach(page => {
            removeClass(page, 'active');
        });
        
        const targetPage = $(`#${pageId}Page`);
        if (targetPage) {
            addClass(targetPage, 'active');
            this.currentPage = pageId;
            
            // Load page-specific data
            this.loadPageData(pageId);
        }
    }

    loadPageData(pageId) {
        switch (pageId) {
            case 'dashboard':
                dashboardManager.loadDashboard();
                break;
            case 'news':
                newsManager.loadNews();
                break;
            case 'events':
                eventManager.loadEvents();
                break;
            case 'create-user':
                userManager.initializeForm();
                break;
        }
    }
}

// Dashboard Management
class DashboardManager {
    loadDashboard() {
        this.updateStats();
        this.loadLatestNews();
        this.loadUpcomingEvents();
    }

    updateStats() {
        const newsStats = dataManager.getNewsStats();
        StatsRenderer.renderStatsCards(newsStats, 'news');
    }

    loadLatestNews() {
        const latestNews = dataManager.getAllNews().slice(0, 3);
        const container = $('#latestNews');
        
        if (container) {
            if (latestNews.length === 0) {
                EmptyStateRenderer.render(container, 'news', 'No hay noticias disponibles');
            } else {
                container.innerHTML = latestNews
                    .map(news => NewsRenderer.renderNewsItem(news, true))
                    .join('');
                
                // Add click handlers
                container.querySelectorAll('.news-item').forEach(item => {
                    on(item, 'click', () => {
                        const newsId = item.dataset.id;
                        newsManager.openNewsModal(newsId);
                    });
                });
            }
        }
    }

    loadUpcomingEvents() {
        const upcomingEvents = dataManager.getAllEvents().slice(0, 3);
        const container = $('#upcomingEvents');
        
        if (container) {
            if (upcomingEvents.length === 0) {
                EmptyStateRenderer.render(container, 'events', 'No hay eventos programados');
            } else {
                container.innerHTML = upcomingEvents
                    .map(event => EventRenderer.renderEventItem(event, true))
                    .join('');
                
                // Add click handlers
                container.querySelectorAll('.event-item').forEach(item => {
                    on(item, 'click', () => {
                        const eventId = item.dataset.id;
                        eventManager.openEventModal(eventId);
                    });
                });
            }
        }
    }
}

// News Management
class NewsManager {
    constructor() {
        this.initializeSearch();
    }

    initializeSearch() {
        const searchInput = $('#newsSearch');
        const statusFilter = $('#newsStatusFilter');
        
        if (searchInput) {
            on(searchInput, 'input', debounce(() => {
                appState.searchTerms.news = searchInput.value;
                this.loadNews();
            }, 300));
        }
        
        if (statusFilter) {
            on(statusFilter, 'change', () => {
                appState.filters.newsStatus = statusFilter.value;
                this.loadNews();
            });
        }
    }

    loadNews() {
        const filteredNews = dataManager.filterNews(
            appState.searchTerms.news,
            appState.filters.newsStatus
        );
        
        this.renderNews(filteredNews);
        this.updateStats();
    }

    renderNews(newsList) {
        const container = $('#newsGrid');
        
        if (container) {
            if (newsList.length === 0) {
                const message = appState.searchTerms.news || appState.filters.newsStatus !== 'all'
                    ? 'No se encontraron noticias con los filtros aplicados'
                    : 'No hay noticias disponibles en este momento';
                EmptyStateRenderer.render(container, 'search', message);
            } else {
                container.innerHTML = newsList
                    .map(news => NewsRenderer.renderNewsItem(news))
                    .join('');
                
                // Add click handlers
                container.querySelectorAll('.item-card').forEach(item => {
                    on(item, 'click', () => {
                        const newsId = item.dataset.id;
                        this.openNewsModal(newsId);
                    });
                });
            }
        }
    }

    updateStats() {
        const stats = dataManager.getNewsStats();
        StatsRenderer.renderStatsCards(stats, 'news');
    }

    openNewsModal(newsId) {
        const news = dataManager.getNewsById(newsId);
        if (news) {
            const modalTitle = $('#newsModalTitle');
            const modalBody = $('#newsModalBody');
            
            if (modalTitle) modalTitle.textContent = news.title;
            if (modalBody) modalBody.innerHTML = NewsRenderer.renderNewsModal(news);
            
            modalManager.openModal('#newsModal');
        }
    }

    updateNewsStatus(newsId, newStatus) {
        if (dataManager.updateNewsStatus(newsId, newStatus)) {
            showToast(`Estado actualizado a: ${getStatusText(newStatus)}`);
            this.loadNews();
            dashboardManager.updateStats();
            dashboardManager.loadLatestNews();
            modalManager.closeModal();
        }
    }

    showStatusUpdate(newsId) {
        const news = dataManager.getNewsById(newsId);
        if (!news) return;
        
        const statusOptions = [
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'en-proceso', label: 'En Proceso' },
            { value: 'resuelto', label: 'Resuelto' }
        ];
        
        const optionsHtml = statusOptions
            .map(option => `<option value="${option.value}" ${option.value === news.status ? 'selected' : ''}>${option.label}</option>`)
            .join('');
        
        const modalBody = $('#newsModalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="form-group">
                    <label for="newStatus">Nuevo Estado:</label>
                    <select id="newStatus" class="form-control">
                        ${optionsHtml}
                    </select>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-outline" onclick="newsManager.openNewsModal('${newsId}')">Cancelar</button>
                    <button class="btn btn-primary" onclick="newsManager.confirmStatusUpdate('${newsId}')">Actualizar</button>
                </div>
            `;
        }
    }

    confirmStatusUpdate(newsId) {
        const newStatusSelect = $('#newStatus');
        if (newStatusSelect) {
            const newStatus = newStatusSelect.value;
            this.updateNewsStatus(newsId, newStatus);
        }
    }

    deleteNews(newsId) {
        if (confirm('¿Está seguro de que desea eliminar esta noticia?')) {
            if (dataManager.deleteNews(newsId)) {
                showToast('Noticia eliminada correctamente');
                this.loadNews();
                dashboardManager.updateStats();
                dashboardManager.loadLatestNews();
                modalManager.closeModal();
            }
        }
    }

    downloadNews(newsId) {
        const news = dataManager.getNewsById(newsId);
        if (news) {
            const content = `
REPORTE DE NOTICIA
==================

Título: ${news.title}
Autor: ${news.author}
Fecha: ${news.date} - ${news.time}
Estado: ${news.status.toUpperCase()}
Ubicación: ${news.location}

Descripción:
${news.description}
            `;
            
            downloadFile(content, `noticia-${news.id}.txt`);
        }
    }
}

// Event Management
class EventManager {
    constructor() {
        this.initializeSearch();
    }

    initializeSearch() {
        const searchInput = $('#eventsSearch');
        
        if (searchInput) {
            on(searchInput, 'input', debounce(() => {
                appState.searchTerms.events = searchInput.value;
                this.loadEvents();
            }, 300));
        }
    }

    loadEvents() {
        const filteredEvents = dataManager.filterEvents(appState.searchTerms.events);
        this.renderEvents(filteredEvents);
        this.updateStats();
    }

    renderEvents(eventsList) {
        const container = $('#eventsGrid');
        
        if (container) {
            if (eventsList.length === 0) {
                const message = appState.searchTerms.events
                    ? 'No se encontraron eventos con los filtros aplicados'
                    : 'No hay eventos disponibles en este momento';
                EmptyStateRenderer.render(container, 'search', message);
            } else {
                container.innerHTML = eventsList
                    .map(event => EventRenderer.renderEventItem(event))
                    .join('');
                
                // Add click handlers
                container.querySelectorAll('.item-card').forEach(item => {
                    on(item, 'click', () => {
                        const eventId = item.dataset.id;
                        this.openEventModal(eventId);
                    });
                });
            }
        }
    }

    updateStats() {
        const stats = dataManager.getEventsStats();
        StatsRenderer.renderStatsCards(stats, 'events');
    }

    openEventModal(eventId) {
        const event = dataManager.getEventById(eventId);
        if (event) {
            const modalTitle = $('#eventModalTitle');
            const modalBody = $('#eventModalBody');
            
            if (modalTitle) modalTitle.textContent = event.title;
            if (modalBody) modalBody.innerHTML = EventRenderer.renderEventModal(event);
            
            modalManager.openModal('#eventModal');
        }
    }

    deleteEvent(eventId) {
        if (confirm('¿Está seguro de que desea eliminar este evento?')) {
            if (dataManager.deleteEvent(eventId)) {
                showToast('Evento eliminado correctamente');
                this.loadEvents();
                dashboardManager.loadUpcomingEvents();
                modalManager.closeModal();
            }
        }
    }

    downloadEvent(eventId) {
        const event = dataManager.getEventById(eventId);
        if (event) {
            const content = `
INFORMACIÓN DEL EVENTO
=====================

Título: ${event.title}
Organizador: ${event.organizer}
Fecha: ${event.date}
Hora: ${event.time}
Ubicación: ${event.location}
Participantes: ${event.participants}/${event.maxParticipants}

Descripción:
${event.description}
            `;
            
            downloadFile(content, `evento-${event.id}.txt`);
        }
    }
}

// User Management
class UserManager {
    initializeForm() {
        const form = $('#createUserForm');
        const clearButton = $('#clearForm');
        
        if (form) {
            on(form, 'submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        if (clearButton) {
            on(clearButton, 'click', () => {
                clearForm('#createUserForm');
            });
        }
    }

    handleFormSubmit() {
        const form = $('#createUserForm');
        
        if (!validateForm(form)) {
            showToast('Por favor, complete todos los campos requeridos', 'error');
            return;
        }
        
        const formData = new FormData(form);
        const userData = {
            firstName: formData.get('firstName') || $('#firstName').value,
            lastName: formData.get('lastName') || $('#lastName').value,
            dni: formData.get('dni') || $('#dni').value,
            phone: formData.get('phone') || $('#phone').value,
            birthDate: formData.get('birthDate') || $('#birthDate').value,
            email: formData.get('email') || $('#email').value,
            password: formData.get('password') || $('#password').value,
            role: formData.get('role') || $('#role').value
        };
        
        // Simulate user creation
        const newUser = dataManager.createUser(userData);
        
        showToast(`Usuario creado exitosamente: ${userData.firstName} ${userData.lastName}`);
        clearForm(form);
    }
}

// Authentication Management
class AuthManager {
    constructor() {
        this.initializeAuth();
    }

    initializeAuth() {
        // Login form handlers
        const signInForm = $('#signInForm');
        const signUpForm = $('#signUpForm');
        const loginBtn = $('#loginBtn');
        const registerBtn = $('#registerBtn');
        const logoutBtn = $('#logoutBtn');
        const profileIcon = $('#profileIcon');
        
        if (signInForm) {
            on(signInForm, 'submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        if (signUpForm) {
            on(signUpForm, 'submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
        
        if (loginBtn) {
            on(loginBtn, 'click', () => {
                this.toggleLoginForm();
            });
        }
        
        if (registerBtn) {
            on(registerBtn, 'click', () => {
                this.toggleRegisterForm();
            });
        }
        
        if (logoutBtn) {
            on(logoutBtn, 'click', () => {
                this.handleLogout();
            });
        }
        
        if (profileIcon) {
            on(profileIcon, 'click', () => {
                modalManager.openModal('#profileModal');
            });
        }
    }

    toggleLoginForm() {
        const container = $('#loginContainer');
        if (container) {
            removeClass(container, 'active');
        }
    }

    toggleRegisterForm() {
        const container = $('#loginContainer');
        if (container) {
            addClass(container, 'active');
        }
    }

    handleLogin() {
        const email = $('#signInForm input[type="email"]').value;
        const password = $('#signInForm input[type="password"]').value;
        
        // Simple validation (in real app, this would be server-side)
        if (email === 'admin@admin.com' && password === 'admin123') {
            appState.isLoggedIn = true;
            appState.currentUser = dataManager.getCurrentUser();
            
            hide('#loginPage');
            show('#mainApp');
            
            // Initialize the application
            pageManager.navigateTo('dashboard');
            showToast('¡Bienvenido al sistema!');
        } else {
            showToast('Credenciales incorrectas', 'error');
        }
    }

    handleRegister() {
        showToast('Función de registro no implementada en esta demo', 'info');
    }

    handleLogout() {
        appState.isLoggedIn = false;
        appState.currentUser = null;
        
        hide('#mainApp');
        show('#loginPage');
        
        modalManager.closeModal();
        showToast('Sesión cerrada correctamente');
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Initialize managers
        window.authManager = new AuthManager();
        window.pageManager = new PageManager();
        window.dashboardManager = new DashboardManager();
        window.newsManager = new NewsManager();
        window.eventManager = new EventManager();
        window.userManager = new UserManager();
        
        // Set initial state
        if (appState.isLoggedIn) {
            hide('#loginPage');
            show('#mainApp');
            pageManager.navigateTo('dashboard');
        } else {
            show('#loginPage');
            hide('#mainApp');
        }
        
        console.log('LA VOZ DE TODOS - Admin Panel initialized');
    }
}

// Start the application
const app = new App();