const headerScript = document.currentScript;

async function loadHeader() {
    try {
        const scriptUrl = new URL(headerScript?.src || document.querySelector('script[src*="header.js"]').src);
        const basePath = scriptUrl.href.substring(0, scriptUrl.href.lastIndexOf('/js/'));

        const response = await fetch(basePath + '/components/header.html');
        if (!response.ok) {
            throw new Error('Failed to fetch header: ' + response.status);
        }
        let html = await response.text();

        html = html.replace(/href="\//g, 'href="' + basePath + '/');
        html = html.replace(/src="\//g, 'src="' + basePath + '/');

        document.body.insertAdjacentHTML('afterbegin', html);

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = document.querySelector(`.hf-nav-link[data-page="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('hf-nav-link-active');
        }

        initMobileMenu();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.hf-menu-btn');
    const nav = document.querySelector('.hf-nav');
    const overlay = document.querySelector('.hf-menu-overlay');

    if (!menuBtn || !nav || !overlay) return;

    function toggleMenu() {
        const isOpen = nav.classList.toggle('open');
        overlay.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu() {
        nav.classList.remove('open');
        overlay.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    }

    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    nav.querySelectorAll('.hf-nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
