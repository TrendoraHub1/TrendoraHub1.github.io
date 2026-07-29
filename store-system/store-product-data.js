"use strict";


const productData = {


    "smart-watch-demo": {


        title: "Premium Smart Watch Series",


        category: "Smart Accessories",


        price: "$99",


        image: "../assets/images/smart-watch-demo.png",


        gallery: [


            "../assets/images/smart-watch-demo-1.png",


            "../assets/images/smart-watch-demo-2.png",


            "../assets/images/smart-watch-demo-3.png"


        ],



        video: "../assets/videos/smart-watch-demo.mp4",



        description:

        "A premium smart watch designed with modern features, stylish appearance and smart technology for everyday lifestyle.",




        extraDescription:

        "This smart watch combines elegant design, fitness features and smart connectivity to provide a better digital experience.",




        features: [


            "Modern premium design",


            "Smart connectivity features",


            "Comfortable everyday use",


            "Suitable for work, fitness and lifestyle"


        ],




        link:

        "https://example.com"

    }



};
 
/* ==========================
   MORE PRODUCT EXAMPLES
========================== */


productData["wireless-earbuds-demo"] = {


    title: "Premium Wireless Earbuds",


    category: "Smart Accessories",


    price: "$79",


    image: "../assets/images/wireless-earbuds-demo.png",



    gallery: [

        "../assets/images/wireless-earbuds-demo-1.png",

        "../assets/images/wireless-earbuds-demo-2.png",

        "../assets/images/wireless-earbuds-demo-3.png"

    ],



    video: "../assets/videos/wireless-earbuds-demo.mp4",



    description:

    "Premium wireless earbuds with modern sound technology, comfortable design and everyday convenience.",



    extraDescription:

    "Perfect for music, calls and daily activities with a stylish compact design.",



    features: [

        "High quality audio experience",

        "Wireless connectivity",

        "Portable charging case",

        "Comfortable lightweight design"

    ],



    link:

    "https://example.com"


};








productData["smart-home-camera-demo"] = {


    title: "Smart Home Security Camera",


    category: "Smart Home Essentials",


    price: "$89",


    image: "../assets/images/smart-home-camera-demo.png",



    gallery: [

        "../assets/images/smart-home-camera-demo-1.png",

        "../assets/images/smart-home-camera-demo-2.png",

        "../assets/images/smart-home-camera-demo-3.png"

    ],



    video:

    "../assets/videos/smart-home-camera-demo.mp4",



    description:

    "A smart security camera designed to monitor your home with modern technology and easy control.",



    extraDescription:

    "Improve home security with a reliable smart monitoring solution suitable for everyday protection.",



    features: [

        "Smart monitoring system",

        "Modern compact design",

        "Easy installation",

        "Remote access support"

    ],



    link:

    "https://example.com"


};
 
/* ==========================
   DEFAULT PRODUCT TEMPLATE
========================== */


function createProduct({

    id,
    title,
    category,
    price,
    image,
    gallery,
    video,
    description,
    extraDescription,
    features,
    link

}){


    productData[id] = {


        title:title,


        category:category,


        price:price,


        image:image,


        gallery:gallery,


        video:video,


        description:description,


        extraDescription:extraDescription,


        features:features,


        link:link


    };


}







/* ==========================
   PRODUCT SYSTEM CHECK
========================== */


console.log("Total Products Loaded:",
Object.keys(productData).length);



console.log(
"TrendoraHub Product Database Ready"
);
