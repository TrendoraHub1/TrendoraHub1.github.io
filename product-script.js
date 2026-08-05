"use strict";

// =====================================
// Collection Hero Image System
// =====================================

const collectionHeroImages = {

    "smart-lifestyle.html":
    "assets/images/product-1.webp",

    "mens-fashion.html":
    "assets/images/product-2.webp",

    "womens-fashion.html":
    "assets/images/product-3.webp",

    "smart-home.html":
    "assets/images/product-4.webp",

    "beauty-lifestyle.html":
    "assets/images/product-5.webp",

    "travel-outdoor.html":
    "assets/images/product-6.webp",

    "smart-accessories.html":
    "assets/images/product-7.webp"

};


const currentFile =
window.location.pathname.split("/").pop();


const heroImage =
collectionHeroImages[currentFile];


if(heroImage){

    const heroSection =
    document.querySelector(".product-hero");


    if(heroSection){

        heroSection.style.backgroundImage =
        `url('${heroImage}')`;

    }

}

/* =====================================
   TrendoraHub Collection Category Script
===================================== */

const featuredGrid = document.querySelector(".featured-grid");
const loadMoreBtn = document.querySelector(".load-btn");

let allProducts = [];

async function loadCollectionProducts() {

    const { data, error } = await supabaseClient
        .from("products")
        .select("*");

    if (error) {

        console.error(error);
        return;

    }

    allProducts = data || [];

    filteredProducts = allProducts.filter(product =>

        product.collection_category === currentCollection

    );

    renderProducts();

}

loadCollectionProducts();

let filteredProducts = [];
let visibleProducts = 6;

/* =====================================
   Collection Category Detection
===================================== */

const pageCollectionMap = {

    "smart-lifestyle.html":
    "Smart Lifestyle Gadgets",

    "mens-fashion.html":
    "Premium Men's Fashion",

    "womens-fashion.html":
    "Premium Women's Fashion",

    "smart-home.html":
    "Smart Home Essentials",

    "beauty-lifestyle.html":
    "Beauty & Lifestyle",

    "travel-outdoor.html":
    "Travel Outdoor Essentials",

    "smart-accessories.html":
    "Lifestyle Essentials"

};

const currentPage =
window.location.pathname.split("/").pop();

const currentCollection =
pageCollectionMap[currentPage] || "";

filteredProducts = allProducts.filter(product =>

    product.collection_category === currentCollection

);

/* =====================================
   Render Products
===================================== */

function renderProducts() {

    if (!featuredGrid) return;

    featuredGrid.innerHTML = "";

    const productsToShow = filteredProducts.slice(0, visibleProducts);

    productsToShow.forEach(product => {

        featuredGrid.innerHTML += `

       <div class="featured-card">

    <img src="${product.main_image}" alt="${product.product_name}">

    <div class="featured-content">

        <h3>${product.product_name}</h3>

        <p>${product.description}</p>

        <a href="store-system/store-product.html?id=${product.product_id}" class="hero-btn">
            View Product
        </a>

    </div>

</div>

        `;

    });

    if (loadMoreBtn) {

        if (visibleProducts >= filteredProducts.length) {

            loadMoreBtn.style.display = "none";

        } else {

            loadMoreBtn.style.display = "inline-block";

        }

    }

}

/* =====================================
   Load More
===================================== */

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", () => {

        visibleProducts += 6;

        renderProducts();

    });

}

/* =====================================
   Initial Load
===================================== */

renderProducts();
