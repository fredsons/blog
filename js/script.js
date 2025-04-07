/**
* TechInsight Blog - Main JavaScript
* Handles interactive elements and functionality
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
 
    // ===== Back to Top Button =====
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
 
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
 
    // ===== Cookie Consent =====
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieSettings = document.getElementById('cookieSettings');
    
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (cookieConsent && !cookiesAccepted) {
        // Show cookie consent after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1500);
        
        // Handle cookie accept button
        if (cookieAccept) {
            cookieAccept.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieConsent.classList.remove('show');
                
                // Here you would typically initialize analytics and other cookie-dependent services
                console.log('Cookies accepted');
            });
        }
        
        // Handle cookie settings button
        if (cookieSettings) {
            cookieSettings.addEventListener('click', function() {
                // Redirect to cookie settings page or open modal
                // For now, we'll just simulate accepting only necessary cookies
                localStorage.setItem('cookiesAccepted', 'necessary');
                cookieConsent.classList.remove('show');
                console.log('Only necessary cookies accepted');
            });
        }
    }
 
    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processando...';
                
                // Simulate API call
                setTimeout(() => {
                    // Reset form
                    emailInput.value = '';
                    
                    // Show success message
                    const formContainer = this.closest('.newsletter-section');
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.setAttribute('role', 'alert');
                    successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Inscrição realizada com sucesso! Obrigado por se inscrever.';
                    
                    this.insertAdjacentElement('afterend', successMessage);
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            } else {
                // Show error for invalid email
                if (!emailInput.classList.contains('is-invalid')) {
                    emailInput.classList.add('is-invalid');
                    
                    const errorFeedback = document.createElement('div');
                    errorFeedback.className = 'invalid-feedback';
                    errorFeedback.textContent = 'Por favor, insira um endereço de email válido.';
                    
                    emailInput.insertAdjacentElement('afterend', errorFeedback);
                }
            }
        });
        
        // Remove invalid state on input change
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                    const errorFeedback = this.nextElementSibling;
                    if (errorFeedback && errorFeedback.classList.contains('invalid-feedback')) {
                        errorFeedback.remove();
                    }
                }
            });
        }
    }
 
    // ===== Search Form =====
    const searchForm = document.querySelector('form[role="search"]');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm.length > 0) {
                // In a real application, redirect to search results page
                // For demo, we'll just log the search term
                console.log('Search term:', searchTerm);
                
                // Simulate redirect
                const searchUrl = `search.html?q=${encodeURIComponent(searchTerm)}`;
                alert(`Em um site real, você seria redirecionado para: ${searchUrl}`);
                
                // Reset form
                searchInput.value = '';
            }
        });
    }
 
    // ===== Modal Functionality =====
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    // Handle form submission in modals
    if (loginModal) {
        const loginForm = loginModal.querySelector('form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const rememberMe = document.getElementById('rememberMe').checked;
                
                // Validate form (simple validation)
                if (email && password) {
                                 // Simulate login API call
                console.log('Login attempt:', { email, rememberMe });
                alert('Em um site real, você seria autenticado e redirecionado para a página inicial.');
                
                // Close modal
                const modalInstance = bootstrap.Modal.getInstance(loginModal);
                modalInstance.hide();
            }
        });
    }
}

if (signupModal) {
    const signupForm = signupModal.querySelector('form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // Validate form
            if (firstName && lastName && email && password) {
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem. Por favor, tente novamente.');
                    return;
                }
                
                if (!agreeTerms) {
                    alert('Você precisa concordar com os Termos de Uso e Política de Privacidade.');
                    return;
                }
                
                // Simulate signup API call
                console.log('Signup attempt:', { firstName, lastName, email });
                alert('Em um site real, sua conta seria criada e você receberia um email de confirmação.');
                
                // Close modal
                const modalInstance = bootstrap.Modal.getInstance(signupModal);
                modalInstance.hide();
            }
        });
    }
}

// ===== Dropdown Accessibility Enhancement =====
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        // Add keyboard navigation for dropdown items
        dropdownToggle.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                // Show dropdown
                const dropdownInstance = new bootstrap.Dropdown(dropdownToggle);
                dropdownInstance.show();
                
                // Focus first item
                const firstItem = dropdownMenu.querySelector('.dropdown-item');
                if (firstItem) {
                    firstItem.focus();
                }
            }
        });
        
        // Add keyboard navigation within dropdown menu
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (index < dropdownItems.length - 1) {
                        dropdownItems[index + 1].focus();
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index > 0) {
                        dropdownItems[index - 1].focus();
                    } else {
                        dropdownToggle.focus();
                    }
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    dropdownToggle.focus();
                    
                    // Hide dropdown
                    const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                }
            });
        });
    }
});

// ===== Image Loading Enhancement =====
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Browser supports native lazy loading');
} else {
    // Fallback for browsers that don't support lazy loading
    lazyImages.forEach(img => {
        // Implement a simple lazy loading with Intersection Observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.setAttribute('src', src);
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        observer.observe(img);
    });
}

// ===== Theme Toggle (if implemented) =====
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        // Toggle between light and dark theme
        document.body.classList.toggle('light-theme');
        
        // Save preference to localStorage
        const isDarkTheme = !document.body.classList.contains('light-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
        
        // Update toggle button text/icon
        updateThemeToggle(isDarkTheme);
    });
    
    // Check user preference on load
    const prefersDarkTheme = localStorage.getItem('darkTheme') !== 'false';
    if (!prefersDarkTheme) {
        document.body.classList.add('light-theme');
    }
    
    // Update toggle button based on current theme
    updateThemeToggle(!document.body.classList.contains('light-theme'));
}

// ===== Helper Functions =====

// Email validation function
function validateEmail(email) {
    const re = /^(([^()\[\]\\.,;:\s@"]+(\.[^()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Update theme toggle button
function updateThemeToggle(isDarkTheme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        if (isDarkTheme) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Mudar para tema claro');
            themeToggle.setAttribute('title', 'Mudar para tema claro');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Mudar para tema escuro');
            themeToggle.setAttribute('title', 'Mudar para tema escuro');
        }
    }
}

// ===== Initialize Bootstrap Tooltips and Popovers =====
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

// ===== Handle External Links =====
const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

externalLinks.forEach(link => {
    // Add external link indicator
    if (!link.querySelector('.fa-external-link-alt')) {
        const icon = document.createElement('i');
        icon.className = 'fas fa-external-link-alt ms-1';
        icon.style.fontSize = '0.75em';
        link.appendChild(icon);
    }
    
    // Add proper attributes for security and accessibility
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    
    if (!link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', `${link.textContent} (abre em uma nova aba)`);
    }
});

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without reload
            history.pushState(null, null, targetId);
            
            // Set focus to the target element
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            targetElement.removeAttribute('tabindex');
        }
    });
});

// ===== Responsive Video Embeds =====
const videoEmbeds = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]');

videoEmbeds.forEach(embed => {
    if (!embed.parentElement.classList.contains('ratio')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'ratio ratio-16x9';
        embed.parentNode.insertBefore(wrapper, embed);
        wrapper.appendChild(embed);
    }
});

// ===== Reading Time Calculation =====
const articles = document.querySelectorAll('article.blog-post');

articles.forEach(article => {
    const text = article.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed
    
    const readingTimeElement = article.querySelector('.reading-time');
    if (readingTimeElement) {
        readingTimeElement.textContent = `${readingTime} min de leitura`;
    }
});

// ===== Table of Contents Generation =====
const tocContainer = document.querySelector('.table-of-contents');
const articleContent = document.querySelector('.blog-post-content');

if (tocContainer && articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3');
    
    if (headings.length > 0) {
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        headings.forEach((heading, index) => {
            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
            
            const listItem = document.createElement('li');
            listItem.className = heading.tagName === 'H3' ? 'toc-subitem' : '';
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        tocContainer.appendChild(tocList);
    } else {
        tocContainer.style.display = 'none';
    }
}

// ===== Comment Form Handling =====
const commentForm = document.querySelector('.comment-form');

if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('#commentName');
        const emailInput = this.querySelector('#commentEmail');
        const contentInput = this.querySelector('#commentContent');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const content = contentInput.value.trim();
        
        if (name && validateEmail(email) && content) {
            // Simulate comment submission
            console.log('Comment submitted:', { name, email, content });
            
            // Create a new comment element
            const commentsList = document.querySelector('.comments-list');
            
            if (commentsList) {
                const newComment = document.createElement('div');
                newComment.className = 'comment mb-4';
                
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                newComment.innerHTML = `
                    <div class="comment-header d-flex align-items-center mb-2">
                        <div class="avatar me-2">
                            <div class="avatar-placeholder">${name.charAt(0).toUpperCase()}</div>
                        </div>
                        <div>
                            <h5 class="mb-0">${name}</h5>
                            <small class="text-muted">${formattedDate}</small>
                        </div>
                    </div>
                    <div class="comment-body">
                        <p>${content}</p>
                    </div>
                `;
                
                // Add the new comment at the top
                commentsList.insertBefore(newComment, commentsList.firstChild);
                
                // Reset form
                commentForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.setAttribute('role', 'alert');
                successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Seu comentário foi publicado com sucesso!';
                
                commentForm.insertAdjacentElement('afterend', successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        } else {
            // Show validation errors
            if (!name) {
                nameInput.classList.add('is-invalid');
            }
            
            if (!validateEmail(email)) {
                emailInput.classList.add('is-invalid');
            }
            
            if (!content) {
                contentInput.classList.add('is-invalid');
            }
        }
    });
    
    // Remove invalid state on input change
    const formInputs = commentForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    });
}

// ===== Share Buttons Functionality =====
const shareButtons = document.querySelectorAll('.share-button');

shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const platform = this.getAttribute('data-platform');
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        let shareUrl;
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${title}&body=${url}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});

// ===== Print Article Functionality =====
const printButton = document.querySelector('.print-button');

if (printButton) {
    printButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.print();
    });
}

// ===== Dark/Light Mode Based on System Preference =====
if (!localStorage.getItem('darkTheme')) {
    // If user hasn't manually set a preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!prefersDarkMode) {
        document.body.classList.add('light-theme');
    }
    
    // Listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('darkTheme')) {
            if (e.matches) {
                document.body.classList.remove('light-theme');
            } else {
                document.body.classList.add('light-theme');
            }
        }
    });
}

// ===== Initialize AOS (Animate On Scroll) if available =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile'
    });
}
});