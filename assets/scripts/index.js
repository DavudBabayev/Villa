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
        document.querySelector(".upbtn").style.right = '20px';
    }
    else {
        document.querySelector(".section2").style.opacity = "0";
        document.querySelector(".upbtn").style.right = '-100px';
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


///////////CRUD//////////

let url = "http://localhost:3000/data/";

let card = document.querySelector("#card");
let searchInp = document.querySelector("#search");
let filteredArr = [];
let copyArr = [];
let maxl = 3;

const load = document.querySelector(".load");

async function getAllCards() {

    let res = await axios.get(url)
    let data = await res.data;
    copyArr = data;

    card.innerHTML = "";

    filteredArr = filteredArr.length || searchInp.value ? filteredArr : data;

    filteredArr.slice(0, maxl).forEach(element =>{
        card.innerHTML += `
        <div>
        <img src="${element.img}" alt="">
        <p>${element.time}</p>
        <a href="#">${element.link}</a>
        <span>
        <a href="./details.html?id=${element.id}" class="details"><button>Details</button></a>
        <button class="delete" onclick="deleteCard(${element.id})">Delete</button>
        <button class="update" onclick="updateCard(${element.id})">Update</button>
        </span>
        <i onclick="addFavorite(${element.id})" class="bi bi-heart"></i>
    </div>
        `
    });
};

getAllCards();

/////Load/////

load.addEventListener("click", ()=>{
    show();
    moreORless();
    getAllCards();
});

function moreORless(){
    if(maxl >= copyArr.length){
        load.innerHTML = "Show Less";
    } else{
        load.innerHTML = "Load More";
    }
}

function show (){
    if (load.innerHTML == "Show Less"){
        maxl = 3;
    } else {
        maxl += 3;
    }
}

/////Search/////

searchInp.addEventListener("input", (e)=>{
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((element)=>{
        return element.link.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
    });
    getAllCards();
});

/////Delete/////

async function deleteCard(id){
    let res = await axios.delete(url + id)
    window.location.reload()
    return res.data;
}


/////Update/////

let form = document.querySelector("form");
let fileInp = document.querySelector("#file");
let imagetxt = document.querySelector("#imagetxt");
let imageDiv = document.querySelector("#img2");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");
let updateDiv = document.querySelector(".updatediv");
let closeBtn = document.querySelector(".bi-x");

fileInp.addEventListener("change", () => {
    let src = fileInp.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = function (e) {
        imageDiv.src = e.target.result;
    };
});

closeBtn.addEventListener("click", () => {
    updateDiv.style.display = "none";
});

function updateCard(id) {
    updateDiv.style.display = "flex";

    axios.get(url + id).then(res => {
        nameInp.value = res.data.time;
        textInp.value = res.data.link;
        imageDiv.src = res.data.img;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        axios.patch(url + id, {
            img: imageDiv.src,
            time: nameInp.value,
            link: textInp.value
        }).then(() => {
            getAll();
            updateDiv.style.display = "none";
        });
    });
}