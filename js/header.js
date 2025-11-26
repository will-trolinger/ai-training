async function loadHeader() {
    try {
        const response = await fetch('/components/header.html');
        const html = await response.text();

        document.body.insertAdjacentHTML('afterbegin', html);

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = document.querySelector(`.hf-nav-link[data-page="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('hf-nav-link-active');
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
