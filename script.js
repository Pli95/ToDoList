// let n = 0;
// const items = {...localStorage};
// let arr = [];
// retrieveMe(items);
//
//
//
//
// function addNewList() {
//   let title = $("#addList").val();
//   arr.push(title);
//   console.log(arr)
//   storeMe(arr)
//   retrieveMe(title)
//   return arr;
// }
//
// function printNewList(title) {
//   let tab = `<a class="nav-link" data-toggle="tab" href=#${title} role="tab"
//        aria-selected="false">
//       <span>${title}</span>
//       <button type="button" class="close" aria-label="Close" id="close" onclick="deleteList(this, ${title})">
//         <span aria-hidden="true">&times</span>
//       </button>
//     </a>`
//   $("#collapsibleNavbar").append(tab)
//   let content = `<div class="tab-pane fade" role="tabpanel" id="${title}">
//       <div class="heading">
//         <h3>${title}</h3>
//         <button class="btn" id="addListItem"><i class="fas fa-plus-circle" onclick="addListItems(this)"></i></button>
//       </div>
//       <ul id="ul"></ul>
//       <button class="btn btn-info" onclick="deleteChecked(this)">Clear checked</button>
//     </div>`
//   $("#v-pills-tabContent").append(content);
//   $("#addList").val("");
// }
//
// function deleteList(el, page) {
//   $(el).parent().fadeOut(function () {
//     $(el).parent().remove();
//   });
//   $(page).remove();
//   deleteMe($(page).attr('id'))
// }
//
// function addListItems(el) {
//   n++
//   let content = `<li>
//           <div class="input-group mb-3">
//             <div class="input-group-prepend">
//               <div class="input-group-text checkbox-circle">
//                 <input type="checkbox" id="checkbox${n}">
//                 <label for="checkbox${n}"></label>
//               </div>
//             </div>
//             <input type="text" class="form-control">
//             <button type="button" class="close" aria-label="Close" id="closeListItem" onclick="deleteListItems(this)">
//               <span aria-hidden="true" class="">&times</span>
//             </button>
//           </div>
//         </li>`;
//   $(el).parent().parent().siblings("ul").append(content);
// }
//
// function deleteListItems(el) {
//   $(el).parent().animate({
//     opacity: 0,
//     right: "-=100"
//   }, 600, function () {
//     $(el).parent().remove();
//   });
// }
//
// function deleteChecked(el) {
//   let checked = $(el).siblings("ul").find("input:checked");
//   if (checked) {
//     for (let i = 0; i < checked.length; i++) {
//       $(checked[i]).parentsUntil("li").animate({
//         opacity: 0,
//         right: "-=100"
//       }, 600, function () {
//         $(checked[i]).parentsUntil("li").remove();
//       });
//     }
//     console.log(checked)
//   }
// }
//
// function storeMe(el) {
//   localStorage.setItem("items", JSON.stringify(el));
// }
//
// function retrieveMe() {
//   let listNames = JSON.parse(localStorage.getItem("items"));
//   for (let i = 0; i < listNames.length; i++) {
//     printNewList(listNames[i])
//   }
//
// }
//
// function deleteMe(el) {
//   let listNames = JSON.parse(localStorage.getItem("items"));
//   console.log(listNames)
//   for (let i = 0; i < listNames.length; i++) {
//     if (listNames[i] == el) {
//       console.log(listNames[i])
//       localStorage.removeItem("items" + [i])
//     }
//   }
// }

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
let listNames = [];
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
  listNames.push(title)
  selectedList = newList;
  CURRENT_LIST_KEY = title;
  storeList(title)
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
        <button class="btn" id="addListItem"><i class="fas fa-plus-circle" onclick="addListItems(this)"></i></button>
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
    // localStorage.removeItem(CURRENT_LIST_KEY)
  });
  $("#" + page).remove();
}

function addListItems(el) {
  let newTask = new Task("task" + n);
  n++;
  selectedList.addTask(newTask);
  $("input[type=text]").onblur = function () {
    let text = newTask.text;
    console.log(text)
  }
  printTask(el)
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
  }, 600, function () {
    $(el).parent().remove();
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
  console.log(allLists)
  if (allLists == null) {
    return null;
  } else {
    allLists.forEach(i => {
      let list = new List(i.title);
      list.tasks.forEach(i => {
        let newTask = new Task(i.text)
        list.addTask(newTask)
        printTask()
      })
      selectedList = list;
      printList(list);
    })
  }

}
