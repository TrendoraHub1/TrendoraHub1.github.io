"use strict";


document.addEventListener("DOMContentLoaded",()=>{

    initializeFashionPage();

});



function initializeFashionPage(){

    setupSmoothScrolling();

    setupRevealAnimation();

    setupBackToTop();

    setupNewsletter();

}




// Smooth scrolling

function setupSmoothScrolling(){

    const links = document.querySelectorAll('a[href^="#"]');


    links.forEach(link=>{


        link.addEventListener("click",function(e){


            const target = document.querySelector(
                this.getAttribute("href")
            );


            if(!target) return;


            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });


        });


    });


}





// Product animation

function setupRevealAnimation(){


    const cards = document.querySelectorAll(
        ".product-card"
    );


    const observer = new IntersectionObserver(
        
        entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    entry.target.style.opacity="1";

                    entry.target.style.transform="translateY(0)";


                }


            });


        },

        {

            threshold:0.15

        }

    );



    cards.forEach(card=>{


        card.style.opacity="0";

        card.style.transform="translateY(40px)";

        card.style.transition="all .7s ease";


        observer.observe(card);


    });


}
// Back To Top Button

function setupBackToTop(){


    const button = document.createElement("button");


    button.id = "backToTop";


    button.innerHTML = "↑";


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




// Newsletter Form

function setupNewsletter(){


    const form = document.querySelector(
        ".newsletter-form"
    );


    if(!form) return;



    form.addEventListener("submit",(e)=>{


        e.preventDefault();



        const input = form.querySelector("input");



        if(input.value.trim()===""){


            showMessage(
                "Please enter your email"
            );


            return;


        }



        showMessage(
            "Thanks for subscribing! 🚀"
        );



        input.value="";


    });


}




// Notification Message

function showMessage(message){


    const box = document.createElement("div");


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
// Active Navigation Highlight

function setupActiveNavigation(){


    const sections = document.querySelectorAll(
        "section"
    );


    const navLinks = document.querySelectorAll(
        "nav a"
    );



    window.addEventListener("scroll",()=>{


        let current="";


        sections.forEach(section=>{


            const sectionTop =
            section.offsetTop - 150;



            if(window.scrollY >= sectionTop){


                current = section.className;


            }


        });



        navLinks.forEach(link=>{


            link.classList.remove("active");


            if(link.getAttribute("href")
            .includes(current)){


                link.classList.add("active");


            }


        });


    });


}





// Image Loading Effect

function setupImageLoading(){


    const images =
    document.querySelectorAll("img");



    images.forEach(img=>{


        img.addEventListener("load",()=>{


            img.style.opacity="1";


        });


        img.style.opacity="0";


        img.style.transition=
        "opacity .5s ease";


    });


}





// Initialize Extra Features

window.addEventListener("load",()=>{


    setupActiveNavigation();


    setupImageLoading();


});

// =====================================
// Load Fashion Products
// =====================================

function loadFashionProducts(){

    const productGrid = document.querySelector(".product-grid");

    if(!productGrid) return;

    const products =
    JSON.parse(localStorage.getItem("products")) || [];

    const fashionProducts = products.filter(function(product){

        return product.mainCategory === "Fashion";

    });

    productGrid.innerHTML = "";

    fashionProducts.forEach(function(product){

        productGrid.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <a
            href="store-system/store-product.html?id=${product.id}"
            class="buy-btn">

            View Product

            </a>

        </div>

        `;

    });

}

loadFashionProducts();
