const urlService = `https://js292-store-he-phuc-vu.onrender.com`;
const urlImages = `https://res.cloudinary.com/dun3tupsv/image/upload/v1/images`;

const getAPI=(apiName)=> {
    return new Promise((resolve, reject) => {
        const Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            let Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            resolve(Doi_tuong_Kq)
        }
        let endPoint = apiName
        Xu_ly_HTTP.open("GET", `${urlService}/${endPoint}`)
        Xu_ly_HTTP.send()
    })
}

const apiDathang=(donDathang)=>{
    return new Promise((resolve, reject) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            resolve(Du_lieu)
        }
        let endPoint = 'DATHANG';
        
        Xu_ly_HTTP.open("POST", `${urlService}/${endPoint}`)
        Xu_ly_HTTP.send(JSON.stringify(donDathang))
    })
}

const apiLienhe=(thongTin)=>{
    return new Promise((resolve, reject) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            resolve(Du_lieu)
        }
        let endPoint = 'LIENHE';
        
        Xu_ly_HTTP.open("POST", `${urlService}/${endPoint}`)
        Xu_ly_HTTP.send(JSON.stringify(thongTin))
    })
}