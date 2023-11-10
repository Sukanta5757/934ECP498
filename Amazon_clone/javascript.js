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