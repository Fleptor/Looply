function renderNavbar() {
  const navbarContainer = document.getElementById("navbar-container");

  if (!navbarContainer) {
    return;
  }

  navbarContainer.innerHTML = `
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary border-bottom"
      aria-label="Public navigation"
    >
      <div class="container">

        <a class="navbar-brand fw-bold" href="index.html">
          CodeGrade
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#publicNavbar"
          aria-controls="publicNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="publicNavbar">

          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

            <li class="nav-item">
              <a
                class="nav-link"
                data-page="index.html"
                href="index.html"
              >
                Home
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                href="index.html#features"
              >
                Features
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                data-page="about.html"
                href="about.html"
              >
                About
              </a>
            </li>

            <li class="nav-item">
              <a
                class="nav-link"
                data-page="contact.html"
                href="contact.html"
              >
                Contact
              </a>
            </li>

          </ul>

          <a class="btn btn-primary" href="login.html">
            Login
          </a>

        </div>
      </div>
    </nav>
  `;

  setActiveNavbarLink();
}

function setActiveNavbarLink() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navigationLinks = document.querySelectorAll(
    "#navbar-container .nav-link[data-page]"
  );

  navigationLinks.forEach((link) => {
    const linkPage = link.dataset.page;

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", renderNavbar);