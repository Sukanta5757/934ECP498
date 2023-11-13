import { todayDeal } from "./todayDeal.js";

//slider content
let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let imageItem = document.querySelectorAll(".carousel-item");
let startSlider = 0;
let endSlider = (imageItem.length -1) * 100;

prevBtn.addEventListener("click", controlPrev);

//left slider function
function controlPrev(){
    if(startSlider < 0){
        startSlider = startSlider + 100;

    }
    imageItem.forEach(Element =>{
        Element.style.transform = `translateX(${startSlider}%)`;
    })
};
nextBtn.addEventListener("click",controlNext);

    //right slider function
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

    //auto slider function
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


//today deals sliders
console.log(todayDeal)
let todayDealProductListEl = document.querySelector(".today_deals_product_list")
console.log(todayDealProductListEl)

let todayDealProductHTML = ""

let todayDeallength = todayDeal.length

for (let i = 0; i < todayDeallength; i++) {
    // console.log(todayDeal[i])

    todayDealProductHTML += `
        <div class="today_deals_item">
            <div class="todayDeals_product_image">
                <img src=${todayDeal[i].img} />
            </div>
            <div class="discount_Contaienr">
                <a href="#">Up to ${todayDeal[i].discount}% off</a>
                <a href="#">${todayDeal[i].DealOfDay}</a>
            </div>
            <p>${todayDeal[i].desc}</p>
        </div>
    `
}

todayDealProductListEl.innerHTML = todayDealProductHTML
//  console.log(todayDealProductHTML)

let today_deal_btn_prevEl = document.getElementById("today_deal_btn_prev")
let today_deal_btn_nextEl = document.getElementById("today_deal_btn_next")
let today_deals_product_itemEl = document.querySelectorAll(".today_deals_item")

let startProduct = 0;


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

today_deal_btn_nextEl.addEventListener("click", () => {
    // alert("next")
    
    if(startProduct > -1500){
        startProduct -= 500
    }

    today_deals_product_itemEl.forEach(el =>{
        el.style.transform = `translateX(${startProduct}%)`
    })
    
    
})
