const readFile=(path)=>{
    let xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",path,false);
    xmlhttp.send();
    let obj=JSON.parse(xmlhttp.responseText);
    return obj;
}

const _LANG =(content)=>{
    document.write(content);
}