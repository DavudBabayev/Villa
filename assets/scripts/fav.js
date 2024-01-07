//////////MENU//////////

document.querySelector(".bi-list").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "block"
})
document.querySelector(".bi-x").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "none"
})

//////////DATA//////////

let url = "http://localhost:3000/fav/";

let card = document.querySelector(".card");
let searchInp = document.querySelector("#search");
let loadBtn = document.querySelector(".load")

let filterArr = [];
let coppy = [];

let maxl = 3;

async function getAll(){
    let res = await axios.get(url);
    let data = await res.data;
    coppy = data;

    card.innerHTML = '';

    filterArr = filterArr.length || searchInp.value ? filterArr : data;

    filterArr.slice(0, maxl).forEach(element =>{
        card.innerHTML += `
        <div>
        <img src="${element.img}" alt="">
        <p>${element.time}</p>
        <a href="#">${element.link}</a>
        <button class="delete" onclick="deleteCard(${element.id})">Delete</button>
        </div>
        `
    })
}

getAll();

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