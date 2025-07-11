        // Skrypt do rozwijania kategorii
        // Ulepszona obsługa sidebaru
        document.addEventListener('DOMContentLoaded', function() {
            const categories = document.querySelectorAll('.category');
            
            // Funkcja do płynnego otwierania/zamykania
            const toggleCategory = (category, open) => {
                const subcat = category.querySelector('.subcategories');
                const chevron = category.querySelector('.fa-chevron-down');
                
                // Anuluj oczekujące timeouty
                if (subcat._closeTimeout) {
                    clearTimeout(subcat._closeTimeout);
                    delete subcat._closeTimeout;
                }

                if (open) {
                    // Przygotowanie do otwarcia
                    subcat.style.display = 'block';
                    subcat.style.maxHeight = '0';
                    subcat.style.opacity = '0';
                    subcat.style.transition = 'none';
                    
                    // Wymuszamy przeliczenie stylów
                    void subcat.offsetHeight;
                    
                    // Ustawiamy transition i rozpoczynamy animację
                    subcat.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease';
                    subcat.style.maxHeight = subcat.scrollHeight + 'px';
                    subcat.style.opacity = '1';
                    
                    if (chevron) chevron.style.transform = 'rotate(180deg)';
                    category.classList.add('active');
                } else {
                    // Przygotowanie do zamknięcia
                    subcat.style.maxHeight = subcat.scrollHeight + 'px';
                    subcat.style.opacity = '1';
                    subcat.style.transition = 'none';
                    
                    // Wymuszamy przeliczenie stylów
                    void subcat.offsetHeight;
                    
                    // Ustawiamy transition i rozpoczynamy animację
                    subcat.style.transition = 'max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease';
                    subcat.style.maxHeight = '0';
                    subcat.style.opacity = '0';
                    
                    if (chevron) chevron.style.transform = 'rotate(0deg)';
                    
                    // Po zakończeniu animacji ukrywamy element
                    subcat._closeTimeout = setTimeout(() => {
                        if (subcat.style.maxHeight === '0px') {
                            subcat.style.display = 'none';
                            category.classList.remove('active');
                        }
                    }, 250);
                }
            };

            // Inicjalizacja - otwórz pierwszą kategorię
            if (categories.length > 0) {
                toggleCategory(categories[0], true);
                
                const firstLink = categories[0].querySelector('.subcategory-link');
                if (firstLink) {
                    firstLink.classList.add('active');
                    const targetSection = document.querySelector(firstLink.getAttribute('href'));
                    if (targetSection) targetSection.classList.add('active');
                }
            }

            // Obsługa kliknięć w kategorie
            categories.forEach(category => {
                const title = category.querySelector('.category-title');
                title.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const isActive = category.classList.contains('active');
                    
                    // Zamknij wszystkie inne kategorie
                    categories.forEach(c => {
                        if (c !== category && c.classList.contains('active')) {
                            toggleCategory(c, false);
                        }
                    });

                    // Toggle obecnej kategorii
                    toggleCategory(category, !isActive);
                });
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