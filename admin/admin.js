// =====================================
// TrendoraHub Admin Panel
// =====================================

const productForm = document.querySelector(".product-form");

const productList = document.getElementById("product-list");

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

    productList.innerHTML += `

<div class="product-preview-card">

    <h3>${product.name}</h3>

    <p><strong>ID:</strong> ${product.id}</p>

    <p><strong>Price:</strong> ${product.price}</p>

    <p><strong>Main Category:</strong> ${product.mainCategory}</p>

    <p><strong>Collection:</strong> ${product.collectionCategory}</p>

    <p>${product.description}</p>

</div>

`;

});

console.log(productList);

console.log(productList.innerHTML);
