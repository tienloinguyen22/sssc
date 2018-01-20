const _initList = groupID => {
  $.ajax({
    url: "http://localhost:8080/group",
    method: "POST",
    data: {
      "group": groupID
    },
    success: res => {
      _getList(res)
    }
  })
}

const _getList = response => {
  var htmlResult = "";
  const res = JSON.parse(response)
  for (let i = 0; i < res.length; i++){
    htmlResult += `<div class="item col-xl-4 col-md-6">
                      <div  class="product is-gray">
                        <div class="image d-flex align-items-center justify-content-center">
                        <img src="${res[i].img}" alt="product" class="img-fluid">
                        </div>
                      <div class="title">
                      <small class="text-muted">${res[i].group == "0" ? "Shoes" : "Clothes"}</small>
                <a href="shopping/${res[i]._id}" >
                  <h3 class="h6 text-uppercase no-margin-bottom" class="dcm">${res[i].name}</h3>
                </a>
                </div>
              </div>
              </div>`
  }
  $("#list").html(htmlResult);
}

$(document).ready(() => {
  _initList(0);
}
)

$(".catalog").on("click", event => {
  _initList(event.currentTarget.getAttribute("id"))
})
