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

let products =
JSON.parse(localStorage.getItem("products")) || [];

// =====================================
// Start
// =====================================

renderProducts();

setNextProductId();

// =====================================
// Auto Generate Product ID
// =====================================

function setNextProductId(){


    let maxNumber = 0;


    products.forEach(function(product){


        const match =
        product.id.match(/(\d+)$/);


        if(match){


            const number =
            parseInt(match[1], 10);


            if(number > maxNumber){


                maxNumber = number;


            }


        }


    });


    const nextNumber =
    maxNumber + 1;


    const nextId =
    "PRD" + String(nextNumber).padStart(3, "0");


    document.getElementById("product-id").value =
    nextId;


}

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


    currentEditingImage =
    product.image || "";


    currentEditingGallery =
    product.gallery || [];



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

function readFileAsDataURL(file){

    return new Promise(function(resolve, reject){

        const reader = new FileReader();

        reader.onload = function(){

            resolve(reader.result);

        };

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}


productForm.addEventListener("submit", function(event){

    event.preventDefault();


    const imageFile =
    document.getElementById("product-images").files[0];


    const galleryFiles =
    document.getElementById("product-gallery").files;


    const imagePromise =
    imageFile
    ? readFileAsDataURL(imageFile)
    : Promise.resolve(currentEditingImage);


    const galleryPromises = [];


    for(let i = 0; i < galleryFiles.length; i++){

        galleryPromises.push(
            readFileAsDataURL(galleryFiles[i])
        );

    }


    Promise.all([
        imagePromise,
        Promise.all(galleryPromises)
    ])
    .then(function(results){

        const image = results[0];

        const gallery = results[1];

        saveProduct(image, gallery);

    });


});


// =====================================
// Save Product
// =====================================

function saveProduct(image, gallery){


    const product = {


        id: document.getElementById("product-id").value,


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


        gallery:[]


    };



    if(gallery.length > 0){


        product.gallery = gallery;


    }

    else{


        product.gallery = currentEditingGallery;


    }

// =====================================
// Continue Save Product
// =====================================


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


    currentEditingGallery = [];



    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );



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


    setNextProductId();


}


// =====================================
// Save Products
// =====================================


function saveProducts(){


    localStorage.setItem(

        "products",

        JSON.stringify(products)

    );


}

// =====================================
// Future Features
// =====================================

// Firebase Connection
// Website Auto Sync
// Dynamic Product Page


console.log("TrendoraHub Admin Panel Loaded Successfully");
