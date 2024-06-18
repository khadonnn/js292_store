const url = "https://api.cloudinary.com/v1_1/dun3tupsv/image/upload";
const urlImg= `https://res.cloudinary.com/dun3tupsv/image/upload/v1/images/`

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let name=file.name.split(".")[0]
        
        formData.append("file", file);
        formData.append("public_id", name);
        formData.append("folder", "images/");
        formData.append("upload_preset", "rtzr6utq");
        
        fetch(url, {
            method: "POST",
            body: formData
        }).then((response) => {
            
            return response.text();
        }).then((data) => {
            let img=JSON.parse(data);
            console.log(img);
            //document.getElementById("data").innerHTML += data;
            document.getElementById("data").innerHTML += Xuat(img);
        });
    }
});

const Xuat=(img)=>{
    let html=`
        <img src="${img.secure_url}" />
    `
    return html;
}