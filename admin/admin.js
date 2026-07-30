// =====================================
// TrendoraHub Admin Panel
// =====================================

"use strict";

// =====================================
// Elements
// =====================================

const productForm = document.querySelector(".product-form");
const productList = document.getElementById("product-list");
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");

// =====================================
// Variables
// =====================================

let editingProductId = null;

let currentEditingImage = "";

let currentEditingGallery = [];

let currentEditingVideo = "";

// =====================================
// Load Products
// =====================================

let products = JSON.parse(localStorage.getItem("products")) || [];

renderProducts();

// =====================================
// Render Products
// =====================================

function renderProducts(){

    productList.innerHTML = "";

    products.forEach(function(product){

        productList.innerHTML += createProductCard(product);

    });

}

// =====================================
// Product Card
// =====================================

function createProductCard(product){

    return `

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

        <p><strong>ID:</strong> ${product.id}</p>

        <p><strong>Price:</strong> ${product.price}</p>

        <p><strong>Main Category:</strong> ${product.mainCategory}</p>

        <p><strong>Collection:</strong> ${product.collectionCategory}</p>

        <p>${product.description}</p>

    </div>

    `;

}

// =====================================
// Delete Products
// =====================================

deleteBtn.addEventListener("click", function(){

    const selectedProducts =
    document.querySelectorAll(".product-checkbox:checked");

    if(selectedProducts.length === 0){

        alert("Please select at least one product.");

        return;

    }

    const selectedIds = [];

    selectedProducts.forEach(function(item){

        selectedIds.push(item.dataset.id);

    });

    products = products.filter(function(product){

        return !selectedIds.includes(product.id);

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

    const selectedProducts =
    document.querySelectorAll(".product-checkbox:checked");

    if(selectedProducts.length !== 1){

        alert("Please select only one product.");

        return;

    }

    const productId =
    selectedProducts[0].dataset.id;

    const product =
    products.find(function(item){

        return item.id === productId;

    });

    editingProductId = product.id;

currentEditingImage = product.image || "";

currentEditingGallery = product.gallery || [];

currentEditingVideo = product.video || "";

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

productForm.addEventListener("submit", function(event){

    event.preventDefault();

    const imageFile =
    document.getElementById("product-images").files[0];

    // =====================================
    // Image Selected
    // =====================================

    if(imageFile){

        const reader = new FileReader();

        reader.onload = function(){

            saveProduct(reader.result);

        };

        reader.readAsDataURL(imageFile);

    }

    // =====================================
    // No New Image (Editing)
    // =====================================

    else{

        saveProduct(currentEditingImage);

    }

});

// =====================================
// Save Product Function
// =====================================

function saveProduct(image){

    const galleryFiles =
    document.getElementById("product-gallery").files;

    const videoFile =
    document.getElementById("product-video").files[0];

    const product = {

        id: document.getElementById("product-id").value,

        name: document.querySelectorAll('input[type="text"]')[0].value,

        price: document.querySelectorAll('input[type="text"]')[1].value,

        affiliate: document.querySelector('input[type="url"]').value,

        mainCategory: document.querySelectorAll("select")[0].value,

        collectionCategory: document.querySelectorAll("select")[1].value,

        description: document.querySelector("textarea").value,

        image: image,

        gallery: [],

        video: ""

    };

}

    const gallery = [];

for(let i = 0; i < galleryFiles.length; i++){

    gallery.push(
        URL.createObjectURL(galleryFiles[i])
    );

}

if(gallery.length === 0){

    product.gallery = currentEditingGallery;

}else{

    product.gallery = gallery;

}

if(videoFile){

    product.video = URL.createObjectURL(videoFile);

}

    if(editingProductId === null){

        products.push(product);

    }

    else{

        products = products.map(function(item){

            if(item.id === editingProductId){

                return product;

            }

            return item;

        });

    }

    editingProductId = null;

    currentEditingImage = "";

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    renderProducts();

    productForm.reset();

}

// =====================================
// Utility Functions
// =====================================

function clearForm(){

    productForm.reset();

    editingProductId = null;

    currentEditingImage = "";

}

function saveProducts(){

    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );

}

// =====================================
// Future Features
// =====================================

// Video Upload
// Firebase Connection
// Website Auto Sync
// Dynamic Product Page
