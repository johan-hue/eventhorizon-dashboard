// Global State
let isLoggedIn = false;
let currentPage = 'dashboard';
let filteredNews = [...mockNews];
let filteredEvents = [...mockEvents];

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardContainer = document.getElementById('dashboardContainer');
const loginContainer = document.getElementById('loginContainer');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in (for demo, we'll start with login)
    if (isLoggedIn) {
        showDashboard();
    } else {
        showLoginPage();
    }
}

// Login Functions
function showLogin() {
    loginContainer.classList.remove('active');
}

function showRegister() {
    loginContainer.classList.add('active');
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation for demo
    if (email && password) {
        isLoggedIn = true;
        showToast('Inicio de sesión exitoso', 'success');
        setTimeout(() => {
            showDashboard();
        }, 1000);
    } else {
        showToast('Por favor, completa todos los campos', 'error');
    }
}

function handleRegister() {
    showToast('Funcionalidad de registro no implementada', 'info');
}

function showForgotPassword() {
    showToast('Funcionalidad de recuperación no implementada', 'info');
}

function logout() {
    isLoggedIn = false;
    currentPage = 'dashboard';
    closeProfileModal();
    showToast('Sesión cerrada exitosamente', 'info');
    showLoginPage();
}

// Navigation Functions
function showLoginPage() {
    loginPage.style.display = 'flex';
    dashboardContainer.style.display = 'none';
}

function showDashboard() {
    loginPage.style.display = 'none';
    dashboardContainer.style.display = 'block';
    showPage('dashboard');
    updateStatistics();
    loadRecentNews();
    loadUpcomingEvents();
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.style.display = 'none');
    
    // Show selected page
    document.getElementById(pageName + 'Page').style.display = 'block';
    
    // Update navigation
    updateNavigation(pageName);
    currentPage = pageName;
    
    // Load page-specific content
    switch (pageName) {
        case 'news':
            loadAllNews();
            break;
        case 'events':
            loadAllEvents();
            break;
    }
}

function updateNavigation(activePage) {
    // Desktop navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === activePage) {
            item.classList.add('active');
        }
    });
    
    // Mobile navigation
    const mobileNavItems = document.querySelectorAll('.nav-item-mobile');
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === activePage) {
            item.classList.add('active');
        }
    });
}

// Dashboard Functions
function updateStatistics() {
    const totalNews = mockNews.length;
    const pendingNews = mockNews.filter(news => news.status === 'pendiente').length;
    const inProgressNews = mockNews.filter(news => news.status === 'en-proceso').length;
    const upcomingEvents = mockEvents.length;
    
    document.getElementById('totalNews').textContent = totalNews;
    document.getElementById('pendingNews').textContent = pendingNews;
    document.getElementById('inProgressNews').textContent = inProgressNews;
    document.getElementById('upcomingEvents').textContent = upcomingEvents;
}

function loadRecentNews() {
    const recentNews = mockNews.slice(0, 3);
    const container = document.getElementById('recentNewsList');
    
    container.innerHTML = recentNews.map(news => `
        <div class="news-item" onclick="openNewsModal(${news.id})">
            <div class="item-title">${news.title}</div>
            <div class="item-description">${news.description}</div>
            <div class="item-meta">
                <span class="status-badge status-${news.status}">${news.status.toUpperCase()}</span>
                <span>Por: ${news.author}</span>
                <span>${news.date}</span>
            </div>
        </div>
    `).join('');
}

function loadUpcomingEvents() {
    const upcomingEvents = mockEvents.slice(0, 3);
    const container = document.getElementById('upcomingEventsList');
    
    container.innerHTML = upcomingEvents.map(event => `
        <div class="event-item" onclick="openEventModal(${event.id})">
            <div class="item-title">${event.title}</div>
            <div class="item-description">${event.description}</div>
            <div class="item-meta">
                <span>${event.organizer}</span>
                <span>${event.date} - ${event.time}</span>
                <span>Participantes: ${event.participants}/${event.maxParticipants}</span>
            </div>
        </div>
    `).join('');
}

