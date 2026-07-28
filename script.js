"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initializeWebsite();
});

function initializeWebsite() {
    setupSmoothScrolling();
    setupStickyHeader();
    setupRevealAnimation();
    setupScrollProgress();
    setupBackToTop();
}

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });
    });
}

function setupStickyHeader() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }

    });

}

function setupRevealAnimation() {

    const elements = document.querySelectorAll(
        ".category-card,.product-card,.about,.hero-content"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));

}

function setupScrollProgress() {

    const progress = document.createElement("div");

    progress.id = "scroll-progress";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percent = (scrollTop / scrollHeight) * 100;

        progress.style.width = percent + "%";

    });

}

function setupBackToTop() {

    const button = document.createElement("button");

    button.id = "backToTop";

    button.innerHTML = "↑";

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
function debounce(callback, delay = 300) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback(...args);
        }, delay);

    };

}

function throttle(callback, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {
            waiting = false;
        }, limit);

    };

}

function fadeIn(element) {

    if (!element) return;

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "all .6s ease";

    requestAnimationFrame(() => {

        element.style.opacity = "1";
        element.style.transform = "translateY(0)";

    });

}

function fadeOut(element) {

    if (!element) return;

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";

}

function showNotification(message) {

    const notification = document.createElement("div");

    notification.className = "notification";

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 2500);

}

function animateProductCards() {

    const cards = document.querySelectorAll(".product-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition = "all .6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 120);

    });

}

window.addEventListener("load", () => {

    animateProductCards();

});
function setupActiveNavigation() {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + current) {
                link.classList.add("active");
            }

        });

    });

}

function setupProductSearch() {

    const searchInput = document.querySelector("#productSearch");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(keyword)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

function setupCategoryFilter() {

    const categories = document.querySelectorAll(".category-card");

    categories.forEach(category => {

        category.addEventListener("click", () => {

            categories.forEach(item => item.classList.remove("selected"));

            category.classList.add("selected");

        });

    });

}

window.addEventListener("load", () => {

    setupActiveNavigation();

    setupProductSearch();

    setupCategoryFilter();

});
