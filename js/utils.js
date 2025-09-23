// Utility Functions

// DOM Utilities
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Show/Hide elements
const show = (element) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.remove('hidden');
};

const hide = (element) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.add('hidden');
};

const toggle = (element) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.toggle('hidden');
};

// Add/Remove classes
const addClass = (element, className) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.add(className);
};

const removeClass = (element, className) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.classList.remove(className);
};

const hasClass = (element, className) => {
    if (typeof element === 'string') element = $(element);
    return element ? element.classList.contains(className) : false;
};

// Event utilities
const on = (element, event, handler) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.addEventListener(event, handler);
};

const off = (element, event, handler) => {
    if (typeof element === 'string') element = $(element);
    if (element) element.removeEventListener(event, handler);
};

// Animation utilities
const fadeIn = (element, duration = 300) => {
    if (typeof element === 'string') element = $(element);
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
};

const fadeOut = (element, duration = 300) => {
    if (typeof element === 'string') element = $(element);
    if (!element) return;
    
    const start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = initialOpacity * (1 - progress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    };
    
    requestAnimationFrame(animate);
};

// String utilities
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const truncate = (str, length = 100) => {
    return str.length > length ? str.substring(0, length) + '...' : str;
};

// Date utilities
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
};

const formatDateTime = (dateString, timeString) => {
    return `${dateString} - ${timeString}`;
};

// Status utilities
const getStatusColor = (status) => {
    switch (status) {
        case 'pendiente': return 'warning';
        case 'en-proceso': return 'primary';
        case 'resuelto': return 'success';
        default: return 'muted';
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 'pendiente': return 'PENDIENTE';
        case 'en-proceso': return 'EN PROCESO';
        case 'resuelto': return 'RESUELTO';
        default: return status.toUpperCase();
    }
};

// Form utilities
const clearForm = (formElement) => {
    if (typeof formElement === 'string') formElement = $(formElement);
    if (formElement) {
        const inputs = formElement.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }
};

const validateForm = (formElement) => {
    if (typeof formElement === 'string') formElement = $(formElement);
    if (!formElement) return false;
    
    const requiredInputs = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            addClass(input, 'error');
        } else {
            removeClass(input, 'error');
        }
    });
    
    return isValid;
};

// Toast notification utility
const showToast = (message, type = 'success', duration = 3000) => {
    const toast = $('#toast');
    const toastMessage = $('#toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Set icon based on type
        const icon = toast.querySelector('i');
        if (icon) {
            icon.className = type === 'success' ? 'fas fa-check-circle' : 
                           type === 'error' ? 'fas fa-exclamation-circle' : 
                           'fas fa-info-circle';
        }
        
        // Set color based on type
        toast.className = `toast ${type}`;
        
        addClass(toast, 'show');
        
        setTimeout(() => {
            removeClass(toast, 'show');
        }, duration);
    }
};

// Local storage utilities
const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
};

const loadFromStorage = (key, defaultValue = null) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
};

// Debounce utility
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Download utility
const downloadFile = (content, filename, contentType = 'text/plain') => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Number utilities
const formatNumber = (num) => {
    return new Intl.NumberFormat('es-ES').format(num);
};

const calculatePercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
};