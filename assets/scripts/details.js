//////////MENU//////////

document.querySelector(".bi-list").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "block"
})
document.querySelector(".bi-x").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "none"
})


//////////DATA//////////

let id = new URLSearchParams (window.location.search).get("id");

let card = document.querySelector("#details");

let url = "http://localhost:3000/data/";

async function getCardById(id){
    let res = await axios.get(url + id);
    let data = await res.data;

    card.innerHTML+=`
    <div>
    <img src="${data.img}" alt="">
    <p>${data.time}</p>
    <a href="#">${data.link}</a>
    </div>
    `
}

getCardById(id);