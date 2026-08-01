/* ====================================
   TRENDORAHUB GADGETS PAGE JS
==================================== */

"use strict";


document.addEventListener("DOMContentLoaded", () => {

    initializeGadgetsPage();

});


function initializeGadgetsPage(){

    setupSmoothScrolling();

    setupProductAnimation();

    setupLoadMoreButton();

    setupNewsletter();

}


/* ====================================
   SMOOTH SCROLL
==================================== */


function setupSmoothScrolling(){

    const links = document.querySelectorAll('a[href^="#"]');


    links.forEach(link => {


        link.addEventListener("click", function(e){


            const target = document.querySelector(
                this.getAttribute("href")
            );


            if(!target) return;


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });


        });


    });


}



/* ====================================
   PRODUCT ANIMATION
==================================== */


function setupProductAnimation(){


    const cards = document.querySelectorAll(
        ".product-card"
    );


    const observer = new IntersectionObserver(

        entries => {


            entries.forEach(entry => {


                if(entry.isIntersecting){


                    entry.target.style.opacity="1";

                    entry.target.style.transform=
                    "translateY(0)";


                }


            });


        },

        {

            threshold:0.15

        }


    );



    cards.forEach(card=>{


        card.style.opacity="0";

        card.style.transform=
        "translateY(40px)";

        card.style.transition=
        "all .6s ease";


        observer.observe(card);


    });


}
/* ====================================
   LOAD MORE BUTTON
==================================== */


function setupLoadMoreButton(){

    const loadBtn = document.querySelector(".load-btn");


    if(!loadBtn) return;


    loadBtn.addEventListener("click",()=>{


        loadBtn.innerHTML =
        "More Products Coming Soon...";


        loadBtn.disabled = true;


        loadBtn.style.opacity="0.7";


    });


}



/* ====================================
   NEWSLETTER SYSTEM
==================================== */


function setupNewsletter(){


    const form =
    document.querySelector(".newsletter-form");



    if(!form) return;



    form.addEventListener("submit",(e)=>{


        e.preventDefault();



        const input =
        form.querySelector("input");



        if(input.value.trim()===""){


            showMessage(
            "Please enter your email"
            );


            return;


        }



        showMessage(
        "Thanks for subscribing!"
        );



        input.value="";


    });


}



/* ====================================
   NOTIFICATION MESSAGE
==================================== */


function showMessage(message){


    const box =
    document.createElement("div");



    box.className="notification";



    box.innerText=message;



    document.body.appendChild(box);



    setTimeout(()=>{


        box.classList.add("show");


    },100);



    setTimeout(()=>{


        box.classList.remove("show");



        setTimeout(()=>{


            box.remove();


        },300);



    },2500);



}
/* ====================================
   ACTIVE NAVIGATION
==================================== */


function setupActiveNavigation(){

    const sections =
    document.querySelectorAll("section[id]");


    const navLinks =
    document.querySelectorAll("nav a");



    window.addEventListener("scroll",()=>{


        let current="";



        sections.forEach(section=>{


            const top =
            section.offsetTop - 150;



            if(window.scrollY >= top){

                current =
                section.getAttribute("id");

            }


        });



        navLinks.forEach(link=>{


            link.classList.remove("active");



            if(
                link.getAttribute("href")
                === "#" + current
            ){

                link.classList.add("active");

            }


        });



    });


}



/* ====================================
   BACK TO TOP BUTTON
==================================== */


function setupBackToTop(){


    const button =
    document.createElement("button");



    button.innerHTML="↑";


    button.id="backToTop";



    document.body.appendChild(button);



    window.addEventListener("scroll",()=>{


        if(window.scrollY > 500){


            button.classList.add("show");


        }else{


            button.classList.remove("show");


        }


    });



    button.addEventListener("click",()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });



}



/* ====================================
   START EXTRA FEATURES
==================================== */


window.addEventListener("load",()=>{


    setupActiveNavigation();


    setupBackToTop();


});

// =====================================
// Load Gadget Products
// =====================================

async function loadGadgetProducts() {

    const productGrid = document.querySelector(".product-grid");

    if (!productGrid) return;

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .eq("main_category", "Gadgets")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Supabase Error:", error);

        return;

    }

    productGrid.innerHTML = "";

    data.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card">

            <img src="${product.main_image}" alt="${product.product_name}">

            <h3>${product.product_name}</h3>

            <p>${product.description}</p>

            <a href="store-system/store-product.html?id=${product.product_id}" class="buy-btn">

                View Product

            </a>

        </div>

        `;

    });

}

loadGadgetProducts();