// News Functions
function loadAllNews() {
    const container = document.getElementById('newsGrid');
    
    container.innerHTML = filteredNews.map(news => `
        <div class="news-card" onclick="openNewsModal(${news.id})">
            <div class="card-header">
                <h3 class="card-title">${news.title}</h3>
                <span class="status-badge status-${news.status}">${news.status.toUpperCase()}</span>
            </div>
            <div class="card-description">${news.description}</div>
            <div class="card-meta">
                <div class="meta-row">
                    <i class="fas fa-user"></i>
                    <span>Por: ${news.author}</span>
                </div>
                <div class="meta-row">
                    <i class="fas fa-calendar"></i>
                    <span>${news.date} - ${news.time}</span>
                </div>
                <div class="meta-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${news.location}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterNews() {
    const searchTerm = document.getElementById('newsSearch').value.toLowerCase();
    const statusFilter = document.getElementById('newsStatusFilter').value;
    
    filteredNews = mockNews.filter(news => {
        const matchesSearch = news.title.toLowerCase().includes(searchTerm) ||
                            news.description.toLowerCase().includes(searchTerm) ||
                            news.author.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || news.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    loadAllNews();
}

// Events Functions
function loadAllEvents() {
    const container = document.getElementById('eventsGrid');
    
    container.innerHTML = filteredEvents.map(event => `
        <div class="event-card" onclick="openEventModal(${event.id})">
            <div class="card-header">
                <h3 class="card-title">${event.title}</h3>
            </div>
            <div class="card-description">${event.description}</div>
            <div class="card-meta">
                <div class="meta-row">
                    <i class="fas fa-user"></i>
                    <span>Organizador: ${event.organizer}</span>
                </div>
                <div class="meta-row">
                    <i class="fas fa-calendar"></i>
                    <span>${event.date} - ${event.time}</span>
                </div>
                <div class="meta-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="meta-row">
                    <i class="fas fa-users"></i>
                    <span>Participantes: ${event.participants}/${event.maxParticipants}</span>
                </div>
            </div>
            <div class="participation-bar">
                <div class="participation-progress" style="width: ${(event.participants / event.maxParticipants) * 100}%"></div>
            </div>
        </div>
    `).join('');
}

function filterEvents() {
    const searchTerm = document.getElementById('eventsSearch').value.toLowerCase();
    
    filteredEvents = mockEvents.filter(event => {
        return event.title.toLowerCase().includes(searchTerm) ||
               event.description.toLowerCase().includes(searchTerm) ||
               event.organizer.toLowerCase().includes(searchTerm) ||
               event.location.toLowerCase().includes(searchTerm);
    });
    
    loadAllEvents();
}

// Modal Functions
function toggleProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

function openNewsModal(newsId) {
    selectedNewsItem = mockNews.find(news => news.id === newsId);
    if (selectedNewsItem) {
        document.getElementById('newsModalTitle').textContent = selectedNewsItem.title;
        document.getElementById('newsModalContent').innerHTML = `
            <div class="detail-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <h4 class="detail-title">${selectedNewsItem.title}</h4>
            <div class="detail-meta">
                <div><strong>Reportado por:</strong> ${selectedNewsItem.author}</div>
                <div><strong>Fecha:</strong> ${selectedNewsItem.date} - ${selectedNewsItem.time}</div>
                <div><strong>Ubicación:</strong> ${selectedNewsItem.location}</div>
                <div><strong>Estado:</strong> <span class="status-badge status-${selectedNewsItem.status}">${selectedNewsItem.status.toUpperCase()}</span></div>
                <div><strong>Categoría:</strong> ${selectedNewsItem.category}</div>
            </div>
            <div class="detail-description">
                <strong>Descripción:</strong><br>
                ${selectedNewsItem.description}
            </div>
        `;
        document.getElementById('newsModal').style.display = 'flex';
    }
}

function closeNewsModal() {
    document.getElementById('newsModal').style.display = 'none';
    selectedNewsItem = null;
}

function openEventModal(eventId) {
    selectedEventItem = mockEvents.find(event => event.id === eventId);
    if (selectedEventItem) {
        document.getElementById('eventModalTitle').textContent = selectedEventItem.title;
        document.getElementById('eventModalContent').innerHTML = `
            <div class="detail-image">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <h4 class="detail-title">${selectedEventItem.title}</h4>
            <div class="detail-meta">
                <div><strong>Organizador:</strong> ${selectedEventItem.organizer}</div>
                <div><strong>Fecha:</strong> ${selectedEventItem.date} - ${selectedEventItem.time}</div>
                <div><strong>Ubicación:</strong> ${selectedEventItem.location}</div>
                <div><strong>Participantes:</strong> ${selectedEventItem.participants}/${selectedEventItem.maxParticipants}</div>
                <div><strong>Categoría:</strong> ${selectedEventItem.category}</div>
            </div>
            <div class="detail-description">
                <strong>Descripción:</strong><br>
                ${selectedEventItem.description}
            </div>
            <div class="participation-bar">
                <div class="participation-progress" style="width: ${(selectedEventItem.participants / selectedEventItem.maxParticipants) * 100}%"></div>
            </div>
        `;
        document.getElementById('eventModal').style.display = 'flex';
    }
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
    selectedEventItem = null;
}

// Modal Actions
function showNewsDetail() {
    showToast('Mostrando detalles completos de la noticia', 'info');
}

function showNewsResponse() {
    showToast('Funcionalidad de respuesta no implementada', 'info');
}

function downloadNews() {
    if (selectedNewsItem) {
        showToast(`Descargando noticia: ${selectedNewsItem.title}`, 'success');
    }
}

function deleteNews() {
    if (selectedNewsItem && confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
        const index = mockNews.findIndex(news => news.id === selectedNewsItem.id);
        if (index > -1) {
            mockNews.splice(index, 1);
            showToast('Noticia eliminada exitosamente', 'success');
            closeNewsModal();
            if (currentPage === 'news') {
                filterNews();
            }
            updateStatistics();
            loadRecentNews();
        }
    }
}

function downloadEvent() {
    if (selectedEventItem) {
        showToast(`Descargando evento: ${selectedEventItem.title}`, 'success');
    }
}

function deleteEvent() {
    if (selectedEventItem && confirm('¿Estás seguro de que quieres eliminar este evento?')) {
        const index = mockEvents.findIndex(event => event.id === selectedEventItem.id);
        if (index > -1) {
            mockEvents.splice(index, 1);
            showToast('Evento eliminado exitosamente', 'success');
            closeEventModal();
            if (currentPage === 'events') {
                filterEvents();
            }
            updateStatistics();
            loadUpcomingEvents();
        }
    }
}

// User Creation
function createUser(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('userName').value,
        dni: document.getElementById('userDNI').value,
        phone: document.getElementById('userPhone').value,
        birth: document.getElementById('userBirth').value,
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value,
        role: document.getElementById('userRole').value
    };
    
    // Validate form
    const requiredFields = ['name', 'dni', 'phone', 'birth', 'email', 'password', 'role'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
        showToast('Por favor, completa todos los campos requeridos', 'error');
        return;
    }
    
    // Simulate user creation
    showToast('Usuario creado exitosamente', 'success');
    clearForm();
}

function clearForm() {
    document.getElementById('userForm').reset();
}

// Toast System
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = ['profileModal', 'newsModal', 'eventModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals
        document.getElementById('profileModal').style.display = 'none';
        document.getElementById('newsModal').style.display = 'none';
        document.getElementById('eventModal').style.display = 'none';
    }
});