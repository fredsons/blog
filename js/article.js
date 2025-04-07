/**
 * TechInsight Blog - Article JavaScript
 * Handles article-specific functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ===== Reading Progress Bar =====
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = 'var(--purple-primary)';
    progressBar.style.zIndex = '1031';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const article = document.querySelector('.blog-post-content');
        if (article) {
            const windowHeight = window.innerHeight;
            const fullHeight = article.offsetTop + article.offsetHeight - windowHeight;
            const scrolled = window.scrollY - article.offsetTop + windowHeight / 2;

            const percentScrolled = Math.min(100, Math.max(0, (scrolled / fullHeight) * 100));
            progressBar.style.width = percentScrolled + '%';
        }
    });

    // ===== Estimated Reading Time =====
    const articleContent = document.querySelector('.blog-post-content');
    const readingTimeElement = document.querySelector('.reading-time');

    if (articleContent && readingTimeElement) {
        // Count words in the article
        const text = articleContent.textContent || articleContent.innerText;
        const wordCount = text.split(/\s+/).length;

        // Calculate reading time (assuming 200 words per minute)
        const readingTime = Math.ceil(wordCount / 200);
        readingTimeElement.textContent = `${readingTime} min de leitura`;
    }

    // ===== Table of Contents Generation =====
    const tocContainer = document.querySelector('.table-of-contents .card-body');

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
            const tableOfContents = document.querySelector('.table-of-contents');
            if (tableOfContents) {
                tableOfContents.style.display = 'none';
            }
        }
    }

    // ===== Smooth Scrolling for ToC Links =====
    const tocLinksList = document.querySelectorAll('.toc-list a');

    tocLinksList.forEach(link => {
        link.addEventListener('click', function (e) {
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
            }
        });
    });

    // ===== Share Buttons Functionality =====
    const shareButtons = document.querySelectorAll('.share-button');

    shareButtons.forEach(button => {
        button.addEventListener('click', function (e) {
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
        printButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.print();
        });
    }

    // ===== Comment Reply Functionality =====
    const replyButtons = document.querySelectorAll('.reply-button');

    replyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const commentAuthor = this.closest('.comment').querySelector('.h6').textContent;
            const commentForm = document.querySelector('.comment-form');
            const commentTextarea = commentForm.querySelector('#commentContent');

            // Scroll to comment form
            commentForm.scrollIntoView({ behavior: 'smooth' });

            // Focus textarea and add reply prefix
            commentTextarea.focus();
            commentTextarea.value = `@${commentAuthor.trim()} `;
        });
    });

    // ===== Like Button Functionality =====
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const likeCount = this.querySelector('span');
            let currentLikes = parseInt(likeCount.textContent);

            // Check if already liked (for demo purposes using a class)
            if (!this.classList.contains('liked')) {
                currentLikes++;
                likeCount.textContent = currentLikes;
                this.classList.add('liked');
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
            } else {
                currentLikes--;
                likeCount.textContent = currentLikes;
                this.classList.remove('liked');
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
            }
        });
    });

    // ===== Highlight Current Section in ToC =====
    const articleSections = document.querySelectorAll('.blog-post-content h2, .blog-post-content h3');

    if (articleSections.length > 0) {
        window.addEventListener('scroll', function () {
            // Get current scroll position
            const scrollPosition = window.scrollY;

            // Get header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;

            // Find the current section
            let currentSection = articleSections[0].id;

            articleSections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight - 50;

                if (scrollPosition >= sectionTop) {
                    currentSection = section.id;
                }
            });

            // Highlight the current section in ToC
            document.querySelectorAll('.toc-list a').forEach(link => {
                link.classList.remove('active');

                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===== Code Block Copy Button =====
    const codeBlocks = document.querySelectorAll('.code-block pre');

    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.setAttribute('aria-label', 'Copiar código');
        copyButton.setAttribute('title', 'Copiar código');

        // Style the button
        copyButton.style.position = 'absolute';
        copyButton.style.top = '0.5rem';
        copyButton.style.right = '0.5rem';
        copyButton.style.padding = '0.25rem 0.5rem';
        copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '0.25rem';
        copyButton.style.color = 'var(--gray-300)';
        copyButton.style.cursor = 'pointer';

        // Add relative positioning to code block container
        block.parentNode.style.position = 'relative';

        // Add button to code block
        block.parentNode.appendChild(copyButton);

        // Add click event
        copyButton.addEventListener('click', function () {
            const code = block.textContent;

            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Change button text temporarily
                copyButton.innerHTML = '<i class="fas fa-check"></i>';

                // Reset button after 2 seconds
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                copyButton.innerHTML = '<i class="fas fa-times"></i>';

                setTimeout(() => {
                    copyButton.innerHTML = '<i class="far fa-copy"></i>';
                }, 2000);
            });
        });
    });

    // ===== Image Lightbox =====
    const articleImages = document.querySelectorAll('.article-image img, .article-featured-image img');

    articleImages.forEach(image => {
        // Make images clickable
        image.style.cursor = 'zoom-in';

        // Add click event
        image.addEventListener('click', function () {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1050';
            lightbox.style.padding = '2rem';

            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '90vh';
            lightboxImg.style.objectFit = 'contain';
            lightboxImg.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';

            const closeButton = document.createElement('button');
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '1rem';
            closeButton.style.right = '1rem';
            closeButton.style.background = 'transparent';
            closeButton.style.border = 'none';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '2rem';
            closeButton.style.cursor = 'pointer';
            closeButton.setAttribute('aria-label', 'Fechar imagem');

            // Add caption if available
            const figcaption = this.closest('figure') ? this.closest('figure').querySelector('figcaption') : null;
            if (figcaption) {
                const lightboxCaption = document.createElement('div');
                lightboxCaption.textContent = figcaption.textContent;
                lightboxCaption.style.position = 'absolute';
                lightboxCaption.style.bottom = '1rem';
                lightboxCaption.style.left = '0';
                lightboxCaption.style.width = '100%';
                lightboxCaption.style.textAlign = 'center';
                lightboxCaption.style.color = 'white';
                lightboxCaption.style.padding = '0.5rem';
                lightboxCaption.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

                lightbox.appendChild(lightboxCaption);
            }

            // Add elements to lightbox
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeButton);
            document.body.appendChild(lightbox);

            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';

            // Close lightbox on click
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox || e.target === closeButton) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            });

            // Close on escape key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    });

    // ===== Comment Form Validation =====
    const commentForm = document.querySelector('.comment-form');

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = this.querySelector('#commentName');
            const emailInput = this.querySelector('#commentEmail');
            const contentInput = this.querySelector('#commentContent');
            const saveInfoCheckbox = this.querySelector('#saveCommentInfo');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const content = contentInput.value.trim();
            const saveInfo = saveInfoCheckbox.checked;

            // Validate inputs
            let isValid = true;

            if (!name) {
                markInvalid(nameInput, 'Por favor, informe seu nome.');
                isValid = false;
            } else {
                markValid(nameInput);
            }

            if (!email || !validateEmail(email)) {
                markInvalid(emailInput, 'Por favor, informe um email válido.');
                isValid = false;
            } else {
                markValid(emailInput);
            }

            if (!content) {
                markInvalid(contentInput, 'Por favor, escreva seu comentário.');
                isValid = false;
            } else {
                markValid(contentInput);
            }

            if (isValid) {
                // Save user info if checkbox is checked
                if (saveInfo) {
                    localStorage.setItem('commentName', name);
                    localStorage.setItem('commentEmail', email);
                } else {
                    localStorage.removeItem('commentName');
                    localStorage.removeItem('commentEmail');
                }

                // Simulate comment submission
                const commentsList = document.querySelector('.comments-list');

                if (commentsList) {
                    // Create new comment element
                    const newComment = document.createElement('div');
                    newComment.className = 'comment mb-4';

                    const currentDate = new Date();
                    const formattedDate = currentDate.toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    newComment.innerHTML = `
                        <div class="comment-header d-flex align-items-center mb-2">
                            <div class="avatar me-2">
                                <div class="avatar-placeholder">${name.charAt(0).toUpperCase()}</div>
                            </div>
                            <div>
                                <h4 class="mb-0 h6">${name}</h4>
                                <small class="text-muted">${formattedDate}</small>
                            </div>
                        </div>
                        <div class="comment-body">
                            <p>${content.replace(/\n/g, '<br>')}</p>
                            <div class="comment-actions">
                                <button class="btn btn-sm btn-link reply-button">Responder</button>
                                <button class="btn btn-sm btn-link like-button">
                                    <i class="far fa-thumbs-up"></i> <span>0</span>
                                </button>
                            </div>
                        </div>
                    `;

                    // Add the new comment at the top
                    commentsList.insertBefore(newComment, commentsList.firstChild);

                    // Reset form
                    if (!saveInfo) {
                        nameInput.value = '';
                        emailInput.value = '';
                    }
                    contentInput.value = '';

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

                    // Add event listeners to new comment buttons
                    const newReplyButton = newComment.querySelector('.reply-button');
                    const newLikeButton = newComment.querySelector('.like-button');

                    if (newReplyButton) {
                        newReplyButton.addEventListener('click', function () {
                            const commentAuthor = this.closest('.comment').querySelector('.h6').textContent;
                            const commentTextarea = commentForm.querySelector('#commentContent');

                            // Scroll to comment form
                            commentForm.scrollIntoView({ behavior: 'smooth' });

                            // Focus textarea and add reply prefix
                            commentTextarea.focus();
                            commentTextarea.value = `@${commentAuthor.trim()} `;
                        });
                    }

                    if (newLikeButton) {
                        newLikeButton.addEventListener('click', function () {
                            const likeCount = this.querySelector('span');
                            let currentLikes = parseInt(likeCount.textContent);

                            if (!this.classList.contains('liked')) {
                                currentLikes++;
                                likeCount.textContent = currentLikes;
                                this.classList.add('liked');
                                this.querySelector('i').classList.remove('far');
                                this.querySelector('i').classList.add('fas');
                            } else {
                                currentLikes--;
                                likeCount.textContent = currentLikes;
                                this.classList.remove('liked');
                                this.querySelector('i').classList.remove('fas');
                                this.querySelector('i').classList.add('far');
                            }
                        });
                    }
                }
            }
        });

        // Load saved comment info if available
        const savedName = localStorage.getItem('commentName');
        const savedEmail = localStorage.getItem('commentEmail');
        const nameInput = commentForm.querySelector('#commentName');
        const emailInput = commentForm.querySelector('#commentEmail');
        const saveInfoCheckbox = commentForm.querySelector('#saveCommentInfo');

        if (savedName && savedEmail) {
            nameInput.value = savedName;
            emailInput.value = savedEmail;
            saveInfoCheckbox.checked = true;
        }

        // Helper functions for form validation
        function markInvalid(input, message) {
            input.classList.add('is-invalid');

            // Remove existing error message if any
            const existingFeedback = input.nextElementSibling;
            if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
                existingFeedback.remove();
            }

            // Add error message
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            feedback.textContent = message;
            input.insertAdjacentElement('afterend', feedback);
        }

        function markValid(input) {
            input.classList.remove('is-invalid');

            // Remove existing error message if any
            const existingFeedback = input.nextElementSibling;
            if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
                existingFeedback.remove();
            }
        }

        // Clear validation errors on input
        const formInputs = commentForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('is-invalid');

                const existingFeedback = this.nextElementSibling;
                if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
                    existingFeedback.remove();
                }
            });
        });
    }

    // ===== Sidebar Newsletter Form =====
    const sidebarNewsletterForm = document.querySelector('.sidebar-newsletter-form');

    if (sidebarNewsletterForm) {
        sidebarNewsletterForm.addEventListener('submit', function (e) {
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
                    const formContainer = this.closest('.card-body');
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success mt-3';
                    successMessage.setAttribute('role', 'alert');
                    successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Inscrição realizada com sucesso!';

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
                emailInput.classList.add('is-invalid');

                // Remove existing error message if any
                const existingFeedback = emailInput.nextElementSibling;
                if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
                    existingFeedback.remove();
                }

                // Add error message
                const feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = 'Por favor, informe um email válido.';
                emailInput.insertAdjacentElement('afterend', feedback);
            }
        });

        // Clear validation errors on input
        const emailInput = sidebarNewsletterForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function () {
                this.classList.remove('is-invalid');

                const existingFeedback = this.nextElementSibling;
                if (existingFeedback && existingFeedback.classList.contains('invalid-feedback')) {
                    existingFeedback.remove();
                }
            });
        }
    }

    // ===== Helper Functions =====

    // Email validation function
    function validateEmail(email) {
        const re = /^(([^()\[\]\\.,;:\s@"]+(\.[^()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // ===== Add Active Class to Current ToC Item =====
    const tocLinks = document.querySelectorAll('.toc-list a');

    // Add CSS for active ToC item if not already in stylesheet
    const style = document.createElement('style');
    style.textContent = `
        .toc-list a.active {
            color: var(--purple-light);
            font-weight: 500;
            position: relative;
        }
        .toc-list a.active::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 70%;
            background-color: var(--purple-primary);
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);

    // ===== Related Articles Hover Effect =====
    const relatedArticles = document.querySelectorAll('.related-articles .blog-card');

    relatedArticles.forEach(article => {
        article.addEventListener('mouseenter', function () {
            this.querySelector('.card-title a').style.color = 'var(--purple-light)';
        });

        article.addEventListener('mouseleave', function () {
            this.querySelector('.card-title a').style.color = '';
        });
    });

    // ===== Highlight Code Syntax =====
    // This is handled by Prism.js which is included in the HTML

    // ===== Sticky Sidebar on Scroll =====
    const sidebar = document.querySelector('.blog-sidebar');
    const article = document.querySelector('.blog-post');

    if (sidebar && article && window.innerWidth >= 992) {
        const sidebarTop = sidebar.getBoundingClientRect().top + window.pageYOffset;
        const headerHeight = document.querySelector('header').offsetHeight + 20;

        window.addEventListener('scroll', function () {
            const articleBottom = article.getBoundingClientRect().bottom + window.pageYOffset;
            const sidebarHeight = sidebar.offsetHeight;
            const scrollY = window.pageYOffset;

            if (scrollY > sidebarTop - headerHeight) {
                if (scrollY + headerHeight + sidebarHeight < articleBottom) {
                    // Sticky sidebar
                    sidebar.style.position = 'fixed';
                    sidebar.style.top = `${headerHeight}px`;
                    sidebar.style.width = sidebar.parentElement.offsetWidth + 'px';
                } else {
                    // Stop at article bottom
                    sidebar.style.position = 'absolute';
                    sidebar.style.top = `${articleBottom - sidebarHeight}px`;
                    sidebar.style.width = sidebar.parentElement.offsetWidth + 'px';
                }
            } else {
                // Reset to normal position
                sidebar.style.position = '';
                sidebar.style.top = '';
                sidebar.style.width = '';
            }
        });

        // Update on window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth < 992) {
                sidebar.style.position = '';
                sidebar.style.top = '';
                sidebar.style.width = '';
            } else {
                sidebar.style.width = sidebar.parentElement.offsetWidth + 'px';
            }
        });
    }

    // ===== Add External Link Indicators =====
    const articleLinks = document.querySelectorAll('.blog-post-content a[href^="http"]');

    articleLinks.forEach(link => {
        // Skip links that already have images
        if (!link.querySelector('img') && !link.querySelector('.fa-external-link-alt')) {
            // Add external link icon
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt ms-1';
            icon.style.fontSize = '0.75em';
            link.appendChild(icon);

            // Add proper attributes for security and accessibility
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', `${link.textContent} (abre em uma nova aba)`);
            }
        }
    });

    // ===== Highlight Text Selection =====
    const style2 = document.createElement('style');
    style2.textContent = `
        ::selection {
            background-color: rgba(156, 39, 176, 0.3);
            color: var(--gray-100);
        }
    `;
    document.head.appendChild(style2);

    // ===== Estimated Reading Time Progress =====
    window.addEventListener('scroll', function () {
        const readingTimeElement = document.querySelector('.reading-time');
        if (readingTimeElement) {
            const articleContent = document.querySelector('.blog-post-content');
            if (articleContent) {
                const contentHeight = articleContent.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrolled = window.scrollY - articleContent.offsetTop + windowHeight / 2;
                const readPercent = Math.min(100, Math.max(0, (scrolled / contentHeight) * 100));

                // Get the original reading time text
                const originalText = readingTimeElement.getAttribute('data-original-text');
                if (!originalText) {
                    readingTimeElement.setAttribute('data-original-text', readingTimeElement.textContent);
                }
                // Update with progress
                if (readPercent > 0 && readPercent < 100) {
                    readingTimeElement.textContent = `${Math.round(readPercent)}% lido`;
                } else if (readPercent >= 100) {
                    readingTimeElement.textContent = 'Leitura concluída';
                } else {
                    readingTimeElement.textContent = readingTimeElement.getAttribute('data-original-text');
                }
            }
        }
    });

    // ===== Footnotes and Citations =====
    const footnotes = document.querySelectorAll('.blog-post-content sup a');

    footnotes.forEach(footnote => {
        footnote.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to footnote
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Highlight footnote temporarily
                targetElement.style.backgroundColor = 'rgba(156, 39, 176, 0.2)';
                targetElement.style.transition = 'background-color 0.5s ease';

                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });

    // ===== Article Feedback Widget =====
    const articleEnd = document.querySelector('.article-tags');

    if (articleEnd) {
        // Create feedback widget
        const feedbackWidget = document.createElement('div');
        feedbackWidget.className = 'article-feedback mt-5';
        feedbackWidget.innerHTML = `
        <h4 class="mb-3">Este artigo foi útil?</h4>
        <div class="d-flex gap-2">
            <button class="btn btn-outline-success feedback-btn" data-value="yes">
                <i class="far fa-thumbs-up me-1"></i> Sim
            </button>
            <button class="btn btn-outline-danger feedback-btn" data-value="no">
                <i class="far fa-thumbs-down me-1"></i> Não
            </button>
        </div>
        <div class="feedback-form mt-3" style="display: none;">
            <textarea class="form-control mb-2" placeholder="Como podemos melhorar este artigo?" rows="3"></textarea>
            <button class="btn btn-sm btn-purple">Enviar feedback</button>
        </div>
    `;

        articleEnd.insertAdjacentElement('afterend', feedbackWidget);

        // Handle feedback buttons
        const feedbackButtons = document.querySelectorAll('.feedback-btn');
        const feedbackForm = document.querySelector('.feedback-form');

        feedbackButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Remove active class from all buttons
                feedbackButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Show feedback form if "No" is clicked
                if (this.getAttribute('data-value') === 'no') {
                    feedbackForm.style.display = 'block';
                } else {
                    feedbackForm.style.display = 'none';

                    // Show thank you message for "Yes"
                    const thankYouMessage = document.createElement('div');
                    thankYouMessage.className = 'alert alert-success mt-3';
                    thankYouMessage.textContent = 'Obrigado pelo seu feedback!';

                    // Remove existing thank you message if any
                    const existingMessage = document.querySelector('.article-feedback .alert');
                    if (existingMessage) {
                        existingMessage.remove();
                    }

                    feedbackWidget.appendChild(thankYouMessage);

                    // Remove message after 3 seconds
                    setTimeout(() => {
                        thankYouMessage.remove();
                    }, 3000);
                }
            });
        });

        // Handle feedback form submission
        const submitFeedbackButton = feedbackForm.querySelector('button');

        submitFeedbackButton.addEventListener('click', function () {
            const feedbackText = feedbackForm.querySelector('textarea').value.trim();

            if (feedbackText) {
                // Simulate sending feedback
                this.disabled = true;
                this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

                setTimeout(() => {
                    // Reset form
                    feedbackForm.querySelector('textarea').value = '';
                    feedbackForm.style.display = 'none';

                    // Show thank you message
                    const thankYouMessage = document.createElement('div');
                    thankYouMessage.className = 'alert alert-success mt-3';
                    thankYouMessage.textContent = 'Obrigado pelo seu feedback! Vamos usar suas sugestões para melhorar nosso conteúdo.';

                    // Remove existing thank you message if any
                    const existingMessage = document.querySelector('.article-feedback .alert');
                    if (existingMessage) {
                        existingMessage.remove();
                    }

                    feedbackWidget.appendChild(thankYouMessage);

                    // Reset button
                    this.disabled = false;
                    this.innerHTML = 'Enviar feedback';

                    // Remove message after 5 seconds
                    setTimeout(() => {
                        thankYouMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // ===== Estimated Reading Time Calculation =====
    function calculateReadingTime() {
        const articleContent = document.querySelector('.blog-post-content');
        const readingTimeElement = document.querySelector('.reading-time');

        if (articleContent && readingTimeElement) {
            // Count words in the article
            const text = articleContent.textContent || articleContent.innerText;
            const wordCount = text.split(/\s+/).length;

            // Calculate reading time (assuming 200 words per minute)
            const readingTime = Math.ceil(wordCount / 200);

            // Save original text for later use
            readingTimeElement.setAttribute('data-original-text', `${readingTime} min de leitura`);
            readingTimeElement.textContent = `${readingTime} min de leitura`;
        }
    }

    calculateReadingTime();
});
