"use strict";


document.addEventListener("DOMContentLoaded", () => {

    initializeBeautyPage();

});


function initializeBeautyPage(){

    setupSmoothScrolling();

    setupRevealAnimation();

    setupBackToTop();

    setupNewsletter();

}



// Smooth Scrolling

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

                behavior:"smooth"

            });


        });


    });


}



// Product Reveal Animation

function setupRevealAnimation(){


    const cards = document.querySelectorAll(
        ".product-card"
    );


    const observer = new IntersectionObserver(entries => {


        entries.forEach(entry => {


            if(entry.isIntersecting){


                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0)";


            }


        });


    },{

        threshold:0.15

    });



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




// Newsletter System

function setupNewsletter(){


    const form = document.querySelector(
        ".newsletter-form"
    );


    if(!form) return;



    form.addEventListener("submit",(e)=>{


        e.preventDefault();



        const input = form.querySelector("input");



        if(input.value.trim()===""){


            showNotification(
                "Please enter your email."
            );


            return;


        }



        showNotification(
            "Thanks for subscribing! 🚀"
        );


        input.value="";


    });


}





// Notification

function showNotification(message){


    const notification = document.createElement("div");


    notification.className="notification";


    notification.textContent=message;


    document.body.appendChild(notification);



    setTimeout(()=>{


        notification.classList.add("show");


    },100);



    setTimeout(()=>{


        notification.classList.remove("show");


        setTimeout(()=>{


            notification.remove();


        },300);



    },2500);



}
// Active Navigation

function setupActiveNavigation(){

    const navLinks = document.querySelectorAll("nav a");


    navLinks.forEach(link=>{


        link.addEventListener("click",()=>{


            navLinks.forEach(item=>{


                item.classList.remove("active");


            });



            link.classList.add("active");


        });


    });


}





// Image Loading Effect

function setupImageLoading(){


    const images = document.querySelectorAll("img");



    images.forEach(img=>{


        img.style.opacity="0";

        img.style.transition="opacity .5s ease";



        img.addEventListener("load",()=>{


            img.style.opacity="1";


        });


    });


}




// Product Hover Effects

function setupProductEffects(){


    const cards = document.querySelectorAll(
        ".product-card"
    );



    cards.forEach(card=>{


        card.addEventListener("mouseenter",()=>{


            card.style.transform=
            "translateY(-12px)";


        });



        card.addEventListener("mouseleave",()=>{


            card.style.transform=
            "translateY(0)";


        });



    });


}





// Run Extra Features

window.addEventListener("load",()=>{


    setupActiveNavigation();

    setupImageLoading();

    setupProductEffects();


});
