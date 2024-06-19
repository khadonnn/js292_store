require('dotenv').config();
// Tham chiếu đến thư viện http
const http = require("http");
// Tham chiếu đến thư viện fs Xử lý tập tin
const fs = require("fs");
// Khai báo port Services
const port = process.env.PORT;
// Khai báo thư viện MongoDB
const db = require("./libs/mongoDB");
// Khai báo thư viện sendMail
const sendMail=require("./libs/sendMail");
// Khai báo thư viện upload img lên cloudinary
const imgCloud=require("./libs/cloudinaryImages");
const server = http.createServer((req, res) => {
    let method = req.method;
    let url = req.url;
    console.log(url);
    let kq = `Service Node - Method:${method} - Url:${url}`;
    // Cấp quyền
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'PUT, POST, OPTIONS,DELETE');
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (method == "GET") {
        let collectionName= db.collectionNames[url.replace("/","")]; 
        console.log(collectionName);
        if(collectionName!=undefined){
            res.writeHead(200, { "Content-Type": "text/json; charset:utf8" });
            db.getAll(collectionName).then((result) => {
                kq = JSON.stringify(result);
                res.end(kq)
            }).catch((err) => {
                kq = JSON.stringify(err);
                res.end(kq)
            })
            return
        }else if (url.match("\.png$")) {
            let imagePath = `images${url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `images/noImage.png`;
            }
            let fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            fileStream.pipe(res);
            return
        }else if(collectionName==undefined){
            res.end(kq)
        }
    } else if (method == "POST") {
        // Lấy dữ liệu từ client gởi về
        let noi_dung_nhan = ``;
        req.on("data", (data) => {
            noi_dung_nhan += data;
        })
        if (url == "/DATHANG") {
            req.on("end", () => {
                // Server xử lý dữ liệu từ Client gởi về trả kết quả về lại cho Client
                let dsDathang = JSON.parse(noi_dung_nhan);
                let ket_qua = { "Noi_dung": [] };
                dsDathang.forEach((item) => {
                    let filter = {
                        "Ma_so": item.key
                    }
                    let collectionName = (item.nhom == 1) ? "tivi" : (item.nhom == 2) ? "mobile" : "food";
                    db.getOne(collectionName, filter).then((result) => {
                        item.dathang.So_Phieu_Dat = result.Danh_sach_Phieu_Dat.length + 1;
                        result.Danh_sach_Phieu_Dat.push(item.dathang);
                        // Update
                        let capnhat = {
                            $set: { Danh_sach_Phieu_Dat: result.Danh_sach_Phieu_Dat }
                        }
                        let obj = {
                            "Ma_so": result.Ma_so,
                            "Update": true
                        }
                        db.updateOne(collectionName, filter, capnhat).then((result) => {
                            if (result.modifiedCount == 0) {
                                obj.Update = false

                            }
                            ket_qua.Noi_dung.push(obj);
                            console.log(ket_qua.Noi_dung)
                            if (ket_qua.Noi_dung.length == dsDathang.length) {
                                res.end(JSON.stringify(ket_qua));
                            }
                        }).catch((err) => {
                            console.log(err);
                        })

                    }).catch((err)=>{
                        console.log(err);
                    })

                });
            })
        } else if (url=="/LIENHE"){
            req.on("end",()=>{
                let thongTin = JSON.parse(noi_dung_nhan);
                let ket_qua={"Noi_dung":true}
                let _from=process.env.USERGMAIL;
                let _to=process.env.USERGMAIL;
                let _subject=thongTin.tieude;
                let _body=thongTin.noidung;
                sendMail.Goi_Thu(_from,_to,_subject,_body).then((result)=>{
                    console.log(result)
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    console.log(err)
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if(url=="/LOGIN"){
            req.on("end", ()=>{
                let ket_qua = {
                    "Noi_dung": true
                }
                let user = JSON.parse(noi_dung_nhan);
                let dieukien = {
                    $and: [
                        { "Ten_Dang_nhap": user.Ten_Dang_nhap },
                        { "Mat_khau": user.Mat_khau }
                    ]
                }
                db.getOne("user", dieukien).then(result => {
                    console.log(result)
                    ket_qua.Noi_dung = {
                        "Ho_ten": result.Ho_ten,
                        "Nhom": {
                            "Ma_so": result.Nhom_Nguoi_dung.Ma_so,
                            "Ten": result.Nhom_Nguoi_dung.Ten
                        }
                    };
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));

                }).catch(err => {
                    console.log(err);
                    ket_qua.Noi_dung = false;
                    res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                    res.end(JSON.stringify(ket_qua));
                })		
            });
        }else if(url=="/INSERT_MOBILE"){
            req.on("end",()=>{
                let ket_qua = {
                    "Noi_dung": true
                }
                let mobileNew = JSON.parse(noi_dung_nhan);
                db.insertOne("mobile",mobileNew).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung = false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if(url=="/imgMOBILE"){
            req.on("end",()=>{
                let img=JSON.parse(noi_dung_nhan);
                let ket_qua={"Noi_dung":true};
                //upload img in images he phuc vu---
                /*
                let kq=saveMedia(img.name, img.src)
                if(kq=="OK"){
                    res.writeHead(200, {'Content-Type':"text/josn;charset=utf-8"});
                    res.end(JSON.stringify(ket_qua));
                }else{
                    ket_qua.Noi_dung=false;
                    res.writeHead(200, {'Content-Type':"text/josn;charset=utf-8"});
                    res.end(JSON.stringify(ket_qua));
                }
                */
                //upload img in images cloudinary sever---
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/INSERT_TIVI"){
            req.on("end",()=>{
                let ket_qua = {
                    "Noi_dung": true
                }
                let mobileNew = JSON.parse(noi_dung_nhan);
                db.insertOne("tivi",mobileNew).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung = false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/imgTIVI"){
            req.on("end",()=>{
                let img=JSON.parse(noi_dung_nhan);
                let ket_qua={"Noi_dung":true};
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/INSERT_FOOD"){
            req.on("end",()=>{
                let ket_qua = {
                    "Noi_dung": true
                }
                let foodNew = JSON.parse(noi_dung_nhan);
                db.insertOne("food",foodNew).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung = false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/INSERT_USER"){
            req.on("end",()=>{
                let ket_qua = {
                    "Noi_dung": true
                }
                let mobileNew = JSON.parse(noi_dung_nhan);
                db.insertOne("user",mobileNew).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung = false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/imgFOOD"){
            req.on("end",()=>{
                let img=JSON.parse(noi_dung_nhan);
                let ket_qua={"Noi_dung":true};
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/imgUSER"){
            req.on("end",()=>{
                let img=JSON.parse(noi_dung_nhan);
                let ket_qua={"Noi_dung":true};
                imgCloud.UPLOAD_CLOUDINARY(img.name,img.src).then(result=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch(err=>{
                    console.log(err);
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else {
            res.end(kq)
        }

    } else if(method=="PUT"){
        let noi_dung_nhan = ``;
        req.on("data", (data) => {
            noi_dung_nhan += data;
        })
        if(url=="/UPDATE_MOBILE"){
            req.on("end",()=>{
                let mobileUpdate=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.updateOne("mobile",mobileUpdate.condition,mobileUpdate.update).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    console.log(err)
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if(url=="/UPDATE_TIVI"){
            req.on("end",()=>{
                let mobileUpdate=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.updateOne("tivi",mobileUpdate.condition,mobileUpdate.update).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    console.log(err)
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/UPDATE_FOOD"){
            req.on("end",()=>{
                let mobileUpdate=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.updateOne("food",mobileUpdate.condition,mobileUpdate.update).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    console.log(err)
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/UPDATE_USER"){
            req.on("end",()=>{
                let userUpdate=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.updateOne("user",userUpdate.condition,userUpdate.update).then((result)=>{
                    console.log(result);
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    console.log(err)
                    ket_qua.Noi_dung=false;
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }
        
    } else if(method=="DELETE"){
        let noi_dung_nhan = ``;
        req.on("data", (data) => {
            noi_dung_nhan += data;
        })
        if(url=="/DELETE_MOBILE"){
            req.on("end",()=>{
                let mobileDelete=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.deleteOne("mobile",mobileDelete).then((result)=>{
                    console.log(result)
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung=false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        } else if(url=="/DELETE_TIVI"){
            req.on("end",()=>{
                let mobileDelete=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.deleteOne("tivi",mobileDelete).then((result)=>{
                    console.log(result)
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung=false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/DELETE_FOOD"){
            req.on("end",()=>{
                let mobileDelete=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.deleteOne("food",mobileDelete).then((result)=>{
                    console.log(result)
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung=false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }else if(url=="/DELETE_USER"){
            req.on("end",()=>{
                let mobileDelete=JSON.parse(noi_dung_nhan);
                let ket_qua={
                    "Noi_dung":true
                }
                db.deleteOne("user",mobileDelete).then((result)=>{
                    console.log(result)
                    res.end(JSON.stringify(ket_qua));
                }).catch((err)=>{
                    ket_qua.Noi_dung=false;
                    console.log(err)
                    res.end(JSON.stringify(ket_qua));
                })
            })
        }
    }
    else {
        res.end(kq);
    }

})

server.listen(port, () => {
    console.log(`Service Runing http://localhost:${port}`)
})

// Media
let decodeBase64Image=(dataString)=> {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Error ...');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');//Buffer.from(matches[2], 'base64');

    return response;
}

let saveMedia=(Ten, Chuoi_nhi_phan)=>{
    var Kq = "OK"
    try {
        var Nhi_phan = decodeBase64Image(Chuoi_nhi_phan);
        var Duong_dan = "images//" + Ten
        fs.writeFileSync(Duong_dan, Nhi_phan.data);
    } catch (Loi) {
        Kq = Loi.toString()
    }
    return Kq
}