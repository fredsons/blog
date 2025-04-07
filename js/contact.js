/**
* TechInsight Blog - Contact Page JavaScript
* Handles contact form functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
 
    // ===== Contact Form Validation and Submission =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Initialize Bootstrap form validation
        const forms = document.querySelectorAll('.needs-validation');
        
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    
                    // Get form data
                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        phone: document.getElementById('phone').value,
                        subject: document.getElementById('subject').value,
                        message: document.getElementById('message').value,
                        newsletter: document.getElementById('newsletter').checked,
                        privacy: document.getElementById('privacy').checked
                    };
                    
                    // Simulate form submission
                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.innerHTML;
                    
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                    
                    // Simulate API call with timeout
                    setTimeout(() => {
                        console.log('Form submitted:', formData);
                        
                        // Reset form
                        form.reset();
                        form.classList.remove('was-validated');
                        
                        // Reset button
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        
                        // Show success modal
                        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                        successModal.show();
                    }, 1500);
                }
                
                form.classList.add('was-validated');
            }, false);
        });
        
        // Real-time validation for specific fields
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (this.value.trim() !== '' && !validateEmail(this.value)) {
                    this.setCustomValidity('Por favor, insira um endereço de email válido.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
        
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                // Format phone number as user types
                let value = this.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 2) {
                        this.value = `(${value}`;
                    } else if (value.length <= 6) {
                        this.value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                    } else if (value.length <= 10) {
                        this.value = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
                    } else {
                        this.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                    }
                }
                
                // Validate phone format if not empty
                if (this.value.trim() !== '' && !validatePhone(this.value)) {
                    this.setCustomValidity('Por favor, insira um número de telefone válido.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
    }
 
    // ===== Accordion Accessibility Enhancement =====
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ===== Map Interaction Enhancement =====
const mapIframe = document.querySelector('.map-responsive iframe');

if (mapIframe) {
    // Add title for accessibility
    if (!mapIframe.getAttribute('title')) {
        mapIframe.setAttribute('title', 'Mapa da localização do TechInsight');
    }
    
    // Add loading attribute for performance
    if (!mapIframe.getAttribute('loading')) {
        mapIframe.setAttribute('loading', 'lazy');
    }
    
    // Create a cover for the map that gets removed on interaction
    const mapContainer = document.querySelector('.map-responsive');
    const mapCover = document.createElement('div');
    mapCover.className = 'map-cover';
    mapCover.innerHTML = `
        <div class="map-cover-content">
            <i class="fas fa-map-marked-alt"></i>
            <p>Clique para interagir com o mapa</p>
        </div>
    `;
    
    // Style the map cover
    mapCover.style.position = 'absolute';
    mapCover.style.top = '0';
    mapCover.style.left = '0';
    mapCover.style.width = '100%';
    mapCover.style.height = '100%';
    mapCover.style.backgroundColor = 'rgba(18, 18, 18, 0.7)';
    mapCover.style.display = 'flex';
    mapCover.style.alignItems = 'center';
    mapCover.style.justifyContent = 'center';
    mapCover.style.cursor = 'pointer';
    mapCover.style.zIndex = '1';
    mapCover.style.borderRadius = 'var(--border-radius)';
    mapCover.style.transition = 'opacity 0.3s ease';
    
    const mapCoverContent = mapCover.querySelector('.map-cover-content');
    mapCoverContent.style.textAlign = 'center';
    mapCoverContent.style.color = 'white';
    
    const mapIcon = mapCoverContent.querySelector('i');
    mapIcon.style.fontSize = '3rem';
    mapIcon.style.marginBottom = '1rem';
    mapIcon.style.color = 'var(--purple-light)';
    
    // Add the cover to the map container
    mapContainer.appendChild(mapCover);
    
    // Remove cover on click
    mapCover.addEventListener('click', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.remove();
        }, 300);
    });
    
    // Add keyboard accessibility
    mapCover.setAttribute('tabindex', '0');
    mapCover.setAttribute('role', 'button');
    mapCover.setAttribute('aria-label', 'Ativar mapa interativo');
    
    mapCover.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// ===== Form Auto-save =====
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');

// Load saved form data if available
loadFormData();

// Save form data as user types
formInputs.forEach(input => {
    if (input.type !== 'checkbox') {
        input.addEventListener('input', debounce(saveFormData, 500));
    } else {
        input.addEventListener('change', saveFormData);
    }
});

// Clear saved form data when form is submitted
contactForm.addEventListener('submit', function() {
    localStorage.removeItem('contactFormData');
});

// Add a clear form button
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonContainer = submitButton.parentElement;

const clearButton = document.createElement('button');
clearButton.type = 'button';
clearButton.className = 'btn btn-outline-secondary mt-2';
clearButton.innerHTML = '<i class="fas fa-eraser me-2"></i> Limpar Formulário';

buttonContainer.appendChild(clearButton);

clearButton.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja limpar todos os campos do formulário?')) {
        contactForm.reset();
        localStorage.removeItem('contactFormData');
        contactForm.classList.remove('was-validated');
    }
});

// ===== Subject Field Enhancement =====
const subjectSelect = document.getElementById('subject');

if (subjectSelect) {
    // Check if subject is specified in URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    
    if (subjectParam) {
        // Find option that matches the subject parameter
        const options = Array.from(subjectSelect.options);
        const matchingOption = options.find(option => 
            option.value.toLowerCase() === subjectParam.toLowerCase() ||
            option.text.toLowerCase().includes(subjectParam.toLowerCase())
        );
        
        if (matchingOption) {
            matchingOption.selected = true;
        }
    }
    
    // Add "Other" field if "Other" is selected
    subjectSelect.addEventListener('change', function() {
        const otherSubjectContainer = document.getElementById('otherSubjectContainer');
        
        if (this.value === 'other') {
            if (!otherSubjectContainer) {
                const container = document.createElement('div');
                container.id = 'otherSubjectContainer';
                container.className = 'col-12 mt-3';
                
                container.innerHTML = `
                    <div class="form-floating">
                        <input type="text" class="form-control" id="otherSubject" placeholder="Especifique o assunto" required>
                        <label for="otherSubject">Especifique o assunto</label>
                        <div class="invalid-feedback">
                            Por favor, especifique o assunto.
                        </div>
                    </div>
                `;
                
                // Insert after the subject field's parent (col-md-6)
                this.closest('.col-md-6').insertAdjacentElement('afterend', container);
                
                // Add validation and auto-save
                const otherSubjectInput = document.getElementById('otherSubject');
                otherSubjectInput.addEventListener('input', debounce(saveFormData, 500));
                
                // Load saved value if available
                const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
                if (savedData.otherSubject) {
                    otherSubjectInput.value = savedData.otherSubject;
                }
            }
        } else {
            if (otherSubjectContainer) {
                otherSubjectContainer.remove();
            }
        }
    });
    
    // Trigger change event to handle initial state
    subjectSelect.dispatchEvent(new Event('change'));
}

// ===== Helper Functions =====

// Email validation function
function validateEmail(email) {
    const re = /^(([^()\[\]\\.,;:\s@"]+(\.[^()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation function
function validatePhone(phone) {
    // Accept various formats but require at least 10 digits
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Save form data to localStorage
function saveFormData() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Save other subject if it exists
    const otherSubject = document.getElementById('otherSubject');
    if (otherSubject) {
        formData.otherSubject = otherSubject.value;
    }
    
    localStorage.setItem('contactFormData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
    
    if (Object.keys(savedData).length > 0) {
        // Populate form fields
        if (savedData.name) document.getElementById('name').value = savedData.name;
        if (savedData.email) document.getElementById('email').value = savedData.email;
        if (savedData.phone) document.getElementById('phone').value = savedData.phone;
        if (savedData.subject) document.getElementById('subject').value = savedData.subject;
        if (savedData.message) document.getElementById('message').value = savedData.message;
        if (savedData.newsletter !== undefined) document.getElementById('newsletter').checked = savedData.newsletter;
        
        // Show notification that form was restored
        const formContainer = contactForm.closest('.contact-form-container');
        const notification = document.createElement('div');
        notification.className = 'alert alert-info alert-dismissible fade show mt-3';
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <i class="fas fa-info-circle me-2"></i>
            Seus dados do formulário foram restaurados do último preenchimento.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        `;
        
        formContainer.insertAdjacentElement('afterbegin', notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
}

// ===== FAQ Search Functionality =====
const faqSection = document.querySelector('.faq-section');

if (faqSection) {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mb-4';
    searchContainer.innerHTML = `
        <div class="input-group">
            <span class="input-group-text bg-dark border-dark text-light">
                <i class="fas fa-search"></i>
            </span>
            <input type="text" class="form-control bg-dark border-dark text-light" 
                   id="faqSearch" placeholder="Buscar nas perguntas frequentes...">
        </div>
    `;
    
    // Insert search before accordion
    const accordion = faqSection.querySelector('.accordion');
    accordion.parentNode.insertBefore(searchContainer, accordion);
    
    // Add search functionality
    const searchInput = document.getElementById('faqSearch');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-header').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show message if no results
        let noResultsMessage = document.getElementById('noFaqResults');
        const hasVisibleItems = Array.from(accordionItems).some(item => item.style.display !== 'none');
        
        if (!hasVisibleItems && searchTerm !== '') {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.id = 'noFaqResults';
                noResultsMessage.className = 'alert alert-info mt-3';
                noResultsMessage.innerHTML = 'Nenhuma pergunta encontrada com esses termos. <a href="#contactForm" class="alert-link">Entre em contato</a> para tirar sua dúvida.';
                accordion.insertAdjacentElement('afterend', noResultsMessage);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    });
}

// ===== Success Modal Enhancement =====
const successModal = document.getElementById('successModal');

if (successModal) {
    successModal.addEventListener('shown.bs.modal', function() {
        // Focus on close button when modal is shown
        const closeButton = this.querySelector('.btn-purple');
        if (closeButton) {
            closeButton.focus();
        }
    });
    
    // Add keyboard navigation
    successModal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modalInstance = bootstrap.Modal.getInstance(successModal);
            modalInstance.hide();
        }
    });
}

// ===== Form Accessibility Enhancements =====
// Add aria-required to required fields
const requiredFields = document.querySelectorAll('[required]');
requiredFields.forEach(field => {
    field.setAttribute('aria-required', 'true');
});

// Add aria-describedby for fields with feedback
const fieldsWithFeedback = document.querySelectorAll('.form-control, .form-select');
fieldsWithFeedback.forEach(field => {
    const feedbackId = `${field.id}-feedback`;
    const feedback = field.nextElementSibling;
    
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.id = feedbackId;
        field.setAttribute('aria-describedby', feedbackId);
    }
});
});