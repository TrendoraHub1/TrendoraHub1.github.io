"use strict";


document.addEventListener("DOMContentLoaded", () => {


    loadProduct();


});





/* ==========================
   PRODUCT LOADER
========================== */


function loadProduct(){


    const params = new URLSearchParams(window.location.search);


    const productID = params.get("id");



    if(!productID){


        console.log("No Product ID Found");


        return;


    }





    const product = productData[productID];



    if(!product){


        console.log("Product Not Found");


        return;


    }





    document.getElementById("product-title").innerText = product.title;



    document.getElementById("product-category").innerText = product.category;



    document.getElementById("product-description").innerText = product.description;



    document.getElementById("product-price").innerText = product.price;



    document.getElementById("main-product-image").src = product.image;



    document.getElementById("product-link").href = product.link;



}







/* ==========================
   IMAGE ERROR HANDLING
========================== */


const mainImage = document.getElementById("main-product-image");



if(mainImage){


    mainImage.addEventListener("error",()=>{


        mainImage.src="../assets/images/image-not-found.png";


    });


}
 
/* ==========================
   LOAD PRODUCT GALLERY
========================== */


function loadGallery(product){


    const galleryImages = document.querySelectorAll(".gallery-image");



    if(!galleryImages.length) return;



    product.gallery.forEach((image,index)=>{


        if(galleryImages[index]){


            galleryImages[index].src = image;


        }


    });


}







/* ==========================
   LOAD PRODUCT VIDEO
========================== */


function loadVideo(product){


    const video = document.getElementById("product-video");



    if(!video) return;



    if(product.video){


        video.querySelector("source").src = product.video;


        video.load();


    }

    else{


        video.style.display="none";


    }


}







/* ==========================
   LOAD FEATURES
========================== */


function loadFeatures(product){


    const featureList = document.getElementById("product-features-list");



    if(!featureList) return;



    featureList.innerHTML="";



    product.features.forEach(feature=>{


        const li=document.createElement("li");


        li.innerText=feature;


        featureList.appendChild(li);


    });


}







/* ==========================
   LOAD EXTRA DESCRIPTION
========================== */


function loadExtraInformation(product){


    const extra=document.getElementById("product-extra-description");



    if(!extra) return;



    extra.innerText = product.extraDescription;



}







/* ==========================
   UPDATED PRODUCT LOADER
========================== */


function displayProduct(product){



    loadGallery(product);



    loadVideo(product);



    loadFeatures(product);



    loadExtraInformation(product);



}
 
/* ==========================
   COMPLETE PRODUCT LOADER UPDATE
========================== */


function loadProduct(){


    const params = new URLSearchParams(window.location.search);


    const productID = params.get("id");



    if(!productID){


        console.log("No Product Selected");


        return;


    }





    const product = productData[productID];



    if(!product){


        console.log("Product Data Not Found");


        return;


    }





    // Basic Information


    const title = document.getElementById("product-title");

    const category = document.getElementById("product-category");

    const description = document.getElementById("product-description");

    const price = document.getElementById("product-price");

    const image = document.getElementById("main-product-image");

    const button = document.getElementById("product-link");



    if(title){

        title.innerText = product.title;

    }


    if(category){

        category.innerText = product.category;

    }


    if(description){

        description.innerText = product.description;

    }


    if(price){

        price.innerText = product.price;

    }


    if(image){

        image.src = product.image;

        image.loading = "lazy";

    }


    if(button){

        button.href = product.link;

    }





    // Additional Sections


    displayProduct(product);



}









/* ==========================
   IMAGE LAZY LOADING
========================== */


document.querySelectorAll("img").forEach(img=>{


    img.loading="lazy";


});







/* ==========================
   PAGE ANIMATION
========================== */


window.addEventListener("load",()=>{


    document.body.style.opacity="0";


    document.body.style.transition="opacity .5s ease";



    setTimeout(()=>{


        document.body.style.opacity="1";


    },100);



});







/* ==========================
   BUTTON EFFECT
========================== */


const buyButton = document.querySelector(".buy-button");



if(buyButton){


    buyButton.addEventListener("mouseenter",()=>{


        buyButton.style.transform="scale(1.05)";


    });



    buyButton.addEventListener("mouseleave",()=>{


        buyButton.style.transform="scale(1)";


    });



}







console.log("TrendoraHub Store Product System Loaded Successfully");
