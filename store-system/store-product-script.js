"use strict";

/* ==========================================
   TrendoraHub Store Product Script
========================================== */


document.addEventListener("DOMContentLoaded", function(){

    loadProduct();

});



/* ==========================================
   Load Product From LocalStorage
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
   Display Product Information
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

        title.innerText =
        product.name;

    }




    if(category){

        category.innerText =
        product.mainCategory;

    }




    if(description){

        description.innerText =
        product.description;

    }




    if(price){

        price.innerText =
        product.price;

    }




    if(image){

        image.src =
        product.image;

    }




    if(button){

        button.href =
        product.affiliate;

    }




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



    if(!galleryImages.length){

        return;

    }



    if(product.gallery && product.gallery.length > 0){



        galleryImages.forEach(function(img,index){



            if(product.gallery[index]){


                img.src =
                product.gallery[index];


            }


            else{


                img.src =
                product.image;


            }



        });



    }



    else{



        galleryImages.forEach(function(img){



            img.src =
            product.image;



        });



    }



}





/* ==========================================
   Product Video
========================================== */


function loadVideo(product){



    const video =
    document.getElementById("product-video");



    if(!video){

        return;

    }




    if(product.video){



        const source =
        video.querySelector("source");



        if(source){


            source.src =
            product.video;


            video.load();


        }



    }



    else{



        video.style.display =
        "none";



    }



}

/* ==========================================
   Product Features
========================================== */


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





/* ==========================================
   Extra Product Information
========================================== */


function loadExtraInformation(product){



    const extra =
    document.getElementById("product-extra-description");



    if(!extra){

        return;

    }



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


        buyButton.style.transform =
        "scale(1.05)";


    });



    buyButton.addEventListener("mouseleave", function(){


        buyButton.style.transform =
        "scale(1)";


    });



}

/* ==========================================
   Console Message
========================================== */


console.log(
    "TrendoraHub Store Product Loaded Successfully"
);
