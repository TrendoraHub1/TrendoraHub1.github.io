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

// =====================================
// Upload Gallery To Supabase
// =====================================

async function uploadGallery(files) {

    const galleryUrls = [];

    for (const file of files) {

        const fileName =
            Date.now() + "-" + Math.random().toString(36).substring(2) + "-" + file.name;

        const { error } =
            await supabaseClient.storage
                .from("product-gallery")
                .upload(fileName, file);

        if (error) {

            console.error(error);

            alert("Gallery upload failed.");

            continue;

        }

        const { data } =
            supabaseClient.storage
                .from("product-gallery")
                .getPublicUrl(fileName);

        galleryUrls.push(data.publicUrl);

    }

    return galleryUrls;

}


// =====================================
// Upload Video To Supabase
// =====================================

async function uploadVideo(file) {

    if (!file) return "";

    const fileName =
        Date.now() + "-" + file.name;

    const { error } =
        await supabaseClient.storage
            .from("product-videos")
            .upload(fileName, file);

    if (error) {

        console.error(error);

        alert("Video upload failed.");

        return "";

    }

    const { data } =
        supabaseClient.storage
            .from("product-videos")
            .getPublicUrl(fileName);

    return data.publicUrl;

}


// =====================================
// Publish Product
// =====================================

productForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const imageFile =
        document.getElementById("product-image").files[0];

    const galleryFiles =
        document.getElementById("product-gallery").files;

    const videoFile =
        document.getElementById("product-video").files[0];

    const image =
        imageFile
            ? await uploadImage(imageFile)
            : currentEditingImage;

    let gallery = [];

    if (galleryFiles.length > 0) {

        gallery =
            await uploadGallery(galleryFiles);

    } else {

        gallery =
            currentEditingGallery;

    }

    const video =
        videoFile
            ? await uploadVideo(videoFile)
            : currentEditingVideo;

    await saveProduct(
        image,
        gallery,
        video
    );

});

// =====================================
// Save Product To Supabase
// =====================================

async function saveProduct(image, gallery, video) {

    const product = {

    product_name:
        document.querySelectorAll('input[type="text"]')[0].value,

    price:
        document.querySelectorAll('input[type="text"]')[1].value,

    affiliate_link:
        document.querySelector('input[type="url"]').value,

    main_category:
        document.querySelectorAll("select")[0].value,

    collection_category:
        document.querySelectorAll("select")[1].value,

    description:
        document.querySelector("textarea").value,

    main_image: image,

    gallery_images: gallery,

    product_video: video

};


    let error;

    if (editingProductId === null) {

        ({ error } = await supabaseClient
            .from("products")
            .insert(product));

    } else {

        ({ error } = await supabaseClient
            .from("products")
            .update(product)
            .eq("id", editingProductId));

    }


    if (error) {

        console.error(error);

        console.log("DATABASE ERROR:", error);

        alert("Failed to save product.");

        return;

    }

    alert("Product saved successfully!");

    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";

    productForm.reset();

    await loadProducts();

    setNextProductId();

}


// =====================================
// Clear Form
// =====================================

function clearForm() {

    productForm.reset();

    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";

    setNextProductId();

}


// =====================================
// Console
// =====================================

console.log("TrendoraHub Admin Panel Loaded Successfully");


// =====================================
// Edit Product
// =====================================

editBtn.addEventListener("click", function () {

    const selected =
        document.querySelectorAll(".product-checkbox:checked");


    if (selected.length !== 1) {

        alert("Select one product.");

        return;

    }


    const id =
        selected[0].dataset.id;


    const product =
        products.find(item => item.id == id);


    if (!product) {

        alert("Product not found.");

        return;

    }


    editingProductId = product.id;


    currentEditingImage =
        product.main_image || "";


    currentEditingGallery =
        product.gallery_images || [];


    currentEditingVideo =
        product.product_video || "";



    document.getElementById("product-id").value =
        product.id;


    document.querySelectorAll('input[type="text"]')[0].value =
        product.product_name;


    document.querySelectorAll('input[type="text"]')[1].value =
        product.price;


    document.querySelector('input[type="url"]').value =
        product.affiliate_link || "";



    document.querySelectorAll("select")[0].value =
        product.main_category;



    document.querySelectorAll("select")[1].value =
        product.collection_category;



    document.querySelector("textarea").value =
        product.description || "";


});


// =====================================
// Delete Product From Supabase
// =====================================

deleteBtn.addEventListener("click", async function () {


    const selected =
        document.querySelectorAll(".product-checkbox:checked");



    if (selected.length === 0) {

        alert("Select product first.");

        return;

    }



    const ids = [];


    selected.forEach(item => {

        ids.push(item.dataset.id);

    });



    const { error } =
        await supabaseClient
            .from("products")
            .delete()
            .in("id", ids);



    if (error) {

        console.error(error);

        alert("Delete failed.");

        return;

    }



    alert("Product deleted successfully!");


    await loadProducts();


});


// =====================================
// Form Reset After Save
// =====================================

function resetProductForm() {

    productForm.reset();

    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";

    setNextProductId();

}


// =====================================
// Cancel Editing When Needed
// =====================================

function cancelEdit() {

    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";

    resetProductForm();

}


// =====================================
// Refresh Products Button Safety
// =====================================

async function refreshProducts() {

    await loadProducts();

    setNextProductId();

}


// =====================================
// Final Admin Panel Check
// =====================================

console.log(
    "TrendoraHub Admin Panel - Supabase Version Loaded Successfully"
);
