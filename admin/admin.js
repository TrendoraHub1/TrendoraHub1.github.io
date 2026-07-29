// =====================================
// TrendoraHub Admin Panel
// Part 1
// =====================================

const productForm = document.querySelector(".product-form");

productForm.addEventListener("submit", function(event){

    event.preventDefault();

    alert("Product Publish Button Working Successfully!");

});
// =====================================
// Read Form Data
// =====================================

const publishButton = document.querySelector(".product-form button");

publishButton.addEventListener("click", function(){

    const productName = document.querySelector('input[type="text"]').value;

    const productPrice = document.querySelectorAll('input[type="text"]')[1].value;

    const affiliateLink = document.querySelector('input[type="url"]').value;

    const mainCategory = document.querySelectorAll("select")[0].value;

    const collectionCategory = document.querySelectorAll("select")[1].value;

    const description = document.querySelector("textarea").value;

    console.log("Product Name:", productName);

    console.log("Price:", productPrice);

    console.log("Affiliate Link:", affiliateLink);

    console.log("Main Category:", mainCategory);

    console.log("Collection Category:", collectionCategory);

    console.log("Description:", description);

});
