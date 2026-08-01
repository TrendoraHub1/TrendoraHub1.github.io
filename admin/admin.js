"use strict";

// =====================================
// TrendoraHub Admin Panel
// Supabase Version
// Part 1
// =====================================

const productForm = document.querySelector(".product-form");
const productList = document.getElementById("product-list");

const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");

let products = [];

let editingProductId = null;

let currentEditingImage = "";
let currentEditingGallery = [];
let currentEditingVideo = "";


// =====================================
// Start
// =====================================

initializeAdmin();


// =====================================
// Initialize
// =====================================

async function initializeAdmin() {

    await loadProducts();

    setNextProductId();

}


// =====================================
// Load Products From Supabase
// =====================================

async function loadProducts() {

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {

        console.error(error);

        alert("Failed to load products.");

        return;

    }

    products = data || [];

    renderProducts();

}


// =====================================
// Product ID Generator
// =====================================

function setNextProductId() {

    let maxNumber = 0;

    products.forEach(product => {

        const match = String(product.id).match(/(\d+)$/);

        if (match) {

            const number = parseInt(match[1]);

            if (number > maxNumber) {

                maxNumber = number;

            }

        }

    });

    document.getElementById("product-id").value =
        "PRD" + String(maxNumber + 1).padStart(3, "0");

}


// =====================================
// Render Product List
// =====================================

function renderProducts() {

    productList.innerHTML = "";

    [...products].reverse().forEach(product => {

        productList.innerHTML += `

<div class="product-preview-card">

<input
type="checkbox"
class="product-checkbox"
data-id="${product.id}"
>

<img
src="${product.main_image || ""}"
alt="${product.product_name}"
>

<h3>${product.product_name}</h3>

<p>ID: ${product.id}</p>

<p>Price: ${product.price}</p>

<p>Category: ${product.main_category}</p>

<p>${product.description}</p>

</div>

`;

    });

}


// =====================================
// Upload Image To Supabase
// =====================================

async function uploadImage(file) {

    if (!file) return "";

    const fileName =
        Date.now() + "-" + file.name;

    const { error } =
        await supabaseClient.storage
            .from("product-images")
            .upload(fileName, file);

    if (error) {

        console.error(error);

        alert("Image upload failed.");

        return "";

    }

    const { data } =
        supabaseClient.storage
            .from("product-images")
            .getPublicUrl(fileName);

    return data.publicUrl;

}

