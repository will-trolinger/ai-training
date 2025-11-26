// Collapsible sections functionality
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.collapsible-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);

            if (content) {
                content.classList.toggle('collapsed');
            }
            this.classList.toggle('collapsed');
        });
    });
});
