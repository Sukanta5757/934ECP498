import { todayDeal } from "./todayDeal.js";

//banner slider section start
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let imageItem = document.querySelectorAll(".banner_item");
let startSlider = 0;
let endSlider = (imageItem.length -1) * 100;

prevBtn.addEventListener("click", controlPrev); // function call

//banner left slider function start
function controlPrev(){
    if(startSlider < 0){
        startSlider = startSlider + 100;

    }
    imageItem.forEach(Element =>{
        Element.style.transform = `translateX(${startSlider}%)`;
    })
};
//banner left slider function end

nextBtn.addEventListener("click",controlNext); // function call

    //banner right slider function start
    function controlNext(){
        if(startSlider >= -endSlider + 100){
            startSlider = startSlider - 100;
        }
        else{
            startSlider = 0;
        }
        imageItem.forEach(Element =>{
            Element.style.transform = `translateX(${startSlider}%)`;
        })
    };
    //banner right slider functon end

//banner auto slider function start
function renderAutoSilder(){
    if(startSlider >= -endSlider + 100){
        controlNext()
    }
    else{
        startSlider = 0;
    }
    imageItem.forEach(Element =>{
        Element.style.transform = `translateX(${startSlider}%)`;
    })
};
setInterval(renderAutoSilder,5000);
//banner auto slider function end
//banner slider section end

//today's deals sliders section start
console.log(todayDeal)
let todayDealProductListEl = document.querySelector(".today_deals_product_list")
console.log(todayDealProductListEl)

let todayDealProductHTML = ""

let todayDeallength = todayDeal.length

// today's deals slider for loops start
for (let i = 0; i < todayDeallength; i++) {
    // console.log(todayDeal[i])

    todayDealProductHTML += `
        <div class="today_deals_item">
            <div class="today_img">
                <img src=${todayDeal[i].img} />
            </div>
            <div class="discount">
                <a href="#">Up to ${todayDeal[i].discount}% off</a>
                <a href="#">${todayDeal[i].DealOfDay}</a>
            </div>
            <p>${todayDeal[i].desc}</p>
        </div>
    `
}

todayDealProductListEl.innerHTML = todayDealProductHTML
//  console.log(todayDealProductHTML)

// today's deals slider for loops end

let today_deal_btn_prevEl = document.getElementById("today_deal_btn_prev")
let today_deal_btn_nextEl = document.getElementById("today_deal_btn_next")
let today_deals_product_itemEl = document.querySelectorAll(".today_deals_item")

let startProduct = 0;

//today's deals left slider arrow function start
today_deal_btn_prevEl.addEventListener("click", () => {

   
    if(startProduct < 0){
        startProduct += 500
    }
    if(startProduct > -2000){
        today_deals_product_itemEl.forEach(el =>{
            el.style.transform = `translateX(${startProduct}%)`
        })
    }

})
//today's deals left slider arrow function end

//today's deals right slider arrow function start
today_deal_btn_nextEl.addEventListener("click", () => {
    // alert("next")
    
    if(startProduct > -1500){
        startProduct -= 500
    }

    today_deals_product_itemEl.forEach(el =>{
        el.style.transform = `translateX(${startProduct}%)`
    })
    
    
})
//today's deals right slider arrow function end
//today's deals section end
