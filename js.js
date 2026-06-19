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
                element.innerHTML = value.replace(/\n/g, '<br>');
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


document.querySelectorAll(".open-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.popup).style.display = "flex";
    });
});

document.querySelectorAll(".close").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".popup").style.display = "none";
    });
});


const btn = document.getElementById("menu-btn");
const menu = document.getElementById("nav-list");

const menuIcon = `
<svg width="18" height="14" viewBox="0 0 18 14">
    <path d="M0 2V0H18V2H0ZM0 14V12H18V14H0ZM0 8V6H18V8H0Z" fill="white"/>
</svg>
`;

const closeIcon = `
<svg width="14" height="14" viewBox="0 0 14 14">
    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="#1F0808"/>
</svg>
`;

btn.addEventListener("click", () => {
    menu.classList.toggle("open");
    document.querySelector("nav").classList.toggle("open");
    btn.innerHTML = menu.classList.contains("open")
        ? closeIcon
        : menuIcon;
});



const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Si querés que se ejecute una sola vez:
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // 20% visible
});

elements.forEach(el => observer.observe(el));