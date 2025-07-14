        // Skrypt do rozwijania kategorii
        // Ulepszona obsługa sidebaru
        document.addEventListener('DOMContentLoaded', function() {
            const categories = document.querySelectorAll('.category');
            let activeAnimation = null;

            categories.forEach(category => {
                const title = category.querySelector('.category-title');
                const subcat = category.querySelector('.subcategories');
                const chevron = title.querySelector('.fa-chevron-down');

                title.addEventListener('click', async function() {
                    // Anuluj istniejącą animację jeśli jest w trakcie
                    if (activeAnimation) {
                        activeAnimation.cancel();
                    }

                    const isActive = category.classList.contains('active');
                    
                    // Zamknij wszystkie inne kategorie
                    categories.forEach(c => {
                        if (c !== category && c.classList.contains('active')) {
                            animateCategoryClose(c);
                        }
                    });

                    // Toggle obecnej kategorii
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

            // Obsługa kliknięć w komendy
            document.querySelectorAll('.subcategory-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    // Reset aktywnych elementów
                    document.querySelectorAll('.subcategory-link').forEach(l => l.classList.remove('active'));
                    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                    
                    // Ustaw aktywny element
                    this.classList.add('active');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Obsługa responsywności
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
        // Tymczasowo pokaż pełną zawartość, aby zmierzyć szerokość
        link.style.whiteSpace = 'nowrap';
        link.style.overflow = 'visible';
        
        // Jeśli tekst jest przycinany (offsetWidth < scrollWidth)
        if (link.offsetWidth < link.scrollWidth) {
            link.setAttribute('title', link.textContent); // Dodaj tooltip
            link.style.textOverflow = 'ellipsis';
        }
        
        // Przywróć domyślne style
        link.style.whiteSpace = '';
        link.style.overflow = '';
    });
}

// Uruchom przy ładowaniu i przy zmianie rozmiaru okna
document.addEventListener('DOMContentLoaded', adjustSidebarItems);
window.addEventListener('resize', adjustSidebarItems);

// Funkcja pomocnicza do animacji zamknięcia
function animateClose(element, chevron) {
  element.style.maxHeight = '0';
  element.style.opacity = '0';
  element.style.transform = 'scaleY(0.8)';
  if (chevron) chevron.style.transform = 'rotate(0deg)';
}

// Dodaj tę funkcję (lub zaktualizuj istniejącą):
function setupCommandNavigation() {
    document.querySelectorAll('.command').forEach(command => {
        const commandName = command.querySelector('.command-name').textContent.trim();
        const id = commandName.substring(1).toLowerCase(); // Usuwa ";" i konwertuje na lowercase
        
        // Nadaj unikalne ID każdemu elementowi command
        command.id = `cmd-${id}`;
        
        // Znajdź odpowiadający link w sidebarze
        const sidebarLink = document.querySelector(`.subcategory-link[href="#${id}"]`);
        if (!sidebarLink) return;
        
        // Dodaj obsługę kliknięcia
        sidebarLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ukryj wszystkie sekcje
            document.querySelectorAll('.section').forEach(s => {
                s.classList.remove('active');
            });
            
            // Pokaż odpowiednią sekcję Fun
            document.getElementById('fun').classList.add('active');
            
            // Przewiń do konkretnej komendy
            command.scrollIntoView({ behavior: 'smooth' });
            
            // Podświetl link w sidebarze
            document.querySelectorAll('.subcategory-link').forEach(link => {
                link.classList.remove('active');
            });
            sidebarLink.classList.add('active');
        });
    });
}

// Wywołaj funkcję po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    setupCommandNavigation();
});

// Dodaj tę funkcję na końcu pliku
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

// Wywołaj funkcję po załadowaniu strony
document.addEventListener('DOMContentLoaded', fix8Ball);

document.getElementById('inviteButton')?.addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check"></i> Success!';
    }, 1500);
});

// Hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Zamknij menu po kliknięciu na komendę (opcjonalne)
    document.querySelectorAll('.command-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
});

// Dodaj do istniejącego kodu mobile menu
let lastScroll = 0;
const mobileButton = document.querySelector('.floating-ball');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        // Scroll w dół
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        // Scroll w górę
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    // Reset przy braku scrolla
    if (currentScroll <= 10) {
        document.body.classList.remove('scrolling-down', 'scrolling-up');
    }
    
    lastScroll = currentScroll;
});

// Dodaj obserwator sekcji komend
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