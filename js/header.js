const headerScript = document.currentScript;

async function loadHeader() {
    try {
        const scriptPath = headerScript?.src || document.querySelector('script[src*="header.js"]').src;
        const basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/js/'));

        const response = await fetch(basePath + '/components/header.html');
        let html = await response.text();

        html = html.replace(/href="\//g, 'href="' + basePath + '/');
        html = html.replace(/src="\//g, 'src="' + basePath + '/');

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
