"use strict";

// =====================================
// TrendoraHub Admin Panel
// =====================================

const productForm = document.querySelector(".product-form");
const productList = document.getElementById("product-list");

const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");
const productListBtn = document.getElementById("product-list-btn");

let products = JSON.parse(localStorage.getItem("products")) || [];

let editingProductId = null;

let currentEditingImage = "";
let currentEditingGallery = [];
let currentEditingVideo = "";


// =====================================
// Start
// =====================================

renderProducts();
setNextProductId();


// =====================================
// Product ID Generator
// =====================================

function setNextProductId(){

    let maxNumber = 0;

    products.forEach(product => {

        const match = product.id.match(/(\d+)$/);

        if(match){

            const number = parseInt(match[1]);

            if(number > maxNumber){

                maxNumber = number;

            }

        }

    });


    document.getElementById("product-id").value =
    "PRD" + String(maxNumber + 1).padStart(3,"0");

}

// =====================================
// Render Product List
// =====================================

function renderProducts(){

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `

        <div class="product-preview-card">

            <input 
            type="checkbox"
            class="product-checkbox"
            data-id="${product.id}"
            >

            <img 
            src="${product.image || ""}"
            alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>ID: ${product.id}</p>

            <p>Price: ${product.price}</p>

            <p>Category: ${product.mainCategory}</p>

            <p>${product.description}</p>

        </div>

        `;

    });

}


// =====================================
// Product List Button
// =====================================

productListBtn.addEventListener("click", function(){

    renderProducts();

});


// =====================================
// File Reader
// =====================================

function readFileAsDataURL(file){

    return new Promise((resolve,reject)=>{

        const reader = new FileReader();

        reader.onload = function(){

            resolve(reader.result);

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}

// =====================================
// Delete Product
// =====================================

deleteBtn.addEventListener("click", function(){

    const selected =
    document.querySelectorAll(".product-checkbox:checked");


    if(selected.length === 0){

        alert("Select product first.");

        return;

    }


    const ids = [];

    selected.forEach(item=>{

        ids.push(item.dataset.id);

    });


    products = products.filter(product=>{

        return !ids.includes(product.id);

    });


    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    renderProducts();

});


// =====================================
// Edit Product
// =====================================

editBtn.addEventListener("click", function(){

    const selected =
    document.querySelectorAll(".product-checkbox:checked");


    if(selected.length !== 1){

        alert("Select one product.");

        return;

    }


    const id =
    selected[0].dataset.id;


    const product =
    products.find(item=>item.id === id);



    editingProductId = product.id;


    currentEditingImage =
    product.image || "";


    currentEditingGallery =
    product.gallery || [];


    currentEditingVideo =
    product.video || "";



    document.getElementById("product-id").value =
    product.id;


    document.querySelectorAll('input[type="text"]')[0].value =
    product.name;


    document.querySelectorAll('input[type="text"]')[1].value =
    product.price;


    document.querySelector('input[type="url"]').value =
    product.affiliate;


    document.querySelectorAll("select")[0].value =
    product.mainCategory;


    document.querySelectorAll("select")[1].value =
    product.collectionCategory;


    document.querySelector("textarea").value =
    product.description;


});

// =====================================
// Publish Product
// =====================================

productForm.addEventListener("submit", async function(event){

    event.preventDefault();


    const imageFile =
    document.getElementById("product-image").files[0];


    const galleryFiles =
    document.getElementById("product-gallery").files;


    const videoFile =
    document.getElementById("product-video").files[0];



    const image =
    imageFile
    ? await readFileAsDataURL(imageFile)
    : currentEditingImage;



    let gallery = [];


    for(let i = 0; i < galleryFiles.length; i++){

        gallery.push(
            await readFileAsDataURL(galleryFiles[i])
        );

    }



    if(gallery.length === 0){

        gallery = currentEditingGallery;

    }



    const video =
    videoFile
    ? await readFileAsDataURL(videoFile)
    : currentEditingVideo;



    saveProduct(
        image,
        gallery,
        video
    );


});



// =====================================
// Save Product
// =====================================

function saveProduct(image,gallery,video){


    const product = {


        id:
        document.getElementById("product-id").value,


        name:
        document.querySelectorAll('input[type="text"]')[0].value,


        price:
        document.querySelectorAll('input[type="text"]')[1].value,


        affiliate:
        document.querySelector('input[type="url"]').value,


        mainCategory:
        document.querySelectorAll("select")[0].value,


        collectionCategory:
        document.querySelectorAll("select")[1].value,


        description:
        document.querySelector("textarea").value,


        image:image,


        gallery:gallery,


        video:video


    };



    if(editingProductId === null){

        products.push(product);

    }

    else{


        products =
        products.map(item=>{

            if(item.id === editingProductId){

                return product;

            }


            return item;

        });


    }



    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );



    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";



    renderProducts();

    productForm.reset();

    setNextProductId();


}

// =====================================
// Clear Form
// =====================================

function clearForm(){

    productForm.reset();

    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";

    setNextProductId();

}


// =====================================
// Save Products Backup
// =====================================

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}


// =====================================
// Console
// =====================================

console.log(
    "TrendoraHub Admin Panel Loaded Successfully"
);
