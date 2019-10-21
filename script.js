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
let CURRENT_LIST_KEY = "";

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
  let tab = `<a class="nav-link" data-toggle="tab" href=#${el.title} role="tab"
       aria-selected="false">
      <span>${el.title}</span>
      <button type="button" class="close" aria-label="Close" id="close" onclick="deleteList(this, '${el.title}')">
        <span aria-hidden="true">&times</span>
      </button>
    </a>`
  $("#collapsibleNavbar").append(tab)
  let content = `<div class="tab-pane fade" role="tabpanel" id="${el.title}">
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
  $(el).parent().fadeOut(function () {
    $(el).parent().remove();
    localStorage.removeItem("listNames")
  });
  $("#" + page).remove();
}

function addListItems(el) {
  let newTask = new Task("task" + n);
  n++;
  selectedList.addTask(newTask);
  printTask(el);
  storeList()

}

function printTask(el) {
  n++
  let content = `<li>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text checkbox-circle">
                <input type="checkbox" id="checkbox${n}">
                <label for="checkbox${n}"></label>
              </div>
            </div>
            <input type="text" class="form-control" onblur="storeTask(this)">
            <button type="button" class="close" aria-label="Close" id="closeListItem" onclick="deleteListItems(this)">
              <span aria-hidden="true" class="">&times</span>
            </button>
          </div>
        </li>`;
  $("#" + el + " ul").append(content);
}

function deleteListItems(el) {
  $(el).parent().animate({
    opacity: 0,
    right: "-=100"
  }, 600, function () {
    $(el).parent().remove();
    console.log(selectedList)
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



function storeList() {
  localStorage.setItem("listNames", JSON.stringify(lists))

}

function retrieveList() {
  let allLists = JSON.parse(localStorage.getItem("listNames"));
  if (allLists == null) {
    return null;
  } else {
    allLists.forEach(i => {
      let list = new List(i.title);
      let allTasks = i.tasks;
      selectedList = list;
      printList(list);
      allTasks.forEach(j => {
        console.log(list.title)
        printTask(list.title)
      //   let newTask = new Task(i.text)
      //   list.addTask(newTask)
      //   printTask()
      //   let allTasks = allLists[i].tasks
      //   allTasks.forEach(j => {
      //     printTask()
      //   })

      })
    })
  }

}

function storeTask(el){
  selectedList.addTask($(el).val());
  storeList();
};
