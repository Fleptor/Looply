function createFooter() {
    return `
        <footer class="public-footer">
            <div class="container footer-content">

                <a
                    href="index.html"
                    class="footer-logo"
                    aria-label="Looply home"
                >
                    <img
                        src="../icons/logo.svg"
                        alt="Looply logo"
                    >
                </a>

                <p class="footer-copyright">
                    &copy; 2026 Looply. All rights reserved
                </p>

            </div>
        </footer>
    `;
}

const footerRoot = document.getElementById("footer-root");

if (footerRoot) {
    footerRoot.innerHTML = createFooter();
}