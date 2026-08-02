"use strict";

/* ==========================================
   TrendoraHub Store Product
   Supabase Version
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await loadProduct();

});

/* ==========================================
   Load Product From Supabase
========================================== */

async function loadProduct() {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id");

    if (!productId) {

        console.error("No Product ID Found");

        return;

    }

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("product_id", productId)
        .single();

    if (error) {

        console.error("Supabase Error:", error);

        return;

    }

    if (!data) {

        console.error("Product Not Found");

        return;

    }

    displayProduct(data);

}

/* ==========================================
   Display Product
========================================== */

function displayProduct(product) {

    const title = document.getElementById("product-title");
    const category = document.getElementById("product-category");
    const description = document.getElementById("product-description");
    const price = document.getElementById("product-price");
    const image = document.getElementById("main-product-image");
    const button = document.getElementById("product-link");
    const extra = document.getElementById("product-extra-description");

    if (title) {
        title.textContent = product.product_name || "";
    }

    if (category) {
        category.textContent = product.main_category || "";
    }

    if (description) {
        description.textContent = product.description || "";
    }

    if (price) {
        price.textContent = product.price || "";
    }

    if (image) {
        image.src = product.main_image || "";
        image.alt = product.product_name || "Product";
    }

    if (button) {
        button.href = product.affiliate_link || "#";
    }

    if (extra) {
        extra.textContent = product.description || "";
    }

    loadGallery(product);
    loadVideo(product);
    loadFeatures(product);

}

/* ==========================================
   Product Gallery
========================================== */

function loadGallery(product) {

    const galleryImages = document.querySelectorAll(".gallery-image");

    if (!galleryImages.length) return;

    let gallery = [];

    if (product.gallery_images) {

        try {
            gallery = JSON.parse(product.gallery_images);
        } catch (e) {
            console.error("Gallery Parse Error:", e);
            gallery = [];
        }

    }

    galleryImages.forEach((img, index) => {

        if (gallery[index]) {

            img.src = gallery[index];
            img.style.display = "block";

        } else {

            img.removeAttribute("src");
            img.style.display = "none";

        }

    });

}
/* ==========================================
   Product Video
========================================== */

function loadVideo(product) {

    const video = document.getElementById("product-video");

    if (!video) return;

    if (product.product_video) {

        video.src = product.product_video;
        video.style.display = "block";

    } else {

        video.style.display = "none";

    }

}

/* ==========================================
   Product Features
========================================== */

function loadFeatures(product) {

    const featureList = document.getElementById("product-features-list");

    if (!featureList) return;

    featureList.innerHTML = "";

    const features = [
        "Premium Quality Product",
        "Trending Product",
        "Fast Shipping Available",
        "Trusted Affiliate Product"
    ];

    features.forEach(feature => {

        const li = document.createElement("li");

        li.textContent = feature;

        featureList.appendChild(li);

    });

}

/* ==========================================
   Image Error Handling
========================================== */

const mainImage = document.getElementById("main-product-image");

if (mainImage) {

    mainImage.addEventListener("error", () => {

        mainImage.style.display = "none";

    });

}

/* ==========================================
   Lazy Loading
========================================== */

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

console.log("TrendoraHub Store Product Supabase Version Loaded");

/* ==========================================
   Helpers
========================================== */

function showProductError(message) {

    const title = document.getElementById("product-title");
    const description = document.getElementById("product-description");
    const button = document.getElementById("product-link");

    if (title) {
        title.textContent = "Product Not Available";
    }

    if (description) {
        description.textContent = message;
    }

    if (button) {
        button.style.display = "none";
    }

}

/* ==========================================
   Image Fallback
========================================== */

window.addEventListener("DOMContentLoaded", () => {

    const mainImage = document.getElementById("main-product-image");

    if (!mainImage) return;

    mainImage.addEventListener("error", () => {

        mainImage.src = "../assets/images/product-placeholder.png";

    });

});

/* ==========================================
   Console
========================================== */

console.log("TrendoraHub Store Product - Supabase Version Ready");
