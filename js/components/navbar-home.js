document.addEventListener("DOMContentLoaded", function () {
    const navbarRoot = document.getElementById("navbar-root");

    if (!navbarRoot) {
        console.error("Element #navbar-root was not found.");
        return;
    }

    navbarRoot.innerHTML = createNavbar();

    const menuButton = document.getElementById("nav-menu-button");
    const navigation = document.getElementById("nav-navigation");
    const navigationLinks = document.querySelectorAll(".nav-link");

    setActiveLink(navigationLinks);

    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("show");

        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            closeMobileMenu();
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        navigation.classList.remove("show");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    }
});

function createNavbar() {
    return `
        <nav class="public-navbar" aria-label="Main navigation">
            <div class="container nav-bar">

                <a
                    href="home.html"
                    class="nav-logo"
                    aria-label="Looply home"
                >
                    <img
                        src="../icons/logo.png"
                        alt="Looply"
                    >
                </a>

                <div
                    class="nav-navigation"
                    id="nav-navigation"
                >
                    <ul class="nav-links">
                        <li>
                            <a
                                href="home.html"
                                class="nav-link"
                            >
                                Home
                            </a>
                        </li>

                        <li>
                            <a
                                href="#features"
                                class="nav-link"
                            >
                                Features
                            </a>
                        </li>

                        <li>
                            <a
                                href="contact-about.html"
                                class="nav-link"
                            >
                                About &amp; Contact
                            </a>
                        </li>
                    </ul>

                    <a
                        href="login.html"
                        class="primary-btn nav-login-mobile"
                    >
                        Login
                    </a>
                </div>

                <div class="nav-actions">
                    <a
                        href="login.html"
                        class="primary-btn nav-login-desktop"
                    >
                        Login
                    </a>

                    <button
                        type="button"
                        class="nav-menu-button"
                        id="nav-menu-button"
                        aria-label="Open navigation menu"
                        aria-controls="nav-navigation"
                        aria-expanded="false"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
        </nav>
    `;
}

function setActiveLink(links) {
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    links.forEach(function (link) {
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}