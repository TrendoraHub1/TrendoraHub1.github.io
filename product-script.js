"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializePage();

});

function initializePage(){

    setupSmoothScrolling();

    setupStickyHeader();

    setupRevealAnimation();

    setupBackToTop();

}

/* ===========================
   Smooth Scrolling
=========================== */

function setupSmoothScrolling(){

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link=>{

        link.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}

/* ===========================
   Sticky Header
=========================== */

function setupStickyHeader(){

    const header=document.querySelector("header");

    if(!header) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            header.style.background="rgba(17,17,17,.96)";

            header.style.backdropFilter="blur(12px)";

            header.style.boxShadow="0 10px 30px rgba(0,0,0,.25)";

        }

        else{

            header.style.background="#111";

            header.style.backdropFilter="none";

            header.style.boxShadow="0 10px 25px rgba(0,0,0,.15)";

        }

    });

}

/* ===========================
   Reveal Animation
=========================== */

function setupRevealAnimation(){

    const elements=document.querySelectorAll(

        ".featured-card,.why-card,.related-card,.intro-content,.product-hero-content"

    );

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0)";

            }

        });

    },{

        threshold:.15

    });

    elements.forEach(el=>{

        el.style.opacity="0";

        el.style.transform="translateY(40px)";

        el.style.transition="all .8s ease";

        observer.observe(el);

    });

}
/* ===========================
   Back To Top Button
=========================== */

function setupBackToTop(){

    const button = document.createElement("button");

    button.id = "backToTop";

    button.innerHTML = "↑";

    document.body.appendChild(button);

    button.style.position = "fixed";
    button.style.right = "25px";
    button.style.bottom = "25px";
    button.style.width = "50px";
    button.style.height = "50px";
    button.style.border = "none";
    button.style.borderRadius = "50%";
    button.style.background = "#00c8ff";
    button.style.color = "#fff";
    button.style.fontSize = "22px";
    button.style.cursor = "pointer";
    button.style.display = "none";
    button.style.boxShadow = "0 10px 25px rgba(0,0,0,.20)";
    button.style.transition = ".3s";

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 400){

            button.style.display = "block";

        }else{

            button.style.display = "none";

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ===========================
   Card Hover Animation
=========================== */

const cards = document.querySelectorAll(

    ".featured-card,.why-card,.related-card"

);

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/* ===========================
   Hero Button Animation
=========================== */

const heroButton = document.querySelector(".hero-btn");

if(heroButton){

    heroButton.addEventListener("mouseenter",()=>{

        heroButton.style.transform="scale(1.05)";

    });

    heroButton.addEventListener("mouseleave",()=>{

        heroButton.style.transform="scale(1)";

    });

}
/* ===========================
   Active Navigation
=========================== */

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

setupActiveNavigation();

/* ===========================
   Scroll Progress Bar
=========================== */

const progressBar = document.createElement("div");

progressBar.id = "scroll-progress";

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.width = "0%";
progressBar.style.background = "#00c8ff";
progressBar.style.zIndex = "9999";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ===========================
   Page Loading Animation
=========================== */

window.addEventListener("load",()=>{

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity .6s ease";

    setTimeout(()=>{

        document.body.style.opacity = "1";

    },100);

});

/* ===========================
   Console Message
=========================== */

console.log("TrendoraHub Product Page Loaded Successfully");

/* ===========================
   End Of File
=========================== */
