/* shared-nav.js — KVN Tech Ltd
   Handles: sticky header, mobile menu open/close, active link,
            scroll reveal, dark/light theme toggle, contact form
*/
document.addEventListener('DOMContentLoaded', function () {

    /* ======================================
       1. DARK / LIGHT THEME TOGGLE
    ====================================== */
    const THEME_KEY = 'kvn-theme';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-fill"></i>';
        btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Apply saved theme on load
    applyTheme(localStorage.getItem(THEME_KEY) || 'light');

    // Delegate theme toggle click
    document.addEventListener('click', function (e) {
        if (e.target.closest('#themeToggle')) {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        }
    });

    /* ======================================
       2. STICKY HEADER
    ====================================== */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* ======================================
       3. MOBILE MENU — event delegation
    ====================================== */
    const mobileNav = document.getElementById('mobileNav');

    // Inject a full-screen backdrop once
    let backdrop = document.getElementById('mobileNavBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id  = 'mobileNavBackdrop';
        backdrop.style.cssText = [
            'display:none',
            'position:fixed',
            'inset:0',
            'background:rgba(0,0,0,0.55)',
            'z-index:1099',
            'opacity:0',
            'transition:opacity 0.3s ease',
            'cursor:pointer'
        ].join(';');
        document.body.appendChild(backdrop);
    }

    function openMenu() {
        if (!mobileNav) return;
        mobileNav.classList.add('open');
        backdrop.style.display = 'block';
        // Allow paint before fade-in
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                backdrop.style.opacity = '1';
            });
        });
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!mobileNav) return;
        mobileNav.classList.remove('open');
        backdrop.style.opacity = '0';
        document.body.style.overflow = '';
        setTimeout(function () {
            backdrop.style.display = 'none';
        }, 320);
    }

    // ---- Delegated listeners on document (always work) ----

    // Open: hamburger button
    document.addEventListener('click', function (e) {
        if (e.target.closest('#menuBtn')) {
            openMenu();
        }
    });

    // Close: X button inside drawer
    document.addEventListener('click', function (e) {
        if (e.target.closest('#menuClose')) {
            closeMenu();
        }
    });

    // Close: any nav link inside the drawer
    document.addEventListener('click', function (e) {
        const link = e.target.closest('#mobileNav a');
        if (link) {
            closeMenu();
        }
    });

    // Close: backdrop tap
    backdrop.addEventListener('click', closeMenu);

    // Close: Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Close: resize back to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
    });

    /* ======================================
       4. ACTIVE NAV LINK
    ====================================== */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        if (a.getAttribute('href') === currentPage) {
            a.classList.add('active');
        }
    });

    /* ======================================
       5. SCROLL REVEAL ANIMATION
    ====================================== */
    const reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        entry.target.classList.add('revealed');
                    }, i * 70);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        reveals.forEach(function (el) { obs.observe(el); });
    } else {
        // Fallback: reveal all immediately
        reveals.forEach(function (el) { el.classList.add('revealed'); });
    }

    /* ======================================
       6. CONTACT FORM SUBMIT
    ====================================== */
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const status = document.getElementById('formStatus');
            if (status) {
                status.style.display  = 'block';
                status.style.color    = '#22C55E';
                status.textContent    = '✔ Thank you! We will get back to you within 24 hours.';
                form.reset();
                setTimeout(function () { status.style.display = 'none'; }, 6000);
            }
        });
    }

}); // end DOMContentLoaded
