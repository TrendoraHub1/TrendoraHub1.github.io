// =====================================
// TrendoraHub Admin Panel
// =====================================

const productForm = document.querySelector(".product-form");

const productList = document.getElementById("product-list");

let editingProductId = null;


// Page load hone par saved products show karna
let savedProducts = JSON.parse(localStorage.getItem("products")) || [];

savedProducts.forEach(function(product){

    productList.innerHTML += createProductCard(product);

});

// ==========================
// Delete Selected Products
// ==========================

const deleteBtn = document.getElementById("delete-btn");


deleteBtn.addEventListener("click", function(){

    let products = JSON.parse(localStorage.getItem("products")) || [];


    let selectedProducts = document.querySelectorAll(".product-checkbox:checked");


    let selectedIds = [];


    selectedProducts.forEach(function(checkbox){

        selectedIds.push(checkbox.dataset.id);

    });


    products = products.filter(function(product){

        return !selectedIds.includes(product.id);

    });


    localStorage.setItem("products", JSON.stringify(products));


    location.reload();


});

// ==========================
// Edit Selected Product
// ==========================

const editBtn = document.getElementById("edit-btn");


editBtn.addEventListener("click", function(){

    let selectedProducts = document.querySelectorAll(".product-checkbox:checked");


    if(selectedProducts.length !== 1){

        alert("Please select only one product to edit");

        return;

    }


    let productId = selectedProducts[0].dataset.id;


    let products = JSON.parse(localStorage.getItem("products")) || [];


    let product = products.find(function(item){

        return item.id === productId;

    });



    document.getElementById("product-id").value = product.id;


    document.querySelectorAll('input[type="text"]')[0].value = product.name;


    document.querySelectorAll('input[type="text"]')[1].value = product.price;


    document.querySelector('input[type="url"]').value = product.affiliate;


    document.querySelectorAll("select")[0].value = product.mainCategory;


    document.querySelectorAll("select")[1].value = product.collectionCategory;


    document.querySelector("textarea").value = product.description;



});

// Product Card Function

function createProductCard(product){

    return `

<div class="product-preview-card">


<input 
type="checkbox" 
class="product-checkbox"
data-id="${product.id}"
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



// Publish Product

productForm.addEventListener("submit", function(event){

    event.preventDefault();



    const product = {


        id: document.getElementById("product-id").value,


        name: document.querySelectorAll('input[type="text"]')[0].value,


        price: document.querySelectorAll('input[type="text"]')[1].value,


        affiliate: document.querySelector('input[type="url"]').value,


        mainCategory: document.querySelectorAll("select")[0].value,


        collectionCategory: document.querySelectorAll("select")[1].value,


        description: document.querySelector("textarea").value


    };



    console.log(product);



    // Local Storage me save karna

    let products = JSON.parse(localStorage.getItem("products")) || [];


    products.push(product);


    localStorage.setItem("products", JSON.stringify(products));



    // Screen par product show karna

    productList.innerHTML += createProductCard(product);



});
