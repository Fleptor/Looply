document.addEventListener("DOMContentLoaded", function () {
    const sidebarRoot = document.getElementById("teacher-sidebar-root");
    const sidebarOverlay = document.getElementById(
        "teacher-sidebar-overlay"
    );
    const sidebarToggle = document.getElementById(
        "teacher-sidebar-toggle"
    );
import { ROUTES } from "../core/config.js";

const TEACHER_WORKSPACE_LINKS = Object.freeze([
    {
        label: "Dashboard",
        icon: "bi-grid",
        href: ROUTES.TEACHER_DASHBOARD,
        activePages: ["dashboard.html"]
    },
    {
        label: "Students",
        icon: "bi-people",
        href: ROUTES.TEACHER_STUDENTS,
        activePages: ["students.html"]
    },
    {
        label: "Exams",
        icon: "bi-journal-code",
        href: ROUTES.TEACHER_EXAMS,
        activePages: ["exams.html", "exam-details.html"]
    },
    {
        label: "Create Exam",
        icon: "bi-plus-square",
        href: ROUTES.TEACHER_EXAM_FORM,
        activePages: ["exam-form.html"],
        extraClass: "teacher-create-exam-link"
    }
]);

const TEACHER_ACCOUNT_LINKS = Object.freeze([
    {
        label: "Profile",
        icon: "bi-person",
        href: ROUTES.TEACHER_PROFILE,
        activePages: ["profile.html"]
    },
    {
        label: "Logout",
        icon: "bi-box-arrow-left",
        href: ROUTES.LOGIN,
        activePages: [],
        extraClass: "teacher-logout-link",
        action: "logout"
    }
]);

function getCurrentPageName() {
    const pathParts = window.location.pathname.split("/");
    return pathParts.pop() || "dashboard.html";
}

function createTeacherLinks(links, currentPage) {
    return links
        .map((link) => {
            const isActive = link.activePages.includes(currentPage);
            const extraClass = link.extraClass ?? "";
            const actionAttribute = link.action
                ? `data-sidebar-action="${link.action}"`
                : "";

            return `
                <a
                    href="${link.href}"
                    class="teacher-side-link ${isActive ? "active" : ""} ${extraClass}"
                    ${isActive ? 'aria-current="page"' : ""}
                    ${actionAttribute}
                >
                    <i
                        class="bi ${link.icon}"
                        aria-hidden="true"
                    ></i>
                    <span>${link.label}</span>
                </a>
            `;
        })
        .join("");
}


export function createTeacherSidebar(
    currentPage = getCurrentPageName()
) {
    return `
        <div class="teacher-sidebar-content">
            <section class="teacher-sidebar-section">
                <p class="teacher-sidebar-label">
                    Teacher Workspace
                </p>

                <nav
                    class="teacher-side-nav"
                    aria-label="Teacher workspace navigation"
                >
                    ${createTeacherLinks(
                        TEACHER_WORKSPACE_LINKS,
                        currentPage
                    )}
                </nav>
            </section>

            <section class="teacher-sidebar-section">
                <p class="teacher-sidebar-label">
                    Account
                </p>

                <nav
                    class="teacher-side-nav"
                    aria-label="Teacher account navigation"
                >
                    ${createTeacherLinks(
                        TEACHER_ACCOUNT_LINKS,
                        currentPage
                    )}
                </nav>
            </section>
        </div>

        <div class="teacher-sidebar-footer">
            <span class="teacher-sidebar-footer-icon">
                <i class="bi bi-shield-check"></i>
            </span>

            <div>
                <strong>Teacher Access</strong>
                <small>Exam management workspace</small>
            </div>
        </div>
    `;
}

function dispatchLogoutRequest() {
    const logoutEvent = new CustomEvent(
        "looply:logout-requested",
        {
            bubbles: true,
            cancelable: true,
            detail: {
                role: "teacher",
                redirectUrl: ROUTES.LOGIN
            }
        }
    );

    const shouldContinueNavigation = document.dispatchEvent(logoutEvent);

    if (shouldContinueNavigation) {
        window.location.assign(ROUTES.LOGIN);
    }
}


export function renderTeacherSidebar(options = {}) {
    const {
        rootSelector = "#teacher-sidebar-root",
        overlaySelector = "#teacher-sidebar-overlay",
        toggleSelector = "#teacher-sidebar-toggle"
    } = options;

    const sidebarRoot = document.querySelector(rootSelector);

    if (!sidebarRoot) {
        console.warn(`Teacher sidebar root was not found: ${rootSelector}`);
        return false;
    }

    if (sidebarRoot.dataset.sidebarInitialized === "true") {
        return true;
    }

    const sidebarOverlay = document.querySelector(overlaySelector);
    const sidebarToggle = document.querySelector(toggleSelector);

    sidebarRoot.className = "teacher-sidebar";
    sidebarRoot.innerHTML = createTeacherSidebar();
    sidebarRoot.dataset.sidebarInitialized = "true";

    function setSidebarOpen(isOpen) {
        sidebarRoot.classList.toggle("is-open", isOpen);
        sidebarOverlay?.classList.toggle("is-visible", isOpen);
        sidebarToggle?.classList.toggle("is-active", isOpen);
        sidebarToggle?.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("teacher-sidebar-open", isOpen);
    }

    function closeSidebar() {
        setSidebarOpen(false);
    }

    sidebarToggle?.addEventListener("click", () => {
        setSidebarOpen(
            !sidebarRoot.classList.contains("is-open")
        );
    });

    sidebarOverlay?.addEventListener("click", closeSidebar);

    sidebarRoot.addEventListener("click", (event) => {
        const clickedLink = event.target.closest(".teacher-side-link");

        if (!clickedLink) {
            return;
        }

        if (clickedLink.dataset.sidebarAction === "logout") {
            event.preventDefault();
            dispatchLogoutRequest();
            return;
        }

        if (window.innerWidth <= 992) {
            closeSidebar();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    });

    return true;
}

function initializeTeacherSidebar() {
    renderTeacherSidebar();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeTeacherSidebar,
        { once: true }
    );
} else {
    initializeTeacherSidebar();
}
    if (!sidebarRoot) {
        console.error("Element #teacher-sidebar-root was not found.");
        return;
    }

    const currentPage =
        window.location.pathname.split("/").pop() || "dashboard.html";

    const workspaceLinks = [
        {
            label: "Dashboard",
            icon: "bi-grid",
            href: "dashboard.html",
            activePages: ["dashboard.html"]
        },
        {
            label: "Students",
            icon: "bi-people",
            href: "students.html",
            activePages: ["students.html"]
        },
        {
            label: "Exams",
            icon: "bi-journal-code",
            href: "exams.html",
            activePages: [
                "exams.html",
                "exam-details.html"
            ]
        },
        {
            label: "Create Exam",
            icon: "bi-plus-square",
            href: "exam-form.html",
            activePages: ["exam-form.html"],
            extraClass: "teacher-create-exam-link"
        }
    ];

    const accountLinks = [
        {
            label: "Profile",
            icon: "bi-person",
            href: "../../html/teacher/profile.html",
            activePages: ["profile.html"]
        },
        {
            label: "Logout",
            icon: "bi-box-arrow-left",
            href: "../login.html",
            activePages: [],
            extraClass: "teacher-logout-link"
        }
    ];

    sidebarRoot.className = "teacher-sidebar";

    sidebarRoot.innerHTML = `
        <div class="teacher-sidebar-content">

            <section class="teacher-sidebar-section">
                <p class="teacher-sidebar-label">
                    Teacher Workspace
                </p>

                <nav
                    class="teacher-side-nav"
                    aria-label="Teacher workspace navigation"
                >
                    ${createTeacherLinks(
                        workspaceLinks,
                        currentPage
                    )}
                </nav>
            </section>

            <section class="teacher-sidebar-section">
                <p class="teacher-sidebar-label">
                    Account
                </p>

                <nav
                    class="teacher-side-nav"
                    aria-label="Teacher account navigation"
                >
                    ${createTeacherLinks(
                        accountLinks,
                        currentPage
                    )}
                </nav>
            </section>

        </div>

        <div class="teacher-sidebar-footer">
            <span class="teacher-sidebar-footer-icon">
                <i class="bi bi-shield-check"></i>
            </span>

            <div>
                <strong>Teacher Access</strong>
                <small>Exam management workspace</small>
            </div>
        </div>
    `;

    function createTeacherLinks(links, activePage) {
        return links
            .map(function (link) {
                const isActive =
                    link.activePages.includes(activePage);

                const extraClass = link.extraClass || "";

                return `
                    <a
                        href="${link.href}"
                        class="
                            teacher-side-link
                            ${isActive ? "active" : ""}
                            ${extraClass}
                        "
                        ${isActive ? 'aria-current="page"' : ""}
                    >
                        <i
                            class="bi ${link.icon}"
                            aria-hidden="true"
                        ></i>

                        <span>${link.label}</span>
                    </a>
                `;
            })
            .join("");
    }

    function openSidebar() {
        sidebarRoot.classList.add("is-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("is-visible");
        }

        if (sidebarToggle) {
            sidebarToggle.classList.add("is-active");
            sidebarToggle.setAttribute("aria-expanded", "true");
        }

        document.body.classList.add("teacher-sidebar-open");
    }

    function closeSidebar() {
        sidebarRoot.classList.remove("is-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("is-visible");
        }

        if (sidebarToggle) {
            sidebarToggle.classList.remove("is-active");
            sidebarToggle.setAttribute("aria-expanded", "false");
        }

        document.body.classList.remove("teacher-sidebar-open");
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", function () {
            const isOpen =
                sidebarRoot.classList.contains("is-open");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    sidebarRoot.addEventListener("click", function (event) {
        const clickedLink = event.target.closest(
            ".teacher-side-link"
        );

        if (clickedLink && window.innerWidth <= 992) {
            closeSidebar();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    });
});