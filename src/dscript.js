        // Skrypt do rozwijania kategorii
        document.addEventListener('DOMContentLoaded', function() {
            // Obsługa kliknięć w kategorie
            document.querySelectorAll('.category-title').forEach(title => {
                title.addEventListener('click', function() {
                    const category = this.closest('.category');
                    const isActive = category.classList.contains('active');
                    
                    // Zamknij wszystkie kategorie
                    document.querySelectorAll('.category').forEach(c => {
                        c.classList.remove('active');
                        c.querySelector('.subcategories').style.maxHeight = '0';
                        c.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                    });

                    // Toggle tylko jeśli kategoria nie była aktywna
                    if (!isActive) {
                        category.classList.add('active');
                        const subcategories = category.querySelector('.subcategories');
                        subcategories.style.maxHeight = subcategories.scrollHeight + 'px';
                        this.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
                    }
                });
            });

            // Obsługa kliknięć w komendy
            document.querySelectorAll('.subcategory-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    // Reset wszystkich linków i sekcji
                    document.querySelectorAll('.subcategory-link').forEach(l => l.classList.remove('active'));
                    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                    
                    // Aktywuj obecny link i sekcję
                    this.classList.add('active');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Inicjalizacja - otwórz pierwszą kategorię i pierwszą komendę
            const firstCategory = document.querySelector('.category');
            if (firstCategory) {
                firstCategory.querySelector('.subcategories').style.maxHeight = '0';
                firstCategory.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                
                const firstCommand = firstCategory.querySelector('.subcategory-link');
                if (firstCommand) {
                    firstCommand.classList.add('active');
                    document.querySelector(firstCommand.getAttribute('href')).classList.add('active');
                }
            }
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