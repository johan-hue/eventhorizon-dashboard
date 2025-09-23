// UI Components and Rendering Functions

// Modal Management
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.initializeModals();
    }

    initializeModals() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Close modals with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });

        // Initialize close buttons
        $$('.modal-close').forEach(button => {
            on(button, 'click', () => this.closeModal());
        });
    }

    openModal(modalId) {
        const modal = $(modalId);
        if (modal) {
            this.activeModal = modal;
            addClass(modal, 'active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.activeModal) {
            removeClass(this.activeModal, 'active');
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }
}

// News Components
class NewsRenderer {
    static renderNewsItem(news, isCompact = false) {
        const statusColor = getStatusColor(news.status);
        const statusText = getStatusText(news.status);
        
        if (isCompact) {
            return `
                <div class="news-item" data-id="${news.id}">
                    <div class="news-item-header">
                        <h4 class="news-item-title">${news.title}</h4>
                        <span class="badge ${statusColor}">${statusText}</span>
                    </div>
                    <p class="news-item-description">${truncate(news.description, 120)}</p>
                    <div class="news-item-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${news.date}</span>
                        </div>
                        <div class="meta-item">
                            <span>Por: ${news.author}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="item-card" data-id="${news.id}">
                <div class="item-header">
                    <div class="item-title">
                        <span>${news.title}</span>
                        <span class="badge ${statusColor}">${statusText}</span>
                    </div>
                </div>
                <div class="item-body">
                    <p class="item-description">${truncate(news.description, 150)}</p>
                    <div class="item-details">
                        <div class="item-detail">
                            <i class="fas fa-clock"></i>
                            <span>${formatDateTime(news.date, news.time)}</span>
                        </div>
                        <div class="item-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${news.location}</span>
                        </div>
                        <div class="item-detail">
                            <i class="fas fa-user"></i>
                            <span>Reportado por: ${news.author}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderNewsModal(news) {
        const statusColor = getStatusColor(news.status);
        const statusText = getStatusText(news.status);
        
        return `
            <div class="modal-info-grid">
                <div class="modal-info-item">
                    <i class="fas fa-calendar"></i>
                    <div class="info-content">
                        <div class="info-label">Fecha</div>
                        <div class="info-value">${news.date}</div>
                    </div>
                </div>
                <div class="modal-info-item">
                    <i class="fas fa-clock"></i>
                    <div class="info-content">
                        <div class="info-label">Hora</div>
                        <div class="info-value">${news.time}</div>
                    </div>
                </div>
                <div class="modal-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="info-content">
                        <div class="info-label">Ubicación</div>
                        <div class="info-value">${news.location}</div>
                    </div>
                </div>
                <div class="modal-info-item">
                    <i class="fas fa-user"></i>
                    <div class="info-content">
                        <div class="info-label">Reportado por</div>
                        <div class="info-value">${news.author}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-description">
                <h4>Descripción:</h4>
                <p>${news.description}</p>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-outline" onclick="newsManager.downloadNews('${news.id}')">
                    <i class="fas fa-download"></i>
                    Descargar
                </button>
                <button class="btn btn-primary" onclick="newsManager.showStatusUpdate('${news.id}')">
                    <i class="fas fa-edit"></i>
                    Actualizar Estado
                </button>
                <button class="btn btn-danger" onclick="newsManager.deleteNews('${news.id}')">
                    <i class="fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        `;
    }
}

// Event Components
class EventRenderer {
    static renderEventItem(event, isCompact = false) {
        const participationPercentage = calculatePercentage(event.participants, event.maxParticipants);
        
        if (isCompact) {
            return `
                <div class="event-item" data-id="${event.id}">
                    <div class="event-item-header">
                        <h4 class="event-item-title">${event.title}</h4>
                        <span class="badge success">ACTIVO</span>
                    </div>
                    <div class="event-item-meta">
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${formatDateTime(event.date, event.time)}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>Participantes: ${event.participants}/${event.maxParticipants}</span>
                        </div>
                        <div class="meta-item">
                            <span>Organizador: ${event.organizer}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="item-card" data-id="${event.id}">
                <div class="item-header">
                    <div class="item-title">
                        <span>${event.title}</span>
                        <span class="badge success">ACTIVO</span>
                    </div>
                </div>
                <div class="item-body">
                    <p class="item-description">${truncate(event.description, 150)}</p>
                    <div class="item-details">
                        <div class="item-detail">
                            <i class="fas fa-calendar"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="item-detail">
                            <i class="fas fa-clock"></i>
                            <span>${event.time}</span>
                        </div>
                        <div class="item-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                        <div class="item-detail">
                            <i class="fas fa-user"></i>
                            <span>${event.organizer}</span>
                        </div>
                    </div>
                    <div class="event-participation">
                        <div class="participation-header">
                            <span><i class="fas fa-users"></i> ${event.participants}/${event.maxParticipants}</span>
                            <span>${participationPercentage}%</span>
                        </div>
                        <div class="participation-bar">
                            <div class="participation-fill" style="width: ${participationPercentage}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderEventModal(event) {
        const participationPercentage = calculatePercentage(event.participants, event.maxParticipants);
        
        return `
            <div class="modal-info-grid">
                <div class="modal-info-item">
                    <i class="fas fa-calendar"></i>
                    <div class="info-content">
                        <div class="info-label">Fecha</div>
                        <div class="info-value">${event.date}</div>
                    </div>
                </div>
                <div class="modal-info-item">
                    <i class="fas fa-clock"></i>
                    <div class="info-content">
                        <div class="info-label">Hora</div>
                        <div class="info-value">${event.time}</div>
                    </div>
                </div>
                <div class="modal-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="info-content">
                        <div class="info-label">Ubicación</div>
                        <div class="info-value">${event.location}</div>
                    </div>
                </div>
                <div class="modal-info-item">
                    <i class="fas fa-user"></i>
                    <div class="info-content">
                        <div class="info-label">Organizador</div>
                        <div class="info-value">${event.organizer}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-info-item">
                <i class="fas fa-users"></i>
                <div class="info-content">
                    <div class="info-label">Nivel de participación</div>
                    <div class="participation-bar" style="margin-top: 8px;">
                        <div class="participation-fill" style="width: ${participationPercentage}%"></div>
                    </div>
                    <div class="info-value">${participationPercentage}% de capacidad (${event.participants}/${event.maxParticipants})</div>
                </div>
            </div>
            
            <div class="modal-description">
                <h4>Descripción:</h4>
                <p>${event.description}</p>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-outline" onclick="eventManager.downloadEvent('${event.id}')">
                    <i class="fas fa-download"></i>
                    Descargar
                </button>
                <button class="btn btn-danger" onclick="eventManager.deleteEvent('${event.id}')">
                    <i class="fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        `;
    }
}

// Stats Components
class StatsRenderer {
    static renderStatsCards(stats, type = 'news') {
        if (type === 'news') {
            $('#totalNews').textContent = stats.total;
            $('#pendingNews').textContent = stats.pending;
            $('#inProgressNews').textContent = stats.inProgress;
            $('#totalEvents').textContent = dataManager.getAllEvents().length;
            
            // Update news page stats
            const newsTotal = $('#newsTotal');
            const newsPending = $('#newsPending');
            const newsInProgress = $('#newsInProgress');
            const newsResolved = $('#newsResolved');
            
            if (newsTotal) newsTotal.textContent = stats.total;
            if (newsPending) newsPending.textContent = stats.pending;
            if (newsInProgress) newsInProgress.textContent = stats.inProgress;
            if (newsResolved) newsResolved.textContent = stats.resolved;
        } else if (type === 'events') {
            const eventsTotal = $('#eventsTotal');
            const eventsParticipants = $('#eventsParticipants');
            const eventsAvgParticipation = $('#eventsAvgParticipation');
            const eventsNeedPromotion = $('#eventsNeedPromotion');
            
            if (eventsTotal) eventsTotal.textContent = stats.total;
            if (eventsParticipants) eventsParticipants.textContent = stats.totalParticipants;
            if (eventsAvgParticipation) eventsAvgParticipation.textContent = `${stats.avgParticipation}%`;
            if (eventsNeedPromotion) eventsNeedPromotion.textContent = stats.needPromotion;
        }
    }
}

// Empty State Component
class EmptyStateRenderer {
    static render(container, type, message) {
        const icons = {
            news: 'fas fa-newspaper',
            events: 'fas fa-calendar',
            search: 'fas fa-search'
        };
        
        const titles = {
            news: 'No hay noticias',
            events: 'No hay eventos',
            search: 'Sin resultados'
        };
        
        const icon = icons[type] || 'fas fa-info-circle';
        const title = titles[type] || 'Sin contenido';
        
        container.innerHTML = `
            <div class="empty-state">
                <i class="${icon}"></i>
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize modal manager
const modalManager = new ModalManager();