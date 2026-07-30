"use strict";

/* ==========================================
   TrendoraHub Store Product Script
========================================== */


document.addEventListener("DOMContentLoaded", function(){

    loadProduct();

});



/* ==========================================
   Load Product
========================================== */


function loadProduct(){


    const params =
    new URLSearchParams(window.location.search);



    const productId =
    params.get("id");



    if(!productId){

        console.log("No Product ID Found");

        return;

    }



    const products =
    JSON.parse(localStorage.getItem("products")) || [];



    const product =
    products.find(function(item){

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


    const title =
    document.getElementById("product-title");


    const category =
    document.getElementById("product-category");


    const description =
    document.getElementById("product-description");


    const price =
    document.getElementById("product-price");


    const image =
    document.getElementById("main-product-image");


    const button =
    document.getElementById("product-link");



    if(title){

        title.innerText = product.name;

    }



    if(category){

        category.innerText = product.mainCategory;

    }



    if(description){

        description.innerText = product.description;

    }



    if(price){

        price.innerText = product.price;

    }



    if(image){

        image.src = product.image;

    }



    if(button){

        button.href = product.affiliate;

    }



    loadGallery(product);

    loadVideo(product);

    loadFeatures(product);

    loadExtraInformation(product);


}

// ==========================================
// Product Gallery
// ==========================================


function loadGallery(product){


    const galleryImages =
    document.querySelectorAll(".gallery-image");



    if(!galleryImages.length){

        return;

    }



    galleryImages.forEach(function(img,index){


        if(product.gallery && product.gallery[index]){


            img.src =
            product.gallery[index];


            img.style.display =
            "block";


        }

        else{


            img.removeAttribute("src");


            img.style.display =
            "none";


        }


    });


}



// ==========================================
// Product Video
// ==========================================


function loadVideo(product){


    const video =
    document.getElementById("product-video");



    if(!video){

        return;

    }



    if(product.video){


        video.src =
        product.video;


        video.style.display =
        "block";


    }

    else{


        video.style.display =
        "none";


    }


}



// ==========================================
// Product Features
// ==========================================


function loadFeatures(product){


    const featureList =
    document.getElementById("product-features-list");



    if(!featureList){

        return;

    }



    featureList.innerHTML = "";



    const features = [

        "Premium Quality Product",

        "Trending Product",

        "Fast Shipping Available",

        "Carefully Selected For Customers"

    ];



    features.forEach(function(feature){


        const li =
        document.createElement("li");


        li.innerText =
        feature;


        featureList.appendChild(li);


    });


}

// ==========================================
// Extra Information
// ==========================================


function loadExtraInformation(product){


    const extra =
    document.getElementById("product-extra-description");



    if(!extra){

        return;

    }



    extra.innerText =
    product.description;


}



// ==========================================
// Main Image Error Handling
// ==========================================


const mainImage =
document.getElementById("main-product-image");



if(mainImage){


    mainImage.addEventListener("error", function(){


        mainImage.style.display =
        "none";


    });


}



// ==========================================
// Lazy Loading
// ==========================================


document.querySelectorAll("img").forEach(function(img){


    img.loading =
    "lazy";


});



// ==========================================
// Console
// ==========================================


console.log(
"TrendoraHub Store Product Loaded Successfully"
);
