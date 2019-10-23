class List {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  addTask(tasks) {
    this.tasks.push(tasks)
  }
}

class Task {
  constructor(text) {
    this.text = text;
  }
}

let lists = [];
let selectedList;
let n = 0;
let num = -1

retrieveList();


document.getElementById("addList")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("addListButton").click();
    }
  });

function addNewList() {
  let title = $("#addList").val();
  let newList = new List(title);
  printList(newList);
  $("#addList").val("");
  lists.push(newList);
  selectedList = newList;
  storeList()
}

function printList(el) {
  let noSpace = el.title.replace(/\s+/g, '');
  let tab = `<a class="nav-link" data-toggle="tab" href=#${noSpace} role="tab"
       aria-selected="false" onclick="changeList('${el.title}')">
      <span>${el.title}</span>
      <button type="button" class="close" aria-label="Close" id="close" onclick="deleteList(this, '${el.title}')">
        <span aria-hidden="true">&times</span>
      </button>
    </a>`
  $("#collapsibleNavbar").append(tab)
  let content = `<div class="tab-pane fade" role="tabpanel" id="${noSpace}">
      <div class="heading">
        <h3>${el.title}</h3>
        <button class="btn" id="addListItem"><i class="fas fa-plus-circle" onclick="addListItems('${el.title}')"></i></button>
      </div>
      <ul id="ul"></ul>
      <button class="btn btn-info" onclick="deleteChecked(this)">Clear checked</button>
    </div>`
  $("#v-pills-tabContent").append(content);
  $("#addList").val("");
};

function deleteList(el, page) {
  let noSpace = page.replace(/\s+/g, '');
  $(el).parent().fadeOut(function () {
    $(el).parent().remove();
    for (let i =0; i < lists.length; i++) {
      if (lists[i].title == page) {
        localStorage.removeItem("listNames")
      }
    }
  });
  $("#" + noSpace).remove();
}

function addListItems(el) {
  let newTask = new Task("task" + n);
  let taskName = "task" + n
  // n++;
  selectedList.addTask(newTask);
  printTask(el, null, taskName);
  storeList()

}

function printTask(el, val, taskName) {
  let noSpace = el.replace(/\s+/g, '');
  num++
  if (val == undefined) {
    val = ""
  }
  n++
  let content = `<li>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text checkbox-circle">
                <input type="checkbox" id="checkbox${n}">
                <label for="checkbox${n}"></label>
              </div>
            </div>
            <input type="text" class="form-control" onblur="storeTask('${taskName}')" value="${val}" id = ${taskName}>
            <button type="button" class="close" aria-label="Close" id="closeListItem" onclick="deleteListItems(this)">
              <span aria-hidden="true" class="">&times</span>
            </button>
          </div>
        </li>`;
  $("#" + noSpace + " ul").append(content);

}

function deleteListItems(el) {
  $(el).parent().animate({
    opacity: 0,
    right: "-=100"
  }, 600, function () {
    $(el).parent().remove();
    localStorage.removeItem("listNames");
  });
}

function deleteChecked(el) {
  let checked = $(el).siblings("ul").find("input:checked");
  if (checked) {
    for (let i = 0; i < checked.length; i++) {
      $(checked[i]).parentsUntil("li").animate({
        opacity: 0,
        right: "-=100"
      }, 600, function () {
        $(checked[i]).parentsUntil("li").remove();
      });
    }
  }
}

function changeList(el) {
  for (let i =0; i < lists.length; i++) {
    if (lists[i].title == el) {
      selectedList = lists[i]
    }
  }
}


function storeList() {
  localStorage.setItem("listNames", JSON.stringify(lists))

}

function retrieveList() {
  let allLists = JSON.parse(localStorage.getItem("listNames"));
  if (allLists == null) {
    return null;
  } else {
    allLists.forEach(i => {
      lists.push(i);
      let allTasks = i.tasks;
      selectedList = i;
      printList(i);
      allTasks.forEach(j => {
        console.log(i)
        printTask(i.title, j.text, j.text)
      })
    })
  }

}

function storeTask(el){
  console.log(el)
  for (let i = 0; i < selectedList.tasks.length; i++) {
    if (selectedList.tasks[i].text == el) {
      console.log(selectedList.tasks[i].text)
      selectedList.tasks[i].text= $("#" + el).val()
    }
  }
  storeList();
};
