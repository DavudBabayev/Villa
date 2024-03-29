let url = "http://localhost:3000/data/";

let form = document.querySelector("form");
let fileInp = document.querySelector("#file");
let imageDiv = document.querySelector("#img2");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");

fileInp.addEventListener("change", () => {
    let src = fileInp.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = function (e) {
        imageDiv.src = e.target.result
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let objetc = {}

    let src = fileInp.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        objetc = {
            img: e.target.result,
            time: nameInp.value,
            link: textInp.value
        }
        axios.post(url, objetc).then(res => {
           console.log(res.data);
        });
    }
    console.log(objetc);
    reader.readAsDataURL(src);
    window.location = "./index.html"
});