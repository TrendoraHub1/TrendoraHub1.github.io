"use strict";

/* =====================================
   TrendoraHub Admin Panel
   Supabase Final Version
   Currency Update Version
   Part 1
===================================== */


/* =====================================
   Elements
===================================== */

const productForm = document.querySelector(".product-form");

const productList = document.getElementById("product-list");

const deleteBtn = document.getElementById("delete-btn");

const editBtn = document.getElementById("edit-btn");


/* =====================================
   Variables
===================================== */

let products = [];

let editingProductId = null;

let currentEditingImage = "";

let currentEditingGallery = [];

let currentEditingVideo = "";



/* =====================================
   Start Admin Panel
===================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

    initializeAdmin();

});



/* =====================================
   Initialize
===================================== */

async function initializeAdmin(){

    await loadProducts();

    generateProductId();

}



/* =====================================
   Load Products
===================================== */

async function loadProducts(){


    const { data, error } =

    await supabaseClient
    .from("products")
    .select("*")
    .order(
        "id",
        {
            ascending:false
        }
    );



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



/* =====================================
   Generate Product ID
===================================== */

function generateProductId(){


    let max = 0;



    products.forEach(product=>{


        const number = product.product_id

        ? Number(
            product.product_id
            .replace("PRD","")
          )

        : 0;



        if(number > max){

            max = number;

        }


    });



    const next = max + 1;



    const id =

    "PRD" +
    String(next)
    .padStart(3,"0");



    const input =

    document.getElementById(
        "product-id"
    );



    if(input){

        input.value = id;

    }


}



/* =====================================
   Render Products
===================================== */

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

async function optimizeImage(file) {

    if (!file.type.startsWith("image/")) return file;

    return new Promise((resolve) => {

        const img = new Image();

        img.onload = () => {

            const canvas = document.createElement("canvas");

            const MAX_SIZE = 800;

            let width = img.width;
            let height = img.height;

            if (width > height) {

                if (width > MAX_SIZE) {

                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;

                }

            } else {

                if (height > MAX_SIZE) {

                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;

                }

            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(

                (blob) => {

                    resolve(
                        new File(
                            [blob],
                            file.name,
                            {
                                type: "image/jpeg"
                            }
                        )
                    );

                },

                "image/jpeg",
                0.65

            );

        };

        img.src = URL.createObjectURL(file);

    });

}

/* =====================================
   Upload File Helper
===================================== */

async function uploadFile(bucket, file){


    if(!file){

        return "";

    }



    const safeName = file.name
    .replace(/[^a-zA-Z0-9.]/g, "-");



    const fileName =

    Date.now()
    + "-"
    + safeName;



    const optimizedFile = await optimizeImage(file);

const { error } =

await supabaseClient
.storage
.from(bucket)
.upload(
    fileName,
    optimizedFile
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



/* =====================================
   Upload Gallery Images
===================================== */

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




/* =====================================
   Publish Product
===================================== */

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




    if(imageFile){


        image =

        await uploadFile(
            "product-images",
            imageFile
        );


    }




    if(galleryFiles.length > 0){


        gallery =

        await uploadGallery(
            galleryFiles
        );


    }




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





/* =====================================
   Save Product
===================================== */

async function saveProduct(
image,
gallery,
video
){



const selects =

document.querySelectorAll(
    "select"
);



const product = {


product_id:

document.getElementById(
    "product-id"
).value,



product_name:

document.querySelectorAll(
    'input[type="text"]'
)[0].value,



price:

document.getElementById(
    "product-currency"
).value +

document.getElementById(
    "product-price"
).value,



affiliate_link:

document.querySelector(
    'input[type="url"]'
).value,



main_category:

selects[1].value,



collection_category:

selects[2].value,



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

const oldProduct = products.find(
item => item.product_id === editingProductId
);

if(oldProduct){

    // Delete Old Main Image
    if(image && image !== oldProduct.main_image){

        const oldImageName =
        oldProduct.main_image.split("/").pop();

        await supabaseClient
        .storage
        .from("product-images")
        .remove([oldImageName]);

    }

    // Delete Old Gallery Images
    if(
        gallery.length > 0 &&
        oldProduct.gallery_images &&
        oldProduct.gallery_images.length > 0
    ){

        const oldGalleryFiles =
        oldProduct.gallery_images.map(url =>
            url.split("/").pop()
        );

        await supabaseClient
        .storage
        .from("product-gallery")
        .remove(oldGalleryFiles);

    }

    // Delete Old Video
    if(
        video &&
        video !== oldProduct.product_video &&
        oldProduct.product_video
    ){

        const oldVideoName =
        oldProduct.product_video.split("/").pop();

        await supabaseClient
        .storage
        .from("product-videos")
        .remove([oldVideoName]);

    }

}

response =

await supabaseClient
.from("products")
.update(product)
.eq(
    "product_id",
    editingProductId
);

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



document.getElementById(
    "product-currency"
).value = "$";



await loadProducts();



generateProductId();



}

/* =====================================
   Edit Product
===================================== */

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



editingProductId =

product.product_id;



currentEditingImage =

product.main_image || "";



currentEditingGallery =

product.gallery_images || [];



currentEditingVideo =

product.product_video || "";




document.getElementById(
"product-id"
).value =

product.product_id;




// Product Name

document.querySelectorAll(
'input[type="text"]'
)[0].value =

product.product_name || "";




// Currency + Price

const priceInput =

document.getElementById(
"product-price"
);



const currencySelect =

document.getElementById(
"product-currency"
);



const savedPrice =

product.price || "$0";



currencySelect.value =

savedPrice.charAt(0);



priceInput.value =

savedPrice.substring(1);




// Affiliate Link

document.querySelector(
'input[type="url"]'
).value =

product.affiliate_link || "";





// Categories

const selects =

document.querySelectorAll(
"select"
);



selects[1].value =

product.main_category || "";



selects[2].value =

product.collection_category || "";




// Description

document.querySelector(
"textarea"
).value =

product.description || "";



alert(
"Product loaded for editing."
);



});






/* =====================================
   Delete Product
===================================== */

deleteBtn.addEventListener(
"click",
async function(){


const selected =

document.querySelectorAll(
".product-checkbox:checked"
);



if(selected.length === 0){


alert(
"Select product first."
);


return;


}

const id =

selected[0].dataset.id;

const product = products.find(item => item.id == id);

if(product.main_image){

const fileName = product.main_image.split("/").pop();

await supabaseClient
.storage
.from("product-images")
.remove([fileName]);

}

const { error } =

await supabaseClient
.from("products")
.delete()
.eq(
"id",
id
);



if(error){


console.error(
"DELETE ERROR:",
error
);



alert(
"Delete failed."
);



return;


}



alert(
"Product deleted successfully!"
);



await loadProducts();



});

/* =====================================
   Reset Product Form
===================================== */

function resetProductForm(){


    productForm.reset();


    document.getElementById(
        "product-currency"
    ).value = "$";



    editingProductId = null;


    currentEditingImage = "";


    currentEditingGallery = [];


    currentEditingVideo = "";



    generateProductId();


}




/* =====================================
   Cancel Edit
===================================== */

function cancelEdit(){


    resetProductForm();


}




/* =====================================
   Refresh Products
===================================== */

async function refreshProducts(){


    await loadProducts();


    generateProductId();


}





/* =====================================
   Clear Selection
===================================== */

function clearSelection(){


    const checkboxes =

    document.querySelectorAll(
        ".product-checkbox"
    );



    checkboxes.forEach(box=>{


        box.checked = false;


    });



}




/* =====================================
   Safety Before Leaving
===================================== */

window.addEventListener(
"beforeunload",
function(){


    editingProductId = null;


});






/* =====================================
   Final Console
===================================== */

console.log(
"TrendoraHub Admin Panel Supabase Final Version Loaded Successfully"
);
