"use strict";

// =====================================
// TrendoraHub Admin Panel
// Supabase Final Version
// Part 1
// =====================================


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

let products = [];

let editingProductId = null;

let currentEditingImage = "";

let currentEditingGallery = [];

let currentEditingVideo = "";


// =====================================
// Start Admin Panel
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    initializeAdmin();

});


// =====================================
// Initialize
// =====================================

async function initializeAdmin(){

    await loadProducts();

    generateProductId();

}



// =====================================
// Load Products
// =====================================

async function loadProducts(){

    const { data, error } =
    await supabaseClient
    .from("products")
    .select("*")
    .order("id", { ascending:false });



    if(error){

        console.error(
            "LOAD ERROR:",
            error
        );

        alert(
            "Failed to load products."
        );

        return;

    }



    products = data || [];


    renderProducts();

}



// =====================================
// Generate Product Display ID
// =====================================

function generateProductId(){

    let max = 0;


    products.forEach(product=>{


        const number = product.product_id
? Number(product.product_id.replace("PRD",""))
: 0;



        if(number > max){

            max = number;

        }


    });



    const next =
    max + 1;



    const id =
    "PRD" +
    String(next).padStart(3,"0");



    const input =
    document.getElementById("product-id");



    if(input){

        input.value = id;

    }


}



// =====================================
// Render Products
// =====================================

function renderProducts(){

    if(!productList) return;



    productList.innerHTML = "";



    products.forEach(product=>{


        productList.innerHTML += `


<div class="product-preview-card">


<input

type="checkbox"

class="product-checkbox"

data-id="${product.id}"

>


<img

src="${product.main_image || ""}"

alt="product"

>


<h3>

${product.product_name || ""}

</h3>



<p>
Product ID:
${product.product_id || ""}
</p>



<p>

Price:
${product.price || ""}

</p>



<p>

Category:
${product.main_category || ""}

</p>



<p>

${product.description || ""}

</p>



</div>


`;



    });


}



// =====================================
// Upload File Helper
// =====================================

async function uploadFile(bucket,file){


    if(!file){

        return "";

    }



   const safeName = file.name
    .replace(/[^a-zA-Z0-9.]/g, "-");


const fileName =
    Date.now() + "-" + safeName;



    const { error } =

    await supabaseClient
    .storage
    .from(bucket)
    .upload(
        fileName,
        file
    );



    if(error){


        console.error(
            "UPLOAD ERROR:",
            error
        );


        return "";

    }



    const { data } =

    supabaseClient
    .storage
    .from(bucket)
    .getPublicUrl(
        fileName
    );



    return data.publicUrl;


}

// =====================================
// Upload Multiple Gallery Images
// =====================================

async function uploadGallery(files){


    const urls = [];



    for(const file of files){


        const url =

        await uploadFile(
            "product-gallery",
            file
        );



        if(url){

            urls.push(url);

        }


    }



    return urls;


}



// =====================================
// Publish Product
// =====================================

productForm.addEventListener(
"submit",
async function(event){


event.preventDefault();



const imageFile =

document.getElementById(
"product-image"
).files[0];



const galleryFiles =

document.getElementById(
"product-gallery"
).files;



const videoFile =

document.getElementById(
"product-video"
).files[0];





let image =
currentEditingImage;



let gallery =
currentEditingGallery;



let video =
currentEditingVideo;




// Upload Main Image

if(imageFile){


    image =
    await uploadFile(
        "product-images",
        imageFile
    );


}



// Upload Gallery

if(galleryFiles.length > 0){

    gallery =
    await uploadGallery(
        galleryFiles
    );
    
}

// Upload Video

if(videoFile){


    video =
    await uploadFile(
        "product-videos",
        videoFile
    );


}



await saveProduct(
image,
gallery,
video
);



});





// =====================================
// Save Product
// =====================================

