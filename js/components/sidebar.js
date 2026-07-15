document.addEventListener("DOMContentLoaded", renderSidebar);

function renderSidebar() {
  const container = document.getElementById("sidebar-container");

  if (!container) {
    return;
  }

  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "../login.html";
    return;
  }

  if (currentUser.role === "Teacher") {
    container.innerHTML = getTeacherSidebar(currentUser);
  } else if (currentUser.role === "Student") {
    container.innerHTML = getStudentSidebar(currentUser);
  } else {
    window.location.href = "../login.html";
    return;
  }

  setActiveSidebarLink();
  attachLogoutEvent();
}

function getTeacherSidebar(user) {
  return `
    <div
      class="offcanvas-md offcanvas-start bg-body-tertiary"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarMenuLabel">
          CodeGrade
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

        <div class="px-3 pb-3 border-bottom">
          <a
            href="dashboard.html"
            class="text-decoration-none fw-bold fs-5"
          >
            CodeGrade
          </a>

          <p class="small text-body-secondary mb-0 mt-1">
            Teacher Portal
          </p>
        </div>

        <ul class="nav flex-column mt-3">

          ${createSidebarLink(
            "dashboard.html",
            "bi-speedometer2",
            "Dashboard"
          )}

          ${createSidebarLink(
            "students.html",
            "bi-people",
            "Students"
          )}

          ${createSidebarLink(
            "exams.html",
            "bi-file-earmark-code",
            "Exams"
          )}

          ${createSidebarLink(
            "profile.html",
            "bi-person-circle",
            "Profile"
          )}

        </ul>

        ${getSidebarFooter(user)}
      </div>
    </div>
  `;
}

function getStudentSidebar(user) {
  return `
    <div
      class="offcanvas-md offcanvas-start bg-body-tertiary"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarMenuLabel">
          CodeGrade
        </h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

        <div class="px-3 pb-3 border-bottom">
          <a
            href="dashboard.html"
            class="text-decoration-none fw-bold fs-5"
          >
            CodeGrade
          </a>

          <p class="small text-body-secondary mb-0 mt-1">
            Student Portal
          </p>
        </div>

        <ul class="nav flex-column mt-3">

          ${createSidebarLink(
            "dashboard.html",
            "bi-speedometer2",
            "Dashboard"
          )}

          ${createSidebarLink(
            "exams.html",
            "bi-journal-code",
            "Exams"
          )}

          ${createSidebarLink(
            "profile.html",
            "bi-person-circle",
            "Profile"
          )}

        </ul>

        ${getSidebarFooter(user)}
      </div>
    </div>
  `;
}

function createSidebarLink(href, icon, label) {
  return `
    <li class="nav-item">
      <a
        class="nav-link sidebar-link d-flex align-items-center gap-2"
        href="${href}"
        data-page="${href}"
      >
        <i class="bi ${icon}" aria-hidden="true"></i>
        <span>${label}</span>
      </a>
    </li>
  `;
}

function getSidebarFooter(user) {
  return `
    <div class="mt-auto">

      <hr class="my-3">

      <div class="px-3 mb-3">
        <p class="fw-semibold mb-0">
          ${escapeSidebarText(user.fullName || user.username)}
        </p>

        <p class="small text-body-secondary mb-0">
          ${escapeSidebarText(user.role)}
        </p>
      </div>

      <ul class="nav flex-column mb-3">
        <li class="nav-item">
          <button
            type="button"
            id="logout-button"
            class="nav-link sidebar-link border-0 bg-transparent
                   d-flex align-items-center gap-2 w-100"
          >
            <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>

    </div>
  `;
}

function setActiveSidebarLink() {
  const currentPage =
    window.location.pathname.split("/").pop() || "dashboard.html";

  const links = document.querySelectorAll(
    "#sidebar-container .sidebar-link[data-page]"
  );

  links.forEach((link) => {
    const isCurrentPage = link.dataset.page === currentPage;

    link.classList.toggle("active", isCurrentPage);

    if (isCurrentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function attachLogoutEvent() {
  const logoutButton = document.getElementById("logout-button");

  if (!logoutButton) {
    return;
  }

  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentExamAttempt");

    window.location.href = "../login.html";
  });
}

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  } catch (error) {
    console.error("Unable to read current user:", error);
    return null;
  }
}

function escapeSidebarText(value) {
  const element = document.createElement("div");
  element.textContent = String(value ?? "");
  return element.innerHTML;
}