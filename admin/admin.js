// =====================================
// TrendoraHub Admin Panel
// =====================================

const productForm = document.querySelector(".product-form");

const productList = document.getElementById("product-list");


// Page load hone par saved products show karna
let savedProducts = JSON.parse(localStorage.getItem("products")) || [];

savedProducts.forEach(function(product){

    productList.innerHTML += createProductCard(product);

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