async function saveProduct(
image,
gallery,
video
){



const product = {

product_id:
document.getElementById("product-id").value,

product_name:
document.querySelectorAll('input[type="text"]')[0].value,



price:
document.getElementById("product-currency").value +
document.getElementById("product-price").value,


affiliate_link:

document.querySelector(
'input[type="url"]'
).value,



main_category:

document.querySelectorAll(
"select"
)[0].value,



collection_category:

document.querySelectorAll(
"select"
)[1].value,



description:

document.querySelector(
"textarea"
).value,



main_image:

image,



gallery_images:

gallery,



product_video:

video


};





let response;



if(editingProductId !== null){



response =

await supabaseClient
.from("products")
.update(product)
.eq("product_id", editingProductId)



}else{



response =

await supabaseClient
.from("products")
.insert(product);



}





if(response.error){


console.error(
"SAVE ERROR:",
response.error
);



alert(
"Failed to save product."
);



return;


}





alert(
"Product saved successfully!"
);



editingProductId = null;



currentEditingImage = "";

currentEditingGallery = [];

currentEditingVideo = "";



productForm.reset();



await loadProducts();



generateProductId();



}

// =====================================
// Edit Product
// =====================================

editBtn.addEventListener(
"click",
function(){



const selected =

document.querySelectorAll(
".product-checkbox:checked"
);




if(selected.length !== 1){


alert(
"Select one product."
);


return;


}





const id =

selected[0].dataset.id;





const product =

products.find(
item => item.id == id
);





if(!product){


alert(
"Product not found."
);


return;


}





editingProductId = product.product_id;



currentEditingImage =

product.main_image || "";

    document.getElementById("product-id").value =
product.product_id;



currentEditingGallery =

product.gallery_images || [];



currentEditingVideo =

product.product_video || "";


    
document.querySelectorAll(
'input[type="text"]'
)[0].value =

product.product_name || "";





const priceInput = document.getElementById("product-price");
const currencySelect = document.getElementById("product-currency");

const price = product.price || "$0";

currencySelect.value = price.charAt(0);
priceInput.value = price.substring(1);





document.querySelector(
'input[type="url"]'
).value =

product.affiliate_link || "";





document.querySelectorAll(
"select"
)[0].value =

product.main_category || "";





document.querySelectorAll(
"select"
)[1].value =

product.collection_category || "";





document.querySelector(
"textarea"
).value =

product.description || "";




alert(
"Product loaded for editing."
);



});





// =====================================
// Delete Product
// =====================================

deleteBtn.addEventListener("click", async function () {

    const selected =
    document.querySelectorAll(".product-checkbox:checked");


    if(selected.length === 0){

        alert("Select product first.");

        return;

    }


    const id =
    selected[0].dataset.id;


    console.log("Deleting ID:", id);



    const { error } =
    await supabaseClient
    .from("products")
    .delete()
    .eq("id", id);



    if(error){

        console.error(
            "DELETE ERROR:",
            error
        );

        alert("Delete failed.");

        return;

    }



    alert(
        "Product deleted successfully!"
    );


    await loadProducts();


});




// =====================================
// Reset Form
// =====================================

function resetProductForm(){

    productForm.reset();

    document.getElementById("product-currency").value = "$";

    editingProductId = null;

    currentEditingImage = "";

    currentEditingGallery = [];

    currentEditingVideo = "";

    generateProductId();

}


// =====================================
// Cancel Edit
// =====================================

function cancelEdit(){



resetProductForm();



}

// =====================================
// Refresh Products
// =====================================

async function refreshProducts(){


    await loadProducts();


    generateProductId();


}





// =====================================
// Clear Selected Checkboxes
// =====================================

function clearSelection(){


    const checkboxes =

    document.querySelectorAll(
        ".product-checkbox"
    );



    checkboxes.forEach(box=>{


        box.checked = false;


    });


}





// =====================================
// Safety Check Before Leaving Edit
// =====================================

window.addEventListener(
"beforeunload",
function(){


    editingProductId = null;


});





// =====================================
// Final Console
// =====================================

console.log(
"TrendoraHub Admin Panel Supabase Final Version Loaded Successfully"
);
