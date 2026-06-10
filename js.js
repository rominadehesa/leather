const options = document.querySelectorAll('.lang-toggle__option');

// Obtiene un valor anidado del JSON.
// Ej: "nav.about" => translations.nav.about
function getTranslation(obj, path) {
    return path
        .split('.')
        .reduce((acc, key) => acc?.[key], obj);
}

async function changeLanguage(lang) {
    try {
        const file = lang === 'SPA'
            ? './lang/es.json'
            : './lang/en.json';

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`No se pudo cargar ${file}`);
        }

        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const value = getTranslation(translations, key);

            if (value !== undefined) {
                element.textContent = value;
            }
        });

        // Guarda el idioma seleccionado
        localStorage.setItem('language', lang);

    } catch (error) {
        console.error('Error cargando traducciones:', error);
    }
}

options.forEach(option => {
    option.addEventListener('click', () => {
        document
            .querySelector('.lang-toggle__option--active')
            ?.classList.remove('lang-toggle__option--active');

        option.classList.add('lang-toggle__option--active');

        const lang = option.textContent.trim();

        changeLanguage(lang);
    });
});

// Idioma inicial
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'SPA';

    changeLanguage(savedLang);

    options.forEach(option => {
        option.classList.remove('lang-toggle__option--active');

        if (option.textContent.trim() === savedLang) {
            option.classList.add('lang-toggle__option--active');
        }
    });
});