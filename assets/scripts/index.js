//////////MENU//////////

document.querySelector(".bi-list").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "block"
})
document.querySelector(".bi-x").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "none"
})

//////////SECTION 2//////////

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        document.querySelector(".section2").style.opacity = "1";
    }
    else {
        document.querySelector(".section2").style.opacity = "0";
    }
})

//////////KARUSEL//////////

const karusel = document.querySelector('.karusel');

let currIn = 0;
const imgs = document.querySelectorAll(".karusel img").length;

function updateKarusel(index){
    if(index < 0){
        currIn = imgs - 1;
    } else if(index >= imgs){
        currIn = 0;
    } else {
        currIn = index;
    }

    const newPosition = -currIn * (100 / imgs);
    karusel.style.transform = `translateX(${newPosition}%)`
}

function showPrev(){
    updateKarusel((currIn - 1 + imgs) % imgs)
}
function showNext(){
    updateKarusel((currIn + 1) % imgs)
}

setInterval(showNext, 5000);