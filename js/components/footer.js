function renderFooter() {
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) {
    return;
  }

  const currentYear = new Date().getFullYear();

  footerContainer.innerHTML = `
    <div class="container">
      <footer class="py-4 mt-5">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <a href="index.html"
               class="nav-link px-2 text-body-secondary">
              Home
            </a>
          </li>

          <li class="nav-item">
            <a href="about.html"
               class="nav-link px-2 text-body-secondary">
              About
            </a>
          </li>

          <li class="nav-item">
            <a href="contact.html"
               class="nav-link px-2 text-body-secondary">
              Contact
            </a>
          </li>

          <li class="nav-item">
            <a href="login.html"
               class="nav-link px-2 text-body-secondary">
              Login
            </a>
          </li>
        </ul>

        <p class="text-center text-body-secondary mb-0">
          © ${currentYear} CodeGrade. All rights reserved.
        </p>
      </footer>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderFooter);