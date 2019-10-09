let n = 0;
$(".left").sortable();

document.getElementById("addList")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("addListButton").click();
    }
  });


function addNewList() {
  let title = $("#addList").val();
  let tab = `<a class="nav-link" data-toggle="tab" href=#${title} role="tab"
       aria-selected="false">
      <span>${title}</span>
      <button type="button" class="close" aria-label="Close" id="close" onclick="deleteList(this, ${title})">
        <span aria-hidden="true">&times</span>
      </button>
    </a>`
  $("#collapsibleNavbar").append(tab)
  let content = `<div class="tab-pane fade" role="tabpanel" id="${title}">
      <div class="heading">
        <h3>${title}</h3>
        <button class="btn" id="addListItem"><i class="fas fa-plus-circle" onclick="addListItems(this)"></i></button>
      </div>
      <ul id="ul"></ul>
      <button class="btn btn-info" onclick="deleteChecked(this)">Clear checked</button>
    </div>`
  $("#v-pills-tabContent").append(content);
  $("#addList").val("")
}

function deleteList(el, page) {
  $(el).parent().fadeOut(function() {
    $(el).parent().remove();
  });
  $(page).remove();
  console.log(el)
}

function addListItems(el) {
  n++
  let content = `<li>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text checkbox-circle">
                <input type="checkbox" id="checkbox${n}">
                <label for="checkbox${n}"></label>
              </div>
            </div>
            <input type="text" class="form-control">
            <button type="button" class="close" aria-label="Close" id="closeListItem" onclick="deleteListItems(this)">
              <span aria-hidden="true" class="">&times</span>
            </button>
          </div>
        </li>`;
  $(el).parent().parent().siblings("ul").append(content);
}

function deleteListItems(el) {
  $(el).parent().animate({
    opacity: 0,
    right: "-=100"
  }, 600, function() {
    $(el).parent().remove();
  });
}

function deleteChecked(el) {
  let checked = $(el).siblings("ul").find("input:checked");
  if (checked) {
    for (let i = 0; i < checked.length; i++) {
      $(checked[i]).parentsUntil("li").animate( {
        opacity: 0,
        right: "-=100"
    }, 600, function() {
      $(checked[i]).parentsUntil("li").remove();
    });
    }
    console.log(checked)
  }
}


