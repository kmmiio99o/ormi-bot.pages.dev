        document.addEventListener('DOMContentLoaded', function() {
            const categories = document.querySelectorAll('.category');
            let activeAnimation = null;

            categories.forEach(category => {
                const title = category.querySelector('.category-title');
                const subcat = category.querySelector('.subcategories');
                const chevron = title.querySelector('.fa-chevron-down');

                title.addEventListener('click', async function() {
                    if (activeAnimation) {
                        activeAnimation.cancel();
                    }

                    const isActive = category.classList.contains('active');
                    
                    categories.forEach(c => {
                        if (c !== category && c.classList.contains('active')) {
                            animateCategoryClose(c);
                        }
                    });

                    if (isActive) {
                        await animateCategoryClose(category);
                    } else {
                        await animateCategoryOpen(category);
                    }
                });

                async function animateCategoryOpen(cat) {
                    const sub = cat.querySelector('.subcategories');
                    const chev = cat.querySelector('.fa-chevron-down');
                    
                    sub.style.display = 'block';
                    sub.style.overflow = 'hidden';
                    
                    const openAnim = sub.animate([
                        { 
                            opacity: 0,
                            maxHeight: '0px',
                            transform: 'scaleY(0.9)'
                        },
                        { 
                            opacity: 1,
                            maxHeight: `${sub.scrollHeight}px`,
                            transform: 'scaleY(1)'
                        }
                    ], {
                        duration: 300,
                        easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)',
                        fill: 'forwards'
                    });

                    chev?.animate([
                        { transform: 'rotate(0deg)' },
                        { transform: 'rotate(180deg)' }
                    ], { duration: 300, easing: 'ease-out' });

                    activeAnimation = openAnim;
                    await openAnim.finished;
                    cat.classList.add('active');
                    activeAnimation = null;
                }

                async function animateCategoryClose(cat) {
                    const sub = cat.querySelector('.subcategories');
                    const chev = cat.querySelector('.fa-chevron-down');
                    
                    const closeAnim = sub.animate([
                        { 
                            opacity: 1,
                            maxHeight: `${sub.scrollHeight}px`,
                            transform: 'scaleY(1)'
                        },
                        { 
                            opacity: 0,
                            maxHeight: '0px',
                            transform: 'scaleY(0.95)'
                        }
                    ], {
                        duration: 250,
                        easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                        fill: 'forwards'
                    });

                    chev?.animate([
                        { transform: 'rotate(180deg)' },
                        { transform: 'rotate(0deg)' }
                    ], { duration: 250, easing: 'ease-in' });

                    activeAnimation = closeAnim;
                    await closeAnim.finished;
                    sub.style.display = 'none';
                    cat.classList.remove('active');
                    activeAnimation = null;
                }
            });

            document.querySelectorAll('.subcategory-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    // Zamknij menu hamburger (jeśli jest otwarte)
                    const sidebar = document.querySelector('.sidebar');
                    const toggleBtn = document.querySelector('.mobile-menu-toggle');
                    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                    }
                    
                    document.querySelectorAll('.subcategory-link').forEach(l => l.classList.remove('active'));
                    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                    
                    this.classList.add('active');
                    
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        
                        const offset = 20;
                        const targetPosition = targetSection.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            document.querySelectorAll('.category-title').forEach(title => {
                title.addEventListener('click', () => {
                    const category = title.closest('.category');
                    const subcategories = category.querySelector('.subcategories');
                    
                    category.classList.toggle('active');
                    
                    if (category.classList.contains('active')) {
                        setTimeout(() => {
                            subcategories.scrollTop = 0;
                        }, 10);
                    }
                });
            });

            function handleResize() {
                document.querySelectorAll('.category.active .subcategories').forEach(subcat => {
                    subcat.style.maxHeight = subcat.scrollHeight + 'px';
                });
            }

            window.addEventListener('resize', handleResize);
        });

function adjustSidebarItems() {
    const sidebarLinks = document.querySelectorAll('.subcategory-link');
    
    sidebarLinks.forEach(link => {
        link.style.whiteSpace = 'nowrap';
        link.style.overflow = 'visible';
        
        if (link.offsetWidth < link.scrollWidth) {
            link.setAttribute('title', link.textContent);
            link.style.textOverflow = 'ellipsis';
        }
        
        link.style.whiteSpace = '';
        link.style.overflow = '';
    });
}

document.addEventListener('DOMContentLoaded', adjustSidebarItems);
window.addEventListener('resize', adjustSidebarItems);

function animateClose(element, chevron) {
  element.style.maxHeight = '0';
  element.style.opacity = '0';
  element.style.transform = 'scaleY(0.8)';
  if (chevron) chevron.style.transform = 'rotate(0deg)';
}

function setupCommandNavigation() {
    document.querySelectorAll('.command').forEach(command => {
        const commandName = command.querySelector('.command-name').textContent.trim();
        const id = commandName.substring(1).toLowerCase();
        
        command.id = `cmd-${id}`;
        
        const sidebarLink = document.querySelector(`.subcategory-link[href="#${id}"]`);
        if (!sidebarLink) return;
        
        sidebarLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.section').forEach(s => {
                s.classList.remove('active');
            });
            
            document.getElementById('fun').classList.add('active');
            
            command.scrollIntoView({ behavior: 'smooth' });
            
            document.querySelectorAll('.subcategory-link').forEach(link => {
                link.classList.remove('active');
            });
            sidebarLink.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupCommandNavigation();
});

function fix8Ball() {
    const link8ball = document.querySelector('a[href="#8ball"]');
    if (link8ball) {
        link8ball.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('8ball').classList.add('active');
            document.getElementById('8ball').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

document.addEventListener('DOMContentLoaded', fix8Ball);

document.getElementById('inviteButton')?.addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check"></i> Success!';
    }, 1500);
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Otwieranie/zamykanie menu
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Zapobiega zamknięciu przy kliknięciu w przycisk
        sidebar.classList.toggle('active');
    });

    // Zamykanie menu po kliknięciu gdziekolwiek poza nim
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== toggleBtn) {
            sidebar.classList.remove('active');
        }
    });

    // Zamykanie menu po kliknięciu w link
    document.querySelectorAll('.subcategory-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
});

let lastScroll = 0;
const mobileButton = document.querySelector('.floating-ball');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    if (currentScroll <= 10) {
        document.body.classList.remove('scrolling-down', 'scrolling-up');
    }
    
    lastScroll = currentScroll;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            mobileButton.classList.add('highlight-command');
            setTimeout(() => {
                mobileButton.classList.remove('highlight-command');
            }, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

function setupBackToTopButton() {
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Wywołanie funkcji po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    setupBackToTopButton();
});