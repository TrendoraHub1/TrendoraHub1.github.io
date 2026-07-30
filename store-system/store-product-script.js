"use strict";

/* ==========================================
   TrendoraHub Store Product Script
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    loadProduct();

});

/* ==========================================
   Load Product
========================================== */

function loadProduct() {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id");

    if (!productId) {

        console.log("No Product ID Found");

        return;

    }

    const products =
        JSON.parse(localStorage.getItem("products")) || [];

    const product = products.find(function(item){

        return item.id === productId;

    });

    if(!product){

        console.log("Product Not Found");

        return;

    }

    displayProduct(product);

}

/* ==========================================
   Display Product
========================================== */

function displayProduct(product){

    document.getElementById("product-title").innerText =
    product.name;

    document.getElementById("product-category").innerText =
    product.mainCategory;

    document.getElementById("product-description").innerText =
    product.description;

    document.getElementById("product-price").innerText =
    product.price;

    document.getElementById("main-product-image").src =
    product.image;

    document.getElementById("product-link").href =
    product.affiliate;

    loadGallery(product);

    loadVideo(product);

    loadFeatures(product);

    loadExtraInformation(product);

}

/* ==========================================
   Product Gallery
========================================== */

function loadGallery(product){

    const galleryImages =
    document.querySelectorAll(".gallery-image");

    if(!galleryImages.length) return;

    // Agar gallery images saved hain
    if(product.gallery && product.gallery.length > 0){

        galleryImages.forEach(function(img,index){

            if(product.gallery[index]){

                img.src = product.gallery[index];

            }

            else{

                img.src = product.image;

            }

        });

    }

    // Agar gallery nahi hai
    else{

        galleryImages.forEach(function(img){

            img.src = product.image;

        });

    }

}

/* ==========================================
   Product Video
========================================== */

function loadVideo(product){

    const video =
    document.getElementById("product-video");

    if(!video) return;

    if(product.video){

        video.querySelector("source").src =
        product.video;

        video.load();

    }

    else{

        video.style.display = "none";

    }

}

/* ==========================================
   Product Features
========================================== */

function loadFeatures(product){

    const featureList =
    document.getElementById("product-features-list");

    if(!featureList) return;

    featureList.innerHTML = "";

    const features = [

        "Premium Quality",

        "Trending Product",

        "Fast Shipping",

        "Carefully Selected"

    ];

    features.forEach(function(feature){

        const li = document.createElement("li");

        li.innerText = feature;

        featureList.appendChild(li);

    });

}

/* ==========================================
   Extra Product Information
========================================== */

function loadExtraInformation(product){

    const extra =
    document.getElementById("product-extra-description");

    if(!extra) return;

    extra.innerText =
    product.description;

}

/* ==========================================
   Image Error Handling
========================================== */

const mainImage =
document.getElementById("main-product-image");

if(mainImage){

    mainImage.addEventListener("error", function(){

        mainImage.src =
        "../assets/images/image-not-found.png";

    });

}

/* ==========================================
   Lazy Loading Images
========================================== */

document.querySelectorAll("img").forEach(function(img){

    img.loading = "lazy";

});

/* ==========================================
   Page Animation
========================================== */

window.addEventListener("load", function(){

    document.body.style.opacity = "0";

    document.body.style.transition =
    "opacity .5s ease";

    setTimeout(function(){

        document.body.style.opacity = "1";

    },100);

});

/* ==========================================
   Buy Button Effect
========================================== */

const buyButton =
document.querySelector(".buy-button");

if(buyButton){

    buyButton.addEventListener("mouseenter", function(){

        buyButton.style.transform = "scale(1.05)";

    });

    buyButton.addEventListener("mouseleave", function(){

        buyButton.style.transform = "scale(1)";

    });

}

/* ==========================================
   Console
========================================== */

console.log("TrendoraHub Store Product Loaded Successfully");
