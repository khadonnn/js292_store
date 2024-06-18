let htmlModal=``
htmlModal+=`
    <!-- Button trigger modal -->
    <button type="button" id="btnShowModal" class="btn btn-primary btn-lg d-none" data-toggle="modal" data-target="#modelId">
      Launch
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalTitle">Title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body" id="ModalBody">
                    Body
                </div>
                <!--
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
                -->
            </div>
        </div>
    </div>
`
document.writeln(htmlModal);

const showModal=(tag)=>{
    console.dir(tag)
    //console.dir(tag.parentNode.parentNode)
    //console.dir(tag.parentNode.parentNode.outerHTML)
    //console.dir(tag.nextElementSibling.children[0].children[0]);
    //let tieuDe=tag.nextElementSibling.children[0].children[0].innerHTML;
    //ModalBody.innerHTML= tag.parentNode.parentNode.outerHTML;
    //ModalTitle.innerHTML=tieuDe
    //ModalBody.innerHTML=`Nội dung`
    // let tieuDe=tag.parentNode.parentNode.children[1].children[0].innerHTML;
    let tieuDe=tag.parentNode.children[2].children[0].innerHTML
    // img
    let html=tag.parentNode.parentNode.children[0].outerHTML 
    // Gia
    html+=`<br>`
    // html+=tag.parentNode.parentNode.children[1].children[1].outerHTML
    // html+=tag.parentNode.children[2].children[1].outerHTML
    // html+="<hr><div class='card-footer text-right'>";
    // html+=tag.parentNode.children[1].outerHTML
    // html+=tag.parentNode.children[3].children[0].innerHTML
    html+="</div>"
    console.log(html);
    ModalTitle.innerHTML=tieuDe;
    ModalBody.innerHTML=html;
    document.getElementById("btnShowModal").click();
    
}